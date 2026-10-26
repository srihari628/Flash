'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, Lock, Mail, AlertCircle, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (signInError) throw signInError;

      const normalizedEmail = email.trim().toLowerCase();
      const isAdminEmail = ['skchanu007@gmail.com', 'skchan007@gmail.com'].includes(normalizedEmail);

      let isStaffOrAdmin = isAdminEmail;
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single();

        if (profile && ['staff', 'developer', 'reviewer', 'admin'].includes(profile.role)) {
          isStaffOrAdmin = true;
        }
      } catch (e) {
        // Safe fallback
      }

      if (isStaffOrAdmin) {
        router.push('/staff/leads');
      } else {
        router.push('/portal');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid email or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email.trim()) {
      setError('Please enter your email address first.');
      return;
    }
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email: email.trim(),
        options: {
          emailRedirectTo: `${window.location.origin}/portal`,
        },
      });

      if (otpError) throw otpError;

      setMagicLinkSent(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send magic login link.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-[var(--shadow-card)]">
            
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] block mb-1">
                Workspace Access
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                Sign in to BuilDo
              </h1>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Access your project workspace, proposals, and staging previews.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {magicLinkSent ? (
              <div className="p-5 rounded-[14px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-xs space-y-2">
                <p className="font-bold">Magic Link Dispatched</p>
                <p>
                  We sent a secure login link to <strong>{email}</strong>. Check your inbox to sign in instantly.
                </p>
              </div>
            ) : (
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full p-3.5 pl-10 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    />
                    <Mail className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-4" />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-semibold text-[var(--ink)]">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={handleMagicLink}
                      className="text-[11px] text-[var(--brand)] hover:underline"
                    >
                      Email me a magic link instead
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3.5 pl-10 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    />
                    <Lock className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-4" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98] disabled:opacity-50 mt-2"
                >
                  {isSubmitting ? 'Signing in...' : 'Sign in to workspace'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-[var(--border-light)] text-center text-xs text-[var(--text-muted)]">
              <span>Don’t have an account yet? </span>
              <Link href="/auth/signup" className="text-[var(--brand)] font-semibold hover:underline">
                Create an account
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
