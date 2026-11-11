import React from 'react';
import { Sparkles, ShieldCheck, Layers } from 'lucide-react';
import { ProvenanceType } from '@/lib/types';

interface ProvenanceBadgeProps {
  provenance: ProvenanceType;
  surface?: 'ink' | 'surface-dark';
}

/** Displays truthful project provenance using the studio's locked palette. */
export default function ProvenanceBadge({
  provenance,
  surface = 'surface-dark',
}: ProvenanceBadgeProps) {
  const bgClass = surface === 'ink' ? 'bg-[var(--ink)]' : 'bg-[var(--surface-dark)]/90 backdrop-blur-md';

  if (provenance === 'ongoing') {
    return (
      <span
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${bgClass} text-[var(--ivory)] border border-[var(--brand)]/50`}
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
        </span>
        <span>Ongoing work</span>
      </span>
    );
  }

  if (provenance === 'team_project') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${bgClass} text-[var(--ivory)] border border-[var(--border-dark)]`}
      >
        <Layers className="w-3.5 h-3.5 text-[var(--brand)]" />
        <span>Studio build</span>
      </span>
    );
  }

  if (provenance === 'client_work') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${bgClass} text-[var(--ivory)] border border-[var(--border-dark)]`}
      >
        <ShieldCheck className="w-3.5 h-3.5 text-[var(--brand)]" />
        <span>Client engagement</span>
      </span>
    );
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${bgClass} text-[var(--brand-soft)] border border-[var(--border-dark)]`}
    >
      <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
      <span>Concept preview</span>
    </span>
  );
}
