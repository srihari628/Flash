import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: proposalId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Fetch proposal
    const { data: proposal, error: propError } = await supabase
      .from('proposals')
      .select('*, briefs(*)')
      .eq('id', proposalId)
      .single();

    if (propError || !proposal) {
      return NextResponse.json({ error: 'Proposal not found.' }, { status: 404 });
    }

    if (proposal.status === 'accepted') {
      return NextResponse.json({ error: 'This proposal has already been accepted.' }, { status: 400 });
    }

    const customerId = user ? user.id : proposal.briefs?.user_id;
    if (!customerId) {
      return NextResponse.json({ error: 'User must be authenticated to accept this proposal.' }, { status: 401 });
    }

    // 1. Mark proposal accepted
    const acceptedAt = new Date().toISOString();
    await supabase
      .from('proposals')
      .update({ status: 'accepted', accepted_at: acceptedAt })
      .eq('id', proposalId);

    // 2. Create the Project
    const { data: project, error: projError } = await supabase
      .from('projects')
      .insert({
        brief_id: proposal.brief_id,
        proposal_id: proposalId,
        customer_id: customerId,
        name: proposal.title,
        status: 'scoping',
        start_date: proposal.start_date || new Date().toISOString().split('T')[0],
        target_delivery_date: proposal.delivery_target_date,
        scope_summary: proposal.summary,
        handover_checklist: [
          { title: 'Full GitHub Repository Transfer', done: false, notes: 'Targeting production release' },
          { title: 'DNS & SSL Deployment Verification', done: false, notes: 'To be configured upon review approval' },
          { title: 'Environment Keys & Secrets Handover', done: false, notes: 'Quarantined in vault' },
          { title: '14-Day Warranty Support Activation', done: false, notes: 'Starts on final release' },
        ],
      })
      .select('*')
      .single();

    if (projError) {
      console.error('Failed to create project upon proposal acceptance:', projError);
    } else {
      // Link project back to proposal
      await supabase.from('proposals').update({ project_id: project.id }).eq('id', proposalId);

      // Create initial milestones from proposal breakdown
      const breakdowns = proposal.milestone_breakdown || [];
      for (let i = 0; i < breakdowns.length; i++) {
        const item = breakdowns[i];
        await supabase.from('milestones').insert({
          project_id: project.id,
          title: item.name || `Phase ${i + 1}`,
          description: `Deliverable milestone for ${item.name}`,
          sequence: i + 1,
          status: i === 0 ? 'in_progress' : 'pending',
        });
      }

      // Create initial advance invoice
      const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const firstMilestoneAmount = breakdowns[0]?.amount_minor || proposal.total_amount_minor;

      await supabase.from('invoices').insert({
        project_id: project.id,
        proposal_id: proposalId,
        invoice_number: invoiceNumber,
        currency: proposal.currency || 'USD',
        amount_minor: firstMilestoneAmount,
        status: 'issued',
        provider: 'stripe_test',
      });

      // Audit event
      await supabase.from('audit_events').insert({
        actor_id: customerId,
        action: 'PROPOSAL_ACCEPTED',
        entity_type: 'proposal',
        entity_id: proposalId,
        details: {
          project_id: project.id,
          invoice_number: invoiceNumber,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Proposal accepted successfully. Project activated.',
      project_id: project?.id,
    });
  } catch (err: any) {
    console.error('Accept proposal error:', err);
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
