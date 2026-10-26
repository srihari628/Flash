import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      brief_id,
      title,
      summary,
      deliverables = [],
      exclusions = [],
      revisions_allowed = 2,
      start_date,
      delivery_target_date,
      currency = 'USD',
      total_amount_minor = 0,
      payment_schedule_type = 'milestone_split',
      milestone_breakdown = [],
      client_dependencies = [],
      support_terms = '14 days post-launch warranty support included.',
    } = body;

    if (!title || !summary || total_amount_minor <= 0) {
      return NextResponse.json({ error: 'Please provide title, summary, and a valid proposal total.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Insert proposal
    const { data: proposal, error: propError } = await supabase
      .from('proposals')
      .insert({
        brief_id: brief_id || null,
        title: title.trim(),
        summary: summary.trim(),
        deliverables: Array.isArray(deliverables) ? deliverables : [],
        exclusions: Array.isArray(exclusions) ? exclusions : [],
        revisions_allowed: Number(revisions_allowed),
        start_date: start_date || null,
        delivery_target_date: delivery_target_date || null,
        currency,
        total_amount_minor: Number(total_amount_minor),
        payment_schedule_type,
        milestone_breakdown: Array.isArray(milestone_breakdown) ? milestone_breakdown : [],
        client_dependencies: Array.isArray(client_dependencies) ? client_dependencies : [],
        support_terms: support_terms.trim(),
        status: 'sent',
      })
      .select('*')
      .single();

    if (propError) {
      console.error('Proposal insert error:', propError);
      return NextResponse.json({ error: 'Failed to create proposal.' }, { status: 500 });
    }

    // Update brief status if brief_id is provided
    if (brief_id) {
      await supabase
        .from('briefs')
        .update({
          status: 'proposal_sent',
          first_human_response_at: new Date().toISOString(),
          response_owner_id: user ? user.id : null,
        })
        .eq('id', brief_id);
    }

    // Audit event
    await supabase.from('audit_events').insert({
      actor_id: user ? user.id : null,
      action: 'PROPOSAL_CREATED',
      entity_type: 'proposal',
      entity_id: proposal.id,
      details: {
        brief_id,
        total_amount_minor,
      },
    });

    return NextResponse.json({ success: true, proposal });
  } catch (err: any) {
    console.error('Proposal route error:', err);
    return NextResponse.json({ error: 'Unexpected error occurred.' }, { status: 500 });
  }
}
