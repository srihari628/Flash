import { PortfolioItem } from './types';

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'p-vyomi',
    slug: 'vyomi-fitness',
    title: 'Vyomi Fitness Club',
    category: 'Premium Gym & Luxury Wellness Platform',
    summary:
      'Flagship digital destination for Vyomi Fitness Club in Vijayawada — combining quiet luxury editorial design, interactive strength & conditioning equipment zones, HYROX and Reformer Pilates studio chapters, recovery spa showcases, and a streamlined two-day trial booking experience.',
    role:
      'Active ongoing engagement: Bespoke UI design system, GSAP ScrollTrigger & Lenis motion choreography, curated architectural media pipeline, and trial intake integration.',
    delivery_evidence:
      'Multi-chapter production build in active sprint with Panatta equipment explorer, L1/L2/L3 coaching specifications, BMI tool, and WhatsApp/trial lead API.',
    provenance: 'ongoing',
    features: [
      'Interactive Panatta plate-loaded, pin-loaded & conditioning equipment explorer',
      'Scroll-scrubbed GSAP parallax walkthrough plates & zero-lag video chapters',
      'Dedicated studio showcases for HYROX, Reformer Pilates, Zumba & Wellness Spa',
      'Two-day trial booking workflow, BMI calculator & WhatsApp concierge trigger',
    ],
    preview_ui_data: {
      badge: 'Ongoing work',
      status: 'Active Sprint • Vijayawada',
      stack: ['Next.js 15', 'Tailwind CSS', 'GSAP & Lenis', 'TypeScript'],
      accent: '#B01287',
      stackRows: [
        { label: 'Framework', value: 'Next.js 15 App Router (React 19)' },
        { label: 'Styling', value: 'Tailwind CSS + Editorial Design Tokens' },
        { label: 'Motion', value: 'GSAP ScrollTrigger + Lenis Smooth Scroll' },
        { label: 'Media & Intake', value: 'FFmpeg h264 Walkthroughs + Trial Lead API' },
      ],
    },
    image_url: '/images/showcase-vyomi.png',
    sort_order: 1,
    is_published: true,
    created_at: '2026-11-10T00:00:00.000Z',
  },
  {
    id: 'p-1',
    slug: 'aura-workspace',
    title: 'Aura Editorial Workspace',
    category: 'Full Stack Web Application',
    summary:
      'An editorial SaaS workspace for product leaders combining obsidian canvas, warm ivory document cards, and real-time state synchronization.',
    role: 'Concept design, full-stack architecture, and 60 FPS interaction choreography.',
    delivery_evidence: 'Interactive prototype, design token architecture, and Supabase Postgres schema.',
    provenance: 'concept',
    features: [
      'Real-time collaborative editing',
      'Tactile drag & organize cards',
      'Custom obsidian/ivory theme',
      'Integrated audit trails',
    ],
    preview_ui_data: {
      badge: 'Concept preview',
      stack: ['Next.js', 'Supabase', 'TypeScript'],
      accent: '#B01287',
    },
    image_url: '/images/showcase-aura.jpg',
    sort_order: 2,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-2',
    slug: 'vespera-atelier',
    title: 'Vespera Atelier',
    category: 'Boutique Commerce',
    summary:
      'Direct-to-consumer storefront for sculptural ceramics featuring instantaneous cart transitions, fluid editorial catalogue, and Razorpay / Stripe integration.',
    role: 'Boutique UX, high-speed catalogue filtering, checkout orchestration.',
    delivery_evidence: 'Full Next.js storefront with headless commerce integration and server-side cart.',
    provenance: 'concept',
    features: [
      'Micro-animated gallery view',
      'Instant server-side cart',
      'Razorpay / Stripe payment flow',
      'Inventory locking during checkout',
    ],
    preview_ui_data: {
      badge: 'Concept preview',
      stack: ['Next.js', 'Tailwind CSS', 'Razorpay / Stripe'],
      accent: '#B01287',
      stackRows: [
        { label: 'Frontend', value: 'Next.js App Router (React 19)' },
        { label: 'Styling', value: 'Tailwind CSS + Locked Design Tokens' },
        { label: 'Commerce', value: 'Server-Side Cart + Razorpay / Stripe' },
        { label: 'Performance', value: '60 FPS Native Transitions' },
      ],
    },
    image_url: '/images/showcase-vespera.jpg',
    sort_order: 3,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-3',
    slug: 'komorebi-sanctuary',
    title: 'Komorebi Sanctuary Booking',
    category: 'Web Presence & Booking',
    summary:
      'Bespoke appointment and retreat booking platform with timezone conversion, calendar conflict prevention, and confirmation workflows.',
    role: 'UI design, scheduling engine, and automated email confirmation pipeline.',
    delivery_evidence: 'Appointment booking flow with multi-timezone validation and staff assignment logic.',
    provenance: 'concept',
    features: [
      'Intelligent timezone alignment',
      'Double-booking prevention',
      'Instant confirmation receipt',
      'One-click reschedule links',
    ],
    preview_ui_data: {
      badge: 'Concept preview',
      stack: ['Next.js', 'Postgres', 'iCal / Resend'],
      accent: '#B01287',
    },
    image_url: '/images/showcase-komorebi.jpg',
    sort_order: 4,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
  {
    id: 'p-4',
    slug: 'synapse-pipeline',
    title: 'Synapse Event Pipeline',
    category: 'Automation & APIs',
    summary:
      'Event-driven orchestration platform syncing client briefs with triage queues, notification webhooks, and audit logs.',
    role: 'Edge function pipeline architecture, dead-letter retry logic, monitoring UI.',
    delivery_evidence: 'Distributed event processor handling webhooks with zero packet loss and latency monitoring.',
    provenance: 'concept',
    features: [
      'Dead-letter queue retries',
      'Webhook signature verification',
      'Structured error logging',
      'SLA countdown tracking',
    ],
    preview_ui_data: {
      badge: 'Concept preview',
      stack: ['Supabase Edge Functions', 'TypeScript', 'Redis'],
      accent: '#B01287',
      stackRows: [
        { label: 'Runtime', value: 'Supabase Edge Functions + TypeScript' },
        { label: 'Queueing', value: 'Redis Stream + Dead-Letter Retries' },
        { label: 'Security', value: 'HMAC Webhook Signature Verification' },
        { label: 'Observability', value: 'Structured Audit Logs & SLA Clocks' },
      ],
    },
    image_url: '/images/showcase-synapse.jpg',
    sort_order: 5,
    is_published: true,
    created_at: '2026-10-18T00:00:00.000Z',
  },
];

/** Merges canonical portfolio items with any additional published Supabase rows without losing ordering. */
export function mergePortfolioItems(dbItems?: PortfolioItem[] | null): PortfolioItem[] {
  const bySlug = new Map<string, PortfolioItem>();

  for (const item of PORTFOLIO_ITEMS) {
    bySlug.set(item.slug, item);
  }

  if (dbItems) {
    for (const dbItem of dbItems) {
      if (!bySlug.has(dbItem.slug)) {
        bySlug.set(dbItem.slug, dbItem);
      }
    }
  }

  return Array.from(bySlug.values()).sort((a, b) => a.sort_order - b.sort_order);
}

/** Finds a single portfolio item by slug, falling back to canonical local definitions. */
export function findPortfolioItem(slug: string, dbItem?: PortfolioItem | null): PortfolioItem | undefined {
  return PORTFOLIO_ITEMS.find((item) => item.slug === slug) ?? dbItem ?? undefined;
}
