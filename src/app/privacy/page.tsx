import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ShieldCheck, Lock } from 'lucide-react';

export const metadata = {
  title: 'Privacy Policy — BuilDo',
  description: 'How BuilDo handles brief submissions, client ideas, quarantined file attachments, and personal contact information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-2 block">
              Data Protection & Privacy
            </span>
            <h1 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ink)] mb-4">
              Privacy Policy
            </h1>
            <p className="text-xs text-[var(--text-muted)] font-mono">
              Last updated: October 2026 • Strict confidentiality standards
            </p>
          </div>

          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-12 shadow-sm space-y-8 text-sm leading-relaxed text-[var(--text-muted)]">
            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                1. Protection of Client Ideas & Concepts
              </h2>
              <p>
                We treat all business concepts, ideas, sketches, links, and documents submitted through our brief intake flow as strictly confidential proprietary information. We never sell, license, publish, or use client ideas for internal side-projects.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                2. Information We Collect
              </h2>
              <p>
                When you submit an intake brief, we collect your name, email address, optional phone number, and project requirements. For registered customers, authentication sessions are securely handled via Supabase Auth using encrypted JSON Web Tokens.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                3. File Storage & Quarantining
              </h2>
              <p>
                Files uploaded during brief intake are stored in private Supabase Storage buckets with strict Row Level Security. Attachments remain quarantined until security scans complete, and are accessible solely by authorized project leads assigned to your engagement.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                4. Analytics & Advertising Pixels
              </h2>
              <p>
                We respect your privacy preferences. We never feed private idea descriptions, uploaded specifications, client telephone numbers, or email addresses into advertising tracking pixels or third-party data brokers.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                5. Contact & Data Deletion
              </h2>
              <p>
                You may request complete deletion of your unaccepted briefs or workspace account at any time by emailing <a href="mailto:hello@buildo.design" className="text-[var(--brand)] underline">hello@buildo.design</a>.
              </p>
            </section>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
