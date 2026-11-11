'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, CheckCircle2, Shield, Layers, ChevronRight, Sparkles, Terminal, Smartphone, ShoppingBag, Globe, Cpu, Wrench } from 'lucide-react';
import { Service } from '@/lib/types';

interface ProductSelectorProps {
  services: Service[];
}

export default function ProductSelector({ services }: ProductSelectorProps) {
  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const [selectedSlug, setSelectedSlug] = useState<string>(services[0]?.slug || 'static-website');

  const activeService =
    filteredServices.find((s) => s.slug === selectedSlug) ||
    filteredServices[0] ||
    services[0];

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    const nextList =
      category === 'All' ? services : services.filter((s) => s.category === category);
    if (nextList.length > 0 && !nextList.some((s) => s.slug === selectedSlug)) {
      setSelectedSlug(nextList[0].slug);
    }
  };

  // Custom visual stage render per service category
  const renderVisualStage = (service: Service) => {
    switch (service.slug) {
      case 'static-website':
      case 'portfolio':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-4">
              <span className="font-mono text-[11px]">STATIC EDITORIAL PREVIEW</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-dark)] border border-[var(--border-dark)]">60 FPS Transitions</span>
            </div>
            <div className="space-y-4">
              <div className="text-2xl font-heading font-extrabold text-[var(--ivory)] leading-tight">
                “Form, whitespace, and tactile typography designed to elevate creative authority.”
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
                  <span className="text-[10px] text-[var(--text-muted-dark)] block uppercase tracking-wider mb-1">Layout</span>
                  <span className="text-xs font-semibold text-[var(--ivory)]">Art-Directed Pages</span>
                </div>
                <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)]">
                  <span className="text-[10px] text-[var(--text-muted-dark)] block uppercase tracking-wider mb-1">Performance</span>
                  <span className="text-xs font-semibold text-[var(--brand-soft)]">Lighthouse 99/100</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'cms-website':
      case 'business-website':
      case 'custom-business-website':
        return (
          <div className="rounded-[16px] bg-[var(--ivory)] text-[var(--ink)] p-6 border border-[var(--border-light)] relative shadow-sm">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border-light)] pb-3 mb-4">
              <span className="font-mono text-[11px] text-[var(--brand)] font-semibold">CORPORATE EDITORIAL CMS</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border-light)]">Lead Conversion</span>
            </div>
            <div className="space-y-3">
              <h4 className="text-xl font-heading font-bold text-[var(--ink)]">
                Structured narrative architecture with headless content control.
              </h4>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Eliminates slow, bloated themes. Delivers fast server-rendered pages, clear lead capture verification, and tailored MDX/CMS editors.
              </p>
              <div className="flex items-center gap-2 pt-2">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] font-semibold">
                  Zero Template Clutter
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-light)] text-[var(--text-muted)]">
                  Instant Form Routing
                </span>
              </div>
            </div>
          </div>
        );

      case 'premium-3d-website':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-4 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[var(--brand)] animate-pulse" />
                <span>THREE.JS & WEBGL INTERACTION</span>
              </span>
              <span>60 FPS GPU Render</span>
            </div>
            <div className="space-y-3">
              <div className="text-xl font-heading font-bold text-[var(--ivory)]">
                Immersive 3D environments, fluid scroll choreography, and tactile spatial interfaces.
              </div>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs">
                  <span className="text-[10px] text-[var(--text-muted-dark)] block">Framework</span>
                  <span className="font-bold text-[var(--ivory)]">Three.js / React Three Fiber</span>
                </div>
                <div className="p-3 rounded-[10px] bg-[var(--surface-dark)] border border-[var(--border-dark)] text-xs">
                  <span className="text-[10px] text-[var(--text-muted-dark)] block">Optimization</span>
                  <span className="font-bold text-emerald-400">Zero Framerate Jitter</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'ecommerce-website':
      case 'ecommerce':
        return (
          <div className="rounded-[16px] bg-[var(--surface)] text-[var(--ink)] p-6 border border-[var(--border-light)] relative shadow-sm">
            <div className="flex items-center justify-between text-xs text-[var(--text-muted)] border-b border-[var(--border-light)] pb-3 mb-4">
              <span className="font-mono text-[11px] text-[var(--brand)] font-semibold">BOUTIQUE DTC STOREFRONT</span>
              <span className="px-2 py-0.5 rounded bg-[var(--ivory)] border border-[var(--border-light)]">Instant Checkout</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="p-3 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)]">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase">Catalogue Experience</span>
                <span className="text-xs font-bold text-[var(--ink)]">Editorial Product Grid</span>
              </div>
              <div className="p-3 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)]">
                <span className="text-[10px] text-[var(--text-muted)] block uppercase">Cart Architecture</span>
                <span className="text-xs font-bold text-[var(--brand)]">Server-Side State</span>
              </div>
            </div>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Tailored for modern brands, creators, and commerce. Integrated with Razorpay, Cashfree, UPI, and fast local checkout.
            </p>
          </div>
        );

      case 'standard-mvp':
      case 'mobile-mvp':
      case 'business-app':
      case 'business-pro':
      case 'business-pro-app':
      case 'mobile-app':
      case 'app-deployment':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-4">
              <span className="font-mono text-[11px]">CROSS-PLATFORM NATIVE BUILD</span>
              <span className="px-2 py-0.5 rounded bg-[var(--surface-dark)] border border-[var(--border-dark)]">iOS & Android</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 h-28 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] p-2 flex flex-col justify-between flex-shrink-0">
                <div className="w-4 h-1 rounded-full bg-[var(--border-dark)] mx-auto" />
                <div className="space-y-1">
                  <div className="w-full h-1.5 rounded bg-[var(--brand)]/60" />
                  <div className="w-3/4 h-1.5 rounded bg-[var(--border-dark)]" />
                </div>
                <div className="w-3 h-3 rounded-full bg-[var(--brand)] mx-auto" />
              </div>
              <div className="space-y-1.5 text-xs">
                <span className="font-bold text-[var(--ivory)] block">Unified Backend & Store Deployment</span>
                <p className="text-[11px] text-[var(--text-muted-dark)] leading-relaxed">
                  Single Flutter or React Native codebase compiling to signed iOS archive and Android APK, ready for Play Store & App Store compliance.
                </p>
              </div>
            </div>
          </div>
        );

      case 'whatsapp-automation':
      case 'ai-whatsapp-assistant':
      case 'whatsapp-ecommerce':
      case 'ai-chatbot':
      case 'custom-ai-agent':
      case 'custom-llm':
      case 'automation':
        return (
          <div className="rounded-[16px] bg-[var(--surface-dark)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-3">
              <span>WHATSAPP & AI PIPELINE</span>
              <span className="text-emerald-400">24/7 Automated Handover</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2.5 rounded bg-[var(--ink)] border border-[var(--border-dark)] flex items-center justify-between">
                <span className="text-[var(--text-muted-dark)]">WhatsApp Cloud API</span>
                <span className="text-[var(--brand-soft)]">Verified Webhook</span>
              </div>
              <div className="p-2.5 rounded bg-[var(--ink)] border border-[var(--border-dark)] flex items-center justify-between">
                <span className="text-[var(--text-muted-dark)]">AI Context & Memory</span>
                <span className="text-emerald-400">Vector Search & Rag</span>
              </div>
              <div className="p-2.5 rounded bg-[var(--ink)] border border-[var(--border-dark)] flex items-center justify-between">
                <span className="text-[var(--text-muted-dark)]">Catalogue & Orders</span>
                <span className="text-[var(--ivory)]">Instant Confirmation</span>
              </div>
            </div>
          </div>
        );

      case 'fullstack-prototype':
      case 'ml-prototype':
      case 'deep-learning-prototype':
      case 'advanced-ai-research':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-3">
              <span>RESEARCH & ML BENCHMARK</span>
              <span className="text-emerald-400">Reproducible Codebase</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded bg-[var(--surface-dark)] text-[var(--text-muted-dark)]">
                <span className="text-[var(--brand-soft)] font-bold">[model]</span> PyTorch / TensorFlow architecture with documented evaluation metrics
              </div>
              <div className="p-2 rounded bg-[var(--surface-dark)] text-emerald-400">
                <span className="text-emerald-400 font-bold">[interface]</span> Interactive Next.js & FastAPI / Streamlit prototype for live demonstrations
              </div>
            </div>
          </div>
        );

      case 'web-app':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-4 font-mono">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>POSTGRES + RLS ARCHITECTURE</span>
              </span>
              <span>v1.0 Staging</span>
            </div>
            <div className="space-y-3">
              <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[var(--ivory)] block">User Auth & Permissions</span>
                  <span className="text-[11px] text-[var(--text-muted-dark)]">Row Level Security verified</span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-[var(--ink)] text-emerald-400 font-mono">Active</span>
              </div>
              <div className="p-3.5 rounded-[12px] bg-[var(--surface-dark)] border border-[var(--border-dark)] flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-[var(--ivory)] block">Transactional Data Pipelines</span>
                  <span className="text-[11px] text-[var(--text-muted-dark)]">Payment gateways & webhooks</span>
                </div>
                <span className="text-[10px] px-2 py-1 rounded bg-[var(--ink)] text-[var(--brand-soft)] font-mono">Integrated</span>
              </div>
            </div>
          </div>
        );

      case 'hosting-setup':
      case 'seo-setup':
      case 'api-integration':
      case 'backend-development':
      case 'maintenance-support':
      case 'deployment-bugfix':
        return (
          <div className="rounded-[16px] bg-[var(--ink)] text-[var(--ivory)] p-6 border border-[var(--border-dark)] relative font-mono text-xs">
            <div className="flex items-center justify-between text-[var(--brand-soft)] border-b border-[var(--border-dark)] pb-3 mb-3">
              <span className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-[var(--brand)]" />
                <span>ROOT CAUSE RESOLUTION</span>
              </span>
              <span className="text-emerald-400">Resolved in ~48h</span>
            </div>
            <div className="space-y-2 text-[11px]">
              <div className="p-2 rounded bg-[var(--surface-dark)] text-[var(--text-muted-dark)]">
                <span className="text-rose-400">[error]</span> Connection pool exhausted during peak load
              </div>
              <div className="p-2 rounded bg-[var(--surface-dark)] text-emerald-400">
                <span className="text-emerald-400">[fixed]</span> PgBouncer session pooling & query index optimization
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="rounded-[16px] bg-[var(--surface)] text-[var(--ink)] p-6 border border-[var(--border-light)] relative shadow-sm">
            <div className="flex items-center justify-between text-xs text-[var(--brand)] font-semibold border-b border-[var(--border-light)] pb-3 mb-4">
              <span>SPECIALIST ARCHITECTURE</span>
              <span className="px-2 py-0.5 rounded bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">Custom Scope</span>
            </div>
            <p className="text-sm text-[var(--ink)] leading-relaxed font-medium mb-3">
              Unique specifications, bespoke SaaS products, or novel integrations scoped collaboratively with our technical leads.
            </p>
            <div className="text-xs text-[var(--text-muted)]">
              Full discovery blueprint, milestone architecture, and intellectual property transfer upon delivery.
            </div>
          </div>
        );
    }
  };

  return (
    <section id="services" className="py-24 sm:py-32 bg-[var(--ivory)] text-[var(--ink)] scroll-mt-24 relative">
      <div id="capabilities" className="absolute -top-24 left-0 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10">
          <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
            Capabilities & Deliverables
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-5">
            Custom engineered.<br />
            Scoped for your exact outcome.
          </h2>
          <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
            Select a service area to preview the technical architecture, scope deliverables, qualified sprint timing, and direct brief intake options.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => {
            const isCatSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                  isCatSelected
                    ? 'bg-[var(--ink)] text-[var(--ivory)] border-[var(--ink)] shadow-2xs'
                    : 'bg-[var(--surface)] text-[var(--text-muted)] border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--ink)]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Mobile Horizontal Selector */}
        <div className="lg:hidden flex overflow-x-auto pb-4 mb-6 gap-2 no-scrollbar" role="tablist">
          {filteredServices.map((service, idx) => {
            const isSelected = service.slug === activeService?.slug;
            return (
              <button
                key={service.slug}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedSlug(service.slug)}
                className={`flex-shrink-0 px-4 py-2.5 rounded-full text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[var(--brand)] text-[var(--ivory)] border-[var(--brand)] shadow-sm'
                    : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--border-light)]'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}. {service.name}
              </button>
            );
          })}
        </div>

        {/* Desktop Split Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left: Strong Vertical Service List */}
          <div className="lg:col-span-5 flex flex-col gap-2 max-h-[640px] overflow-y-auto pr-2" role="tablist" aria-label="Available services">
            {filteredServices.map((service, index) => {
              const isSelected = service.slug === activeService?.slug;
              return (
                <button
                  key={service.slug}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedSlug(service.slug)}
                  onFocus={() => setSelectedSlug(service.slug)}
                  className={`text-left p-4 rounded-[16px] transition-all duration-200 flex items-center justify-between border ${
                    isSelected
                      ? 'bg-[var(--surface)] border-[var(--brand)] shadow-[var(--shadow-card)] ring-1 ring-[var(--brand)]/10'
                      : 'bg-transparent border-transparent hover:bg-[var(--surface)]/70 text-[var(--text-muted)] hover:text-[var(--ink)]'
                  }`}
                >
                  <div className="pr-4 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-mono font-bold shrink-0 ${isSelected ? 'text-[var(--brand)]' : 'text-[var(--text-muted)]'}`}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3
                        className={`text-base font-heading font-bold truncate ${
                          isSelected ? 'text-[var(--ink)]' : 'text-inherit'
                        }`}
                      >
                        {service.name}
                      </h3>
                    </div>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1">
                      {service.outcome}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="text-xs font-mono px-2 py-0.5 rounded bg-[var(--surface)] border border-[var(--border-light)] text-[var(--text-muted)] hidden sm:inline-block">
                      {service.formatted_price || `₹${(service.starting_price_minor / 100).toLocaleString('en-IN')}+`}
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 transition-transform ${
                        isSelected ? 'text-[var(--brand)] translate-x-1' : 'opacity-30'
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Large Shared Visual Stage */}
          {activeService && (
            <div className="lg:col-span-7 lg:sticky lg:top-28">
              <div className="rounded-[24px] bg-[var(--surface)] border border-[var(--border-light)] p-6 sm:p-8 shadow-[var(--shadow-card)]">
                
                {/* Header Tag and Timing */}
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] block mb-1">
                      {activeService.category}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                      {activeService.name}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--brand-soft)] text-[var(--brand)] font-semibold">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Est. ~{activeService.typical_days} days</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-[8px] bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">
                      Fixed scope
                    </div>
                  </div>
                </div>

                {/* Bespoke Interactive Visual Stage */}
                <div className="my-6">
                  {renderVisualStage(activeService)}
                </div>

                {/* Outcome Statement */}
                <div className="py-4 border-b border-[var(--border-light)]">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">
                    Target Outcome
                  </h4>
                  <p className="text-base text-[var(--ink)] font-medium leading-relaxed">
                    {activeService.description}
                  </p>
                </div>

                {/* Deliverables Inclusions */}
                <div className="py-5 border-b border-[var(--border-light)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-[var(--brand)]" />
                      Engineering Scope
                    </h5>
                    <ul className="space-y-1.5">
                      {((activeService.features as string[]) || []).slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="text-xs text-[var(--ink)] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-2.5 flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5 text-[var(--brand)]" />
                      Handover Inclusions
                    </h5>
                    <ul className="space-y-1.5">
                      {((activeService.deliverables as string[]) || []).slice(0, 3).map((del, idx) => (
                        <li key={idx} className="text-xs text-[var(--ink)] flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Scope-qualified Price & Direct Brief Trigger */}
                <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-[var(--text-muted)] block">
                      Scope-qualified starting range
                    </span>
                    <span className="text-2xl font-heading font-extrabold text-[var(--brand)] tabular-nums">
                      {activeService.formatted_price || (activeService.starting_price_minor > 0 ? `₹${(activeService.starting_price_minor / 100).toLocaleString('en-IN')}+` : 'Custom Quote')}
                      <span className="text-xs font-normal text-[var(--text-muted)] ml-1.5">
                        (Fixed upon proposal approval)
                      </span>
                    </span>
                  </div>

                  <Link
                    href={`/brief?service=${activeService.slug}`}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
                  >
                    <span>Brief this service</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
