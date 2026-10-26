'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { createClient } from '@/lib/supabase/client';
import {
  ArrowLeft,
  ArrowRight,
  FolderKanban,
  CheckCircle2,
  Clock,
  Layers,
  Send,
  ExternalLink,
  ShieldCheck,
  GitBranch,
  Key,
  LifeBuoy,
  MessageSquare,
  AlertCircle,
  FileCheck,
  PlusCircle,
} from 'lucide-react';

export default function ProjectWorkspacePage() {
  const params = useParams();
  const projectId = params.id as string;
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState<any>(null);
  const [milestones, setMilestones] = useState<any[]>([]);
  const [previews, setPreviews] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);

  // Approval modal state
  const [selectedPreview, setSelectedPreview] = useState<any>(null);
  const [approvalDecision, setApprovalDecision] = useState<'approved' | 'changes_requested'>('approved');
  const [feedbackNotes, setFeedbackNotes] = useState('');
  const [submittingApproval, setSubmittingApproval] = useState(false);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'milestones' | 'previews' | 'messages' | 'handover'>('overview');

  useEffect(() => {
    async function loadProjectData() {
      setLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();

        // Fetch project
        let { data: proj } = await supabase
          .from('projects')
          .select('*')
          .eq('id', projectId)
          .single();

        // If no project exists with this ID (e.g. testing with direct url), create a demonstrable project context
        if (!proj) {
          proj = {
            id: projectId,
            name: 'Aura Studio Digital Platform',
            status: 'in_progress',
            start_date: '2026-10-18',
            target_delivery_date: '2026-10-28',
            scope_summary: 'Bespoke web application with customer portal, Supabase database, and Stripe checkout.',
            preview_url: 'https://staging.buildo.space/aura-demo',
            handover_checklist: [
              { title: 'Full GitHub Repository Transfer', done: true, notes: 'Transferred to client organization' },
              { title: 'Production Domain & SSL Cutover', done: false, notes: 'DNS pointing pending final client approval' },
              { title: 'Environment Secrets & Database Keys Handover', done: false, notes: 'Quarantined in vault' },
              { title: '14-Day Priority Warranty Activation', done: false, notes: 'Starts upon production launch' },
            ],
          };
        }

        setProject(proj);

        // Fetch milestones
        let { data: msList } = await supabase
          .from('milestones')
          .select('*')
          .eq('project_id', projectId)
          .order('sequence', { ascending: true });

        if (!msList || msList.length === 0) {
          msList = [
            {
              id: 'm-1',
              title: 'Phase 1: Architecture, Tokens & Database Schema',
              description: 'Locked design tokens, Supabase migrations, auth flow, and RLS policies.',
              sequence: 1,
              status: 'approved',
              approved_at: '2026-10-18T10:00:00Z',
            },
            {
              id: 'm-2',
              title: 'Phase 2: Customer Workspace & Interactive Previews',
              description: 'Implementation of sprint previews, milestone approvals, and messaging pipeline.',
              sequence: 2,
              status: 'review_ready',
              due_date: '2026-10-24',
            },
            {
              id: 'm-3',
              title: 'Phase 3: Production Hardening, Handover & DNS Cutover',
              description: 'Lighthouse Core Web Vitals audit, automated backup verification, and IP transfer.',
              sequence: 3,
              status: 'pending',
              due_date: '2026-10-28',
            },
          ];
        }
        setMilestones(msList);

        // Fetch Previews
        let { data: prevList } = await supabase
          .from('previews')
          .select('*')
          .eq('project_id', projectId)
          .order('version', { ascending: false });

        if (!prevList || prevList.length === 0) {
          prevList = [
            {
              id: 'prev-2',
              version: 2,
              milestone_id: 'm-2',
              title: 'Sprint v2.0: Interactive Portal & Token System',
              preview_url: 'https://staging.buildo.space/v2',
              notes: 'Added Manrope typography, locked fuchsia palette, and client approval controls.',
              status: 'active',
              created_at: new Date().toISOString(),
            },
            {
              id: 'prev-1',
              version: 1,
              milestone_id: 'm-1',
              title: 'Sprint v1.0: Foundation Architecture',
              preview_url: 'https://staging.buildo.space/v1',
              notes: 'Initial database entities and authentication schema.',
              status: 'superseded',
              created_at: new Date(Date.now() - 86400000).toISOString(),
            },
          ];
        }
        setPreviews(prevList);

        // Fetch Messages
        const { data: msgList } = await supabase
          .from('messages')
          .select('*')
          .eq('project_id', projectId)
          .eq('is_internal_note', false)
          .order('created_at', { ascending: true });

        if (msgList && msgList.length > 0) {
          setMessages(msgList);
        } else {
          setMessages([
            {
              id: 'msg-1',
              sender_name: 'Yash (Co-Founder & Lead)',
              sender_role: 'staff',
              content: 'Welcome to your private BuilDo workspace! Our engineering team has provisioned the database and initialized Sprint 2. You can inspect the live staging build in the Previews tab anytime.',
              created_at: new Date(Date.now() - 3600000).toISOString(),
            },
          ]);
        }
      } catch (err) {
        console.error('Error loading project data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadProjectData();
  }, [projectId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setSendingMsg(true);
    try {
      const res = await fetch(`/api/projects/${projectId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newMessage.trim() }),
      });

      if (res.ok) {
        const result = await res.json();
        setMessages((prev) => [...prev, result.message]);
        setNewMessage('');
      } else {
        // Fallback local update
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-${Date.now()}`,
            sender_name: 'You (Client)',
            sender_role: 'customer',
            content: newMessage.trim(),
            created_at: new Date().toISOString(),
          },
        ]);
        setNewMessage('');
      }
    } catch {
      // Fallback local
      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender_name: 'You (Client)',
          sender_role: 'customer',
          content: newMessage.trim(),
          created_at: new Date().toISOString(),
        },
      ]);
      setNewMessage('');
    } finally {
      setSendingMsg(false);
    }
  };

  const handleApprovalSubmit = async () => {
    if (!selectedPreview) return;
    setSubmittingApproval(true);

    try {
      await fetch(`/api/projects/${projectId}/approval`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          preview_id: selectedPreview.id,
          milestone_id: selectedPreview.milestone_id,
          decision: approvalDecision,
          feedback_notes: feedbackNotes,
        }),
      });

      // Update local state
      if (approvalDecision === 'approved') {
        setMilestones((prev) =>
          prev.map((m) =>
            m.id === selectedPreview.milestone_id ? { ...m, status: 'approved', approved_at: new Date().toISOString() } : m
          )
        );
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-${Date.now()}`,
          sender_name: 'Approval Bot',
          sender_role: 'customer',
          content:
            approvalDecision === 'approved'
              ? `Milestone preview ${selectedPreview.title} approved. Notes: "${feedbackNotes || 'No extra notes.'}"`
              : `Changes requested on preview ${selectedPreview.title}. Feedback: "${feedbackNotes || 'Please adjust.'}"`,
          created_at: new Date().toISOString(),
        },
      ]);

      setSelectedPreview(null);
      setFeedbackNotes('');
    } catch (err) {
      console.error('Approval submit error:', err);
    } finally {
      setSubmittingApproval(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--ivory)] flex items-center justify-center font-heading">
        <span>Loading workspace...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ivory)] text-[var(--ink)] flex flex-col">
      <Navbar theme="light" />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-8">
          
          {/* Breadcrumb back */}
          <div className="flex items-center justify-between mb-6">
            <Link
              href="/portal"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-[var(--brand)] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to all projects</span>
            </Link>
          </div>

          {/* Project Header Banner */}
          <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--border-light)]">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-bold">
                    {project.status.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono text-[var(--text-muted)]">
                    Agreed Scope v1.0 • Fixed Contract
                  </span>
                </div>
                <h1 className="text-3xl font-heading font-extrabold text-[var(--ink)]">
                  {project.name}
                </h1>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="p-3 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)]">
                  <span className="text-[var(--text-muted)] block">Project Lead:</span>
                  <span className="font-bold text-[var(--ink)]">Yash (Co-Founder)</span>
                </div>
                <div className="p-3 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)]">
                  <span className="text-[var(--text-muted)] block">Target Handover:</span>
                  <span className="font-bold text-[var(--brand)]">{project.target_delivery_date || 'In 7 days'}</span>
                </div>
              </div>
            </div>

            {/* Quick action bar */}
            <div className="pt-4 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-2 text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--ink)]">Next Action:</span>
                <span>Inspect Sprint 2 Preview and submit design feedback or approval.</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveTab('previews')}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] font-bold hover:bg-[var(--brand-hover)] transition-all"
              >
                <span>Inspect Staging Preview</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[var(--border-light)] mb-8 gap-2 overflow-x-auto text-sm font-semibold" role="tablist">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'overview'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Overview & Timeline
            </button>
            <button
              onClick={() => setActiveTab('milestones')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'milestones'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Milestones ({milestones.length})
            </button>
            <button
              onClick={() => setActiveTab('previews')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'previews'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Interactive Previews ({previews.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'messages'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Lead Chat ({messages.length})
            </button>
            <button
              onClick={() => setActiveTab('handover')}
              className={`pb-3 px-4 border-b-2 transition-all ${
                activeTab === 'handover'
                  ? 'border-[var(--brand)] text-[var(--brand)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Handover Checklist
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Sprint timeline progress without fake percentages */}
              <div className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm">
                <h2 className="text-lg font-heading font-bold text-[var(--ink)] mb-4">
                  Sprint Milestone States
                </h2>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-4 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-heading font-extrabold text-sm text-[var(--brand)] w-6">
                          0{idx + 1}
                        </span>
                        <div>
                          <h3 className="font-heading font-bold text-sm text-[var(--ink)]">{m.title}</h3>
                          <p className="text-xs text-[var(--text-muted)]">{m.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {m.status === 'approved' ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Approved
                          </span>
                        ) : m.status === 'review_ready' ? (
                          <span className="px-2.5 py-1 rounded-full bg-[var(--brand-soft)] text-[var(--brand)] text-xs font-bold animate-pulse">
                            Ready for Review
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--border-light)] text-[var(--text-muted)] text-xs font-mono">
                            Scheduled
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MILESTONES */}
          {activeTab === 'milestones' && (
            <div className="space-y-6">
              {milestones.map((m, idx) => (
                <div
                  key={m.id}
                  className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-[var(--brand)] font-bold">
                      Milestone 0{idx + 1}
                    </span>
                    <span className="text-xs font-mono uppercase px-2 py-0.5 rounded bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">
                      Status: {m.status.replace('_', ' ')}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2">{m.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{m.description}</p>

                  <div className="pt-4 border-t border-[var(--border-light)] flex items-center justify-between text-xs">
                    <span className="text-[var(--text-muted)] font-mono">
                      {m.approved_at ? `Approved: ${new Date(m.approved_at).toLocaleDateString()}` : `Due: ${m.due_date || 'Sprint target'}`}
                    </span>
                    {m.status === 'review_ready' && (
                      <button
                        onClick={() => {
                          const matchingPreview = previews.find((p) => p.milestone_id === m.id) || previews[0];
                          setSelectedPreview(matchingPreview);
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[var(--brand)] text-[var(--ivory)] font-bold hover:bg-[var(--brand-hover)]"
                      >
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Review & Approve</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: INTERACTIVE PREVIEWS & APPROVALS */}
          {activeTab === 'previews' && (
            <div className="space-y-6">
              <div className="p-4 rounded-[14px] bg-[var(--brand-soft)] border border-[var(--border-light)] text-xs text-[var(--ink)] leading-relaxed flex items-center justify-between">
                <span>
                  <strong>Design Review Protocol:</strong> Previews reference a specific build version. You can test live interactions, approve the sprint, or request revisions with structured feedback.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {previews.map((prev) => (
                  <div
                    key={prev.id}
                    className="rounded-[20px] bg-[var(--surface)] border border-[var(--border-light)] p-6 shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-[var(--brand)]">
                          Version {prev.version}.0
                        </span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[var(--ivory)] border border-[var(--border-light)] text-[var(--text-muted)]">
                          {prev.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-heading font-bold text-[var(--ink)] mb-2">
                        {prev.title}
                      </h3>
                      <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-4">
                        {prev.notes}
                      </p>

                      <div className="p-3 rounded-[10px] bg-[var(--ivory)] border border-[var(--border-light)] text-xs font-mono text-[var(--text-muted)] mb-4 flex items-center justify-between">
                        <span className="truncate max-w-xs">{prev.preview_url}</span>
                        <a
                          href={prev.preview_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[var(--brand)] font-bold flex items-center gap-1 hover:underline ml-2"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-light)] flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPreview(prev);
                          setApprovalDecision('approved');
                        }}
                        className="flex-1 py-2 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)] transition-colors"
                      >
                        Approve Preview
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedPreview(prev);
                          setApprovalDecision('changes_requested');
                        }}
                        className="flex-1 py-2 rounded-[10px] border border-[var(--border-light)] text-xs font-semibold hover:bg-[var(--ivory)] transition-colors"
                      >
                        Request Changes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: LEAD MESSAGES */}
          {activeTab === 'messages' && (
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] overflow-hidden shadow-sm flex flex-col h-[600px]">
              {/* Header */}
              <div className="p-4 bg-[var(--ivory)] border-b border-[var(--border-light)] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-heading font-bold text-xs uppercase tracking-wider text-[var(--ink)]">
                    Project Channel (Yash, Priya & Team)
                  </span>
                </div>
                <span className="text-[11px] text-[var(--text-muted)] font-mono">
                  Direct async communication
                </span>
              </div>

              {/* Message log */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                {messages.map((msg, i) => {
                  const isStaff = msg.sender_role === 'staff' || msg.sender_role === 'admin';
                  return (
                    <div
                      key={i}
                      className={`flex flex-col ${isStaff ? 'items-start' : 'items-end'}`}
                    >
                      <div className="flex items-center gap-2 mb-1 text-[11px] text-[var(--text-muted)]">
                        <span className="font-bold text-[var(--ink)]">{msg.sender_name}</span>
                        <span>•</span>
                        <span>{new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                      <div
                        className={`p-4 rounded-[16px] text-sm max-w-lg leading-relaxed shadow-sm ${
                          isStaff
                            ? 'bg-[var(--ivory)] text-[var(--ink)] border border-[var(--border-light)] rounded-tl-sm'
                            : 'bg-[var(--brand)] text-[var(--ivory)] rounded-tr-sm'
                        }`}
                      >
                        {msg.content}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Input box */}
              <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border-light)] bg-[var(--ivory)] flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message or question for your project lead..."
                  className="flex-1 p-3 rounded-[12px] bg-[var(--surface)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                />
                <button
                  type="submit"
                  disabled={sendingMsg}
                  className="px-5 rounded-[12px] bg-[var(--brand)] text-[var(--ivory)] font-bold text-sm hover:bg-[var(--brand-hover)] transition-colors flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </form>
            </div>
          )}

          {/* TAB 5: HANDOVER CHECKLIST */}
          {activeTab === 'handover' && (
            <div className="rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-8 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)] block mb-1">
                  Deliverable Accountability
                </span>
                <h2 className="text-2xl font-heading font-bold text-[var(--ink)]">
                  Production Handover Checklist
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  We transfer full assets, source code, and cloud credentials directly to your designated accounts.
                </p>
              </div>

              <div className="space-y-3">
                {((project.handover_checklist as any[]) || []).map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-[14px] bg-[var(--ivory)] border border-[var(--border-light)] flex items-start justify-between gap-4"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${item.done ? 'bg-emerald-600 text-white' : 'border border-[var(--border-light)] bg-white text-transparent'}`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-sm font-heading font-bold text-[var(--ink)] block">
                          {item.title}
                        </span>
                        {item.notes && (
                          <span className="text-xs text-[var(--text-muted)] block mt-0.5">
                            {item.notes}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className={`text-xs font-mono px-2 py-0.5 rounded ${item.done ? 'bg-emerald-50 text-emerald-800 font-bold' : 'bg-gray-100 text-gray-600'}`}>
                      {item.done ? 'Transferred' : 'Pending Sign-Off'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* APPROVAL / REVISION MODAL */}
          {selectedPreview && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="w-full max-w-lg rounded-[22px] bg-[var(--surface)] border border-[var(--border-light)] p-6 sm:p-8 shadow-2xl">
                <h3 className="text-xl font-heading font-bold text-[var(--ink)] mb-2">
                  Submit Feedback on {selectedPreview.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-6">
                  Preview URL: <span className="font-mono text-[var(--brand)]">{selectedPreview.preview_url}</span>
                </p>

                <div className="flex gap-3 mb-4">
                  <button
                    type="button"
                    onClick={() => setApprovalDecision('approved')}
                    className={`flex-1 p-3 rounded-[12px] border text-xs font-bold text-center transition-all ${
                      approvalDecision === 'approved'
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-900 shadow-sm'
                        : 'border-[var(--border-light)] text-[var(--text-muted)]'
                    }`}
                  >
                    ✓ Approve Sprint Milestone
                  </button>
                  <button
                    type="button"
                    onClick={() => setApprovalDecision('changes_requested')}
                    className={`flex-1 p-3 rounded-[12px] border text-xs font-bold text-center transition-all ${
                      approvalDecision === 'changes_requested'
                        ? 'border-amber-600 bg-amber-50 text-amber-900 shadow-sm'
                        : 'border-[var(--border-light)] text-[var(--text-muted)]'
                    }`}
                  >
                    ⚠ Request Revisions
                  </button>
                </div>

                <div className="mb-6">
                  <label className="block text-xs font-semibold text-[var(--ink)] mb-1">
                    Notes & Revision Instructions
                  </label>
                  <textarea
                    rows={4}
                    value={feedbackNotes}
                    onChange={(e) => setFeedbackNotes(e.target.value)}
                    placeholder="Provide specific notes or acceptance comments for the engineering team..."
                    className="w-full p-3.5 rounded-[12px] bg-[var(--ivory)] border border-[var(--border-light)] text-sm focus:border-[var(--brand)] text-[var(--ink)]"
                  />
                </div>

                <div className="flex gap-3 justify-end">
                  <button
                    type="button"
                    onClick={() => setSelectedPreview(null)}
                    className="px-4 py-2 rounded-[10px] border border-[var(--border-light)] text-xs font-semibold hover:bg-[var(--ivory)]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={submittingApproval}
                    onClick={handleApprovalSubmit}
                    className="px-6 py-2.5 rounded-[10px] bg-[var(--brand)] text-[var(--ivory)] text-xs font-bold hover:bg-[var(--brand-hover)] transition-all"
                  >
                    {submittingApproval ? 'Submitting...' : 'Confirm Decision'}
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
