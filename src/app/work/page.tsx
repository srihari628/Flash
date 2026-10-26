import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, Sparkles, ShieldCheck, Layers, Terminal } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { PortfolioItem } from '@/lib/types';

export const metadata = {
  title: 'Selected Work & Concepts — BuilDo',
  description: 'Explore verified architecture specifications, interactive prototypes, and engineering concepts crafted with restraint and high performance.',
};

export const dynamic = 'force-dynamic';

export default async function WorkPage() {
  const supabase = await createClient();
  const { data: portfolio } = await supabase
    .from('portfolio_items')
    .select('*')
    .eq('is_published', true)
    .order('sort_order', { ascending: true });

  const items: PortfolioItem[] = (portfolio as PortfolioItem[]) || [];

  return (
    <div className="min-h-screen bg-[var(--surface-dark)] text-[var(--ivory)] flex flex-col">
      <Navbar theme="dark" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-3 block">
              Architectural Catalogue & Case Studies
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ivory)] mb-4">
              Restrained craft.<br />Disciplined execution.
            </h1>
            <p className="text-[var(--text-muted-dark)] text-base sm:text-lg leading-relaxed">
              We present our software architecture with complete transparency. Under client confidentiality terms, public case studies showcase engineering specifications, interactive prototypes, and clearly labelled concepts without exposing sensitive production client URLs.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
            {items.map((item, index) => (
              <div
                key={item.slug}
                className="rounded-[22px] bg-[var(--ink)] border border-[var(--border-dark)] p-8 flex flex-col justify-between hover:border-[var(--brand)] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-soft)]">
                      {item.category}
                    </span>

                    {/* Strict Provenance Badge */}
                    {item.provenance === 'concept' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-dark)] text-[var(--brand-soft)] border border-[var(--border-dark)]">
                        <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
                        <span>Concept preview</span>
                      </span>
                    ) : item.provenance === 'team_project' ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-dark)] text-[var(--ivory)] border border-[var(--border-dark)]">
                        <span>Studio build</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[var(--surface-dark)] text-[var(--ivory)] border border-[var(--border-dark)]">
                        <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
                        <span>Client engagement</span>
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ivory)] mb-3">
                    {item.title}
                  </h2>
                  <p className="text-sm sm:text-base text-[var(--text-muted-dark)] leading-relaxed mb-6">
                    {item.summary}
                  </p>

                  {/* Architecture Box */}
                  <div className="rounded-[16px] bg-[var(--surface-dark)] border border-[var(--border-dark)] p-5 mb-6 text-xs space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-muted-dark)] font-mono">Role:</span>
                      <span className="text-[var(--ivory)] font-medium">{item.role}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--text-muted-dark)] font-mono">Permitted Evidence:</span>
                      <span className="text-[var(--ivory)] font-medium">{item.delivery_evidence}</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[var(--border-dark)]">
                      {((item.features as string[]) || []).map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="text-[11px] px-2 py-0.5 rounded bg-[var(--ink)] text-[var(--text-muted-dark)] border border-[var(--border-dark)]"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[var(--border-dark)] flex items-center justify-between">
                  <span className="text-xs text-[var(--text-muted-dark)] font-mono">
                    Specification {index + 1} of {items.length}
                  </span>
                  <Link
                    href={`/work/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-soft)] hover:text-[var(--ivory)] transition-colors"
                  >
                    <span>Read specification</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Invitation banner */}
          <div className="rounded-[22px] bg-[var(--ink)] p-8 sm:p-12 border border-[var(--border-dark)] text-center">
            <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ivory)] mb-3">
              Have a similar product in mind?
            </h3>
            <p className="text-sm text-[var(--text-muted-dark)] max-w-xl mx-auto mb-6">
              Reference any of these architectural patterns when submitting your brief. We will tailor the exact data structures and user interfaces for your business.
            </p>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors"
            >
              <span>Submit your project brief</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
