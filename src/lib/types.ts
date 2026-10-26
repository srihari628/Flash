export type UserRole = 'customer' | 'staff' | 'developer' | 'reviewer' | 'admin';

export type BriefStatus = 'submitted' | 'in_review' | 'proposal_sent' | 'accepted' | 'archived';
export type WorkPreference = 'discuss' | 'writing';
export type ContactChannel = 'email' | 'phone' | 'whatsapp';
export type AppointmentStatus = 'requested' | 'confirmed' | 'cancelled' | 'completed';
export type ProposalStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'superseded';
export type ProjectStatus = 'scoping' | 'in_progress' | 'review' | 'handover' | 'completed' | 'paused';
export type MilestoneStatus = 'pending' | 'in_progress' | 'review_ready' | 'approved';
export type ApprovalDecision = 'approved' | 'changes_requested';
export type ChangeRequestStatus = 'requested' | 'estimated' | 'accepted' | 'declined';
export type InvoiceStatus = 'draft' | 'issued' | 'paid' | 'void';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type ProvenanceType = 'client_work' | 'team_project' | 'concept';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string | null;
  phone?: string | null;
  role: UserRole;
  company_name?: string | null;
  bio?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  outcome: string;
  typical_days: number;
  starting_price_minor: number;
  currency: string;
  features: string[];
  deliverables: string[];
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  summary: string;
  role: string;
  delivery_evidence: string;
  provenance: ProvenanceType;
  features: string[];
  preview_ui_data: Record<string, any>;
  image_url?: string | null;
  thumbnail_url?: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
}

export interface Brief {
  id: string;
  reference_code: string;
  user_id?: string | null;
  guest_name: string;
  guest_email: string;
  guest_phone?: string | null;
  preferred_channel: ContactChannel;
  service_id?: string | null;
  service_name?: string | null;
  work_mode: WorkPreference;
  idea_description: string;
  target_audience?: string | null;
  core_features: string[];
  budget_range: string;
  target_launch_date?: string | null;
  appointment_timezone?: string | null;
  appointment_windows: Array<{ day: string; time: string }>;
  marketing_consent: boolean;
  status: BriefStatus;
  submitted_at: string;
  response_due_at?: string | null;
  first_human_response_at?: string | null;
  response_owner_id?: string | null;
  claim_token?: string | null;
  created_at: string;
  updated_at: string;
}

export interface BriefAttachment {
  id: string;
  brief_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  storage_path: string;
  quarantine_status: 'quarantined' | 'approved' | 'rejected';
  created_at: string;
}

export interface Appointment {
  id: string;
  brief_id?: string | null;
  customer_id?: string | null;
  staff_id?: string | null;
  customer_name: string;
  customer_email: string;
  requested_slot: string;
  confirmed_slot?: string | null;
  timezone: string;
  status: AppointmentStatus;
  meeting_link?: string | null;
  notes?: string | null;
  created_at: string;
}

export interface Proposal {
  id: string;
  brief_id?: string | null;
  project_id?: string | null;
  version: number;
  title: string;
  summary: string;
  deliverables: string[];
  exclusions: string[];
  revisions_allowed: number;
  start_date?: string | null;
  delivery_target_date?: string | null;
  currency: string;
  total_amount_minor: number;
  payment_schedule_type: 'milestone_split' | 'advance_full' | 'discovery_first';
  milestone_breakdown: Array<{ name: string; percentage: number; amount_minor: number }>;
  client_dependencies: string[];
  support_terms: string;
  status: ProposalStatus;
  valid_until?: string | null;
  created_at: string;
  accepted_at?: string | null;
}

export interface Project {
  id: string;
  brief_id?: string | null;
  proposal_id?: string | null;
  customer_id: string;
  project_lead_id?: string | null;
  name: string;
  status: ProjectStatus;
  start_date?: string | null;
  target_delivery_date?: string | null;
  repository_url?: string | null;
  preview_url?: string | null;
  scope_summary?: string | null;
  handover_checklist: Array<{ title: string; done: boolean; notes?: string }>;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  project_id: string;
  title: string;
  description?: string | null;
  sequence: number;
  status: MilestoneStatus;
  due_date?: string | null;
  approved_at?: string | null;
  created_at: string;
}

export interface Preview {
  id: string;
  project_id: string;
  milestone_id?: string | null;
  version: number;
  title: string;
  preview_url: string;
  screenshot_url?: string | null;
  notes?: string | null;
  status: string;
  created_at: string;
}

export interface Approval {
  id: string;
  project_id: string;
  preview_id: string;
  milestone_id?: string | null;
  decided_by: string;
  decision: ApprovalDecision;
  feedback_notes?: string | null;
  created_at: string;
}

export interface ChangeRequest {
  id: string;
  project_id: string;
  requested_by: string;
  title: string;
  description: string;
  scope_impact?: string | null;
  price_impact_minor: number;
  timing_impact_days: number;
  status: ChangeRequestStatus;
  accepted_at?: string | null;
  created_at: string;
}

export interface Message {
  id: string;
  project_id: string;
  sender_id?: string | null;
  sender_name: string;
  sender_role: string;
  content: string;
  is_internal_note: boolean;
  attachments: Array<{ name: string; url: string; size?: number }>;
  read_at?: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  project_id: string;
  proposal_id?: string | null;
  invoice_number: string;
  currency: string;
  amount_minor: number;
  due_date?: string | null;
  status: InvoiceStatus;
  provider: string;
  provider_session_id?: string | null;
  paid_at?: string | null;
  created_at: string;
}

export interface SupportTicket {
  id: string;
  project_id?: string | null;
  customer_id: string;
  assigned_to?: string | null;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteSettingsResponsePromise {
  enabled: boolean;
  mode: 'elapsed_hours' | 'business_hours';
  target_hours: number;
  headline: string;
  working_timezone: string;
  office_hours_start: string;
  office_hours_end: string;
  alert_at_hours: number[];
}
