'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare, Video, ChevronDown, Check, Shield, Clock } from 'lucide-react';

export default function WorkYourWayAndFaq() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does pricing work?',
      a: 'We provide fixed-price proposals based on agreed deliverables. No open-ended hourly billing or surprise charges. Submitting an idea for review is always free.',
    },
    {
      q: 'Who owns the code and intellectual property?',
      a: 'You own 100% of the repository, design assets, and database schemas upon milestone completion. Transferred directly to your GitHub and cloud accounts.',
    },
    {
      q: 'Can we build the product without video calls?',
      a: 'Yes. Our async writing mode allows you to submit your brief, review proposals, and approve staging milestones entirely in writing without scheduling meetings.',
    },
    {
      q: 'How fast do you respond to new ideas?',
      a: 'Every brief receives a tailored written scope review from our lead engineering team within our guaranteed 6-hour response window.',
    },
  ];

  return (
    <section id="faq" className="py-24 sm:py-36 bg-[var(--surface)] text-[var(--ink)] border-t border-[var(--border-light)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Working-Style Choice */}
        <div className="mb-28">
          <div className="max-w-3xl mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
              Communication Preference
            </span>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] leading-[1.05] mb-5">
              Work your way.<br />
              Conversational or strictly async.
            </h2>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              We respect how you work best. Both routes lead into our structured brief intake, with your communication preference preserved from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Option 1: Let's discuss it */}
            <div className="group rounded-[24px] bg-[var(--ivory)] border border-[var(--border-light)] p-8 sm:p-10 flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center text-[var(--brand)] mb-6 shadow-sm">
                  <Video className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)] mb-3">
                  “Let’s discuss it”
                </h3>
                <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                  Schedule a focused 20-minute video or phone discovery session with our engineering lead. We confirm mutual alignment, discuss architectural options, and follow up with a written plan.
                </p>
                <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-[var(--text-muted)]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>Timezone-aligned appointment booking</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>Live technical & design scoping</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>Formal written proposal delivered within 6 hours</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/brief?mode=discuss"
                className="inline-flex items-center justify-between w-full p-4 rounded-[14px] bg-[var(--surface)] border border-[var(--border-light)] text-[var(--ink)] font-bold text-sm hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-[var(--ivory)] transition-all"
              >
                <span>Choose discussion mode</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Option 2: Keep it in writing */}
            <div className="group rounded-[24px] bg-[var(--ivory)] border border-[var(--border-light)] p-8 sm:p-10 flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all duration-300">
              <div>
                <div className="w-12 h-12 rounded-[14px] bg-[var(--surface)] border border-[var(--border-light)] flex items-center justify-center text-[var(--brand)] mb-6 shadow-sm">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)] mb-3">
                  “Keep it in writing”
                </h3>
                <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-6">
                  Zero calls required. Submit your idea, specifications, or documents through our intake brief. We prepare your proposal, milestone checklist, and deliver updates completely asynchronously.
                </p>
                <ul className="space-y-2.5 mb-8 text-xs sm:text-sm text-[var(--text-muted)]">
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>100% async workflow without scheduling friction</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>Detailed written scope & immutable proposal</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />
                    <span>Private workspace comments and preview reviews</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/brief?mode=writing"
                className="inline-flex items-center justify-between w-full p-4 rounded-[14px] bg-[var(--surface)] border border-[var(--border-light)] text-[var(--ink)] font-bold text-sm hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-[var(--ivory)] transition-all"
              >
                <span>Choose async writing mode</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>

        {/* Pricing Transparency Statement */}
        <div className="rounded-[24px] bg-[var(--brand-soft)] border border-[var(--border-light)] p-8 sm:p-12 mb-24 text-[var(--ink)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1">
                Fixed-Price Sprints
              </span>
              <h4 className="text-xl font-heading font-extrabold mb-2">Build Fees</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Fixed-price scoped contracts based on approved deliverables. Milestone split arrangements protect your capital and eliminate open-ended hourly billing.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1">
                Zero Infrastructure Markups
              </span>
              <h4 className="text-xl font-heading font-extrabold mb-2">Direct Cloud Ownership</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                You subscribe directly to services like Supabase, Vercel, or Stripe. We never charge monthly hosting markups or hold credentials hostage.
              </p>
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--brand)] block mb-1">
                Zero Commitment Review
              </span>
              <h4 className="text-xl font-heading font-extrabold mb-2">Free Brief Scoping</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                Submitting an enquiry is always free and without obligation. You only pay once a written proposal is explicitly approved by you.
              </p>
            </div>
          </div>
        </div>

        {/* Compact FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-2 block">
              Frequently Asked Questions
            </span>
            <h3 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ink)] tracking-tight">
              Clear answers before you begin.
            </h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-[18px] bg-[var(--ivory)] border border-[var(--border-light)] overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-heading font-bold text-base sm:text-lg text-[var(--ink)]">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[var(--brand)] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-light)]/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
