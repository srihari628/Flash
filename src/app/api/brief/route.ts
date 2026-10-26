import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      guest_name,
      guest_email,
      guest_phone,
      preferred_channel = 'email',
      service_slug,
      service_name,
      work_mode = 'writing',
      idea_description,
      target_audience,
      core_features = [],
      budget_range = 'not_sure',
      target_launch_date,
      appointment_timezone = 'UTC',
      appointment_windows = [],
      marketing_consent = false,
    } = body;

    // Validation
    if (!guest_name || typeof guest_name !== 'string' || guest_name.trim().length < 2) {
      return NextResponse.json({ error: 'Please provide a valid full name.' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!guest_email || !emailRegex.test(guest_email)) {
      return NextResponse.json({ error: 'Please provide a valid email address.' }, { status: 400 });
    }

    if ((preferred_channel === 'phone' || preferred_channel === 'whatsapp') && (!guest_phone || guest_phone.trim().length < 6)) {
      return NextResponse.json({ error: 'A phone number with country code is required for phone/WhatsApp contact.' }, { status: 400 });
    }

    if (!idea_description || typeof idea_description !== 'string' || idea_description.trim().length < 10) {
      return NextResponse.json({ error: 'Please provide at least 10 characters describing your idea or requirements.' }, { status: 400 });
    }

    // Generate unique opaque reference code and secure claim token
    const briefId = crypto.randomUUID();
    const randomSuffix = crypto.randomBytes(4).toString('hex').toUpperCase();
    const reference_code = `BDO-${new Date().getFullYear().toString().slice(-2)}${randomSuffix}`;
    const claim_token = crypto.randomBytes(24).toString('hex');

    const supabase = await createClient();

    // Check if user is currently logged in
    const { data: { user } } = await supabase.auth.getUser();

    // Calculate response_due_at: 6 elapsed hours from now
    const submitted_at = new Date();
    const response_due_at = new Date(submitted_at.getTime() + 6 * 60 * 60 * 1000);

    // Look up service_id if slug provided
    let service_id = null;
    if (service_slug) {
      const { data: srv } = await supabase.from('services').select('id, name').eq('slug', service_slug).single();
      if (srv) {
        service_id = srv.id;
      }
    }

    // Insert brief record (without returning select to uphold RLS anonymous restriction)
    const { error: insertError } = await supabase
      .from('briefs')
      .insert({
        id: briefId,
        reference_code,
        user_id: user ? user.id : null,
        guest_name: guest_name.trim(),
        guest_email: guest_email.trim().toLowerCase(),
        guest_phone: guest_phone ? guest_phone.trim() : null,
        preferred_channel,
        service_id,
        service_name: service_name || service_slug || 'Custom Scoped Service',
        work_mode,
        idea_description: idea_description.trim(),
        target_audience: target_audience ? target_audience.trim() : null,
        core_features: Array.isArray(core_features) ? core_features : [],
        budget_range,
        target_launch_date: target_launch_date || null,
        appointment_timezone,
        appointment_windows: Array.isArray(appointment_windows) ? appointment_windows : [],
        marketing_consent: Boolean(marketing_consent),
        status: 'submitted',
        submitted_at: submitted_at.toISOString(),
        response_due_at: response_due_at.toISOString(),
        claim_token,
      });

    if (insertError) {
      console.error('Supabase Brief Insert Error:', insertError);
      return NextResponse.json({ error: 'Failed to record brief. Please try again or email hello@buildo.design.' }, { status: 500 });
    }

    // If discussion mode with requested appointments, record appointment slot
    if (work_mode === 'discuss' && appointment_windows.length > 0) {
      await supabase.from('appointments').insert({
        brief_id: briefId,
        customer_id: user ? user.id : null,
        customer_name: guest_name.trim(),
        customer_email: guest_email.trim().toLowerCase(),
        requested_slot: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
        timezone: appointment_timezone,
        status: 'requested',
        notes: `Customer requested windows: ${JSON.stringify(appointment_windows)}`,
      });
    }

    // Record audit event
    await supabase.from('audit_events').insert({
      actor_id: user ? user.id : null,
      action: 'BRIEF_SUBMITTED',
      entity_type: 'brief',
      entity_id: briefId,
      details: {
        reference_code,
        work_mode,
        guest_email: guest_email.trim().toLowerCase(),
      },
    });

    return NextResponse.json({
      success: true,
      reference_code,
      response_due_at: response_due_at.toISOString(),
      claim_token,
      message: 'Brief submitted successfully. Our team will review your requirements within 6 hours.',
    });
  } catch (err: any) {
    console.error('Brief submission handler error:', err);
    return NextResponse.json({ error: 'An unexpected error occurred during submission.' }, { status: 500 });
  }
}
