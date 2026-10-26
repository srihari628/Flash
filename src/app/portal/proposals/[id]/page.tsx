'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Check,
  AlertCircle,
  FileCheck,
} from 'lucide-react';

export default function ClientProposalViewPage() {
  const params = useParams();
  const proposalOrBriefId = params.id as string;
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [proposal, setProposal] = useState<any>(null);
  const [isAccepting, setIsAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProposal() {
      setLoading(true);
      try {
        // Try looking up proposal by ID or by brief_id
        let { data: prop } = await supabase
          .from('proposals')
          .select('*')
          .eq('id', proposalOrBriefId)
          .single();

        if (!prop) {
          const { data: propByBrief } = await supabase
            .from('proposals')
            .select('*')
            .eq('brief_id', proposalOrBriefId)
            .order('version', { ascending: false })
            .limit(1)
            .single();

          prop = propByBrief;
        }

        if (prop) {
          setProposal(prop);
        } else {
          // Fallback mock proposal for testing
          setProposal({
            id: proposalOrBriefId,
            title: 'Delivery Proposal: Full Stack SaaS Platform',
            summary: 'Complete engineering sprint for custom multi-tenant web application with Supabase Postgres, authentication, billing, and staging preview.',
            deliverables: [
              'Next.js 16 App Router frontend with locked design tokens',
              'Supabase Postgres schema, migrations & strict RLS policies',
              'Stripe checkout session & webhook event processing',
              'Responsive customer portal & staff triage views',
              'Production handover checklist & 14-day warranty',
            ],
            exclusions: [
              'Third-party cloud infrastructure subscription fees (billed directly to client)',
              'Unscoped custom machine learning model training',
            ],
            currency: 'USD',
            total_amount_minor: 480000,
            payment_schedule_type: 'milestone_split',
            milestone_breakdown: [
              { name: 'Sprint Kickoff & Architecture (40%)', percentage: 40, amount_minor: 192000 },
              { name: 'Sprint Review & Interactive Staging (30%)', percentage: 30, amount_minor: 144000 },
              { name: 'Production Handover & Warranty Sign-Off (30%)', percentage: 30, amount_minor: 144000 },
            ],
            revisions_allowed: 2,
            support_terms: '14 days post-launch priority bug warranty included.',
            status: 'sent',
          });
        }
      } catch (err) {
        console.error('Failed to load proposal:', err);
      } finally {
        setLoading(false);
      }
    }
    loadProposal();
  }, [proposalOrBriefId]);

  const handleAcceptProposal = async () => {
    if (!proposal) return;
    setIsAccepting(true);
    setError(null);

    try {
      const res = await fetch(`/api/proposals/${proposal.id}/accept`, {
        method: 'POST',
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.error || 'Failed to accept proposal.');
      }

      // Redirect to the newly activated project or portal
      if (result.project_id) {
        router.push(`/portal/projects/${result.project_id}`);
      } else {
        router.push('/portal');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error accepting proposal.');
      setIsAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--ivory)] flex items-center justify-center font-heading">
        <span>Loading proposal...</span>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[var(--ivory)] flex items-center justify-center text-center p-6">
        <div>
          <h2 className="text-xl font-heading font-bold mb-2">Proposal In Review</h2>
          <p className="text-xs text-[var(--text-muted)] mb-4">
            Our engineering team is actively preparing your written proposal. Check back shortly.
          </p>
          <Link href="/portal" className="text-xs text-[var(--brand)] font-bold underline">
            Return to Workspace
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Workspace</span>
            </Link>
          </div>

          {/* Proposal Header */}
          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-10 shadow-[var(--shadow-card)] mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-light)]">
              <div>
                <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-bold block w-fit mb-2">
                  Official Delivery Proposal
                </span>
                <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                  {proposal.title}
                </h1>
              </div>

              <div className="text-right sm:text-right">
                <span className="text-[11px] text-[var(--text-muted)] uppercase block font-semibold">
                  Fixed Investment
                </span>
                <span className="text-3xl font-heading font-extrabold text-[var(--brand)] tabular-nums">
                  ${(proposal.total_amount_minor / 100).toLocaleString()} USD
                </span>
              </div>
            </div>

            <p className="text-base text-[var(--ink)] leading-relaxed mb-6 font-medium">
              {proposal.summary}
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[var(--border-light)] mb-8">
              <div>
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--brand)]" />
                  Deliverables Included
                </h3>
                <ul className="space-y-2">
                  {((proposal.deliverables as string[]) || []).map((item, idx) => (
                    <li key={idx} className="text-xs text-[var(--ink)] flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--text-muted)] mb-3 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[var(--text-muted)]" />
                  Explicit Exclusions
                </h3>
                <ul className="space-y-2">
                  {((proposal.exclusions as string[]) || []).map((item, idx) => (
                    <li key={idx} className="text-xs text-[var(--text-muted)] flex items-start gap-2">
                      <span className="text-xs text-rose-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Milestone Payment Breakdown */}
            <div className="rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] p-6 mb-8">
              <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-[var(--ink)] mb-4">
                Milestone Schedule (40% Kickoff / 30% Review / 30% Handover)
              </h3>
              <div className="space-y-3">
                {((proposal.milestone_breakdown as any[]) || []).map((ms, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-[12px] bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-heading font-bold text-[var(--ink)] block">{ms.name}</span>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">{ms.percentage}% of total</span>
                    </div>
                    <span className="font-mono font-bold text-[var(--brand)] tabular-nums">
                      ${(ms.amount_minor / 100).toLocaleString()} USD
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Accept Action */}
            <div className="pt-6 border-t border-[var(--border-light)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-[var(--text-muted)]">
                {proposal.status === 'accepted' ? '✓ Accepted by customer' : 'Accepting activates the project workspace and sprint milestones.'}
              </span>

              {proposal.status === 'accepted' ? (
                <span className="px-6 py-3 rounded-[12px] bg-emerald-50 text-emerald-800 font-bold text-xs">
                  Proposal Accepted
                </span>
              ) : (
                <button
                  type="button"
                  disabled={isAccepting}
                  onClick={handleAcceptProposal}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-md hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {isAccepting ? (
                    <span>Activating sprint...</span>
                  ) : (
                    <>
                      <span>Accept Proposal & Activate Sprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              )}
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
