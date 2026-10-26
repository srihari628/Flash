'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Service } from '@/lib/types';

interface ProductsInteractiveGridProps {
  services: Service[];
}

// Authentic, domain-specific HD minimalist image pairs for each service in Flash / BuilDo
const serviceImagePairs: Record<string, { first: string; second: string }> = {
  'portfolio': {
    first: '/images/portfolio-1.jpg',
    second: '/images/portfolio-2.jpg',
  },
  'business-website': {
    first: '/images/business-1.jpg',
    second: '/images/business-2.jpg',
  },
  'web-app': {
    first: '/images/webapp-1.jpg',
    second: '/images/webapp-2.jpg',
  },
  'ecommerce': {
    first: '/images/ecommerce-1.jpg',
    second: '/images/ecommerce-2.jpg',
  },
  'mobile-app': {
    first: '/images/mobile-1.jpg',
    second: '/images/mobile-2.jpg',
  },
  'automation': {
    first: '/images/automation-1.jpg',
    second: '/images/automation-2.jpg',
  },
  'deployment-bugfix': {
    first: '/images/service-bugfix.jpg',
    second: '/images/product-bugfix.jpg',
  },
  'custom-mvp': {
    first: '/images/service-custom.jpg',
    second: '/images/showcase-komorebi.jpg',
  },
};

interface ServiceCardItemProps {
  service: Service;
  index: number;
}

function ServiceCardItem({ service, index }: ServiceCardItemProps) {
  const [hoveredCard, setHoveredCard] = useState<'first' | 'second' | null>(null);

  const images = serviceImagePairs[service.slug] || {
    first: '/images/portfolio-1.jpg',
    second: '/images/portfolio-2.jpg',
  };

  return (
    <div
      className="relative flex flex-col gap-5 items-center justify-center w-full group py-8 px-4 select-none"
    >
      {/* ============================================================== */}
      {/* 1. LARGE HOVER POP-UP PREVIEWS (CodeDale Reference Architecture) */}
      {/* ============================================================== */}

      {/* Pop-Up Preview for Left Card (First) */}
      <div
        className={`absolute w-[290px] sm:w-[330px] h-[195px] sm:h-[220px] bottom-[112%] left-1/2 -translate-x-1/2 rounded-2xl border-4 border-white shadow-[0_25px_50px_-12px_rgba(23,18,23,0.28)] overflow-hidden transition-all duration-300 ease-out z-50 pointer-events-none bg-white ${
          hoveredCard === 'first'
            ? 'opacity-100 translate-y-0 scale-100 visible'
            : 'opacity-0 translate-y-4 scale-95 invisible'
        }`}
      >
        <Image
          src={images.first}
          alt={`${service.name} Preview 1`}
          fill
          className="object-cover"
          sizes="330px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-xs font-semibold drop-shadow-sm">
            {service.name} • Screen Concept
          </span>
        </div>
      </div>

      {/* Pop-Up Preview for Right Card (Second) */}
      <div
        className={`absolute w-[290px] sm:w-[330px] h-[195px] sm:h-[220px] bottom-[112%] left-1/2 -translate-x-1/2 rounded-2xl border-4 border-white shadow-[0_25px_50px_-12px_rgba(23,18,23,0.28)] overflow-hidden transition-all duration-300 ease-out z-50 pointer-events-none bg-white ${
          hoveredCard === 'second'
            ? 'opacity-100 translate-y-0 scale-100 visible'
            : 'opacity-0 translate-y-4 scale-95 invisible'
        }`}
      >
        <Image
          src={images.second}
          alt={`${service.name} Preview 2`}
          fill
          className="object-cover"
          sizes="330px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
          <span className="text-white text-xs font-semibold drop-shadow-sm">
            {service.name} • Interactive Layout
          </span>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. STACKED & TILTED PREVIEW CARDS (Center Interactive Stage)    */}
      {/* ============================================================== */}
      <div className="relative flex items-center justify-center h-22 w-40">
        {/* Soft radial backdrop aura on card hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--brand)]/15 via-[#2563EB]/15 to-transparent rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        {/* Card 1: Left Card (-12deg Angle) */}
        <div
          className="group/first relative z-10 -rotate-12 translate-x-3.5 cursor-pointer transition-all duration-300 ease-out group-hover:-translate-y-2 hover:!scale-110 hover:!z-30 hover:!-rotate-6"
          onMouseEnter={() => setHoveredCard('first')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setHoveredCard(hoveredCard === 'first' ? null : 'first')}
        >
          <div className="w-[4.8rem] h-[3.6rem] sm:w-[5.4rem] sm:h-[4.0rem] rounded-lg overflow-hidden border-[3px] border-white filter-shadow bg-white relative transition-all duration-300 hover:shadow-[0_18px_28px_rgba(0,0,0,0.18)]">
            <Image
              src={images.first}
              alt={`${service.name} Card 1`}
              fill
              className="object-cover"
              sizes="90px"
            />
          </div>
        </div>

        {/* Card 2: Right Card (+12deg Angle) */}
        <div
          className="group/second relative rotate-12 -translate-x-3.5 cursor-pointer transition-all duration-300 ease-out group-hover:-translate-y-2 hover:!scale-110 hover:!z-30 hover:!rotate-6"
          onMouseEnter={() => setHoveredCard('second')}
          onMouseLeave={() => setHoveredCard(null)}
          onClick={() => setHoveredCard(hoveredCard === 'second' ? null : 'second')}
        >
          <div className="w-[4.8rem] h-[3.6rem] sm:w-[5.4rem] sm:h-[4.0rem] rounded-lg overflow-hidden border-[3px] border-white filter-shadow bg-white relative transition-all duration-300 hover:shadow-[0_18px_28px_rgba(0,0,0,0.18)]">
            <Image
              src={images.second}
              alt={`${service.name} Card 2`}
              fill
              className="object-cover"
              sizes="90px"
            />
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 3. SERVICE TITLE & DIRECT LINK TO BRIEF                        */}
      {/* ============================================================== */}
      <Link
        href={`/brief?service=${service.slug}`}
        className="group-hover:-translate-y-1.5 transition-transform duration-300 ease-out flex flex-col items-center gap-1 text-center max-w-[260px] cursor-pointer"
        aria-label={`Brief ${service.name}`}
      >
        <span className="text-[17px] sm:text-[18px] font-heading font-bold tracking-tight text-[#171217] group-hover:text-[var(--brand)] transition-colors leading-[1.2]">
          {service.name}
        </span>
        <span className="text-xs text-[var(--text-muted)] line-clamp-1">
          {service.tagline || service.outcome}
        </span>
      </Link>

    </div>
  );
}

