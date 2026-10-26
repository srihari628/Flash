import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { Brief } from '@/lib/types';
import {
  ShieldCheck,
  Search,
  Clock,
  ArrowRight,
  User,
  Filter,
  FileText,
  CheckCircle2,
  AlertCircle,
  Video,
  MessageSquare,
} from 'lucide-react';

export const metadata = {
  title: 'Staff Triage & Leads Portal — BuilDo',
  description: 'Internal operational triage dashboard for evaluating incoming client briefs within the 6-hour response SLA.',
};

export const dynamic = 'force-dynamic';

export default async function StaffLeadsPage() {
  const supabase = await createClient();

  // Enforce staff/admin authentication guard
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login?next=/staff/leads');
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

  // Query briefs
  const { data: briefsList } = await supabase
    .from('briefs')
    .select('*')
    .order('submitted_at', { ascending: false });

  const briefs: Brief[] = (briefsList as Brief[]) || [];

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] text-[var(--ivory)] flex flex-col">
      <Navbar theme="dark" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-8 border-b border-[var(--border-dark)] gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold font-mono">
                  STAFF RESTRICTED
                </span>
                <span className="text-xs font-mono text-[var(--text-muted-dark)]">
                  Operational Response Triage
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ivory)]">
                Incoming Briefs & Leads
              </h1>
              {user && (
                <p className="text-xs font-mono text-[var(--text-muted-dark)] mt-1">
                  Signed in as: <span className="text-[var(--brand-soft)]">{user.email}</span>
                </p>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs font-mono">
              <div className="p-3 rounded-[12px] bg-[var(--ink)] border border-[var(--border-dark)]">
                <span className="text-[var(--text-muted-dark)] block">Target SLA:</span>
                <span className="font-bold text-[var(--brand-soft)]">6 Elapsed Hours</span>
              </div>
              <div className="p-3 rounded-[12px] bg-[var(--ink)] border border-[var(--border-dark)]">
                <span className="text-[var(--text-muted-dark)] block">Active Triage Queue:</span>
                <span className="font-bold text-[var(--ivory)]">{briefs.length} Total</span>
              </div>
            </div>
          </div>

          {/* Navigation Bar inside Staff Portal */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 border-b border-[var(--border-dark)] pb-3 text-xs font-mono">
            <div className="flex gap-4">
              <Link href="/staff/leads" className="text-[var(--brand-soft)] font-bold border-b-2 border-[var(--brand)] pb-3">
                Leads & Briefs ({briefs.length})
              </Link>
              <Link href="/staff/proposals" className="text-[var(--text-muted-dark)] hover:text-[var(--ivory)] pb-3">
                Proposal Builder
              </Link>
              <Link href="/staff/settings" className="text-[var(--text-muted-dark)] hover:text-[var(--ivory)] pb-3">
                Operating SLA Settings
              </Link>
            </div>
          </div>

          {/* Leads Table Card */}
          <div className="rounded-[22px] bg-[var(--ink)] border border-[var(--border-dark)] overflow-hidden shadow-xl">
            <div className="p-6 border-b border-[var(--border-dark)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--text-muted-dark)]">
                <ShieldCheck className="w-4 h-4 text-[var(--brand)]" />
                <span>Live Intake Records</span>
              </div>
            </div>

            {briefs.length === 0 ? (
              <div className="p-12 text-center text-sm text-[var(--text-muted-dark)]">
                <Clock className="w-8 h-8 mx-auto mb-3 text-[var(--brand)] opacity-60" />
                <p className="font-semibold text-[var(--ivory)]">No briefs currently in triage.</p>
                <p className="text-xs mt-1">New submissions via /brief will appear here in real-time.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--surface-dark)] text-[var(--text-muted-dark)] uppercase font-mono border-b border-[var(--border-dark)]">
                    <tr>
                      <th className="p-4">Reference</th>
                      <th className="p-4">Client Contact</th>
                      <th className="p-4">Category & Concept</th>
                      <th className="p-4">Mode</th>
                      <th className="p-4">SLA Due Target</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-dark)] text-[var(--ivory)]">
                    {briefs.map((b) => {
                      const due = b.response_due_at ? new Date(b.response_due_at) : null;
                      const isOverdue = due && due.getTime() < Date.now();

                      return (
                        <tr key={b.id} className="hover:bg-[var(--surface-dark)]/50 transition-colors">
                          <td className="p-4 font-mono font-bold text-[var(--brand-soft)]">
                            {b.reference_code}
                          </td>
                          <td className="p-4">
                            <span className="font-semibold block">{b.guest_name}</span>
                            <span className="text-[var(--text-muted-dark)] font-mono">{b.guest_email}</span>
                            {b.guest_phone && (
                              <span className="text-[var(--text-muted-dark)] block text-[10px]">
                                {b.guest_phone} ({b.preferred_channel})
                              </span>
                            )}
                          </td>
                          <td className="p-4 max-w-xs">
                            <span className="font-bold block text-[var(--ivory)]">
                              {b.service_name || 'Custom Scoped'}
                            </span>
                            <p className="text-[var(--text-muted-dark)] truncate italic">
                              “{b.idea_description}”
                            </p>
                          </td>
                          <td className="p-4">
                            {b.work_mode === 'discuss' ? (
                              <span className="inline-flex items-center gap-1 text-[var(--brand-soft)] font-medium">
                                <Video className="w-3.5 h-3.5 text-[var(--brand)]" />
                                <span>Discuss</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-[var(--text-muted-dark)]">
                                <MessageSquare className="w-3.5 h-3.5" />
                                <span>Async</span>
                              </span>
                            )}
                          </td>
                          <td className="p-4 font-mono">
                            {due ? (
                              <span className={isOverdue ? 'text-rose-400 font-bold' : 'text-emerald-400 font-medium'}>
                                {due.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} ({isOverdue ? 'Overdue' : 'Within SLA'})
                              </span>
                            ) : (
                              <span className="text-[var(--text-muted-dark)]">6 Hours</span>
                            )}
                          </td>
                          <td className="p-4">
                            <span className="font-mono uppercase text-[10px] px-2 py-0.5 rounded bg-[var(--surface-dark)] border border-[var(--border-dark)] text-[var(--brand-soft)]">
                              {b.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <Link
                              href={`/staff/proposals?briefId=${b.id}`}
                              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)] transition-colors"
                            >
                              <span>Draft Proposal</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
