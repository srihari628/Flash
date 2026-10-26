'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import { ArrowRight, Lock, Mail, User, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [signedUp, setSignedUp] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            full_name: fullName.trim(),
          },
        },
      });

      if (signUpError) throw signUpError;

      // Check if user already exists (identities array empty)
      if (data?.user && data.user.identities && data.user.identities.length === 0) {
        setError('An account with this email already exists. Please sign in below.');
        setIsSubmitting(false);
        return;
      }

      // Automatically sign in to establish persistent session
      if (!data.session) {
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
      }

      const normalizedEmail = email.trim().toLowerCase();
      const isAdmin = ['skchanu007@gmail.com', 'skchan007@gmail.com'].includes(normalizedEmail);

      // Create or update profile record
      if (data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          full_name: fullName.trim(),
          email: normalizedEmail,
          role: isAdmin ? 'admin' : 'customer',
        });

        // Link any unassigned briefs submitted with this email
        await supabase
          .from('briefs')
          .update({ user_id: data.user.id })
          .eq('guest_email', normalizedEmail)
          .is('user_id', null);
      }

      setSignedUp(true);
      setTimeout(() => {
        router.push(isAdmin ? '/staff/leads' : '/portal');
        router.refresh();
      }, 1200);
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please try again.');
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
                Client Registration
              </span>
              <h1 className="text-2xl sm:text-3xl font-heading font-extrabold text-[var(--ink)]">
                Create your account
              </h1>
              <p className="text-xs text-[var(--text-muted)] mt-1">
                Link your project briefs, approve proposals, and follow sprint deliveries.
              </p>
            </div>

            {error && (
              <div className="mb-6 p-3.5 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {signedUp ? (
              <div className="p-6 rounded-[14px] bg-emerald-50 border border-emerald-200 text-emerald-900 text-center text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-bold text-sm">Account Created Successfully</p>
                <p>Redirecting you to your client workspace...</p>
              </div>
            ) : (
              <form onSubmit={handleSignup} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full p-3.5 pl-10 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    />
                    <User className="w-4 h-4 text-[var(--text-muted)] absolute left-3.5 top-4" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Email Address *
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
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Password * (min. 6 characters)
                  </label>
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
                  {isSubmitting ? 'Creating account...' : 'Create client account'}
                </button>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-[var(--border-light)] text-center text-xs text-[var(--text-muted)]">
              <span>Already registered? </span>
              <Link href="/auth/login" className="text-[var(--brand)] font-semibold hover:underline">
                Sign in
              </Link>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
