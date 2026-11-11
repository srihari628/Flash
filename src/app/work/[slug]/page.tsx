import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ArrowLeft, Layers, CheckCircle2, Database, Code2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { PortfolioItem } from '@/lib/types';
import { findPortfolioItem } from '@/lib/portfolioData';
import ProvenanceBadge from '@/components/work/ProvenanceBadge';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let dbItem: PortfolioItem | null = null;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('slug', slug)
      .single();
    dbItem = (data as PortfolioItem) || null;
  } catch {
    // Use local canonical data fallback
  }

  const pItem = findPortfolioItem(slug, dbItem);

  if (!pItem) {
    notFound();
  }

  const stackRows: Array<{ label: string; value: string }> =
    pItem.preview_ui_data?.stackRows || [
      { label: 'Frontend', value: 'Next.js App Router (React 19)' },
      { label: 'Styling', value: 'Tailwind CSS + Locked Design Tokens' },
      { label: 'Database', value: 'Supabase Postgres + Strict RLS' },
      { label: 'Performance', value: '60 FPS Native Transforms' },
    ];

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] text-[var(--ivory)] flex flex-col">
      <Navbar theme="dark" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          {/* Breadcrumb Back */}
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted-dark)] hover:text-[var(--ivory)] mb-8 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to selected work</span>
          </Link>

          {/* Header */}
          <div className="mb-10 pb-8 border-b border-[var(--border-dark)]">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-soft)]">
                {pItem.category}
              </span>

              <ProvenanceBadge provenance={pItem.provenance} surface="ink" />

              {pItem.preview_ui_data?.status && (
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[var(--ink)] text-[var(--text-muted-dark)] border border-[var(--border-dark)]">
                  {pItem.preview_ui_data.status}
                </span>
              )}
            </div>

            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ivory)] mb-4">
              {pItem.title}
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-muted-dark)] max-w-3xl leading-relaxed mb-6">
              {pItem.summary}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-muted-dark)]">
              <span>Provenance: <strong>{pItem.provenance === 'ongoing' ? 'Ongoing build' : pItem.provenance}</strong></span>
              <span>•</span>
              <span>Confidentiality: <strong>Zero client credentials or private DBs exposed</strong></span>
            </div>
          </div>

          {pItem.image_url && (
            <div className="relative aspect-[21/9] w-full rounded-[22px] overflow-hidden mb-10 bg-[var(--ink)] border border-[var(--border-dark)] shadow-[var(--shadow-dark-card)]">
              <Image
                src={pItem.image_url}
                alt={pItem.title}
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
            </div>
          )}

          {/* Specification Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left 7 cols: Role, Evidence & Features */}
            <div className="md:col-span-7 space-y-8">
              <div className="rounded-[20px] bg-[var(--ink)] border border-[var(--border-dark)] p-8">
                <h2 className="text-lg font-heading font-bold text-[var(--ivory)] mb-3 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-[var(--brand)]" />
                  Engineering Role & Responsibilities
                </h2>
                <p className="text-sm text-[var(--text-muted-dark)] leading-relaxed">
                  {pItem.role}
                </p>
              </div>

              <div className="rounded-[20px] bg-[var(--ink)] border border-[var(--border-dark)] p-8">
                <h3 className="text-lg font-heading font-bold text-[var(--ivory)] mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4 text-[var(--brand)]" />
                  Permitted Delivery Evidence
                </h3>
                <p className="text-sm text-[var(--text-muted-dark)] leading-relaxed">
                  {pItem.delivery_evidence}
                </p>
              </div>

              <div className="rounded-[20px] bg-[var(--ink)] border border-[var(--border-dark)] p-8">
                <h3 className="text-lg font-heading font-bold text-[var(--ivory)] mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--brand)]" />
                  Architectural Capabilities
                </h3>
                <ul className="space-y-3">
                  {((pItem.features as string[]) || []).map((feat, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[var(--ivory)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right 5 cols: Technical Environment & Direct Action */}
            <div className="md:col-span-5 space-y-6">
              <div className="rounded-[20px] bg-[var(--ink)] border border-[var(--border-dark)] p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-soft)] block mb-3 font-mono">
                  Stack Architecture
                </span>
                <div className="space-y-2.5 text-xs">
                  {stackRows.map((row) => (
                    <div
                      key={row.label}
                      className="p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between gap-3"
                    >
                      <span className="text-[var(--text-muted-dark)] font-mono shrink-0">{row.label}:</span>
                      <span className="font-semibold text-[var(--ivory)] text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Box */}
              <div className="rounded-[20px] bg-[var(--brand-soft)] text-[var(--ink)] p-8 text-center">
                <h4 className="font-heading font-extrabold text-lg mb-2">
                  Build a similar product
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-6">
                  Submit your brief referencing this specification. You’ll receive an accountable written scope within 6 hours.
                </p>
                <Link
                  href="/brief"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] text-sm font-bold hover:bg-[var(--brand-hover)] transition-colors shadow-sm"
                >
                  <span>Submit project brief</span>
                  <ArrowRight className="w-4 h-4" />
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
