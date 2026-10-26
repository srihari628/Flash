'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  DollarSign,
  Calendar,
} from 'lucide-react';

function ProposalBuilderForm() {
  const searchParams = useSearchParams();
  const briefId = searchParams.get('briefId');
  const router = useRouter();
  const supabase = createClient();

  const [brief, setBrief] = useState<any>(null);
  const [loadingBrief, setLoadingBrief] = useState(false);

  // Proposal State
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [deliverables, setDeliverables] = useState<string[]>([
    'Tailored Next.js frontend with locked design tokens',
    'Supabase Postgres schema, migrations & strict RLS policies',
    'Stripe / Payment integration & webhooks',
    'Full repository IP transfer & 14-day warranty',
  ]);
  const [newDeliverable, setNewDeliverable] = useState('');
  const [exclusions, setExclusions] = useState<string[]>([
    'Third-party cloud infrastructure subscription fees (billed directly to client)',
    'Unscoped custom machine learning model training',
  ]);
  const [newExclusion, setNewExclusion] = useState('');
  const [totalAmountUSD, setTotalAmountUSD] = useState<number>(3600);
  const [paymentScheduleType, setPaymentScheduleType] = useState<'milestone_split' | 'advance_full' | 'discovery_first'>('milestone_split');
  const [targetDays, setTargetDays] = useState<number>(7);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Enforce staff/admin authentication guard
  useEffect(() => {
    async function checkAuth() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth/login?next=/staff/proposals');
        return;
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
        router.push('/portal');
      }
    }
    checkAuth();
  }, [router, supabase]);

  // Load brief details if provided
  useEffect(() => {
    async function loadBrief() {
      if (!briefId) return;
      setLoadingBrief(true);
      try {
        const { data } = await supabase.from('briefs').select('*').eq('id', briefId).single();
        if (data) {
          setBrief(data);
          setTitle(`Delivery Proposal: ${data.service_name || 'Custom Product'} for ${data.guest_name}`);
          setSummary(`Structured delivery sprint for ${data.guest_name} based on brief requirements: "${data.idea_description.slice(0, 120)}..."`);
        }
      } catch (err) {
        console.error('Failed to load brief:', err);
      } finally {
        setLoadingBrief(false);
      }
    }
    loadBrief();
  }, [briefId]);

  const handleAddDeliverable = () => {
    if (newDeliverable.trim()) {
      setDeliverables([...deliverables, newDeliverable.trim()]);
      setNewDeliverable('');
    }
  };

  const handleAddExclusion = () => {
    if (newExclusion.trim()) {
      setExclusions([...exclusions, newExclusion.trim()]);
      setNewExclusion('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const milestoneBreakdown =
        paymentScheduleType === 'milestone_split'
          ? [
              { name: 'Sprint Kickoff & Architecture (40%)', percentage: 40, amount_minor: Math.round(totalAmountUSD * 40) },
              { name: 'Sprint Review & Interactive Staging (30%)', percentage: 30, amount_minor: Math.round(totalAmountUSD * 30) },
              { name: 'Production Handover & Warranty Sign-Off (30%)', percentage: 30, amount_minor: Math.round(totalAmountUSD * 30) },
            ]
          : [
              { name: 'Complete Sprint Advance (100%)', percentage: 100, amount_minor: totalAmountUSD * 100 },
            ];

      const res = await fetch('/api/proposals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brief_id: briefId || null,
          title,
          summary,
          deliverables,
          exclusions,
          revisions_allowed: 2,
          start_date: new Date().toISOString().split('T')[0],
          delivery_target_date: new Date(Date.now() + targetDays * 24 * 3600 * 1000).toISOString().split('T')[0],
          currency: 'USD',
          total_amount_minor: Math.round(totalAmountUSD * 100),
          payment_schedule_type: paymentScheduleType,
          milestone_breakdown: milestoneBreakdown,
          support_terms: '14 days post-launch priority bug warranty included.',
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Failed to dispatch proposal.');
      }

      router.push('/staff/leads');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error creating proposal.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] text-[var(--ivory)] flex flex-col">
      <Navbar theme="dark" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/staff/leads"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted-dark)] hover:text-[var(--ivory)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Leads Queue</span>
            </Link>
          </div>

          <div className="mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] block mb-1 font-mono">
              STAFF PROPOSAL ENGINE
            </span>
            <h1 className="text-3xl font-heading font-extrabold text-[var(--ivory)]">
              Draft & Issue Structured Proposal
            </h1>
            <p className="text-xs text-[var(--text-muted-dark)] mt-1">
              Create an immutable scope contract with fixed milestone pricing and deliverable breakdowns.
            </p>
          </div>

          {brief && (
            <div className="p-4 rounded-[14px] bg-[var(--ink)] border border-[var(--border-dark)] mb-8 text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[var(--brand-soft)] font-mono font-bold">
                  Target Brief: {brief.reference_code}
                </span>
                <span>Submitted by: {brief.guest_name} ({brief.guest_email})</span>
              </div>
              <p className="text-[var(--text-muted-dark)] italic truncate">
                “{brief.idea_description}”
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-[12px] bg-rose-950/80 border border-rose-800 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="rounded-[22px] bg-[var(--ink)] border border-[var(--border-dark)] p-8 shadow-xl space-y-6 text-sm">
            
            {/* Title & Summary */}
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-1">
                Proposal Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Delivery Proposal: Full Stack SaaS Platform"
                className="w-full p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-sm focus:border-[var(--brand)] text-[var(--ivory)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-1">
                Scope Summary *
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                placeholder="Detailed summary of the outcome..."
                className="w-full p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-sm focus:border-[var(--brand)] text-[var(--ivory)]"
              />
            </div>

            {/* Deliverables List */}
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-2">
                Deliverables Included
              </label>
              <div className="space-y-2 mb-3">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs"
                  >
                    <span>{item}</span>
                    <button
                      type="button"
                      onClick={() => setDeliverables(deliverables.filter((_, i) => i !== idx))}
                      className="text-[var(--text-muted-dark)] hover:text-rose-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newDeliverable}
                  onChange={(e) => setNewDeliverable(e.target.value)}
                  placeholder="Add specific deliverable..."
                  className="flex-1 p-2.5 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs text-[var(--ivory)]"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-4 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)]"
                >
                  Add
                </button>
              </div>
            </div>

            {/* Price & Timeline Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border-dark)]">
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-1">
                  Fixed Total (USD) *
                </label>
                <input
                  type="number"
                  min={100}
                  step={50}
                  required
                  value={totalAmountUSD}
                  onChange={(e) => setTotalAmountUSD(Number(e.target.value))}
                  className="w-full p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-sm font-bold text-[var(--brand-soft)] font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-1">
                  Payment Arrangement
                </label>
                <select
                  value={paymentScheduleType}
                  onChange={(e) => setPaymentScheduleType(e.target.value as any)}
                  className="w-full p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs text-[var(--ivory)]"
                >
                  <option value="milestone_split">40% / 30% / 30% Milestone Split</option>
                  <option value="advance_full">100% Full Advance Sprint</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--text-muted-dark)] mb-1">
                  Target Sprint Days
                </label>
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={targetDays}
                  onChange={(e) => setTargetDays(Number(e.target.value))}
                  className="w-full p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-sm font-mono text-[var(--ivory)]"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-6 border-t border-[var(--border-dark)] flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted-dark)] font-mono">
                Will mark lead as 'proposal_sent' and timestamp first human response.
              </span>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-all disabled:opacity-50"
              >
                {isSubmitting ? 'Issuing proposal...' : 'Issue Proposal to Client'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </form>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function StaffProposalsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--surface-dark)] flex items-center justify-center text-white">Loading builder...</div>}>
      <ProposalBuilderForm />
    </Suspense>
  );
}
