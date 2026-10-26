'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { PortfolioItem } from '@/lib/types';

interface SelectedWorkProps {
  items: PortfolioItem[];
}

export default function SelectedWork({ items }: SelectedWorkProps) {
  // Map images by slug
  const getImage = (slug: string, fallback?: string | null) => {
    if (fallback) return fallback;
    switch (slug) {
      case 'aura-workspace':
        return '/images/showcase-aura.jpg';
      case 'vespera-atelier':
        return '/images/showcase-vespera.jpg';
      case 'komorebi-sanctuary':
        return '/images/showcase-komorebi.jpg';
      case 'synapse-pipeline':
        return '/images/showcase-synapse.jpg';
      default:
        return '/images/hero-composition.jpg';
    }
  };

  const featured = items.find((i) => i.slug === 'aura-workspace') || items[0];
  const pairItems = items.filter((i) => i.slug === 'vespera-atelier' || i.slug === 'komorebi-sanctuary');
  const technicalItem = items.find((i) => i.slug === 'synapse-pipeline') || items[3];

  return (
    <section id="work" className="py-24 sm:py-36 bg-[var(--surface-dark)] text-[var(--ivory)] border-y border-[var(--border-dark)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-3 block">
              Portfolio & Architecture Exhibition
            </span>
            <h2 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ivory)] leading-[1.05]">
              Real interfaces.<br />
              Engineered with restraint.
            </h2>
          </div>
          <div className="max-w-md">
            <p className="text-[var(--text-muted-dark)] text-sm sm:text-base leading-relaxed mb-3">
              We showcase actual software architecture, responsive prototypes, and clearly labelled concepts. In accordance with client confidentiality, public entries never expose private client databases.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[var(--brand-soft)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand)]" />
              <span>Strict provenance: All fictional entries labelled Concept Preview</span>
            </div>
          </div>
        </div>

        {/* 1. Full-Width Featured Project: Aura Editorial Workspace */}
        {featured && (
          <div className="mb-14">
            <div className="group rounded-[26px] bg-[var(--ink)] border border-[var(--border-dark)] overflow-hidden hover:border-[var(--brand)] transition-all duration-300 shadow-[var(--shadow-dark-card)]">
              
              {/* Media Preview Container */}
              <div className="relative aspect-[21/9] sm:aspect-[2/1] w-full bg-[var(--ink)] overflow-hidden">
                <Image
                  src={getImage(featured.slug, featured.image_url)}
                  alt={featured.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
                />
                
                {/* Subtle vignette gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-transparent to-transparent opacity-80" />
                
                {/* Provenance Badge */}
                <div className="absolute top-5 left-5 sm:top-6 sm:left-6 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface-dark)]/90 backdrop-blur-md text-[var(--brand-soft)] border border-[var(--border-dark)]">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Concept preview</span>
                  </span>
                </div>
              </div>

              {/* Editorial Description & Action */}
              <div className="p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-[var(--border-dark)]">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-soft)]">
                      {featured.category}
                    </span>
                    <span className="text-xs text-[var(--text-muted-dark)]">•</span>
                    <span className="text-xs text-[var(--text-muted-dark)] font-mono">Next.js + Postgres</span>
                  </div>
                  <h3 className="text-2xl sm:text-4xl font-heading font-extrabold text-[var(--ivory)] mb-2 group-hover:text-[var(--brand-soft)] transition-colors">
                    {featured.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted-dark)] leading-relaxed">
                    {featured.summary}
                  </p>
                </div>

                <div className="flex-shrink-0">
                  <Link
                    href={`/work/${featured.slug}`}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[14px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-[var(--ivory)] font-bold text-sm hover:border-[var(--brand)] hover:bg-[var(--brand)] transition-all group-hover:translate-x-1 duration-200"
                  >
                    <span>Explore project</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Complementary Pair: Vespera Atelier & Komorebi Sanctuary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-14">
          {pairItems.map((item) => (
            <div
              key={item.slug}
              className="group rounded-[24px] bg-[var(--ink)] border border-[var(--border-dark)] overflow-hidden hover:border-[var(--brand)] transition-all duration-300 flex flex-col justify-between shadow-[var(--shadow-dark-card)]"
            >
              <div>
                {/* Media Container */}
                <div className="relative aspect-[16/10] w-full bg-[var(--surface-dark)] overflow-hidden">
                  <Image
                    src={getImage(item.slug, item.image_url)}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)]/90 via-transparent to-transparent" />
                  
                  {/* Provenance Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface-dark)]/90 backdrop-blur-md text-[var(--brand-soft)] border border-[var(--border-dark)]">
                      <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
                      <span>Concept preview</span>
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-8">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand-soft)] block mb-2">
                    {item.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[var(--ivory)] mb-3 group-hover:text-[var(--brand-soft)] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-muted-dark)] leading-relaxed">
                    {item.summary}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-2">
                <Link
                  href={`/work/${item.slug}`}
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs font-bold text-[var(--ivory)] hover:border-[var(--brand)] hover:text-[var(--brand-soft)] transition-colors"
                >
                  <span>Explore project</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Compact Technical Automation Highlight: Synapse Event Pipeline */}
        {technicalItem && (
          <div className="rounded-[24px] bg-[var(--ink)] border border-[var(--border-dark)] overflow-hidden hover:border-[var(--brand)] transition-all duration-300 shadow-[var(--shadow-dark-card)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              
              {/* Media */}
              <div className="lg:col-span-7 relative aspect-[16/9] w-full bg-[var(--surface-dark)] overflow-hidden">
                <Image
                  src={getImage(technicalItem.slug, technicalItem.image_url)}
                  alt={technicalItem.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--surface-dark)]/90 backdrop-blur-md text-[var(--brand-soft)] border border-[var(--border-dark)]">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>Concept preview</span>
                  </span>
                </div>
              </div>

              {/* Text */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[var(--brand-soft)]">
                    <Terminal className="w-3.5 h-3.5 text-[var(--brand)]" />
                    <span>EDGE FUNCTIONS & WEBHOOK PIPELINE</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ivory)] mb-3">
                    {technicalItem.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted-dark)] leading-relaxed mb-6">
                    {technicalItem.summary}
                  </p>
                  <div className="space-y-2 mb-8 text-xs font-mono text-[var(--text-muted-dark)]">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>Zero packet loss under 14.8k EPS load</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>HMAC signature verification on incoming hooks</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/work/${technicalItem.slug}`}
                  className="inline-flex items-center justify-between w-full p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs font-bold text-[var(--ivory)] hover:border-[var(--brand)] hover:text-[var(--brand-soft)] transition-colors"
                >
                  <span>Explore project</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        )}

        {/* Catalogue Footer */}
        <div className="mt-16 text-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 px-7 py-4 rounded-[14px] border border-[var(--border-dark)] bg-[var(--ink)] text-[var(--ivory)] text-sm font-bold hover:border-[var(--brand-soft)] hover:bg-[var(--surface-dark)] transition-all"
          >
            <span>View all specifications & case studies</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  );
}
