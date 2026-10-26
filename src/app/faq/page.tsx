'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ChevronDown, MessageSquare, Mail, Sparkles } from 'lucide-react';

const faqs = [
  {
    q: 'How does pricing work?',
    a: 'We provide fixed-price proposals based on agreed deliverables. No open-ended hourly billing or surprise charges. Submitting an idea for scoping is always free.',
  },
  {
    q: 'Who owns the code and intellectual property?',
    a: 'You do. You own 100% of the repository, design assets, and database schemas upon milestone completion. Everything is transferred directly to your own GitHub and cloud provider accounts.',
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

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-light)] shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>Simple & Transparent</span>
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4">
              Frequently asked questions.
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
              Everything you need to know about our pricing, deliverables, and ownership.
            </p>
          </div>

          {/* Minimal Accordion List */}
          <div className="space-y-3.5 mb-16">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-[18px] bg-[var(--surface)] border border-[var(--border-light)] overflow-hidden transition-all duration-200 shadow-sm"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
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
                    <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--text-muted)] leading-relaxed border-t border-[var(--border-light)]/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Minimal Contact Callout */}
          <div className="rounded-[22px] bg-[var(--brand-soft)] border border-[var(--border-light)] p-8 text-center text-[var(--ink)]">
            <h3 className="text-xl font-heading font-bold mb-2">Have a question about your project?</h3>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-md mx-auto mb-6">
              Our engineering leads review every enquiry and reply within 6 hours.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--surface)] text-[var(--ink)] border border-[var(--border-light)] text-xs font-bold hover:border-[var(--brand)] transition-colors shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[var(--brand)]" />
                <span>Contact our team</span>
              </Link>
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)] transition-all shadow-sm"
              >
                <span>Tell us your idea</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
