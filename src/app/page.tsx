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
import { ALL_SERVICES } from '@/lib/servicesData';

export const dynamic = 'force-dynamic';

// Canonical services matching 2026 Agency Partnership Pricing
const defaultServices: Service[] = ALL_SERVICES;

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
