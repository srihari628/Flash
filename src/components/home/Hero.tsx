'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  const [stage, setStage] = useState<'video' | 'showcase'>('video');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Auto-play the bridge video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(() => {
        // Fallback if browser requires user gesture
      });
    }
  }, []);

  const handleVideoEnded = () => {
    setStage('showcase');
  };

  return (
    <section className="relative w-full min-h-screen bg-[#FAF7F2] flex flex-col justify-between overflow-hidden">
      
      {/* Embedded 60 FPS Micro-Floating Keyframes */}
      <style jsx global>{`
        @keyframes floatSlow1 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-7px) rotate(-0.5deg);
          }
        }
        @keyframes floatSlow2 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(0.6deg);
          }
        }
        @keyframes floatSlow3 {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-6px) rotate(-0.4deg);
          }
        }
        .float-service-1 {
          animation: floatSlow1 5.2s ease-in-out infinite;
        }
        .float-service-2 {
          animation: floatSlow2 5.8s ease-in-out infinite 0.6s;
        }
        .float-service-3 {
          animation: floatSlow3 5.0s ease-in-out infinite 1.2s;
        }
        @media (prefers-reduced-motion: reduce) {
          .float-service-1,
          .float-service-2,
          .float-service-3 {
            animation: none !important;
          }
        }
      `}</style>

      {/* ============================================================== */}
      {/* 1. BRIDGE VIDEO HORIZON (Active only during initial viewing)   */}
      {/* Smoothly fades out completely when video ends or is skipped    */}
      {/* ============================================================== */}
      <div
        className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 flex items-end justify-center transition-opacity duration-1000 ease-out ${
          stage === 'video' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="relative w-full h-full flex items-end justify-center origin-bottom translate-y-8 sm:translate-y-12 lg:translate-y-14 scale-[0.97] lg:scale-100">
          <video
            ref={videoRef}
            src="/Flash_vid.mp4"
            poster="/images/bridge-poster.jpg"
            muted
            playsInline
            preload="auto"
            onEnded={handleVideoEnded}
            className="w-full h-full object-contain md:object-cover object-bottom mix-blend-multiply"
            style={{
              WebkitMaskImage:
                'linear-gradient(to bottom, transparent 0%, black 5%, black 86%, transparent 100%)',
              maskImage:
                'linear-gradient(to bottom, transparent 0%, black 5%, black 86%, transparent 100%)',
            }}
            aria-label="BuilDo bridge animation"
          />
        </div>

        {/* Grainy waterline paper blend */}
        <div className="absolute inset-x-0 bottom-0 h-16 sm:h-20 pointer-events-none z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/50 to-transparent backdrop-blur-[2px]" />
          <div
            className="absolute inset-0 opacity-[0.045] mix-blend-multiply"
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. SKY HEADLINE & CTA (Unchanged, cleanly anchored on top)     */}
      {/* ============================================================== */}
      <div className="relative w-full pt-28 sm:pt-32 lg:pt-36 flex flex-col items-center justify-center text-center px-6 z-20">
        <h1
          className="font-heading text-5xl sm:text-6xl lg:text-[64px] text-[#171217] leading-[1.12] tracking-[-0.03em] max-w-[650px] mx-auto text-center select-none"
          style={{ fontWeight: 400 }}
        >
          From your mind.<br />
          Into the world.
        </h1>

        <div className="mt-7 flex justify-center">
          <Link
            href="/brief"
            className="group inline-flex items-center justify-center gap-2 w-[195px] h-[48px] rounded-full border border-[#B01287] bg-transparent text-[#B01287] text-[15px] font-medium transition-all duration-200 hover:bg-[#B01287]/[0.05] shadow-2xs hover:shadow-xs active:scale-[0.98]"
            aria-label="Bring it to life"
          >
            <span>Bring it to life</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-base">
              ↗
            </span>
          </Link>
        </div>

        {/* Skip Animation action (Visible only while video is playing) */}
        {stage === 'video' && (
          <button
            type="button"
            onClick={() => setStage('showcase')}
            className="mt-4 text-xs text-[var(--text-muted)] hover:text-[#171217] transition-colors cursor-pointer flex items-center gap-1.5 opacity-60 hover:opacity-100"
          >
            <span>Skip animation</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* ============================================================== */}
      {/* 3. OPTION 2C: FLOATING 3D SERVICES & PROCESS GRAPH SECTION     */}
      {/* Cohesive horizontal composition directly below hero            */}
      {/* Fades in smoothly once video completes or is skipped           */}
      {/* ============================================================== */}
      <div
        className={`w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 sm:pt-8 pb-12 sm:pb-16 z-20 transition-all duration-1000 ease-out flex-grow flex flex-col justify-end ${
          stage === 'showcase'
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-8 pointer-events-none'
        }`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-end">
          
          {/* ---------------------------------------------------------- */}
          {/* LEFT: 3 FLOATING 3D ILLUSTRATIONS (NO CARDS, NO BOXES)     */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 w-full">
            <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-xl mx-auto lg:mx-0 items-end">
              
              {/* Service 1: Website Development */}
              <Link
                href="/products/web-app"
                className="group flex flex-col items-center text-center cursor-pointer select-none"
              >
                {/* Ambient Soft Studio Glow behind Illustration */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(99, 102, 241, 0.28) 0%, rgba(99, 102, 241, 0.06) 50%, transparent 70%)',
                    }}
                  />

                  {/* High-End 3D Floating Laptop */}
                  <div className="relative w-full h-full float-service-1 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/service-3d-website.png"
                      alt="Website Development 3D render"
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                      className="object-contain drop-shadow-[0_16px_20px_rgba(23,18,23,0.08)]"
                      priority
                    />
                  </div>
                </div>
                
                {/* Clean Service Label */}
                <span className="font-heading font-medium text-xs sm:text-sm text-[#171217] leading-tight mt-2 mb-2.5 min-h-[32px] flex items-center justify-center group-hover:text-[#B01287] transition-colors">
                  Website<br />Development
                </span>
                
                {/* Subtle Circular Arrow Button */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 group-hover:bg-white border border-[#DDD6DF] group-hover:border-[#2563EB]/40 shadow-xs flex items-center justify-center text-[#2563EB] group-hover:text-[#1D4ED8] transition-all duration-200">
                  <span className="text-xs sm:text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>

              {/* Service 2: App Development */}
              <Link
                href="/products/mobile-app"
                className="group flex flex-col items-center text-center cursor-pointer select-none"
              >
                {/* Ambient Soft Studio Glow behind Illustration */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(168, 85, 247, 0.28) 0%, rgba(168, 85, 247, 0.06) 50%, transparent 70%)',
                    }}
                  />

                  {/* High-End 3D Floating Smartphone */}
                  <div className="relative w-full h-full float-service-2 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/service-3d-app.png"
                      alt="App Development 3D render"
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                      className="object-contain drop-shadow-[0_16px_20px_rgba(23,18,23,0.08)]"
                      priority
                    />
                  </div>
                </div>
                
                {/* Clean Service Label */}
                <span className="font-heading font-medium text-xs sm:text-sm text-[#171217] leading-tight mt-2 mb-2.5 min-h-[32px] flex items-center justify-center group-hover:text-[#B01287] transition-colors">
                  App<br />Development
                </span>
                
                {/* Subtle Circular Arrow Button */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 group-hover:bg-white border border-[#DDD6DF] group-hover:border-[#2563EB]/40 shadow-xs flex items-center justify-center text-[#2563EB] group-hover:text-[#1D4ED8] transition-all duration-200">
                  <span className="text-xs sm:text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>

              {/* Service 3: AI Automations */}
              <Link
                href="/products/automation"
                className="group flex flex-col items-center text-center cursor-pointer select-none"
              >
                {/* Ambient Soft Studio Glow behind Illustration */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 flex items-center justify-center">
                  <div
                    className="absolute inset-0 rounded-full blur-2xl pointer-events-none opacity-40 group-hover:opacity-65 transition-opacity duration-300"
                    style={{
                      background:
                        'radial-gradient(circle, rgba(236, 72, 153, 0.24) 0%, rgba(192, 38, 211, 0.05) 50%, transparent 70%)',
                    }}
                  />

                  {/* High-End 3D Floating AI Robot */}
                  <div className="relative w-full h-full float-service-3 transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/images/service-3d-ai.png"
                      alt="AI Automations 3D render"
                      fill
                      sizes="(max-width: 640px) 112px, (max-width: 1024px) 128px, 144px"
                      className="object-contain drop-shadow-[0_16px_20px_rgba(23,18,23,0.08)]"
                      priority
                    />
                  </div>
                </div>
                
                {/* Clean Service Label */}
                <span className="font-heading font-medium text-xs sm:text-sm text-[#171217] leading-tight mt-2 mb-2.5 min-h-[32px] flex items-center justify-center group-hover:text-[#B01287] transition-colors">
                  AI<br />Automations
                </span>
                
                {/* Subtle Circular Arrow Button */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/95 group-hover:bg-white border border-[#DDD6DF] group-hover:border-[#2563EB]/40 shadow-xs flex items-center justify-center text-[#2563EB] group-hover:text-[#1D4ED8] transition-all duration-200">
                  <span className="text-xs sm:text-sm transition-transform duration-200 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>

            </div>
          </div>

          {/* ---------------------------------------------------------- */}
                    {/* ---------------------------------------------------------- */}
                    {/* ---------------------------------------------------------- */}
          {/* RIGHT: PREMIUM PROCESS GRAPH — CURVY WAVE WITH AREA FILL  */}
          {/* ---------------------------------------------------------- */}
          <div className="lg:col-span-6 relative w-full h-[270px] sm:h-[285px] lg:h-[295px] flex items-end select-none">

            {/* SVG Canvas for Wave, Under-glow, Dotted Guides & Dots */}
            <svg
              className="w-full h-full overflow-visible pointer-events-none"
              viewBox="0 0 600 280"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                {/* Main Curve Gradient: Starts thin & faded at 0%, transitions smoothly to solid blue -> indigo -> magenta -> warm orange */}
                <linearGradient id="pgCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0" />
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity="0.35" />
                  <stop offset="12%" stopColor="#3B82F6" stopOpacity="0.85" />
                  <stop offset="18%" stopColor="#3B82F6" stopOpacity="1" />
                  <stop offset="35%" stopColor="#6366F1" stopOpacity="1" />
                  <stop offset="60%" stopColor="#EC4899" stopOpacity="1" />
                  <stop offset="85%" stopColor="#F97316" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FB923C" stopOpacity="1" />
                </linearGradient>

                {/* Area Fill Gradient: Rich chromatic wash (Blue -> Violet -> Pink -> Orange) */}
                <linearGradient id="pgAreaColorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#60A5FA" stopOpacity="0" />
                  <stop offset="10%" stopColor="#60A5FA" stopOpacity="0.32" />
                  <stop offset="28%" stopColor="#A78BFA" stopOpacity="0.30" />
                  <stop offset="58%" stopColor="#F472B6" stopOpacity="0.34" />
                  <stop offset="82%" stopColor="#FB923C" stopOpacity="0.30" />
                  <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.25" />
                </linearGradient>

                {/* Vertical Fade Mask: 100% at the curve, fading out smoothly down to 0% at y=270 (where dashed lines end) */}
                <linearGradient id="pgVertFade" x1="0" y1="40" x2="0" y2="270" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
                  <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.55" />
                  <stop offset="80%" stopColor="#FFFFFF" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                </linearGradient>
                <mask id="pgAreaMask" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="280">
                  <rect x="0" y="0" width="600" height="280" fill="url(#pgVertFade)" />
                </mask>

                {/* Clip Path: Strictly constrains the glow to be UNDER the curve only (zero leakage above the line) */}
                <clipPath id="underCurveClip">
                  <path d="M 0 248 C 50 246, 90 234, 135 205 C 195 180, 265 165, 345 142 C 420 128, 480 62, 540 48 L 540 270 L 0 270 Z" />
                </clipPath>

                {/* Soft diffuse filter for the under-curve glow */}
                <filter id="pgSoftAura" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="10" />
                </filter>

                {/* Crisp Dot Shadow */}
                <filter id="pgDotShadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0F172A" floodOpacity="0.16" />
                </filter>
              </defs>

              {/* 1. Luminous Atmospheric Color Strictly Underneath the Curve (Fades down to dashed line ends) */}
              <g className="pg-area" clipPath="url(#underCurveClip)" mask="url(#pgAreaMask)">
                <rect
                  x="0"
                  y="0"
                  width="600"
                  height="280"
                  fill="url(#pgAreaColorGrad)"
                  filter="url(#pgSoftAura)"
                />
              </g>

              {/* 2. Vertical Dotted Guide Lines (ending at y=270) */}
              {/* Guide 1: Blue */}
              <line
                className="pg-guide-1"
                x1="135" y1="205" x2="135" y2="270"
                stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.6"
              />
              {/* Guide 2: Pink / Magenta */}
              <line
                className="pg-guide-2"
                x1="345" y1="142" x2="345" y2="270"
                stroke="#EC4899" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.6"
              />
              {/* Guide 3: Warm Orange */}
              <line
                className="pg-guide-3"
                x1="540" y1="48" x2="540" y2="270"
                stroke="#F97316" strokeWidth="1.5" strokeDasharray="3 4" strokeOpacity="0.6"
              />

              {/* 3. The Curvy Wave Line (Thin, smooth, dynamic swooping curve with ZERO line glow) */}
              <path
                className="pg-line"
                d="M 0 248 C 50 246, 90 234, 135 205 C 195 180, 265 165, 345 142 C 420 128, 480 62, 540 48"
                stroke="url(#pgCurveGrad)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />

              {/* 4. 60 FPS Subtle Traveling Micro-particle (Crisp tiny point, no stroke glow) */}
              <circle r="2.5" fill="#FFFFFF" opacity="0.95">
                <animateMotion
                  dur="4.2s"
                  repeatCount="indefinite"
                  path="M 0 248 C 50 246, 90 234, 135 205 C 195 180, 265 165, 345 142 C 420 128, 480 62, 540 48"
                  keyPoints="0;1"
                  keyTimes="0;1"
                  calcMode="spline"
                  keySplines="0.38 0 0.22 1"
                />
              </circle>

              {/* 5. Crisp Milestone Dots with White Borders (No harsh background glow discs) */}
              {/* Milestone Dot 1: Blue */}
              <g className="pg-dot-1">
                <circle cx="135" cy="205" r="9" className="pg-radar-1" stroke="#3B82F6" fill="none" />
                <circle cx="135" cy="205" r="9.5" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.8" filter="url(#pgDotShadow)" />
                <circle cx="135" cy="205" r="2.6" fill="#FFFFFF" />
              </g>

              {/* Milestone Dot 2: Magenta */}
              <g className="pg-dot-2">
                <circle cx="345" cy="142" r="9" className="pg-radar-2" stroke="#EC4899" fill="none" />
                <circle cx="345" cy="142" r="9.5" fill="#EC4899" stroke="#FFFFFF" strokeWidth="2.8" filter="url(#pgDotShadow)" />
                <circle cx="345" cy="142" r="2.6" fill="#FFFFFF" />
              </g>

              {/* Milestone Dot 3: Orange */}
              <g className="pg-dot-3">
                <circle cx="540" cy="48" r="9" className="pg-radar-3" stroke="#F97316" fill="none" />
                <circle cx="540" cy="48" r="10" fill="#F97316" stroke="#FFFFFF" strokeWidth="2.8" filter="url(#pgDotShadow)" />
                <circle cx="540" cy="48" r="2.8" fill="#FFFFFF" />
              </g>
            </svg>

            {/* 6. Floating Badges (Crisp HTML Elements Anchored Directly Above Each Milestone) */}
            {/* Badge 1: Choose a service */}
            <div
              className="pg-badge-1-wrap absolute z-20 pointer-events-none"
              style={{ left: '9%', bottom: '35%' }}
            >
              <div className="pg-floating-1 flex items-center gap-2.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#DDD6FE]/80 shadow-[0_6px_20px_rgba(37,99,235,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-6 h-6 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  1
                </div>
                <div className="flex flex-col text-left pr-1 leading-tight">
                  <span className="text-[12px] font-semibold text-[#171217]">Choose</span>
                  <span className="text-[10.5px] text-[#64748B]">a service</span>
                </div>
              </div>
            </div>

            {/* Badge 2: We agree on design & scope */}
            <div
              className="pg-badge-2-wrap absolute z-20 pointer-events-none"
              style={{ left: '41%', bottom: '58%' }}
            >
              <div className="pg-floating-2 flex items-center gap-2.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#FCE7F3]/80 shadow-[0_6px_20px_rgba(236,72,153,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-6 h-6 rounded-full bg-[#E11D48] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  2
                </div>
                <div className="flex flex-col text-left pr-1 leading-tight">
                  <span className="text-[12px] font-semibold text-[#171217]">We agree</span>
                  <span className="text-[10.5px] text-[#64748B]">on design &amp; scope</span>
                </div>
              </div>
            </div>

            {/* Badge 3: We deliver in days / hours */}
            <div
              className="pg-badge-3-wrap absolute z-20 pointer-events-none"
              style={{ right: '15%', top: '1%' }}
            >
              <div className="pg-floating-3 flex items-center gap-2.5 px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-full border border-[#FED7AA]/80 shadow-[0_6px_20px_rgba(249,115,22,0.08),0_1px_3px_rgba(0,0,0,0.04)]">
                <div className="w-6 h-6 rounded-full bg-[#F97316] text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                  3
                </div>
                <div className="flex flex-col text-left pr-1 leading-tight">
                  <span className="text-[12px] font-semibold text-[#171217]">We deliver</span>
                  <span className="text-[10.5px] text-[#64748B]">in days / hours</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
