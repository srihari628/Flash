import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function POST(req: NextRequest, { params }: RouteContext) {
  try {
    const { id: projectId } = await params;
    const body = await req.json();
    const { content, is_internal_note = false } = body;

    if (!content || typeof content !== 'string' || !content.trim()) {
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
    }

    // Get user profile for sender_name and sender_role
    const { data: profile } = await supabase
      .from('profiles')
      .select('full_name, role')
      .eq('id', user.id)
      .single();

    const senderRole = profile?.role || 'customer';
    const senderName = profile?.full_name || user.email?.split('@')[0] || 'User';

    // Insert message into Supabase
    const { data: message, error: insertError } = await supabase
      .from('messages')
      .insert({
        project_id: projectId,
        sender_id: user.id,
        sender_name: senderName,
        sender_role: senderRole,
        content: content.trim(),
        is_internal_note: Boolean(is_internal_note),
      })
      .select('*')
      .single();

    if (insertError) {
      console.error('Failed to insert message:', insertError);
      return NextResponse.json({ error: 'Failed to record message.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message });
  } catch (err: any) {
    console.error('Project message route error:', err);
    return NextResponse.json({ error: 'Unexpected error.' }, { status: 500 });
  }
}
