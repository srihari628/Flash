import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function BrandStatement() {
  return (
    <section id="studio" className="py-20 sm:py-28 bg-[var(--brand-soft)] text-[var(--ink)] border-b border-[var(--border-light)] overflow-hidden relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] text-[var(--brand)] text-xs font-bold uppercase tracking-wider mb-4 border border-[var(--border-light)] shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The BuilDo Standard</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[var(--ink)] leading-[1.08] mb-6 tracking-tight">
              An idea note. A tailored architecture. A product ready to launch.
            </h2>
            
            <p className="text-base sm:text-xl text-[var(--text-muted)] leading-relaxed max-w-2xl font-normal">
              We never bill open-ended hourly developer time or pass your project between junior contractors. You get a named accountable lead, an immutable written scope, and full IP handover.
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/brief"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[14px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-base shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
            >
              <span>Start with your idea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[14px] bg-[var(--surface)] text-[var(--ink)] border border-[var(--border-light)] text-sm font-semibold hover:border-[var(--brand)] transition-colors"
            >
              <span>See our delivery method</span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
