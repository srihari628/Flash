'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Mail, Clock, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      // Create enquiry brief via API
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guest_name: formData.name,
          guest_email: formData.email,
          idea_description: `[Direct Enquiry: ${formData.subject || 'General'}]\n\n${formData.message}`,
          work_mode: 'writing',
          service_slug: 'custom-mvp',
          service_name: 'Direct Studio Enquiry',
        }),
      });

      if (!res.ok) throw new Error('Failed to send enquiry.');

      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please email hello@buildo.design directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-6 sm:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)] mb-3 block">
              Direct Contact
            </span>
            <h1 className="text-4xl sm:text-6xl font-heading font-extrabold tracking-tight text-[var(--ink)] mb-4">
              Get in touch with our team.
            </h1>
            <p className="text-[var(--text-muted)] text-base sm:text-lg leading-relaxed">
              Have an exploratory question or general enquiry? Drop us a message below or email our founders directly at <a href="mailto:hello@buildo.design" className="text-[var(--brand)] underline font-medium">hello@buildo.design</a>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Form */}
            <div className="md:col-span-7">
              <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="w-14 h-14 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold mb-2">Message Received</h3>
                    <p className="text-xs text-[var(--text-muted)] max-w-sm mx-auto mb-6">
                      Thank you for contacting BuilDo. Our project leads will reply to your email within our 6-hour SLA.
                    </p>
                    <Link
                      href="/"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-semibold hover:bg-[var(--brand-hover)]"
                    >
                      <span>Return to homepage</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-[10px] bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--ink)]">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full p-3.5 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--ink)]">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full p-3.5 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--ink)]">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Partnership enquiry, Technical question..."
                        className="w-full p-3.5 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold mb-1 text-[var(--ink)]">
                        Message *
                      </label>
                      <textarea
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="How can we help?"
                        className="w-full p-3.5 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Side Information */}
            <div className="md:col-span-5 space-y-6">
              <div className="rounded-[22px] bg-[var(--ink)] text-[var(--ivory)] p-8 border border-[var(--border-dark)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-soft)] block mb-2 font-mono">
                  Operational Response SLA
                </span>
                <h3 className="text-xl font-heading font-bold mb-3">
                  6 Elapsed Hours
                </h3>
                <p className="text-xs text-[var(--text-muted-dark)] leading-relaxed mb-6">
                  Every inquiry receives a direct review by Yash or Priya. We never send automated canned marketing templates pretending to be personal replies.
                </p>

                <div className="space-y-3 text-xs border-t border-[var(--border-dark)] pt-4 text-[var(--text-muted-dark)]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[var(--brand)]" />
                    <span>hello@buildo.design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[var(--brand)]" />
                    <span>Active monitoring: 7 days a week</span>
                  </div>
                </div>
              </div>

              <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-6">
                <h4 className="font-heading font-bold text-sm text-[var(--ink)] mb-2">
                  Have a specific idea to build?
                </h4>
                <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed">
                  For structured project scoping with milestone pricing, use our 3-step project brief builder.
                </p>
                <Link
                  href="/brief"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--brand)] hover:underline"
                >
                  <span>Go to Project Brief Intake</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
