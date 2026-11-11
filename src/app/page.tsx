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
import { PORTFOLIO_ITEMS, mergePortfolioItems } from '@/lib/portfolioData';

export const dynamic = 'force-dynamic';

// Canonical services matching 2026 Agency Partnership Pricing
const defaultServices: Service[] = ALL_SERVICES;

export default async function HomePage() {
  const services = defaultServices;
  let portfolioItems: PortfolioItem[] = PORTFOLIO_ITEMS;

  try {
    const supabase = await createClient();
    const portfolioRes = await supabase
      .from('portfolio_items')
      .select('*')
      .eq('is_published', true)
      .order('sort_order', { ascending: true });

    if (portfolioRes.data && portfolioRes.data.length > 0) {
      portfolioItems = mergePortfolioItems(portfolioRes.data as PortfolioItem[]);
    }
  } catch {
    // Graceful fallback to canonical portfolio definitions
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
