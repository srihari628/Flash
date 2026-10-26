'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CheckCircle2, Clock, ArrowRight, ShieldCheck, Copy, Check, User } from 'lucide-react';

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code') || 'BDO-26A9F8';
  const dueParam = searchParams.get('due');

  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 5,
    minutes: 59,
    seconds: 50,
  });

  useEffect(() => {
    const calculateRemaining = () => {
      const targetTime = dueParam ? new Date(dueParam).getTime() : Date.now() + 6 * 3600 * 1000;
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
      } else {
        const hours = Math.floor(difference / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    calculateRemaining();
    const timer = setInterval(calculateRemaining, 1000);
    return () => clearInterval(timer);
  }, [dueParam]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-2xl mx-auto px-6 sm:px-8">
          
          {/* Success Banner */}
          <div className="rounded-[24px] bg-[var(--surface)] border border-[var(--border-light)] p-8 sm:p-12 shadow-[var(--shadow-card)] text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] block mb-2">
              Receipt & Acknowledgement
            </span>
            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)] mb-3">
              Your brief has been safely received.
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed mb-8 max-w-lg mx-auto">
              Our engineering team has received your submission. An accountable project lead is actively reviewing your scope.
            </p>

            {/* Reference Code Pill */}
            <div className="p-4 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] mb-8 flex items-center justify-between">
              <div className="text-left">
                <span className="text-[11px] text-[var(--text-muted)] uppercase tracking-wider block font-semibold">
                  Opaque Reference Code
                </span>
                <span className="font-mono text-xl font-bold text-[var(--brand)] tabular-nums">
                  {code}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--surface)] border border-[var(--border-light)] text-xs font-semibold hover:border-[var(--brand)] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Countdown Timer based on 6-Hour SLA */}
            <div className="p-6 rounded-[18px] bg-[var(--ink)] text-[var(--ivory)] mb-8">
              <div className="flex items-center justify-center gap-2 text-xs font-mono text-[var(--brand-soft)] mb-2">
                <Clock className="w-3.5 h-3.5 text-[var(--brand)] animate-pulse" />
                <span>6-Hour Response SLA Clock</span>
              </div>
              <div className="flex items-center justify-center gap-4 text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ivory)] tabular-nums my-2">
                <div>
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="text-[10px] font-mono uppercase block text-[var(--text-muted-dark)] font-normal">
                    Hours
                  </span>
                </div>
                <span className="opacity-40 -mt-3">:</span>
                <div>
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="text-[10px] font-mono uppercase block text-[var(--text-muted-dark)] font-normal">
                    Mins
                  </span>
                </div>
                <span className="opacity-40 -mt-3">:</span>
                <div>
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="text-[10px] font-mono uppercase block text-[var(--text-muted-dark)] font-normal">
                    Secs
                  </span>
                </div>
              </div>
              <p className="text-xs text-[var(--text-muted-dark)] mt-2">
                You will receive a tailored scope evaluation and written proposal before this timer runs out.
              </p>
            </div>

            {/* Next Steps List */}
            <div className="text-left space-y-3 mb-8 text-xs text-[var(--text-muted)]">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  1
                </span>
                <span>
                  <strong>Yash or Priya reviews your brief:</strong> We check architecture, database requirements, and target timeline.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  2
                </span>
                <span>
                  <strong>Concrete proposal prepared:</strong> Deliverables, exclusions, milestones, and fixed price sent to your email.
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                  3
                </span>
                <span>
                  <strong>Workspace activation:</strong> Track build progress, test staging previews, and communicate asynchronously.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/auth/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-semibold text-sm hover:bg-[var(--brand-hover)] shadow-sm transition-all"
              >
                <User className="w-4 h-4" />
                <span>Create account to link this brief</span>
              </Link>
              <Link
                href="/"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[12px] border border-[var(--border-light)] text-sm font-semibold hover:bg-[var(--ivory)] transition-colors"
              >
                <span>Return to home</span>
              </Link>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--ivory)] flex items-center justify-center">Loading receipt...</div>}>
      <ConfirmationContent />
    </Suspense>
  );
}
