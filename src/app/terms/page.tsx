import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'Terms of Service & Agency Model — Awyk Digital',
  description: 'Operating terms, proposal validity, commercial terms, and IP transfer policies for Awyk Digital services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">

          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-2 block">
              Governance & Policies
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ink)] mb-4">
              Terms of Service
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Last updated: October 2026 • Version 1.0.0
            </p>
          </div>

          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-12 shadow-sm space-y-8 text-sm leading-relaxed text-[var(--text-muted)]">
            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                1. Nature of the Service
              </h2>
              <p>
                Awyk Digital is an accountable managed digital product service providing custom website development, mobile application builds, AI & automation workflows, and academic research prototypes. Our founders (Yash, Priya, Srihari, and Basha) remain directly responsible for scoped delivery.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                2. Proposals & Immutable Scopes
              </h2>
              <p>
                Initial enquiries and briefs submitted via Awyk Digital are non-binding. An engagement becomes an official order only when: (a) a written proposal detailing scope deliverables and milestone amounts is formally accepted by the customer, and (b) the required initial advance or milestone payment is confirmed.
              </p>
              <p className="mt-2">
                Accepted proposals constitute an immutable snapshot. Any scope additions after acceptance require an explicit Change Request with clear price and timeline adjustments approved by both parties before work proceeds.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                3. Commercial Terms & Agency Partnership Model
              </h2>
              <p>
                Pricing and payment schedules will be mutually agreed before starting. Third-party expenses, if any, will be discussed separately. Additional features or changes can be estimated separately, and post-delivery support can be tailored based on project requirements.
              </p>
              <div className="mt-3 p-4 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-xs space-y-2">
                <span className="font-bold text-[var(--ink)] block uppercase tracking-wider">
                  Agency Partnership Model (White-Label / Project-Based / Long-Term)
                </span>
                <p><strong>Agency Partner:</strong> Client acquisition and communication.</p>
                <p><strong>Development Team:</strong> Technical execution and delivery.</p>
              </div>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                4. Code Handover & Intellectual Property
              </h2>
              <p>
                Upon receipt of final milestone payments and handover sign-off, all custom software source code, database migrations, configuration scripts, and visual design assets are transferred completely to the customer. Awyk Digital retains no ownership over customer intellectual property.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                5. Post-Launch Warranty
              </h2>
              <p>
                Every completed project includes 14 calendar days of dedicated warranty support covering bug remediation and stability checks as defined in the accepted proposal scope.
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
