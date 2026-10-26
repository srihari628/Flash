import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Terms of Service (Staging Governance) — BuilDo',
  description: 'Operating terms, proposal validity, milestone payment definitions, and IP transfer policies for BuilDo services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          {/* Staging Governance Banner */}
          <div className="mb-10 p-4 rounded-[14px] bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold uppercase tracking-wider block">Staging Operational Notice</span>
              <span>This policy document reflects our active service commitments. Formal commercial terms are established per engagement through your accepted written proposal.</span>
            </div>
          </div>

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
                BuilDo is an accountable managed digital product service providing custom software engineering, website development, mobile application builds, and automation setups. Our founders (Yash and Priya) and lead engineers remain directly responsible for scoped delivery.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                2. Proposals & Immutable Scopes
              </h2>
              <p>
                Initial enquiries and briefs submitted via BuilDo are non-binding. An engagement becomes an official order only when: (a) a written proposal detailing scope deliverables and milestone amounts is formally accepted by the customer, and (b) the required initial advance or milestone payment is confirmed.
              </p>
              <p className="mt-2">
                Accepted proposals constitute an immutable snapshot. Any scope additions after acceptance require an explicit Change Request with clear price and timeline adjustments approved by both parties before work proceeds.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                3. Milestone Schedule & Payment Handling
              </h2>
              <p>
                Payments are handled through verified payment provider integrations. Build fees cover our custom design, architecture, and coding work. Customers are directly responsible for third-party subscriptions (such as custom domains, hosting provider accounts, or external API usage fees).
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                4. Code Handover & Intellectual Property
              </h2>
              <p>
                Upon receipt of final milestone payments and handover sign-off, all custom software source code, database migrations, configuration scripts, and visual design assets are transferred completely to the customer. BuilDo retains no ownership over customer intellectual property.
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
