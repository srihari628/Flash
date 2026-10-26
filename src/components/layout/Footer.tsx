'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Mail, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="contact" className="bg-[var(--ink)] text-[var(--ivory)] pt-20 pb-12 border-t border-[var(--border-dark)] scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Invitation Headline Banner */}
        <div className="rounded-[22px] bg-[var(--surface-dark)] border border-[var(--border-dark)] p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand-soft)] mb-3 block">
              Direct Service Handover
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[var(--ivory)] leading-tight mb-4">
              What have you been waiting to build?
            </h2>
            <p className="text-[var(--text-muted-dark)] text-base sm:text-lg mb-8 leading-relaxed max-w-2xl">
              Share your business concept, feature list, or reference links. Yash, Priya, and our project leads will review your brief and deliver a structured written scope.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/brief"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-semibold text-base shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
              >
                <span>Tell us your idea</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-[12px] border border-[var(--border-dark)] text-[var(--ivory)] text-sm font-medium hover:bg-[var(--ink)] transition-colors"
              >
                <span>Read how we build</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16 pt-4 text-sm">
          {/* Col 1: Brand & Promise */}
          <div className="col-span-2">
            <Link href="/" className="font-heading text-2xl font-extrabold tracking-tight flex items-center mb-4">
              BuilDo
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--brand)] ml-0.5" />
            </Link>
            <p className="text-[var(--text-muted-dark)] leading-relaxed mb-6 max-w-sm">
              Custom websites, web applications, and automations. Scoped with clarity, engineered with precision, and delivered with full handover responsibility.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted-dark)]">
              <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>Configured response commitment: 6 elapsed hours</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-[var(--ivory)] mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-[var(--text-muted-dark)]">
              <li>
                <Link href="/products/web-app" className="hover:text-[var(--brand-soft)] transition-colors">
                  Web Applications
                </Link>
              </li>
              <li>
                <Link href="/products/business-website" className="hover:text-[var(--brand-soft)] transition-colors">
                  Business Websites
                </Link>
              </li>
              <li>
                <Link href="/products/ecommerce" className="hover:text-[var(--brand-soft)] transition-colors">
                  Boutique Commerce
                </Link>
              </li>
              <li>
                <Link href="/products/mobile-app" className="hover:text-[var(--brand-soft)] transition-colors">
                  iOS & Android Apps
                </Link>
              </li>
              <li>
                <Link href="/products/automation" className="hover:text-[var(--brand-soft)] transition-colors">
                  Automations & APIs
                </Link>
              </li>
              <li>
                <Link href="/products/deployment-bugfix" className="hover:text-[var(--brand-soft)] transition-colors">
                  Bug Fixing & Deploys
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Studio & Process */}
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-[var(--ivory)] mb-4">
              Studio
            </h3>
            <ul className="space-y-2.5 text-[var(--text-muted-dark)]">
              <li>
                <Link href="/work" className="hover:text-[var(--brand-soft)] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[var(--brand-soft)] transition-colors">
                  Delivery Method
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[var(--brand-soft)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--brand-soft)] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Security */}
          <div>
            <h3 className="font-heading font-semibold text-xs uppercase tracking-wider text-[var(--ivory)] mb-4">
              Workspaces
            </h3>
            <ul className="space-y-2.5 text-[var(--text-muted-dark)]">
              <li>
                <Link href="/portal" className="hover:text-[var(--brand-soft)] transition-colors">
                  Customer Workspace
                </Link>
              </li>
              <li>
                <Link href="/brief" className="hover:text-[var(--brand-soft)] transition-colors">
                  Submit Brief
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[var(--brand-soft)] transition-colors">
                  Delivery Method & SLA
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--brand-soft)] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--brand-soft)] transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-dark)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--text-muted-dark)] gap-4">
          <div className="flex items-center gap-3">
            <span>© {new Date().getFullYear()} BuilDo Studio. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="text-[var(--text-muted-dark)]">
              Direct Contact: <a href="mailto:hello@buildo.design" className="underline hover:text-[var(--ivory)]">hello@buildo.design</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-[var(--brand-soft)]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)]" />
              <span>Full Code & Asset Ownership Transferred</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
