'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight, User, ShieldCheck, Sparkles } from 'lucide-react';
import SignOutButton from '@/components/auth/SignOutButton';
import { createClient } from '@/lib/supabase/client';

interface NavbarProps {
  theme?: 'light' | 'dark';
}

interface NavItem {
  label: string;
  href: string;
  targetId?: string;
}

const navItems: NavItem[] = [
  { label: 'Our services', href: '/products' },
  { label: 'Our work', href: '/#work', targetId: 'work' },
  { label: 'Studio', href: '/#studio', targetId: 'studio' },
  { label: 'Process', href: '/#process', targetId: 'process' },
  { label: 'FAQ', href: '/#faq', targetId: 'faq' },
  { label: 'Contact', href: '/#contact', targetId: 'contact' },
];

export default function Navbar({ theme = 'light' }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isStaffUser, setIsStaffUser] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const pathname = usePathname();

  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Supabase Auth Verification for Workspace & Staff
  useEffect(() => {
    const supabase = createClient();

    async function checkAuth() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          setIsLoggedIn(false);
          setIsStaffUser(false);
          return;
        }

        setIsLoggedIn(true);

        const staffEmails = ['skchanu007@gmail.com', 'skchan007@gmail.com'];
        if (user.email && staffEmails.includes(user.email.toLowerCase())) {
          setIsStaffUser(true);
          return;
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        const isStaffOrAdmin =
          profile && ['admin', 'staff', 'developer', 'reviewer'].includes(profile.role);

        setIsStaffUser(!!isStaffOrAdmin);
      } catch {
        setIsStaffUser(false);
      }
    }

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setIsLoggedIn(true);
        const staffEmails = ['skchanu007@gmail.com', 'skchan007@gmail.com'];
        if (session.user.email && staffEmails.includes(session.user.email.toLowerCase())) {
          setIsStaffUser(true);
        } else {
          checkAuth();
        }
      } else {
        setIsLoggedIn(false);
        setIsStaffUser(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Close mobile menu on route change
  const prevPathnameRef = useRef(pathname);
  if (prevPathnameRef.current !== pathname) {
    prevPathnameRef.current = pathname;
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }

  // Scroll detection & 60 FPS section spy
  useEffect(() => {
    const handleScroll = () => {
      // Threshold: at top of hero, stay initial; past 35px, morph to compact liquid pill
      setIsScrolled(window.scrollY > 35);

      if (pathname !== '/' || isScrollingRef.current) return;

      const scrollPosition = window.scrollY + 180;
      const ids = ['contact', 'faq', 'process', 'studio', 'work'];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, [pathname]);

  // Handle URL hash on landing
  useEffect(() => {
    if (pathname === '/' && typeof window !== 'undefined' && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          isScrollingRef.current = true;
          setActiveSection(id);
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 850);
        }
      }, 120);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Glitch-Free 60 FPS Smooth Scroll Handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      if (item.targetId && pathname === '/') {
        e.preventDefault();
        const targetElement = document.getElementById(item.targetId);
        if (targetElement) {
          isScrollingRef.current = true;
          setActiveSection(item.targetId);
          setMobileMenuOpen(false);

          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });

          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 850);
        }
      } else {
        setMobileMenuOpen(false);
      }
    },
    [pathname]
  );

  const scrollToTop = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (pathname === '/') {
        e.preventDefault();
        isScrollingRef.current = true;
        setActiveSection('');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          isScrollingRef.current = false;
        }, 850);
      }
    },
    [pathname]
  );

  const isDark = theme === 'dark';
  const currentSection = pathname === '/' ? activeSection : '';

  return (
    <>
      {/* ── Fixed Centered Floating Capsule Wrapper ── */}
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-50 pointer-events-none flex justify-center px-3 sm:px-6">
        <div
          className={`pointer-events-auto rounded-full flex items-center justify-between relative transition-all duration-300 ease-out liquid-glass-shell select-none ${
            isScrolled
              ? /* Scrolled state: Morph into compact, sleek single liquid glass pill */
                isDark
                ? 'w-fit max-w-[92vw] h-[44px] sm:h-[48px] px-3.5 sm:px-4 liquid-glass-dark-scrolled text-[var(--ivory)]'
                : 'w-fit max-w-[92vw] h-[44px] sm:h-[48px] px-3.5 sm:px-4 liquid-glass-light-scrolled text-[var(--ink)]'
              : /* Initial state (top of page): Earlier spacious layout with brand, nav, workspace & start brief */
                isDark
                ? 'w-full max-w-[1240px] h-[54px] sm:h-[60px] px-4 sm:px-6 bg-black/35 backdrop-blur-xl border border-white/10 text-[var(--ivory)] shadow-sm'
                : 'w-full max-w-[1240px] h-[54px] sm:h-[60px] px-4 sm:px-6 bg-white/40 backdrop-blur-xl border border-white/60 text-[var(--ink)] shadow-[0_4px_20px_-4px_rgba(23,18,23,0.06)]'
          }`}
        >
          {/* Liquid Glass Top Rim Specular Line */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none rounded-full" />

          {/* ── Left: Brand Wordmark ── */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              onClick={scrollToTop}
              className="flex items-center gap-1 focus-visible:outline-none py-1 group pr-1"
              aria-label="BuilDo Home"
            >
              <span
                className={`font-heading font-extrabold tracking-tight flex items-center transition-all ${
                  isScrolled ? 'text-[17px] sm:text-[18px]' : 'text-xl sm:text-2xl'
                } ${isDark ? 'text-[var(--ivory)]' : 'text-[#171217]'}`}
              >
                BuilDo
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--brand)] ml-0.5 group-hover:scale-125 transition-transform" />
              </span>
            </Link>

            {/* Subtle Divider: only appears when scrolled in compact pill */}
            {isScrolled && (
              <div className="hidden sm:block w-[1px] h-3.5 bg-black/10 dark:bg-white/15 ml-2 mr-1 shrink-0" />
            )}
          </div>

          {/* ── Center: Navigation Links (Our services to Contact) ── */}
          <nav
            className={`hidden sm:flex items-center transition-all duration-300 ${
              isScrolled ? 'gap-0.5' : 'gap-1'
            }`}
            aria-label="Main Navigation"
          >
            {navItems.map((item) => {
              const isActive =
                item.href === '/products'
                  ? pathname.startsWith('/products')
                  : currentSection === item.targetId;
              const linkHref =
                pathname === '/' && item.targetId ? `#${item.targetId}` : item.href;

              return (
                <Link
                  key={item.label}
                  href={linkHref}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`relative rounded-full text-[13px] font-medium tracking-tight transition-all duration-150 ${
                    isScrolled
                      ? 'px-2.5 sm:px-3 py-1'
                      : 'px-3 sm:px-3.5 py-1.5'
                  } ${
                    isActive
                      ? isDark
                        ? 'liquid-pill-active-dark font-semibold'
                        : 'liquid-pill-active font-semibold'
                      : isDark
                      ? 'text-[#C4B9C2] hover:text-[var(--ivory)] hover:bg-white/10'
                      : 'text-[#4A3D48] hover:text-[var(--brand)] hover:bg-black/5'
                  }`}
                >
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* ── Right: Earlier Workspace & Start Brief Actions (Fades out when scrolled) ── */}
          <div
            className={`transition-all duration-300 items-center overflow-hidden shrink-0 ${
              isScrolled
                ? 'w-0 opacity-0 pointer-events-none max-w-0 hidden'
                : 'hidden sm:flex gap-2 sm:gap-3 opacity-100'
            }`}
          >
            {/* Workspace Link */}
            <Link
              href="/portal"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all ${
                isDark
                  ? 'text-[#C4B9C2] hover:text-[var(--ivory)] hover:bg-white/10'
                  : 'text-[#443842] hover:text-[var(--ink)] hover:bg-black/5'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>

            {/* Staff Pill */}
            {isStaffUser && (
              <Link
                href="/staff/leads"
                className={`flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-semibold transition-all ${
                  isDark
                    ? 'border-[var(--brand)]/40 bg-[var(--brand)]/15 text-[var(--brand-soft)]'
                    : 'border-[var(--brand)]/30 bg-[var(--brand-soft)] text-[var(--brand)]'
                }`}
                title="Internal Staff View"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Staff</span>
              </Link>
            )}

            {/* Sign Out Button if Logged In */}
            {isLoggedIn && (
              <SignOutButton variant={isDark ? 'dark' : 'light'} />
            )}

            {/* Start Brief CTA Button */}
            <Link
              href="/brief"
              className="relative group overflow-hidden inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[var(--brand)] text-[var(--ivory)] font-bold text-xs sm:text-[13px] shadow-[0_4px_16px_rgba(176,18,135,0.32)] hover:bg-[var(--brand-hover)] hover:shadow-[0_6px_22px_rgba(176,18,135,0.48)] active:scale-95 transition-all"
            >
              <Sparkles className="w-3 h-3 text-white/90 group-hover:rotate-12 transition-transform" />
              <span>Start Brief</span>
              <span>↗</span>
            </Link>
          </div>

          {/* ── Mobile Menu Toggle Button ── */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`sm:hidden p-1.5 rounded-full transition-all focus-visible:outline-none ${
              isDark
                ? 'text-[var(--ivory)] hover:bg-white/10'
                : 'text-[var(--ink)] hover:bg-black/5'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ── Mobile Liquid Glass Dropdown Menu ── */}
      {mobileMenuOpen && (
        <div className="sm:hidden fixed top-[68px] inset-x-4 max-w-[360px] mx-auto rounded-[24px] p-5 shadow-2xl backdrop-blur-2xl border border-white/60 dark:border-white/15 bg-white/95 dark:bg-[#1a141d]/95 text-[var(--ink)] dark:text-[var(--ivory)] z-50 animate-in fade-in zoom-in-95 duration-150">
          <nav className="flex flex-col gap-1 text-sm font-medium">
            {navItems.map((item) => {
              const isActive =
                item.href === '/products'
                  ? pathname.startsWith('/products')
                  : currentSection === item.targetId;
              const linkHref =
                pathname === '/' && item.targetId ? `#${item.targetId}` : item.href;

              return (
                <Link
                  key={item.label}
                  href={linkHref}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[14px] transition-all ${
                    isActive
                      ? 'bg-[var(--brand)]/10 text-[var(--brand)] font-bold'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                </Link>
              );
            })}

            <div className="pt-3 mt-2 border-t border-black/10 dark:border-white/10 flex flex-col gap-2">
              <Link
                href="/portal"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-medium text-xs"
              >
                <User className="w-3.5 h-3.5 text-[var(--brand)]" />
                <span>Workspace</span>
              </Link>

              {isStaffUser && (
                <Link
                  href="/staff/leads"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-[14px] bg-[var(--brand-soft)] dark:bg-[var(--brand)]/20 text-[var(--brand)] font-semibold text-xs transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Staff Portal</span>
                </Link>
              )}

              <Link
                href="/brief"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-full bg-[var(--brand)] text-[var(--ivory)] font-bold text-xs shadow-md hover:bg-[var(--brand-hover)] transition-all flex items-center justify-center gap-1.5"
              >
                <span>Start Brief ↗</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