export default function ProductsInteractiveGrid({ services }: ProductsInteractiveGridProps) {
  const [mobileSelectedSlug, setMobileSelectedSlug] = useState<string | null>(null);

  const selectedMobileService = services.find((s) => s.slug === mobileSelectedSlug);

  return (
    <div className="w-full">
      {/* CodeDale-inspired Dashed Border Layout Container */}
      <div className="max-w-[1100px] mx-auto dashed-x-custom w-full flex flex-col items-center justify-center px-4 sm:px-6">

        {/* Desktop & Tablet Responsive 3-Column Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 w-full gap-y-16 gap-x-8 items-center justify-center py-14 px-6 sm:px-10 dashed-y-custom">
          {services.map((service, index) => (
            <ServiceCardItem
              key={service.slug}
              service={service}
              index={index}
            />
          ))}
        </div>

        {/* Mobile View: Clean Interactive Category Pills & Preview Sheet */}
        <div className="w-full flex md:hidden flex-col items-center py-10 px-2 dashed-y-custom gap-6">
          <div className="flex items-center flex-wrap justify-center gap-2">
            {services.map((srv) => {
              const isSelected = mobileSelectedSlug === srv.slug;
              return (
                <button
                  key={srv.slug}
                  type="button"
                  onClick={() => setMobileSelectedSlug(isSelected ? null : srv.slug)}
                  className={`py-2 px-3.5 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[var(--brand)] text-white shadow-sm'
                      : 'bg-white text-[#171217] border border-[#DDD6DF] hover:bg-gray-50'
                  }`}
                >
                  {srv.name}
                </button>
              );
            })}
          </div>

          {/* If service selected on mobile, display detailed preview card */}
          {selectedMobileService && (
            <div className="w-full max-w-sm bg-white rounded-2xl p-5 border border-[#DDD6DF] shadow-md flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-100">
                <Image
                  src={
                    serviceImagePairs[selectedMobileService.slug]?.first ||
                    '/images/portfolio-1.jpg'
                  }
                  alt={selectedMobileService.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h4 className="font-heading font-bold text-base text-[#171217]">
                  {selectedMobileService.name}
                </h4>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {selectedMobileService.description}
                </p>
              </div>

              <Link
                href={`/brief?service=${selectedMobileService.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-[var(--brand)] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[var(--brand-hover)] transition-colors"
              >
                <span>Brief this service</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Default Mobile Grid if none selected */}
          {!selectedMobileService && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full">
              {services.slice(0, 4).map((service, index) => (
                <ServiceCardItem
                  key={service.slug}
                  service={service}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
