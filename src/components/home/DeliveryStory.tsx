'use client';

import React, { useState } from 'react';
import {
  FileText,
  Check,
  GitBranch,
  Key,
  LifeBuoy,
  ArrowUpRight,
} from 'lucide-react';

export default function DeliveryStory() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      num: '01',
      title: 'Share the idea',
      subtitle: 'Intake without technical jargon',
      desc: 'Type your concept, share reference links, or attach specs. Pick a quick 20-min call or 100% async written scoping.',
      timing: '6h SLA',
      visual: (
        <div className="h-[158px] rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] p-3.5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between gap-2 text-[11px] font-mono border-b border-[var(--border-light)] pb-2">
            <span className="flex items-center gap-1.5 text-[var(--ink)] font-semibold min-w-0 truncate">
              <FileText className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate">brief_draft.md</span>
            </span>
            <span className="text-[var(--brand)] font-semibold shrink-0">Auto-saved</span>
          </div>

          <div className="px-2.5 py-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border-light)] text-[11px] text-[var(--ink)] leading-snug italic line-clamp-2">
            “Editorial booking & member portal with instant calendar slots and receipts.”
          </div>

          <div className="flex items-center justify-between gap-2 text-[10px]">
            <span className="px-2 py-0.5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold whitespace-nowrap">
              Mode: Async Writing
            </span>
            <span className="font-mono text-[var(--text-muted)] shrink-0">Ready</span>
          </div>
        </div>
      ),
    },
    {
      num: '02',
      title: 'Approve the plan',
      subtitle: 'Fixed scope & milestone price',
      desc: 'Receive a written proposal within 6 hours detailing exact deliverables, milestone splits, and one bound price.',
      timing: 'Fixed Scope',
      visual: (
        <div className="h-[158px] rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] p-3.5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between gap-2 text-[11px] border-b border-[var(--border-light)] pb-2">
            <span className="font-bold text-[var(--ink)] truncate">Proposal v1.0</span>
            <span className="font-extrabold text-[var(--brand)] font-heading text-xs tabular-nums shrink-0">
              ₹30,000
            </span>
          </div>

          <div className="space-y-1.5 text-[11px] text-[var(--ink)]">
            <div className="flex items-center gap-1.5 min-w-0">
              <Check className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate">Architecture, Auth & DB Schema</span>
            </div>
            <div className="flex items-center gap-1.5 min-w-0">
              <Check className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate">Responsive UI & Razorpay / UPI</span>
            </div>
          </div>

          <div className="w-full py-1.5 text-center rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-[10px] whitespace-nowrap">
            Proposal Accepted • Sprints Active
          </div>
        </div>
      ),
    },
    {
      num: '03',
      title: 'Follow the build',
      subtitle: 'Private staging & feedback',
      desc: 'Track real sprint progress inside your workspace. Test staging builds live on devices and approve milestones async.',
      timing: 'Live Staging',
      visual: (
        <div className="h-[158px] rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] p-3.5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between gap-2 text-[11px] border-b border-[var(--border-light)] pb-2">
            <span className="font-bold text-[var(--ink)] truncate">Milestone 2 Review</span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0 whitespace-nowrap">
              Ready
            </span>
          </div>

          <div className="px-2.5 py-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-between gap-2 text-[11px] min-w-0">
            <span className="text-[var(--text-muted)] shrink-0">Staging:</span>
            <span className="font-mono text-[var(--brand)] font-semibold inline-flex items-center gap-1 min-w-0 truncate">
              <span className="truncate">awyk.vercel.app</span>
              <ArrowUpRight className="w-3 h-3 shrink-0" />
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              className="py-1.5 px-2 rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-[10px] whitespace-nowrap text-center"
            >
              Approve
            </button>
            <button
              type="button"
              className="py-1.5 px-2 rounded-[8px] bg-[var(--surface)] border border-[var(--border-light)] text-[var(--ink)] font-medium text-[10px] whitespace-nowrap text-center"
            >
              Request Edit
            </button>
          </div>
        </div>
      ),
    },
    {
      num: '04',
      title: 'Launch with support',
      subtitle: 'IP handover & 14-day warranty',
      desc: 'Receive full GitHub repository ownership, production DNS & environment setup, plus 14 days of launch warranty.',
      timing: '100% IP',
      visual: (
        <div className="h-[158px] rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] p-3.5 flex flex-col justify-between overflow-hidden">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold border-b border-[var(--border-light)] pb-2">
            <span className="text-[var(--ink)] truncate">Handover Package</span>
            <span className="text-emerald-700 font-bold shrink-0 whitespace-nowrap">Complete</span>
          </div>

          <div className="space-y-2 text-[11px] text-[var(--text-muted)]">
            <div className="flex items-center gap-2 min-w-0">
              <GitBranch className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate text-[var(--ink)]">Full GitHub Repo Ownership</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <Key className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate text-[var(--ink)]">Production SSL & DNS Cutover</span>
            </div>
            <div className="flex items-center gap-2 min-w-0">
              <LifeBuoy className="w-3.5 h-3.5 text-[var(--brand)] shrink-0" />
              <span className="truncate text-[var(--ink)]">14-Day Bug Coverage Included</span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="process" className="py-20 sm:py-28 bg-[var(--ivory)] text-[var(--ink)] scroll-mt-24 relative">
      <div id="how-it-works" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
            The Delivery Story
          </span>
          <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] leading-[1.05] mb-4">
            Four disciplined steps.<br />
            Zero development confusion.
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
            We operate as an accountable digital agency team. You never interview contractors, decode pull requests, or chase missing updates.
          </p>
        </div>

        {/* Compact Equal-Height Sequential Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-16 items-stretch">
          {steps.map((step, idx) => (
            <div
              key={step.num}
              onClick={() => setActiveStep(idx)}
              className={`rounded-[20px] p-5 flex flex-col justify-between transition-all duration-200 border cursor-pointer h-full ${
                activeStep === idx
                  ? 'bg-[var(--surface)] border-[var(--brand)] shadow-[var(--shadow-card)] ring-1 ring-[var(--brand)]/15'
                  : 'bg-[var(--surface)]/80 border-[var(--border-light)] hover:border-[var(--brand)]/40 hover:bg-[var(--surface)]'
              }`}
            >
              <div>
                {/* Step Num & Uniform Pill */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-heading text-2xl font-extrabold text-[var(--brand)] tabular-nums leading-none">
                    {step.num}
                  </span>
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)] whitespace-nowrap shrink-0">
                    {step.timing}
                  </span>
                </div>

                {/* Equalized Title & Copy Alignment */}
                <h3 className="text-lg font-heading font-bold text-[var(--ink)] leading-snug mb-0.5">
                  {step.title}
                </h3>
                <span className="text-xs font-semibold text-[var(--brand)] block leading-snug mb-2.5">
                  {step.subtitle}
                </span>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4 min-h-[54px]">
                  {step.desc}
                </p>
              </div>

              {/* Uniform Equal-Size Inner Stage Visual */}
              <div className="mt-auto">{step.visual}</div>
            </div>
          ))}
        </div>

        {/* Trust & Accountability Editorial Statement */}
        <div className="rounded-[28px] bg-[var(--ink)] text-[var(--ivory)] border border-[var(--border-dark)] p-8 sm:p-12 shadow-[var(--shadow-dark-card)]">
          <div className="max-w-3xl mb-10">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-3 block">
              Direct Human Accountability
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ivory)] mb-4 leading-tight">
              Backed by our named leadership team.
            </h3>
            <p className="text-[var(--text-muted-dark)] text-base sm:text-lg leading-relaxed">
              Awyk Digital was founded by Yash, Priya, Srihari, and Basha to eliminate the broken experience of hiring unpredictable freelance contractors. Every project has a dedicated engineering lead accountable for quality and schedule adherence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                Named Project Lead
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                A single point of direct contact throughout discovery, build, and delivery. No junior intern pass-offs.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                Immutable Scope
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                Accepted proposals are bound. No unexpected invoice surprises or monthly retainer traps.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
              <span className="font-heading font-bold text-base text-[var(--ivory)] block mb-1.5">
                100% IP Transfer
              </span>
              <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed">
                You own all code, repositories, tokens, assets, and database schemas upon milestone payment completion.
              </p>
            </div>

            <div className="p-5 rounded-[18px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
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
