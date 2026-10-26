import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Clock, ShieldCheck, CheckCircle2, GitBranch, Key, LifeBuoy, Terminal, MessageSquare, Check } from 'lucide-react';

export const metadata = {
  title: 'How It Works — BuilDo',
  description: 'Our disciplined four-stage delivery method. From initial idea intake to verified milestone previews, staging deployments, and full IP handover.',
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
              The Engineering Process
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4">
              How BuilDo delivers.<br />Without the chaos.
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              Traditional software development often breaks down in communication: missed estimates, changing scope, and technical debt. Here is how our managed process guarantees clarity, quality, and on-time handover.
            </p>
          </div>

          {/* Deep Phase Breakdown */}
          <div className="space-y-12 mb-20">
            {/* Phase 1 */}
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-light)]">
                <div>
                  <span className="text-xs font-mono text-[var(--brand)] font-bold block mb-1">
                    PHASE 01
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                    Share your idea (Async or Call)
                  </h2>
                </div>
                <div className="px-3.5 py-1.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] text-xs font-mono font-semibold flex items-center gap-1.5 w-fit">
                  <Clock className="w-3.5 h-3.5" />
                  <span>6-hour review guarantee</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-2">
                    What happens in this step
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    You complete our simple 3-step brief. Type your problem, paste a reference link, or upload documents. You choose between asynchronous written communication or an initial 20-minute video session.
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    No technical credentials or architecture diagrams are required. We translate your business goals into concrete engineering requirements.
                  </p>
                </div>

                <div className="p-5 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-2.5">
                  <span className="text-xs font-semibold text-[var(--ink)] block uppercase tracking-wider">
                    Our Operational Commitments:
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Every submission reviewed by Yash, Priya, or Lead</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Opaque reference code generated immediately</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>100% free review with zero upfront obligation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 2 */}
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-light)]">
                <div>
                  <span className="text-xs font-mono text-[var(--brand)] font-bold block mb-1">
                    PHASE 02
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                    Approve your written proposal
                  </h2>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)] text-xs font-mono font-semibold w-fit">
                  Fixed scope agreement
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-2">
                    Scope certainty before invoices
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    Within 6 hours, we deliver a formal written proposal: exact deliverables, explicit exclusions, milestone payment schedule, and a target delivery date.
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    Accepted proposals are immutable snapshots. We never increase prices mid-sprint unless you explicitly request new features via a change request.
                  </p>
                </div>

                <div className="p-5 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-2.5">
                  <span className="text-xs font-semibold text-[var(--ink)] block uppercase tracking-wider">
                    Proposal Components:
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Deliverables & technical stack breakdown</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Advance + milestone payment arrangement</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Agreed revisions and review windows</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 3 */}
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-light)]">
                <div>
                  <span className="text-xs font-mono text-[var(--brand)] font-bold block mb-1">
                    PHASE 03
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                    Follow the build in your workspace
                  </h2>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)] text-xs font-mono font-semibold w-fit">
                  Live staging builds
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-2">
                    Transparency at every milestone
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    You get access to a private workspace. You follow milestone completions, inspect private staging preview URLs, and submit comments directly on versioned screens.
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    When a milestone is ready, you either approve it or request changes with notes. We iterate until the milestone meets the agreed proposal specifications.
                  </p>
                </div>

                <div className="p-5 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-2.5">
                  <span className="text-xs font-semibold text-[var(--ink)] block uppercase tracking-wider">
                    Workspace Features:
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Real-time milestone tracking (no fake percentages)</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Interactive staging previews</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Direct async chat with your project lead</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase 4 */}
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-10 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-[var(--border-light)]">
                <div>
                  <span className="text-xs font-mono text-[var(--brand)] font-bold block mb-1">
                    PHASE 04
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                    Launch & complete handover
                  </h2>
                </div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-mono font-semibold w-fit">
                  Full IP Ownership
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-heading font-bold text-base text-[var(--ink)] mb-2">
                    Complete ownership transfer
                  </h3>
                  <p className="text-[var(--text-muted)] leading-relaxed mb-4">
                    Upon final milestone approval, we initiate complete IP handover. We transfer the GitHub repository, guide your DNS and domain cutover, and hand over environment secrets.
                  </p>
                  <p className="text-[var(--text-muted)] leading-relaxed">
                    You also receive 14 days of dedicated warranty support to ensure production stability.
                  </p>
                </div>

                <div className="p-5 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-2.5">
                  <span className="text-xs font-semibold text-[var(--ink)] block uppercase tracking-wider">
                    Handover Inclusions:
                  </span>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Complete GitHub repository transfer</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Vercel / Cloudflare production deployment</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <Check className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>14-day priority bug warranty included</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center rounded-[22px] bg-[var(--ink)] text-[var(--ivory)] p-12 border border-[var(--border-dark)]">
            <h3 className="text-3xl font-heading font-extrabold mb-3">
              Ready to start your delivery sprint?
            </h3>
            <p className="text-[var(--text-muted-dark)] text-sm max-w-md mx-auto mb-8">
              Share what you want to build. You’ll have a structured written proposal in your inbox within 6 hours.
            </p>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors shadow-sm"
            >
              <span>Tell us your idea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
