'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FileText,
  Link2,
  UploadCloud,
  Clock,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Video,
  MessageSquare,
  Check,
  Trash2,
} from 'lucide-react';

interface BriefDraft {
  service_slug: string;
  intake_method: 'type' | 'link' | 'upload';
  idea_description: string;
  shared_link: string;
  target_audience: string;
  core_features: string[];
  budget_range: string;
  target_launch_date: string;
  work_mode: 'writing' | 'discuss';
  appointment_timezone: string;
  appointment_windows: Array<{ day: string; time: string }>;
  guest_name: string;
  guest_email: string;
  guest_phone: string;
  preferred_channel: 'email' | 'phone' | 'whatsapp';
  marketing_consent: boolean;
}

const STORAGE_KEY = 'buildo_brief_draft_v1';

const servicesList = [
  { slug: 'portfolio', name: 'Portfolio & Studio', typical: '~3 days' },
  { slug: 'business-website', name: 'Business Website', typical: '~5 days' },
  { slug: 'web-app', name: 'Full Stack Web Application', typical: '~10 days' },
  { slug: 'ecommerce', name: 'Boutique Commerce', typical: '~7 days' },
  { slug: 'mobile-app', name: 'Android & iOS App', typical: '~14 days' },
  { slug: 'automation', name: 'Automation & Webhooks', typical: '~4 days' },
  { slug: 'deployment-bugfix', name: 'Deployment & Bug Fixing', typical: '~2 days' },
  { slug: 'custom-mvp', name: 'Other Custom MVP', typical: '~7 days' },
  { slug: 'not_sure', name: 'I am not sure yet', typical: 'Flexible' },
];

function BriefForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [draftSavedToast, setDraftSavedToast] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<BriefDraft>({
    service_slug: searchParams.get('service') || 'web-app',
    intake_method: 'type',
    idea_description: '',
    shared_link: '',
    target_audience: '',
    core_features: [],
    budget_range: 'not_sure',
    target_launch_date: 'flexible',
    work_mode: searchParams.get('mode') === 'discuss' ? 'discuss' : 'writing',
    appointment_timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC',
    appointment_windows: [{ day: 'Weekday mornings', time: '09:00 - 12:00' }],
    guest_name: '',
    guest_email: '',
    guest_phone: '',
    preferred_channel: 'email',
    marketing_consent: false,
  });

  const [featureInput, setFeatureInput] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; size: number }>>([]);

  // Load recoverable draft from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setFormData((prev) => ({ ...prev, ...parsed }));
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  // Auto-save draft changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
      setDraftSavedToast(true);
      const timer = setTimeout(() => setDraftSavedToast(false), 2000);
      return () => clearTimeout(timer);
    } catch {
      // Ignore quota errors
    }
  }, [formData]);

  const handleAddFeature = () => {
    if (featureInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        core_features: [...prev.core_features, featureInput.trim()],
      }));
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      core_features: prev.core_features.filter((_, i) => i !== idx),
    }));
  };

  // Mock handling of file dropzone (quarantined)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      if (attachedFiles.length + filesArray.length > 5) {
        alert('Maximum 5 files allowed (up to 10MB each).');
        return;
      }
      const newFiles = filesArray.map((f) => ({ name: f.name, size: f.size }));
      setAttachedFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // Validation before proceeding
  const handleNext = () => {
    setErrorMessage(null);
    if (step === 1) {
      if (!formData.idea_description.trim() && !formData.shared_link.trim() && attachedFiles.length === 0) {
        setErrorMessage('Please type your idea, paste a reference link, or attach a document before proceeding.');
        return;
      }
      setStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (step === 2) {
      setStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrorMessage(null);
    setStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!formData.guest_name.trim()) {
      setErrorMessage('Please provide your full name.');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.guest_email || !emailRegex.test(formData.guest_email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if ((formData.preferred_channel === 'phone' || formData.preferred_channel === 'whatsapp') && !formData.guest_phone) {
      setErrorMessage('A phone number with country code is required for Phone or WhatsApp preference.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedService = servicesList.find((s) => s.slug === formData.service_slug);
      const compositeDescription = formData.shared_link
        ? `${formData.idea_description}\n\nReference Link: ${formData.shared_link}`
        : formData.idea_description;

      const response = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service_name: selectedService?.name || 'Custom Service',
          idea_description: compositeDescription || 'Idea provided via document attachments.',
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit brief.');
      }

      // Clear draft on successful submission
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {}

      // Redirect to confirmation page
      router.push(`/brief/confirmation?code=${result.reference_code}&due=${encodeURIComponent(result.response_due_at)}`);
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-6 sm:px-8">
          
          {/* Header & Steps Tracker */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase tracking-widest font-semibold text-[var(--brand)]">
                Project Intake Brief
              </span>
              <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] font-mono">
                <Clock className="w-3.5 h-3.5 text-[var(--brand)]" />
                <span>6-hour guaranteed review</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-[var(--ink)] mb-3">
              Tell us what you want to build.
            </h1>
            <p className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
              Fill in what you know. We’ll review your brief, clarify edge cases, and deliver an exact written plan and fixed-price quote.
            </p>

            {/* Stepper Bar */}
            <div className="grid grid-cols-3 gap-3 mt-8">
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 1 ? 'bg-[var(--brand)]' : 'bg-[var(--border-light)]'
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 2 ? 'bg-[var(--brand)]' : 'bg-[var(--border-light)]'
                }`}
              />
              <div
                className={`h-2 rounded-full transition-all ${
                  step >= 3 ? 'bg-[var(--brand)]' : 'bg-[var(--border-light)]'
                }`}
              />
            </div>
            <div className="flex justify-between text-xs font-semibold text-[var(--text-muted)] mt-2">
              <span className={step === 1 ? 'text-[var(--brand)]' : ''}>1. Service & Concept</span>
              <span className={step === 2 ? 'text-[var(--brand)]' : ''}>2. Scope & Working Mode</span>
              <span className={step === 3 ? 'text-[var(--brand)]' : ''}>3. Review & Submit</span>
            </div>
          </div>

          {/* Draft Saved Indicator */}
          {draftSavedToast && (
            <div className="mb-6 p-2.5 rounded-[10px] bg-[var(--surface)] border border-[var(--border-light)] text-xs text-[var(--text-muted)] flex items-center justify-between shadow-sm">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--brand)]" />
                <span>Draft saved locally on this browser.</span>
              </span>
              <span className="text-[10px] opacity-70">Cleared on submit</span>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-6 p-4 rounded-[12px] bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
              <div>
                <p className="font-semibold">Please check your inputs</p>
                <p className="text-xs mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* Main Card */}
          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-6 sm:p-10 shadow-[var(--shadow-card)]">
            
            {/* STEP 1: SERVICE & CONCEPT */}
            {step === 1 && (
              <div className="space-y-8">
                {/* Service selection */}
                <div>
                  <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-3">
                    What type of product are you building?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map((srv) => {
                      const isSelected = formData.service_slug === srv.slug;
                      return (
                        <button
                          key={srv.slug}
                          type="button"
                          onClick={() => setFormData({ ...formData, service_slug: srv.slug })}
                          className={`p-3.5 rounded-[14px] text-left border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'border-[var(--brand)] bg-[var(--brand-soft)]/40 text-[var(--ink)] font-semibold'
                              : 'border-[var(--border-light)] bg-[var(--ivory)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                          }`}
                        >
                          <div>
                            <span className="text-sm block">{srv.name}</span>
                            <span className="text-[11px] opacity-70 font-mono">{srv.typical}</span>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[var(--brand)] flex-shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Intake Tabs: Type, Link, Upload */}
                <div>
                  <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-3">
                    How would you like to share your idea?
                  </label>
                  <div className="flex rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] p-1 mb-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, intake_method: 'type' })}
                      className={`flex-1 py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        formData.intake_method === 'type'
                          ? 'bg-[var(--surface)] text-[var(--brand)] shadow-sm'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>Type my idea</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, intake_method: 'link' })}
                      className={`flex-1 py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        formData.intake_method === 'link'
                          ? 'bg-[var(--surface)] text-[var(--brand)] shadow-sm'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <Link2 className="w-3.5 h-3.5" />
                      <span>Paste shared link</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, intake_method: 'upload' })}
                      className={`flex-1 py-2 rounded-[10px] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        formData.intake_method === 'upload'
                          ? 'bg-[var(--surface)] text-[var(--brand)] shadow-sm'
                          : 'text-[var(--text-muted)]'
                      }`}
                    >
                      <UploadCloud className="w-3.5 h-3.5" />
                      <span>Upload document</span>
                    </button>
                  </div>

                  {/* Type Input */}
                  {formData.intake_method === 'type' && (
                    <div>
                      <textarea
                        rows={5}
                        value={formData.idea_description}
                        onChange={(e) => setFormData({ ...formData, idea_description: e.target.value })}
                        placeholder="Describe what you want your website, app, or automation to do. (e.g., An online marketplace for vintage watches where sellers can verify authenticity and buyers can pay via escrow...)"
                        className="w-full p-4 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] focus:ring-1 focus:ring-[var(--brand)] text-[var(--ink)] placeholder:text-[var(--text-muted)]/60"
                      />
                    </div>
                  )}

                  {/* Shared Link Input */}
                  {formData.intake_method === 'link' && (
                    <div className="space-y-3">
                      <input
                        type="url"
                        value={formData.shared_link}
                        onChange={(e) => setFormData({ ...formData, shared_link: e.target.value })}
                        placeholder="https://chatgpt.com/share/... or Figma / Notion link"
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        Public shared links (such as ChatGPT public shares or public design boards) are treated as reference notes. We will never ask for your personal credentials.
                      </p>
                      <textarea
                        rows={3}
                        value={formData.idea_description}
                        onChange={(e) => setFormData({ ...formData, idea_description: e.target.value })}
                        placeholder="Add any specific context or focus areas from this link (optional)..."
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>
                  )}

                  {/* Document Upload Dropzone */}
                  {formData.intake_method === 'upload' && (
                    <div className="space-y-4">
                      <div className="border-2 border-dashed border-[var(--border-light)] rounded-[16px] p-6 text-center bg-[var(--ivory)] hover:border-[var(--brand)] transition-colors relative cursor-pointer">
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.docx,.txt,.png,.jpg,.jpeg"
                          onChange={handleFileUpload}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        <UploadCloud className="w-8 h-8 text-[var(--brand)] mx-auto mb-2" />
                        <p className="text-sm font-semibold text-[var(--ink)]">
                          Drop files here or click to browse
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-1">
                          Up to 5 files (PDF, DOCX, TXT, PNG, JPG) • Max 10MB each
                        </p>
                      </div>

                      {/* Quarantined Attachments list */}
                      {attachedFiles.length > 0 && (
                        <div className="space-y-2">
                          <span className="text-xs font-semibold text-[var(--text-muted)] block">
                            Attached Files ({attachedFiles.length}/5):
                          </span>
                          {attachedFiles.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-2.5 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)] text-xs"
                            >
                              <span className="truncate max-w-xs">{f.name}</span>
                              <span className="text-[10px] font-mono text-[var(--brand)] px-2 py-0.5 rounded bg-[var(--brand-soft)]">
                                Quarantined for scan
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <textarea
                        rows={3}
                        value={formData.idea_description}
                        onChange={(e) => setFormData({ ...formData, idea_description: e.target.value })}
                        placeholder="Add a short note explaining what these attachments contain..."
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>
                  )}
                </div>

                {/* Target Audience */}
                <div>
                  <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-2">
                    Who is this product for? <span className="text-xs font-normal text-[var(--text-muted)]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.target_audience}
                    onChange={(e) => setFormData({ ...formData, target_audience: e.target.value })}
                    placeholder="e.g. Small business owners, internal operations team, direct-to-consumer shoppers..."
                    className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                  />
                </div>

                {/* Next Button */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-semibold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
                  >
                    <span>Proceed to scope & timing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SCOPE & WORKING MODE */}
            {step === 2 && (
              <div className="space-y-8">
                {/* Core features builder */}
                <div>
                  <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-2">
                    Key features you know you need: <span className="text-xs font-normal text-[var(--text-muted)]">(Add as many as you like)</span>
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddFeature();
                        }
                      }}
                      placeholder="e.g. Stripe recurring billing, Google login, CSV export..."
                      className="flex-1 p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="px-5 rounded-[14px] bg-[var(--ink)] text-[var(--ivory)] text-sm font-semibold hover:bg-[var(--surface-dark)]"
                    >
                      Add
                    </button>
                  </div>

                  {/* Added features tags */}
                  {formData.core_features.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {formData.core_features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--ivory)] border border-[var(--border-light)] text-xs font-medium text-[var(--ink)]"
                        >
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="text-[var(--text-muted)] hover:text-rose-600"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Budget Range & Timing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-2">
                      Estimated Budget Range
                    </label>
                    <select
                      value={formData.budget_range}
                      onChange={(e) => setFormData({ ...formData, budget_range: e.target.value })}
                      className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    >
                      <option value="not_sure">Not sure / Advise based on scope</option>
                      <option value="under_2500">Under $2,500 USD</option>
                      <option value="2500_5000">$2,500 – $5,000 USD</option>
                      <option value="5000_10000">$5,000 – $10,000 USD</option>
                      <option value="10000_plus">$10,000+ USD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-2">
                      Target Launch Target
                    </label>
                    <select
                      value={formData.target_launch_date}
                      onChange={(e) => setFormData({ ...formData, target_launch_date: e.target.value })}
                      className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                    >
                      <option value="flexible">Flexible / When ready</option>
                      <option value="asap">As soon as possible (Sprint)</option>
                      <option value="within_2_weeks">Within 2 weeks</option>
                      <option value="within_month">Within 1 month</option>
                    </select>
                  </div>
                </div>

                {/* Working Mode Preference */}
                <div>
                  <label className="block text-sm font-heading font-bold text-[var(--ink)] mb-3">
                    Preferred Working Mode
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, work_mode: 'writing' })}
                      className={`p-5 rounded-[16px] text-left border transition-all ${
                        formData.work_mode === 'writing'
                          ? 'border-[var(--brand)] bg-[var(--brand-soft)]/30'
                          : 'border-[var(--border-light)] bg-[var(--ivory)] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-[var(--brand)]" />
                        <h4 className="font-heading font-bold text-sm text-[var(--ink)]">
                          “Keep it in writing”
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        100% async. Receive written proposals, milestone updates, and staging links directly in your workspace.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, work_mode: 'discuss' })}
                      className={`p-5 rounded-[16px] text-left border transition-all ${
                        formData.work_mode === 'discuss'
                          ? 'border-[var(--brand)] bg-[var(--brand-soft)]/30'
                          : 'border-[var(--border-light)] bg-[var(--ivory)] opacity-70 hover:opacity-100'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Video className="w-4 h-4 text-[var(--brand)]" />
                        <h4 className="font-heading font-bold text-sm text-[var(--ink)]">
                          “Let’s discuss it”
                        </h4>
                      </div>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                        Request a 20-minute video session with our engineering lead to align on scope before proposal delivery.
                      </p>
                    </button>
                  </div>

                  {/* Appointment slot window picker if discuss mode is chosen */}
                  {formData.work_mode === 'discuss' && (
                    <div className="mt-4 p-4 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-[var(--ink)]">Your Detected Timezone:</span>
                        <span className="font-mono text-[var(--brand)]">{formData.appointment_timezone}</span>
                      </div>
                      <div>
                        <label className="block text-xs text-[var(--text-muted)] mb-1">
                          Preferred Meeting Windows:
                        </label>
                        <select
                          className="w-full p-2.5 rounded-[10px] bg-[var(--surface)] border border-[var(--border-light)] text-xs text-[var(--ink)]"
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              appointment_windows: [{ day: e.target.value, time: 'Flexible slot' }],
                            })
                          }
                        >
                          <option value="Weekday mornings (9 AM - 12 PM)">Weekday mornings (9 AM - 12 PM)</option>
                          <option value="Weekday afternoons (1 PM - 5 PM)">Weekday afternoons (1 PM - 5 PM)</option>
                          <option value="Weekday evenings (6 PM - 9 PM)">Weekday evenings (6 PM - 9 PM)</option>
                        </select>
                      </div>
                      <p className="text-[11px] text-[var(--text-muted)] italic">
                        * Note: A requested time window is checked for staff availability and formally confirmed in your acknowledgement.
                      </p>
                    </div>
                  )}
                </div>

                {/* Back / Next Buttons */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] border border-[var(--border-light)] text-sm font-semibold hover:bg-[var(--ivory)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-semibold text-sm shadow-sm hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98]"
                  >
                    <span>Proceed to review</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: CONTACT & SUMMARY REVIEW */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact information */}
                <div className="space-y-4">
                  <h3 className="text-base font-heading font-bold text-[var(--ink)]">
                    Where should we send your plan?
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.guest_name}
                        onChange={(e) => setFormData({ ...formData, guest_name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.guest_email}
                        onChange={(e) => setFormData({ ...formData, guest_email: e.target.value })}
                        placeholder="alex@example.com"
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Preferred Channel
                      </label>
                      <select
                        value={formData.preferred_channel}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            preferred_channel: e.target.value as any,
                          })
                        }
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone Call</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                        Phone with Country Code{' '}
                        {formData.preferred_channel !== 'email' ? (
                          <span className="text-rose-600">*</span>
                        ) : (
                          <span className="text-[var(--text-muted)] font-normal">(Optional)</span>
                        )}
                      </label>
                      <input
                        type="tel"
                        value={formData.guest_phone}
                        onChange={(e) => setFormData({ ...formData, guest_phone: e.target.value })}
                        placeholder="+1 (555) 000-0000"
                        className="w-full p-3.5 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                      />
                    </div>
                  </div>

                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer text-xs text-[var(--text-muted)]">
                      <input
                        type="checkbox"
                        checked={formData.marketing_consent}
                        onChange={(e) => setFormData({ ...formData, marketing_consent: e.target.checked })}
                        className="mt-0.5 rounded text-[var(--brand)] focus:ring-[var(--brand)]"
                      />
                      <span>
                        Optional: Keep me informed of future BuilDo product capabilities and technical deep-dives (uncheck anytime).
                      </span>
                    </label>
                  </div>
                </div>

                {/* Brief Summary Box */}
                <div className="p-5 rounded-[16px] bg-[var(--ivory)] border border-[var(--border-light)] space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-light)]">
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--ink)]">
                      Brief Submission Summary
                    </span>
                    <span className="text-xs font-mono text-[var(--brand)] font-semibold">
                      {formData.work_mode === 'discuss' ? 'Discussion Requested' : 'Async Written Mode'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-[var(--text-muted)] block">Selected Category:</span>
                      <span className="font-semibold text-[var(--ink)]">
                        {servicesList.find((s) => s.slug === formData.service_slug)?.name}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--text-muted)] block">Budget Range:</span>
                      <span className="font-semibold text-[var(--ink)]">{formData.budget_range}</span>
                    </div>
                  </div>

                  <div className="text-xs pt-1">
                    <span className="text-[var(--text-muted)] block mb-1">Concept Summary:</span>
                    <p className="text-[var(--ink)] italic bg-[var(--surface)] p-2.5 rounded-[8px] border border-[var(--border-light)] line-clamp-3">
                      “{formData.idea_description || formData.shared_link || 'Document attached'}”
                    </p>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-[12px] border border-[var(--border-light)] text-sm font-semibold hover:bg-[var(--ivory)]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm shadow-md hover:bg-[var(--brand-hover)] transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Sending your brief...</span>
                    ) : (
                      <>
                        <span>Submit brief for review</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function BriefPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--ivory)] flex items-center justify-center">Loading brief...</div>}>
      <BriefForm />
    </Suspense>
  );
}
