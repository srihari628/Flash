import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductsInteractiveGrid from '@/components/products/ProductsInteractiveGrid';
import { ArrowRight, Clock, CheckCircle2, ShieldCheck, Sparkles, Handshake, FileText, Layers, ExternalLink } from 'lucide-react';
import {
  ALL_SERVICES,
  SERVICE_CATEGORIES,
  COMMERCIAL_TERMS,
  AGENCY_PARTNERSHIP_MODEL,
} from '@/lib/servicesData';

export const metadata = {
  title: 'Development Services & Pricing (2026) — Awyk Digital',
  description: 'Awyk Digital 2026 Agency Partnership Pricing. Custom websites, mobile apps, AI automations, and academic research prototypes delivered in days.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const services = ALL_SERVICES;

  // Group services by category for structured pricing display
  const websiteServices = services.filter((s) => s.category === 'Website Development');
  const mobileServices = services.filter((s) => s.category === 'Mobile Application Development');
  const aiServices = services.filter((s) => s.category === 'AI & Automation');
  const academicServices = services.filter((s) => s.category === 'Academic & Research Development');
  const additionalServices = services.filter((s) => s.category === 'Additional Services');

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header Banner */}
          <div className="max-w-4xl mb-14 text-center mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-light)] text-xs font-semibold text-[var(--brand)] uppercase tracking-wider mb-4 shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>2026 | Agency Partnership Pricing</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-5 leading-[1.1]">
              Development Services
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-xl leading-relaxed max-w-2xl mx-auto">
              Awyk Digital — Custom websites & apps. Delivered in days. Transparent pricing, named leadership review, and full intellectual property transfer.
            </p>
          </div>

          {/* Quick Jump Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
            <a
              href="#website-development"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-2xs"
            >
              Website Development
            </a>
            <a
              href="#mobile-app-development"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-2xs"
            >
              Mobile Application Development
            </a>
            <a
              href="#ai-automation"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-2xs"
            >
              AI & Automation
            </a>
            <a
              href="#academic-research"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-2xs"
            >
              Academic & Research
            </a>
            <a
              href="#additional-services"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--surface)] border border-[var(--border-light)] hover:border-[var(--brand)] hover:text-[var(--brand)] transition-colors shadow-2xs"
            >
              Additional Services
            </a>
            <a
              href="#agency-model"
              className="px-4 py-2 rounded-full text-xs font-semibold bg-[var(--brand-soft)] text-[var(--brand)] border border-[var(--brand)]/20 hover:bg-[var(--brand)] hover:text-white transition-colors shadow-2xs"
            >
              Partnership Model
            </a>
          </div>

          {/* Interactive Visual Stage */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] block mb-1">
                Interactive Showcase
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                Explore Screen Concepts & Sprints
              </h2>
            </div>
            <ProductsInteractiveGrid services={services.slice(0, 8)} />
          </div>

          {/* ============================================================== */}
          {/* SECTION 1: WEBSITE DEVELOPMENT                                */}
          {/* ============================================================== */}
          <section id="website-development" className="mb-20 scroll-mt-28">
            <div className="mb-8 border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand)] font-bold block mb-1">
                  Category 01
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                  Website Development
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Static, CMS, custom business, 3D / animated and e-commerce websites.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">5 Tiered Services</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {websiteServices.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                        ~{srv.typical_days} days sprint
                      </span>
                      <span className="text-lg font-heading font-extrabold text-[var(--brand)]">
                        {srv.formatted_price}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                      {srv.tagline}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[var(--ink)]">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${srv.slug}`}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/brief?service=${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)] transition-all"
                    >
                      <span>Brief this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 2: MOBILE APPLICATION DEVELOPMENT                     */}
          {/* ============================================================== */}
          <section id="mobile-app-development" className="mb-20 scroll-mt-28">
            <div className="mb-8 border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand)] font-bold block mb-1">
                  Category 02
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                  Mobile Application Development
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Cross-platform iOS and Android applications with unified backend pipelines.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">3 Tiered Services</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mobileServices.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                        ~{srv.typical_days} days sprint
                      </span>
                      <span className="text-lg font-heading font-extrabold text-[var(--brand)]">
                        {srv.formatted_price}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                      {srv.tagline}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[var(--ink)]">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${srv.slug}`}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/brief?service=${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)] transition-all"
                    >
                      <span>Brief this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 3: AI & AUTOMATION                                     */}
          {/* ============================================================== */}
          <section id="ai-automation" className="mb-20 scroll-mt-28">
            <div className="mb-8 border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand)] font-bold block mb-1">
                  Category 03
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                  AI & Automation
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  WhatsApp workflows, AI assistants, chatbots, custom agents and LLM integrations.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">6 Specialized Services</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {aiServices.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                        ~{srv.typical_days} days sprint
                      </span>
                      <span className="text-lg font-heading font-extrabold text-[var(--brand)]">
                        {srv.formatted_price}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                      {srv.tagline}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[var(--ink)]">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${srv.slug}`}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/brief?service=${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)] transition-all"
                    >
                      <span>Brief this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 4: ACADEMIC & RESEARCH DEVELOPMENT                     */}
          {/* ============================================================== */}
          <section id="academic-research" className="mb-20 scroll-mt-28">
            <div className="mb-8 border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand)] font-bold block mb-1">
                  Category 04
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                  Academic & Research Development
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Full-stack, machine learning, deep learning and advanced AI research prototypes.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">4 Research Offerings</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {academicServices.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between hover:border-[var(--brand)] hover:shadow-[var(--shadow-card)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                        ~{srv.typical_days} days sprint
                      </span>
                      <span className="text-lg font-heading font-extrabold text-[var(--brand)]">
                        {srv.formatted_price}
                      </span>
                    </div>

                    <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                      {srv.tagline}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[var(--ink)]">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${srv.slug}`}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/brief?service=${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)] transition-all"
                    >
                      <span>Brief this</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 5: ADDITIONAL SERVICES (QUOTED SEPARATELY)             */}
          {/* ============================================================== */}
          <section id="additional-services" className="mb-20 scroll-mt-28">
            <div className="mb-8 border-b border-[var(--border-light)] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[var(--brand)] font-bold block mb-1">
                  Category 05
                </span>
                <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)]">
                  Additional Services
                </h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">
                  Quoted separately based on project requirements.
                </p>
              </div>
              <span className="text-xs font-mono text-[var(--text-muted)]">Custom Scoped</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((srv) => (
                <div
                  key={srv.slug}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between hover:border-[var(--brand)] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono text-[var(--text-muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                        Flexible delivery
                      </span>
                      <span className="text-sm font-heading font-bold text-[var(--brand)] px-2.5 py-0.5 rounded-full bg-[var(--brand-soft)]">
                        Custom Quote
                      </span>
                    </div>

                    <h3 className="text-lg font-heading font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                      {srv.name}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                      {srv.tagline}
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-[var(--text-muted)]">
                      {srv.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between gap-3">
                    <Link
                      href={`/products/${srv.slug}`}
                      className="text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
                    >
                      View details
                    </Link>
                    <Link
                      href={`/brief?service=${srv.slug}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[var(--border-light)] text-[var(--ink)] text-xs font-semibold hover:border-[var(--brand)] hover:text-[var(--brand)] transition-all"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ============================================================== */}
          {/* SECTION 6: COMMERCIAL TERMS & AGENCY PARTNERSHIP MODEL         */}
          {/* ============================================================== */}
          <section id="agency-model" className="mb-20 scroll-mt-28">
            <div className="rounded-[28px] bg-[var(--ink)] text-[var(--ivory)] border border-[var(--border-dark)] p-8 sm:p-14 shadow-[var(--shadow-dark-card)]">
              
              <div className="max-w-3xl mb-12">
                <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-2 block font-mono">
                  Governance & Commercials
                </span>
                <h2 className="text-3xl sm:text-5xl font-heading font-extrabold text-[var(--ivory)] mb-4">
                  Agency Partnership Model
                </h2>
                <p className="text-[var(--text-muted-dark)] text-base sm:text-lg leading-relaxed">
                  White-label, project-based and long-term development partnerships. We agree on scope, timelines and commercials before starting.
                </p>
              </div>

              {/* Roles Table */}
              <div className="rounded-[20px] bg-[var(--surface-dark)] border border-[var(--border-dark)] overflow-hidden mb-12">
                <div className="grid grid-cols-12 bg-white/5 p-4 border-b border-[var(--border-dark)] text-xs font-heading font-bold uppercase tracking-wider text-[var(--brand-soft)]">
                  <div className="col-span-5 sm:col-span-4">Role</div>
                  <div className="col-span-7 sm:col-span-8">Responsibility</div>
                </div>
                {AGENCY_PARTNERSHIP_MODEL.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-12 p-4 sm:p-5 border-b border-[var(--border-dark)]/50 last:border-b-0 items-center text-sm"
                  >
                    <div className="col-span-5 sm:col-span-4 font-heading font-bold text-[var(--ivory)]">
                      {item.role}
                    </div>
                    <div className="col-span-7 sm:col-span-8 text-[var(--text-muted-dark)] font-medium">
                      {item.responsibility}
                    </div>
                  </div>
                ))}
              </div>

              {/* Commercial Terms Grid */}
              <div>
                <h3 className="text-xl font-heading font-extrabold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[var(--brand-soft)]" />
                  <span>Commercial Terms</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {COMMERCIAL_TERMS.map((term, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-[14px] bg-[var(--surface-dark)]/70 border border-[var(--border-dark)] text-xs sm:text-sm text-[var(--text-muted-dark)] flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[var(--brand-soft)] shrink-0 mt-0.5" />
                      <span>{term}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* Need Custom Scoping Banner */}
          <div className="max-w-5xl mx-auto rounded-[24px] bg-[var(--surface)] text-[var(--ink)] p-8 sm:p-12 border border-[var(--border-light)] shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-2 block">
                Start with Full Clarity
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold mb-2 text-[var(--ink)]">
                Have an idea you want to launch?
              </h3>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                Yash, Priya, Srihari, and Basha will review your brief within 6 hours and prepare a fixed-price written proposal with guaranteed milestone delivery.
              </p>
            </div>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-[14px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-all shadow-sm flex-shrink-0 active:scale-95"
            >
              <span>Tell us your idea</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
