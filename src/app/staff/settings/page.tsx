import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { ShieldCheck, Clock, Settings, History, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Operational Response Settings & SLA — BuilDo Staff',
  description: 'Manage SLA parameters, response promise configuration, and audit logs.',
};

export const dynamic = 'force-dynamic';

export default async function StaffSettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login?next=/staff/settings');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const isStaffOrAdmin =
    (profile && ['admin', 'staff', 'developer', 'reviewer'].includes(profile.role)) ||
    ['skchanu007@gmail.com', 'skchan007@gmail.com'].includes(user.email || '');

  if (!isStaffOrAdmin) {
    redirect('/portal');
  }

  const [settingsRes, auditRes] = await Promise.all([
    supabase.from('site_settings').select('*').eq('key', 'response_promise').single(),
    supabase.from('audit_events').select('*').order('created_at', { ascending: false }).limit(15),
  ]);

  const responsePromise = settingsRes.data?.value || {
    enabled: true,
    mode: 'elapsed_hours',
    target_hours: 6,
    headline: 'Guaranteed response within 6 hours',
    working_timezone: 'UTC',
    office_hours_start: '08:00',
    office_hours_end: '22:00',
  };

  const auditEvents = auditRes.data || [];

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] text-[var(--ivory)] flex flex-col">
      <Navbar theme="dark" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--border-dark)]">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] block mb-1 font-mono">
                OPERATIONS & AUDIT
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ivory)]">
                Response Settings & Audit Trails
              </h1>
            </div>
          </div>

          {/* Navigation Bar inside Staff Portal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border-dark)] pb-3 text-xs font-mono">
            <div className="flex gap-4">
              <Link href="/staff/leads" className="text-[var(--text-muted-dark)] hover:text-[var(--ivory)] pb-3">
                Leads & Briefs
              </Link>
              <Link href="/staff/proposals" className="text-[var(--text-muted-dark)] hover:text-[var(--ivory)] pb-3">
                Proposal Builder
              </Link>
              <Link href="/staff/settings" className="text-[var(--brand-soft)] font-bold border-b-2 border-[var(--brand)] pb-3">
                Operating SLA Settings
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left 7 cols: Active Response Policy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-[22px] bg-[var(--ink)] border border-[var(--border-dark)] p-8 shadow-sm">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--border-dark)]">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[var(--brand)]" />
                    <h2 className="text-lg font-heading font-bold text-[var(--ivory)]">
                      Configured Response Promise
                    </h2>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
                    Active & Monitored
                  </span>
                </div>

                <div className="space-y-4 text-xs font-mono">
                  <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                    <span className="text-[var(--text-muted-dark)]">Coverage Mode:</span>
                    <span className="font-bold text-[var(--ivory)] uppercase">
                      {responsePromise.mode?.replace('_', ' ')} (Daily Staffing)
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                    <span className="text-[var(--text-muted-dark)]">Target Response Time:</span>
                    <span className="font-bold text-[var(--brand-soft)]">
                      {responsePromise.target_hours} Hours from brief submission
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                    <span className="text-[var(--text-muted-dark)]">Operating Timezone:</span>
                    <span className="font-bold text-[var(--ivory)]">
                      {responsePromise.working_timezone}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                    <span className="text-[var(--text-muted-dark)]">Escalation Reminders:</span>
                    <span className="font-bold text-[var(--ivory)]">
                      At 2h, 4h, and 5h post-submission
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[var(--border-dark)] text-xs text-[var(--text-muted-dark)] leading-relaxed">
                  * As instructed by Section 11 of the operating manual: elapsed-hour mode requires daily staffing. We never silently substitute business hours while displaying "within six hours" publicly.
                </div>
              </div>
            </div>

            {/* Right 5 cols: Audit Log */}
            <div className="lg:col-span-5">
              <div className="rounded-[22px] bg-[var(--ink)] border border-[var(--border-dark)] p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[var(--border-dark)]">
                  <History className="w-4 h-4 text-[var(--brand)]" />
                  <h3 className="text-sm font-heading font-bold text-[var(--ivory)]">
                    Audit Log & Activity
                  </h3>
                </div>

                <div className="space-y-3 max-h-[460px] overflow-y-auto text-xs">
                  {auditEvents.length === 0 ? (
                    <p className="text-[var(--text-muted-dark)] italic py-4 text-center">
                      No audit events logged yet.
                    </p>
                  ) : (
                    auditEvents.map((evt: any) => (
                      <div
                        key={evt.id}
                        className="p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between text-[var(--brand-soft)] font-bold mb-1">
                          <span>{evt.action}</span>
                          <span className="text-[10px] text-[var(--text-muted-dark)] font-normal">
                            {new Date(evt.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <span className="text-[var(--text-muted-dark)] block truncate">
                          Target: {evt.entity_type} ({evt.entity_id?.slice(0, 8)}...)
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
