import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import ProductSelector from '@/components/home/ProductSelector';
import SelectedWork from '@/components/home/SelectedWork';
import DeliveryStory from '@/components/home/DeliveryStory';
import BrandStatement from '@/components/home/BrandStatement';
import WorkYourWayAndFaq from '@/components/home/WorkYourWayAndFaq';
import { createClient } from '@/lib/supabase/server';
import { Service, PortfolioItem } from '@/lib/types';

export const dynamic = 'force-dynamic';

// Fallback seed data in case Supabase connection is pending during initial render
const defaultServices: Service[] = [
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

const defaultPortfolio: PortfolioItem[] = [
  {
    id: 'p-1',
    slug: 'aura-workspace',
    title: 'Aura Editorial Workspace',
    category: 'Full Stack Web Application',
    summary: 'An editorial SaaS workspace for product leaders combining obsidian canvas, warm ivory document cards, and real-time state synchronization.',
    role: 'Concept design, full-stack architecture, and 60 FPS interaction choreography.',
    delivery_evidence: 'Interactive prototype, design token architecture, and Supabase Postgres schema.',
    provenance: 'concept',
    features: ['Real-time collaborative editing', 'Tactile drag & organize cards', 'Custom obsidian/ivory theme', 'Integrated audit trails'],
    preview_ui_data: { badge: 'Concept preview', stack: ['Next.js', 'Supabase', 'TypeScript'], accent: '#B01287' },
    image_url: '/images/showcase-aura.jpg',
    sort_order: 1,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-2',
    slug: 'vespera-atelier',
    title: 'Vespera Atelier',
    category: 'Boutique Commerce',
    summary: 'Direct-to-consumer storefront for sculptural ceramics featuring instantaneous cart transitions, fluid editorial catalogue, and Stripe integration.',
    role: 'Boutique UX, high-speed catalogue filtering, checkout orchestration.',
    delivery_evidence: 'Full Next.js storefront with headless commerce integration and server-side cart.',
    provenance: 'concept',
    features: ['Micro-animated gallery view', 'Instant server-side cart', 'Stripe payment flow', 'Inventory locking during checkout'],
    preview_ui_data: { badge: 'Concept preview', stack: ['Next.js', 'Tailwind CSS', 'Stripe API'], accent: '#B01287' },
    image_url: '/images/showcase-vespera.jpg',
    sort_order: 2,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-3',
    slug: 'komorebi-sanctuary',
    title: 'Komorebi Sanctuary Booking',
    category: 'Web Presence & Booking',
    summary: 'Bespoke appointment and retreat booking platform with timezone conversion, calendar conflict prevention, and confirmation workflows.',
    role: 'UI design, scheduling engine, and automated email confirmation pipeline.',
    delivery_evidence: 'Appointment booking flow with multi-timezone validation and staff assignment logic.',
    provenance: 'concept',
    features: ['Intelligent timezone alignment', 'Double-booking prevention', 'Instant confirmation receipt', 'One-click reschedule links'],
    preview_ui_data: { badge: 'Concept preview', stack: ['Next.js', 'Postgres', 'iCal / Resend'], accent: '#B01287' },
    image_url: '/images/showcase-komorebi.jpg',
    sort_order: 3,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-4',
    slug: 'synapse-pipeline',
    title: 'Synapse Event Pipeline',
    category: 'Automation & APIs',
    summary: 'Event-driven orchestration platform syncing client briefs with triage queues, notification webhooks, and audit logs.',
    role: 'Edge function pipeline architecture, dead-letter retry logic, monitoring UI.',
    delivery_evidence: 'Distributed event processor handling webhooks with zero packet loss and latency monitoring.',
    provenance: 'concept',
    features: ['Dead-letter queue retries', 'Webhook signature verification', 'Structured error logging', 'SLA countdown tracking'],
    preview_ui_data: { badge: 'Concept preview', stack: ['Supabase Edge Functions', 'TypeScript', 'Redis'], accent: '#B01287' },
    image_url: '/images/showcase-synapse.jpg',
    sort_order: 4,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
];

export default async function HomePage() {
  let services = defaultServices;
  let portfolioItems = defaultPortfolio;

  try {
    const supabase = await createClient();
    const [servicesRes, portfolioRes] = await Promise.all([
      supabase.from('services').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('portfolio_items').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
    ]);

    if (servicesRes.data && servicesRes.data.length > 0) {
      services = servicesRes.data as Service[];
    }
    if (portfolioRes.data && portfolioRes.data.length > 0) {
      portfolioItems = portfolioRes.data as PortfolioItem[];
    }
  } catch (err) {
    // Graceful fallback to verified defaults
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar theme="light" />
      
      <main className="flex-grow">
        <Hero />
        <ProductSelector services={services} />
        <SelectedWork items={portfolioItems} />
        <BrandStatement />
        <DeliveryStory />
        <WorkYourWayAndFaq />
      </main>

      <Footer />
    </div>
  );
}
