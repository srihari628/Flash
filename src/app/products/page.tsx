import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProductsInteractiveGrid from '@/components/products/ProductsInteractiveGrid';
import { ArrowRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { Service } from '@/lib/types';

export const metadata = {
  title: 'Services & Products — BuilDo',
  description: 'Explore custom digital products engineered and delivered with accountability. Fixed price contracts, structured milestones, and full IP transfer.',
};

export const dynamic = 'force-dynamic';

const fallbackServices: Service[] = [
  {
    id: 's-1',
    slug: 'portfolio',
    name: 'Portfolio & Studio',
    category: 'Web Presence',
    tagline: 'Bespoke creative presence for practitioners, studios, and executives.',
    description: 'A meticulously art-directed portfolio designed to frame your work with confidence, generous whitespace, and tactile interactions.',
    outcome: 'Distinctive bespoke creative or personal brand presence.',
    typical_days: 3,
    starting_price_minor: 120000,
    currency: 'USD',
    features: ['Art-directed editorial typography', 'Interactive case study showcases', 'Responsive 60 FPS transitions', 'Light/dark mode foundation'],
    deliverables: ['Figma token design review', 'Production Next.js codebase', 'Vercel / Cloudflare deployment', '14-day warranty support'],
    sort_order: 1,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-2',
    slug: 'business-website',
    name: 'Business Website',
    category: 'Web Presence',
    tagline: 'High-converting corporate presence with tailored CMS and editorial craft.',
    description: 'Establish authority and communicate your value proposition clearly without template clutter or sluggish bloated themes.',
    outcome: 'High-converting corporate presence with tailored CMS and editorial craft.',
    typical_days: 5,
    starting_price_minor: 240000,
    currency: 'USD',
    features: ['Multi-page narrative architecture', 'Custom headless CMS / MDX', 'Lead capture with spam verification', 'Core Web Vitals 95+'],
    deliverables: ['Tailored visual identity application', 'Production web application', 'CMS training & editor guide', '14-day warranty support'],
    sort_order: 2,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-3',
    slug: 'web-app',
    name: 'Full Stack Web Application',
    category: 'Software & SaaS',
    tagline: 'Production SaaS, customer portal, or database-driven product.',
    description: 'From authenticated user dashboards to transactional data workflows, built on resilient Postgres and modern React architecture.',
    outcome: 'Production SaaS, customer portal, or database-driven product.',
    typical_days: 10,
    starting_price_minor: 480000,
    currency: 'USD',
    features: ['Supabase Auth & Row Level Security', 'Interactive real-time dashboards', 'Stripe / LemonSqueezy payment hooks', 'Audit logging & admin views'],
    deliverables: ['Full TypeScript repo with tests', 'Postgres schema & migrations', 'Staging & production environments', '30-day warranty support'],
    sort_order: 3,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-4',
    slug: 'ecommerce',
    name: 'Boutique Commerce',
    category: 'Commerce',
    tagline: 'Boutique commerce platform with custom catalogue, cart, and checkout.',
    description: 'Fast, elevated shopping experience tailored to boutique brands, luxury direct-to-consumer goods, and bespoke makers.',
    outcome: 'Boutique commerce platform with custom catalogue, cart, and checkout.',
    typical_days: 7,
    starting_price_minor: 320000,
    currency: 'USD',
    features: ['Custom product gallery & filter system', 'Instant server-side cart & checkout', 'Inventory state management', 'Automated order confirmation'],
    deliverables: ['Bespoke storefront', 'Provider checkout configuration', 'Product catalogue migration guide', '14-day warranty support'],
    sort_order: 4,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-5',
    slug: 'mobile-app',
    name: 'Android & iOS App',
    category: 'Mobile Product',
    tagline: 'Native-feel cross-platform mobile product ready for App Store review.',
    description: 'Deliver a cohesive product across smartphones and tablets with unified backend data, biometric authentication, and offline resilience.',
    outcome: 'Native-feel cross-platform mobile product ready for App Store and Play Store review.',
    typical_days: 14,
    starting_price_minor: 580000,
    currency: 'USD',
    features: ['React Native / Expo native architecture', 'Cross-platform iOS and Android builds', 'Push notifications setup', 'Offline-first cached data layer'],
    deliverables: ['Mobile app repository', 'TestFlight & APK staging builds', 'Store submission assistance checklist', '30-day warranty support'],
    sort_order: 5,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-6',
    slug: 'automation',
    name: 'Automation & Webhooks',
    category: 'Automations',
    tagline: 'Resilient workflow, API integration, and webhook orchestration.',
    description: 'Eliminate manual data entry and synchronize CRMs, billing, calendars, and communications automatically with zero dropped events.',
    outcome: 'Resilient workflow, API integration, and webhook orchestration.',
    typical_days: 4,
    starting_price_minor: 150000,
    currency: 'USD',
    features: ['Durable event queue & retry policy', 'Third-party API webhook consumers', 'Error alerting via Slack/Email', 'Idempotent event processing'],
    deliverables: ['Edge Functions pipeline', 'Monitoring dashboard', 'Integration credentials vault', '14-day warranty support'],
    sort_order: 6,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-7',
    slug: 'deployment-bugfix',
    name: 'Deployment & Bug Fixing',
    category: 'Maintenance',
    tagline: 'Fast diagnosis, code remediation, CI/CD pipeline, and stable hosting.',
    description: 'Tackle breaking production bugs, database lockups, slow queries, broken deployments, or migrate legacy apps to modern cloud infrastructure.',
    outcome: 'Fast diagnosis, code remediation, CI/CD pipeline, and stable hosting handover.',
    typical_days: 2,
    starting_price_minor: 75000,
    currency: 'USD',
    features: ['Root-cause diagnostic review', 'Critical fix & regression test', 'CI/CD automated deployment script', 'DNS, SSL, & domain stabilization'],
    deliverables: ['Tested pull request with diff explanation', 'Server log health verification', 'Handover summary & prevention notes', '7-day stability guarantee'],
    sort_order: 7,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 's-8',
    slug: 'custom-mvp',
    name: 'Other Requirements',
    category: 'Specialist',
    tagline: 'Tailored discovery and prototype execution for unique specifications.',
    description: 'Have an unconventional business idea or specialized requirements? We scope, architect, and deliver a working product according to an agreed written plan.',
    outcome: 'Tailored discovery and prototype execution for unique specifications.',
    typical_days: 7,
    starting_price_minor: 300000,
    currency: 'USD',
    features: ['Collaborative technical scoping', 'Custom architectural blueprint', 'Rapid milestone sprint execution', 'Full IP transfer upon delivery'],
    deliverables: ['Custom software deliverables', 'Architecture documentation', 'Deployment handover', '14-day warranty support'],
    sort_order: 8,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
];

export default async function ProductsPage() {
  let items = fallbackServices;

  try {
    const supabase = await createClient();
    const { data: services } = await supabase
      .from('services')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (services && services.length > 0) {
      items = services as Service[];
    }
  } catch (err) {
    // Graceful fallback to verified services
  }

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 sm:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-12 text-center mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4 leading-[1.15]">
              Solutions Tailored for Your Growth
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Discover our full-service offerings — crafted to deliver reliability, scalability, and results. Hover over any service to inspect screen concepts and sprint timing.
            </p>
          </div>


          {/* CodeDale-Style Interactive Stacked Cards Grid */}
          <ProductsInteractiveGrid services={items} />

          {/* Need Custom Scoping Banner */}
          <div className="max-w-5xl mx-auto mt-16 rounded-[24px] bg-[var(--ink)] text-[var(--ivory)] p-8 sm:p-12 border border-[var(--border-dark)] shadow-[var(--shadow-dark-card)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-2 block">
                Unconventional Requirements?
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold mb-2">
                Have a project that spans multiple categories?
              </h3>
              <p className="text-sm text-[var(--text-muted-dark)] leading-relaxed">
                We regularly architect custom multi-platform systems combining mobile apps, web portals, and complex background automation pipelines.
              </p>
            </div>
            <Link
              href="/brief?service=custom-mvp"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-all shadow-sm flex-shrink-0 active:scale-95"
            >
              <span>Submit custom requirements</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
