import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ArrowRight, ShieldCheck, HeartHandshake, Code2, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'About the Studio & Founders — BuilDo',
  description: 'Meet the team behind BuilDo. Founded by Yash and Priya, we provide an accountable managed service for custom software, web platforms, and mobile products.',
};

export default function AboutPage() {
  const team = [
    {
      name: 'Yash',
      role: 'Co-Founder & Engineering Lead',
      bio: 'Systems architect specializing in high-performance web applications, resilient database schemas, and cloud deployment pipelines.',
      focus: 'Architecture, Supabase Postgres, and 60 FPS performance engineering.',
    },
    {
      name: 'Priya',
      role: 'Co-Founder & Product Design Lead',
      bio: 'Product designer focused on editorial typography, design systems, conversion UX, and disciplined interaction design.',
      focus: 'Design tokens, layout composition, and responsive usability.',
    },
    {
      name: 'Dev',
      role: 'Full-Stack Project Lead',
      bio: 'Senior engineer managing client delivery sprints, API integrations, and webhook orchestration with zero dropped events.',
      focus: 'Next.js App Router, React 19, and third-party API adapters.',
    },
    {
      name: 'Ananya',
      role: 'Design Systems & Mobile Lead',
      bio: 'Specialist in cross-platform mobile product development, native UI patterns, and App Store review compliance.',
      focus: 'React Native / Expo, mobile UX, and multi-platform design tokens.',
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 sm:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
              Leadership & Studio Principles
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4">
              Craftsmanship.<br />Accountability from day one.
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              BuilDo was created to solve a persistent frustration in software delivery: the gap between having a strong business idea and the engineering capability to launch it reliably.
            </p>
          </div>

          {/* Philosophy Section */}
          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-12 mb-20 shadow-sm">
            <h2 className="text-2xl font-heading font-bold text-[var(--ink)] mb-4">
              What We Believe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
              <div>
                <h3 className="font-heading font-bold text-base text-[var(--brand)] mb-2">
                  1. Speed with Structure
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  Fast delivery does not mean cutting corners. By enforcing locked design tokens, reusable database migrations, and clean Next.js architecture, we launch products in days while keeping them maintainable for years.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[var(--brand)] mb-2">
                  2. Honest Scoping
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  We never make promises before inspecting actual requirements. Every proposal outlines exact deliverables, exclusions, and a guaranteed delivery date. If a feature needs more time, we state it up front.
                </p>
              </div>
              <div>
                <h3 className="font-heading font-bold text-base text-[var(--brand)] mb-2">
                  3. Total IP Transfer
                </h3>
                <p className="text-[var(--text-muted)] leading-relaxed">
                  You own your product completely. We transfer the Git repositories, configure your own cloud hosting, and ensure you have zero dependency on us once the 14-day warranty concludes.
                </p>
              </div>
            </div>
          </div>

          {/* Team Grid */}
          <div className="mb-20">
            <div className="max-w-2xl mb-10">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-2 block">
                The Core Team
              </span>
              <h2 className="text-3xl font-heading font-extrabold text-[var(--ink)]">
                Directly accountable for your delivery.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {team.map((person) => (
                <div
                  key={person.name}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-heading font-extrabold text-[var(--ink)]">
                          {person.name}
                        </h3>
                        <span className="text-xs font-semibold text-[var(--brand)] uppercase tracking-wider">
                          {person.role}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center font-heading font-bold text-sm">
                        {person.name[0]}
                      </div>
                    </div>

                    <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                      {person.bio}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-light)] text-xs">
                    <span className="text-[var(--text-muted)] block mb-1">Core Focus:</span>
                    <span className="font-semibold text-[var(--ink)]">{person.focus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Direct Banner */}
          <div className="rounded-[22px] bg-[var(--ink)] text-[var(--ivory)] p-8 sm:p-12 border border-[var(--border-dark)] flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h3 className="text-2xl font-heading font-extrabold mb-2">
                Have questions for Yash or Priya directly?
              </h3>
              <p className="text-sm text-[var(--text-muted-dark)] leading-relaxed">
                We are always available at <a href="mailto:hello@buildo.design" className="text-[var(--brand-soft)] underline">hello@buildo.design</a> or via our structured project intake flow.
              </p>
            </div>
            <Link
              href="/brief"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors flex-shrink-0"
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
