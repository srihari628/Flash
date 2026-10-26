import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/server';
import { Brief, Project, Proposal } from '@/lib/types';
import {
  Clock,
  ArrowRight,
  FolderKanban,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ExternalLink,
  LifeBuoy,
  LogOut,
  Layers,
} from 'lucide-react';

export const metadata = {
  title: 'Client Workspace — BuilDo',
  description: 'Track your project briefs, review proposals, test staging builds, and manage milestones in your private customer workspace.',
};

export const dynamic = 'force-dynamic';

export default async function CustomerPortalPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If not logged in, show guest claim or sign in prompt
  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
        <Navbar theme="light" />
        <main className="flex-grow pt-36 pb-24 flex items-center justify-center">
          <div className="max-w-md mx-auto px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mx-auto mb-4">
              <FolderKanban className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-heading font-extrabold text-[var(--ink)] mb-2">
              Sign In to Your Workspace
            </h1>
            <p className="text-sm text-[var(--text-muted)] mb-6">
              Sign in with the email address you used when submitting your brief to view your live proposals and sprint status.
            </p>
            <div className="flex flex-col gap-3">
              <Link
                href="/auth/login"
                className="w-full py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors shadow-sm"
              >
                Sign in to workspace
              </Link>
              <Link
                href="/auth/signup"
                className="w-full py-3.5 rounded-[12px] border border-[var(--border-light)] text-sm font-semibold hover:bg-[var(--surface)] transition-colors"
              >
                Create new account
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Fetch user profile, briefs, and projects
  const [profileRes, briefsRes, projectsRes] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('briefs').select('*').eq('user_id', user.id).order('submitted_at', { ascending: false }),
    supabase.from('projects').select('*').eq('customer_id', user.id).order('created_at', { ascending: false }),
  ]);

  const profile = profileRes.data;
  const briefs: Brief[] = (briefsRes.data as Brief[]) || [];
  const projects: Project[] = (projectsRes.data as Project[]) || [];

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          
          {/* Welcome Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 mb-10 border-b border-[var(--border-light)] gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] block mb-1">
                Client Workspace
              </span>
              <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                Welcome, {profile?.full_name || user.email?.split('@')[0]}
              </h1>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
                Signed in as: {user.email}
              </p>
            </div>

            <div>
              <Link
                href="/brief"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)] transition-all shadow-sm"
              >
                <span>+ New project brief</span>
              </Link>
            </div>
          </div>

          {/* Active Projects (Paid Orders & Sprints) */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-[var(--ink)] flex items-center gap-2">
                <FolderKanban className="w-5 h-5 text-[var(--brand)]" />
                Active Engineering Projects
              </h2>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {projects.length} Active
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-8 text-center">
                <p className="text-sm font-semibold text-[var(--ink)] mb-1">
                  No confirmed projects yet.
                </p>
                <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mb-4">
                  Once your brief proposal is approved and initial milestone payment is confirmed, your live project workspace will activate here.
                </p>
                <Link
                  href="/brief"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                >
                  <span>Submit an idea to start</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm hover:border-[var(--brand)] transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold">
                          {proj.status.replace('_', ' ')}
                        </span>
                        {proj.target_delivery_date && (
                          <span className="text-xs font-mono text-[var(--text-muted)]">
                            Target: {proj.target_delivery_date}
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2">
                        {proj.name}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] line-clamp-2 mb-4">
                        {proj.scope_summary || 'Custom software development sprint.'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between">
                      <span className="text-xs font-medium text-emerald-700">
                        ● Delivery Sprint Active
                      </span>
                      <Link
                        href={`/portal/projects/${proj.id}`}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[var(--brand)] hover:underline"
                      >
                        <span>Open Workspace</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Submitted Briefs & Enquiry Pipeline */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-[var(--ink)] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[var(--brand)]" />
                Submitted Briefs & Quotes
              </h2>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                {briefs.length} Briefs
              </span>
            </div>

            {briefs.length === 0 ? (
              <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-8 text-center">
                <p className="text-sm font-semibold text-[var(--ink)] mb-1">
                  You have not submitted any briefs yet.
                </p>
                <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-4">
                  Share what you would like to build. We’ll review your requirements within 6 hours.
                </p>
                <Link
                  href="/brief"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)]"
                >
                  <span>Submit your first brief</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {briefs.map((brief) => {
                  const isSubmitted = brief.status === 'submitted';
                  const isProposalSent = brief.status === 'proposal_sent';
                  const isAccepted = brief.status === 'accepted';

                  return (
                    <div
                      key={brief.id}
                      className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
                    >
                      <div className="max-w-xl">
                        <div className="flex items-center gap-3 mb-1.5">
                          <span className="font-mono text-xs font-bold text-[var(--brand)]">
                            {brief.reference_code}
                          </span>
                          <span
                            className={`text-[11px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              isAccepted
                                ? 'bg-emerald-50 text-emerald-800 font-bold'
                                : isProposalSent
                                ? 'bg-[var(--brand-soft)] text-[var(--brand)] font-bold'
                                : 'bg-[var(--ivory)] text-[var(--text-muted)] border border-[var(--border-light)]'
                            }`}
                          >
                            {brief.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-[var(--text-muted)]">
                            {new Date(brief.submitted_at).toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-1">
                          {brief.service_name || 'Custom Product'}
                        </h3>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-1 italic">
                          “{brief.idea_description}”
                        </p>
                      </div>

                      {/* Right side status / SLA indicator */}
                      <div className="flex items-center gap-4 flex-shrink-0">
                        {isSubmitted && (
                          <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] font-mono">
                            <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                            <span>In Lead Review (6h SLA)</span>
                          </div>
                        )}

                        {isProposalSent && (
                          <Link
                            href={`/portal/proposals/${brief.id}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)]"
                          >
                            <span>Review Proposal</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}

                        <span className="text-xs font-mono px-2.5 py-1 rounded bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">
                          {brief.work_mode === 'discuss' ? 'Discussion' : 'Async Written'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
