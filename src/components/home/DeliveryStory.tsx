'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Check, Laptop, GitBranch, Key, LifeBuoy, Clock, ArrowUpRight } from 'lucide-react';

export default function DeliveryStory() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Share the idea',
      subtitle: 'Intake in minutes without technical jargon',
      desc: 'Type your concept, paste a reference link, or drop a document. Choose whether you want a quick 20-minute discovery conversation or prefer 100% asynchronous written communication.',
      timing: '6-Hour Response Window',
      visual: (
        <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono border-b border-[var(--border-light)] pb-2.5">
            <span className="flex items-center gap-1.5 text-[var(--ink)] font-semibold">
              <FileText className="w-3.5 h-3.5 text-[var(--brand)]" />
              brief_draft.md
            </span>
            <span className="text-[var(--brand)] font-semibold">Auto-saved</span>
          </div>
          <div className="p-3 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)] text-xs text-[var(--ink)] leading-relaxed italic">
            “We need an editorial booking workspace for our design atelier: calendar slot selection, automated confirmation receipts, and customer management.”
          </div>
          <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] pt-1">
            <span className="px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold">
              Mode: In Writing (Async)
            </span>
            <span className="font-mono">Ready for Review</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Approve the plan',
      subtitle: 'Clear scope, milestone checklist, and fixed price',
      desc: 'Within 6 hours, you receive a structured written proposal detailing exact deliverables, milestone timeline, and a single bound price. No surprise invoice adjustments or hourly runaway costs.',
      timing: 'Bound Scope Agreement',
      visual: (
        <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-[var(--border-light)] pb-2.5">
            <span className="font-bold text-[var(--ink)]">Proposal v1.0 • Bound Scope</span>
            <span className="font-extrabold text-[var(--brand)] font-heading text-sm">$3,800 USD</span>
          </div>
          <div className="space-y-1.5 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <Check className="w-3.5 h-3.5 text-[var(--brand)] flex-shrink-0" />
              <span>Deliverable 1: Database Architecture & Auth</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <Check className="w-3.5 h-3.5 text-[var(--brand)] flex-shrink-0" />
              <span>Deliverable 2: Responsive Interface & Sprints</span>
            </div>
            <div className="flex items-center gap-2 text-[var(--ink)]">
              <Check className="w-3.5 h-3.5 text-[var(--brand)] flex-shrink-0" />
              <span>Deliverable 3: Stripe Checkout Integration</span>
            </div>
          </div>
          <div className="w-full py-2 text-center rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-xs shadow-sm">
            Proposal Accepted • Sprints Scheduled
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Follow the build',
      subtitle: 'Private client workspace with staging review links',
      desc: 'Watch real progress unfold inside your customer workspace. Test staging builds on actual devices, submit design feedback directly, and review versioned milestone previews at your own pace.',
      timing: 'Daily Continuous Deployment',
      visual: (
        <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs border-b border-[var(--border-light)] pb-2.5">
            <span className="font-bold text-[var(--ink)]">Milestone 2: Design Review</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Review Ready
            </span>
          </div>
          <div className="p-3 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)] flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)]">Staging URL:</span>
            <span className="font-mono text-[var(--brand)] font-semibold flex items-center gap-1">
              preview.buildo.space/v2
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
          <div className="flex gap-2">
            <button type="button" className="flex-1 py-1.5 rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-xs">
              Approve Milestone
            </button>
            <button type="button" className="flex-1 py-1.5 rounded-[8px] border border-[var(--border-light)] text-[var(--ink)] font-medium text-xs">
              Request Refinement
            </button>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'Launch with support',
      subtitle: 'Complete IP handover and 14-day warranty',
      desc: 'Receive full GitHub repository transfer, environment credentials, DNS cutover, and 14 days of post-launch bug warranty coverage. You own 100% of the code, tokens, and database schemas.',
      timing: '100% IP Transferred',
      visual: (
        <div className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] p-5 shadow-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--ink)] font-bold border-b border-[var(--border-light)] pb-2.5">
            <span>Handover Package</span>
            <span className="text-emerald-700 font-bold">100% Complete</span>
          </div>
          <div className="space-y-2 text-xs text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <GitBranch className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
              <span>Full GitHub Repository Transferred</span>
            </div>
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
              <span>Production SSL & DNS Cutover Handover</span>
            </div>
            <div className="flex items-center gap-2">
              <LifeBuoy className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
              <span>14-Day Post-Launch Bug Coverage</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className="py-24 sm:py-36 bg-[var(--ivory)] text-[var(--ink)] scroll-mt-24 relative">
      <div id="how-it-works" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
            The Delivery Story
          </span>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] leading-[1.05] mb-5">
            Four disciplined steps.<br />
            Zero development confusion.
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
            We operate as an accountable digital agency team. You never interview contractors, decode pull requests, or chase missing updates.
          </p>
        </div>

        {/* Editorial Sequential Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-24">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`rounded-[22px] p-6 sm:p-7 flex flex-col justify-between transition-all duration-200 border cursor-pointer ${
                activeStep === idx
                  ? 'bg-[var(--surface)] border-[var(--brand)] shadow-[var(--shadow-card)] ring-1 ring-[var(--brand)]/15'
                  : 'bg-[var(--surface)]/70 border-[var(--border-light)] hover:border-[var(--brand)]/40 hover:bg-[var(--surface)]'
              }`}
            >
              <div>
                {/* Step Num & Timing */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading text-3xl font-extrabold text-[var(--brand)]">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">
                    {step.timing}
                  </span>
                </div>

                <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-1">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[var(--brand)] block mb-3">
                  {step.subtitle}
                </span>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  {step.desc}
                </p>
              </div>

              {/* Tactile Stage Visual */}
              <div className="pt-2">{step.visual}</div>
            </div>
          ))}
        </div>

        {/* Trust & Accountability Editorial Statement */}
        <div className="rounded-[28px] bg-[var(--ink)] text-[var(--ivory)] border border-[var(--border-dark)] p-8 sm:p-14 shadow-[var(--shadow-dark-card)]">
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-3 block">
              Direct Human Accountability
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ivory)] mb-4 leading-tight">
              Backed by our named leadership team.
            </h3>
            <p className="text-[var(--text-muted-dark)] text-base sm:text-lg leading-relaxed">
              BuilDo was created by Yash and Priya to eliminate the broken experience of hiring unpredictable freelance contractors. Every project has a dedicated engineering lead accountable for quality and schedule adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                Named Project Lead
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                A single point of direct contact throughout discovery, build, and delivery. No junior intern pass-offs.
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                Immutable Scope
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                Accepted proposals are bound. No unexpected invoice surprises or monthly retainer traps.
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                100% IP Transfer
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                You own all code, repositories, tokens, assets, and database schemas upon milestone payment completion.
              </p>
            </div>

            <div className="p-6 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                14-Day Bug Warranty
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                Every release includes 14 days of dedicated operational stabilization and priority bug remediation.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
