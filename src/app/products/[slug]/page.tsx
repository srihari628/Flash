import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ArrowLeft, Clock, CheckCircle2, ShieldCheck, Layers, GitBranch, Key, LifeBuoy } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Service } from '@/lib/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .single();

  if (!service) {
    notFound();
  }

  const srv: Service = service as Service;

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          {/* Breadcrumb Back */}
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all services</span>
          </Link>

          {/* Service Header */}
          <div className="mb-12 pb-8 border-b border-[var(--border-light)]">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)]">
                {srv.category}
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                Target sprint: ~{srv.typical_days} days
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4">
              {srv.name}
            </h1>
            <p className="text-xl text-[var(--text-muted)] max-w-2xl leading-relaxed mb-6">
              {srv.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/brief?service=${srv.slug}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
              >
                <span>Tell us your idea for this</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="text-xs text-[var(--text-muted)]">
                Starting from <strong className="text-base text-[var(--ink)] tabular-nums font-heading">${(srv.starting_price_minor / 100).toLocaleString()} USD</strong> (Fixed upon proposal approval)
              </div>
            </div>
          </div>

          {/* Deep Dive Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left 7 cols: Features & Deliverables */}
            <div className="md:col-span-7 space-y-8">
              <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm">
                <h2 className="text-xl font-heading font-bold text-[var(--ink)] mb-3 flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[var(--brand)]" />
                  Primary Business Outcome
                </h2>
                <p className="text-base text-[var(--text-muted)] leading-relaxed">
                  {srv.description}
                </p>
              </div>

              <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm">
                <h3 className="text-lg font-heading font-bold text-[var(--ink)] mb-4">
                  Engineering Scope & Inclusions
                </h3>
                <ul className="space-y-3">
                  {((srv.features as string[]) || []).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--ink)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm">
                <h3 className="text-lg font-heading font-bold text-[var(--ink)] mb-4">
                  Handover Package
                </h3>
                <ul className="space-y-3">
                  {((srv.deliverables as string[]) || []).map((del, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--text-muted)]">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 cols: Accountability & How It Works */}
            <div className="md:col-span-5 space-y-6">
              <div className="rounded-[20px] bg-[var(--ink)] text-[var(--ivory)] border border-[var(--border-dark)] p-8">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-soft)] block mb-2">
                  Accountability Guarantee
                </span>
                <h3 className="text-xl font-heading font-bold mb-3">
                  Named Leadership Review
                </h3>
                <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed mb-6">
                  Every proposal for this service is personally reviewed by founders Yash or Priya. You receive an exact written scope within our 6-hour response SLA.
                </p>

                <div className="space-y-3 text-xs border-t border-[var(--border-dark)] pt-4">
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Complete GitHub Code Handover</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Key className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Zero Vendor Lock-In or Markups</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <LifeBuoy className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>14 Days Post-Launch Warranty Included</span>
                  </div>
                </div>
              </div>

              {/* Start CTA Box */}
              <div className="rounded-[20px] bg-[var(--brand-soft)] border border-[var(--border-light)] p-6 text-center">
                <h4 className="font-heading font-bold text-base text-[var(--ink)] mb-2">
                  Ready to scope your {srv.name}?
                </h4>
                <p className="text-xs text-[var(--text-muted)] mb-4">
                  Submitting your initial brief takes under 2 minutes and is completely free.
                </p>
                <Link
                  href={`/brief?service=${srv.slug}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)] transition-colors"
                >
                  <span>Submit brief now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
