'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { LogOut } from 'lucide-react';

interface SignOutButtonProps {
  className?: string;
  variant?: 'light' | 'dark' | 'minimal';
  redirectUrl?: string;
}

export default function SignOutButton({
  className = '',
  variant = 'light',
  redirectUrl = '/auth/login',
}: SignOutButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignOut = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      await fetch('/api/auth/signout', { method: 'POST' }).catch(() => {});
      router.push(redirectUrl);
      router.refresh();
    } catch (err) {
      console.error('Sign out error:', err);
      // Hard redirect fallback
      window.location.href = redirectUrl;
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleSignOut}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 ${
        variant === 'dark'
          ? 'bg-[var(--ink)] text-[var(--text-muted-dark)] hover:text-[var(--ivory)] border border-[var(--border-dark)] hover:border-[var(--brand)] hover:bg-[var(--surface-dark)]'
          : variant === 'minimal'
          ? 'text-[var(--text-muted)] hover:text-[var(--brand)]'
          : 'bg-[var(--surface)] text-[var(--text-muted)] hover:text-[var(--ink)] border border-[var(--border-light)] hover:border-[var(--brand)] shadow-2xs hover:bg-[var(--surface)]'
      } ${className}`}
      title="Sign out of your account"
      aria-label="Sign out"
    >
      <LogOut className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
      <span>{loading ? 'Signing out...' : 'Sign out'}</span>
    </button>
  );
}
