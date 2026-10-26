import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: projectId } = await params;
    const body = await req.json();
    const { preview_id, milestone_id, decision, feedback_notes } = body;

    if (!decision || !['approved', 'changes_requested'].includes(decision)) {
      return NextResponse.json({ error: 'Valid decision (approved or changes_requested) is required.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    // Insert approval record
    const { data: approval, error: appError } = await supabase
      .from('approvals')
      .insert({
        project_id: projectId,
        preview_id,
        milestone_id,
        decided_by: user.id,
        decision,
        feedback_notes: feedback_notes ? feedback_notes.trim() : null,
      })
      .select('*')
      .single();

    if (appError) {
      console.error('Approval insert error:', appError);
      return NextResponse.json({ error: 'Failed to record approval decision.' }, { status: 500 });
    }

    // Update milestone state if milestone_id provided
    if (milestone_id) {
      if (decision === 'approved') {
        await supabase
          .from('milestones')
          .update({ status: 'approved', approved_at: new Date().toISOString() })
          .eq('id', milestone_id);
      } else {
        await supabase
          .from('milestones')
          .update({ status: 'in_progress' })
          .eq('id', milestone_id);
      }
    }

    // Also post as a message in the project conversation
    await supabase.from('messages').insert({
      project_id: projectId,
      sender_id: user.id,
      sender_name: 'Client Approval Bot',
      sender_role: 'customer',
      content:
        decision === 'approved'
          ? `🎉 Milestone approved by customer. Feedback: "${feedback_notes || 'All requirements satisfied.'}"`
          : `⚠️ Changes requested by customer. Notes: "${feedback_notes || 'Please review.'}"`,
      is_internal_note: false,
    });

    return NextResponse.json({ success: true, approval });
  } catch (err: any) {
    console.error('Approval route error:', err);
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
