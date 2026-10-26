-- BuilDo Master Database Migration
-- Version 1.0.0
-- Implements complete schema for Services, Portfolio, Briefs/Leads, Appointments,
-- Proposals, Projects, Milestones, Previews, Approvals, Change Requests,
-- Messages, Invoices, Payment Events, Support Tickets, Site Settings, and Audit Events.

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS & DOMAINS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('customer', 'staff', 'developer', 'reviewer', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE brief_status AS ENUM ('submitted', 'in_review', 'proposal_sent', 'accepted', 'archived');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE work_preference AS ENUM ('discuss', 'writing');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contact_channel AS ENUM ('email', 'phone', 'whatsapp');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE appointment_status AS ENUM ('requested', 'confirmed', 'cancelled', 'completed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE proposal_status AS ENUM ('draft', 'sent', 'accepted', 'rejected', 'superseded');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE project_status AS ENUM ('scoping', 'in_progress', 'review', 'handover', 'completed', 'paused');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE milestone_status AS ENUM ('pending', 'in_progress', 'review_ready', 'approved');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE approval_decision AS ENUM ('approved', 'changes_requested');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE change_request_status AS ENUM ('requested', 'estimated', 'accepted', 'declined');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE invoice_status AS ENUM ('draft', 'issued', 'paid', 'void');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE provenance_type AS ENUM ('client_work', 'team_project', 'concept');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    avatar_url TEXT,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'customer',
    company_name TEXT,
    bio TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Seed initial site settings (Response promise & operational parameters)
INSERT INTO public.site_settings (key, value, description)
VALUES 
(
    'response_promise',
    '{
        "enabled": true,
        "mode": "elapsed_hours",
        "target_hours": 6,
        "headline": "Guaranteed response within 6 hours",
        "working_timezone": "UTC",
        "office_hours_start": "08:00",
        "office_hours_end": "22:00",
        "alert_at_hours": [2, 4, 5]
    }'::jsonb,
    'Operational response SLA parameters for brief evaluations and appointment replies'
),
(
    'company_profile',
    '{
        "name": "BuilDo",
        "tagline": "Your idea. Live in days.",
        "description": "Managed digital product service for custom websites, apps, and automations.",
        "founders": [
            {"name": "Yash", "role": "Co-Founder & Engineering Lead", "bio": "Systems architect specializing in high-performance web applications and resilient infra."},
            {"name": "Priya", "role": "Co-Founder & Product Design Lead", "bio": "Design lead focused on editorial visual craft, product clarity, and conversion typography."}
        ],
        "team_leads": [
            {"name": "Dev", "role": "Full-Stack Project Lead", "bio": "Specialist in end-to-end web architectures, APIs, and scalable databases."},
            {"name": "Ananya", "role": "Design Systems & Mobile Lead", "bio": "Specialist in cross-platform mobile apps and responsive interface engineering."}
        ],
        "support_email": "hello@buildo.design"
    }'::jsonb,
    'Truthful company profile and leadership biographies'
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- 5. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    tagline TEXT NOT NULL,
    description TEXT NOT NULL,
    outcome TEXT NOT NULL,
    typical_days INTEGER NOT NULL,
    starting_price_minor INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 6. PORTFOLIO ITEMS
CREATE TABLE IF NOT EXISTS public.portfolio_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    summary TEXT NOT NULL,
    role TEXT NOT NULL,
    delivery_evidence TEXT NOT NULL,
    provenance provenance_type NOT NULL DEFAULT 'concept',
    features JSONB NOT NULL DEFAULT '[]'::jsonb,
    preview_ui_data JSONB NOT NULL DEFAULT '{}'::jsonb,
    image_url TEXT,
    thumbnail_url TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 7. BRIEFS / LEADS
CREATE TABLE IF NOT EXISTS public.briefs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_code TEXT UNIQUE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    guest_name TEXT NOT NULL,
    guest_email TEXT NOT NULL,
    guest_phone TEXT,
    preferred_channel contact_channel NOT NULL DEFAULT 'email',
    service_id UUID REFERENCES public.services(id) ON DELETE SET NULL,
    service_name TEXT,
    work_mode work_preference NOT NULL DEFAULT 'writing',
    idea_description TEXT NOT NULL,
    target_audience TEXT,
    core_features JSONB NOT NULL DEFAULT '[]'::jsonb,
    budget_range TEXT NOT NULL DEFAULT 'not_sure',
    target_launch_date TEXT,
    appointment_timezone TEXT,
    appointment_windows JSONB NOT NULL DEFAULT '[]'::jsonb,
    marketing_consent BOOLEAN NOT NULL DEFAULT false,
    status brief_status NOT NULL DEFAULT 'submitted',
    submitted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    response_due_at TIMESTAMPTZ,
    first_human_response_at TIMESTAMPTZ,
    response_owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    claim_token TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 8. BRIEF ATTACHMENTS
CREATE TABLE IF NOT EXISTS public.brief_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brief_id UUID NOT NULL REFERENCES public.briefs(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    file_type TEXT NOT NULL,
    storage_path TEXT NOT NULL,
    quarantine_status TEXT NOT NULL DEFAULT 'quarantined' CHECK (quarantine_status IN ('quarantined', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 9. APPOINTMENTS
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brief_id UUID REFERENCES public.briefs(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    staff_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    requested_slot TIMESTAMPTZ NOT NULL,
    confirmed_slot TIMESTAMPTZ,
    timezone TEXT NOT NULL DEFAULT 'UTC',
    status appointment_status NOT NULL DEFAULT 'requested',
    meeting_link TEXT,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. PROJECTS
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brief_id UUID REFERENCES public.briefs(id) ON DELETE SET NULL,
    customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    project_lead_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    name TEXT NOT NULL,
    status project_status NOT NULL DEFAULT 'scoping',
    start_date DATE,
    target_delivery_date DATE,
    repository_url TEXT,
    preview_url TEXT,
    scope_summary TEXT,
    handover_checklist JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 11. PROPOSALS
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brief_id UUID REFERENCES public.briefs(id) ON DELETE CASCADE,
    project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
    version INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    summary TEXT NOT NULL,
    deliverables JSONB NOT NULL DEFAULT '[]'::jsonb,
    exclusions JSONB NOT NULL DEFAULT '[]'::jsonb,
    revisions_allowed INTEGER NOT NULL DEFAULT 2,
    start_date DATE,
    delivery_target_date DATE,
    currency TEXT NOT NULL DEFAULT 'USD',
    total_amount_minor INTEGER NOT NULL DEFAULT 0,
    payment_schedule_type TEXT NOT NULL DEFAULT 'milestone_split' CHECK (payment_schedule_type IN ('milestone_split', 'advance_full', 'discovery_first')),
    milestone_breakdown JSONB NOT NULL DEFAULT '[]'::jsonb,
    client_dependencies JSONB NOT NULL DEFAULT '[]'::jsonb,
    support_terms TEXT NOT NULL DEFAULT '14 days post-launch warranty support included.',
    status proposal_status NOT NULL DEFAULT 'draft',
    valid_until TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    accepted_at TIMESTAMPTZ
);

-- Link project to accepted proposal if needed
ALTER TABLE public.projects 
    ADD COLUMN IF NOT EXISTS proposal_id UUID REFERENCES public.proposals(id) ON DELETE SET NULL;

-- 12. PROPOSAL LINE ITEMS
CREATE TABLE IF NOT EXISTS public.proposal_line_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    proposal_id UUID NOT NULL REFERENCES public.proposals(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL DEFAULT 'development',
    description TEXT NOT NULL,
    amount_minor INTEGER NOT NULL DEFAULT 0,
    is_optional BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 13. MILESTONES
CREATE TABLE IF NOT EXISTS public.milestones (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    sequence INTEGER NOT NULL DEFAULT 1,
    status milestone_status NOT NULL DEFAULT 'pending',
    due_date DATE,
    approved_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 14. PREVIEWS & APPROVALS
CREATE TABLE IF NOT EXISTS public.previews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
    version INTEGER NOT NULL DEFAULT 1,
    title TEXT NOT NULL,
    preview_url TEXT NOT NULL,
    screenshot_url TEXT,
    notes TEXT,
    status TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    preview_id UUID NOT NULL REFERENCES public.previews(id) ON DELETE CASCADE,
    milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
    decided_by UUID NOT NULL REFERENCES auth.users(id),
    decision approval_decision NOT NULL,
    feedback_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 15. CHANGE REQUESTS
CREATE TABLE IF NOT EXISTS public.change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    requested_by UUID NOT NULL REFERENCES auth.users(id),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    scope_impact TEXT,
    price_impact_minor INTEGER NOT NULL DEFAULT 0,
    timing_impact_days INTEGER NOT NULL DEFAULT 0,
    status change_request_status NOT NULL DEFAULT 'requested',
    accepted_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 16. MESSAGES
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    sender_name TEXT NOT NULL,
    sender_role TEXT NOT NULL DEFAULT 'customer',
    content TEXT NOT NULL,
    is_internal_note BOOLEAN NOT NULL DEFAULT false,
    attachments JSONB NOT NULL DEFAULT '[]'::jsonb,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 17. INVOICES & PAYMENT EVENTS
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    proposal_id UUID REFERENCES public.proposals(id) ON DELETE SET NULL,
    invoice_number TEXT UNIQUE NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    amount_minor INTEGER NOT NULL,
    due_date DATE,
    status invoice_status NOT NULL DEFAULT 'issued',
    provider TEXT DEFAULT 'stripe_test',
    provider_session_id TEXT,
    paid_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.payment_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
    provider_event_id TEXT UNIQUE NOT NULL,
    event_type TEXT NOT NULL,
    amount_minor INTEGER NOT NULL,
    payload JSONB NOT NULL DEFAULT '{}'::jsonb,
    processed_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 18. SUPPORT TICKETS
CREATE TABLE IF NOT EXISTS public.support_tickets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    priority ticket_priority NOT NULL DEFAULT 'medium',
    status ticket_status NOT NULL DEFAULT 'open',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 19. AUDIT EVENTS
CREATE TABLE IF NOT EXISTS public.audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id TEXT,
    details JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 20. STORAGE BUCKETS
INSERT INTO storage.buckets (id, name, public) 
VALUES 
    ('showcase-assets', 'showcase-assets', true),
    ('brief-attachments', 'brief-attachments', false),
    ('project-files', 'project-files', false)
ON CONFLICT (id) DO NOTHING;

-- 21. HELPER FUNCTIONS & TRIGGERS
CREATE OR REPLACE FUNCTION public.is_staff(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_uuid AND role IN ('staff', 'developer', 'reviewer', 'admin')
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = user_uuid AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile automatically on auth.user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
        NEW.email,
        'customer'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to calculate response_due_at automatically on brief creation
CREATE OR REPLACE FUNCTION public.handle_new_brief()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.response_due_at IS NULL THEN
        -- Default: +6 hours from submission
        NEW.response_due_at := NEW.submitted_at + INTERVAL '6 hours';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_brief_inserted ON public.briefs;
CREATE TRIGGER on_brief_inserted
    BEFORE INSERT ON public.briefs
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_brief();

-- 22. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.briefs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brief_attachments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.proposal_line_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.previews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.change_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_events ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public can view staff profiles" ON public.profiles;
CREATE POLICY "Public can view staff profiles" ON public.profiles
    FOR SELECT USING (role IN ('staff', 'developer', 'reviewer', 'admin'));

DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users update own profile without role change" ON public.profiles;
CREATE POLICY "Users update own profile without role change" ON public.profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = (SELECT role FROM public.profiles WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Staff can view all profiles" ON public.profiles;
CREATE POLICY "Staff can view all profiles" ON public.profiles
    FOR SELECT USING (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Admin can update all profiles" ON public.profiles;
CREATE POLICY "Admin can update all profiles" ON public.profiles
    FOR ALL USING (public.is_admin(auth.uid()));

-- Site Settings: Public select, Staff update
DROP POLICY IF EXISTS "Public can view site settings" ON public.site_settings;
CREATE POLICY "Public can view site settings" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "Staff can edit site settings" ON public.site_settings;
CREATE POLICY "Staff can edit site settings" ON public.site_settings
    FOR ALL USING (public.is_staff(auth.uid()));

-- Services: Public select published, staff all
DROP POLICY IF EXISTS "Public can view published services" ON public.services;
CREATE POLICY "Public can view published services" ON public.services
    FOR SELECT USING (is_published = true OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can manage services" ON public.services;
CREATE POLICY "Staff can manage services" ON public.services
    FOR ALL USING (public.is_staff(auth.uid()));

-- Portfolio: Public select published, staff all
DROP POLICY IF EXISTS "Public can view published portfolio" ON public.portfolio_items;
CREATE POLICY "Public can view published portfolio" ON public.portfolio_items
    FOR SELECT USING (is_published = true OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can manage portfolio" ON public.portfolio_items;
CREATE POLICY "Staff can manage portfolio" ON public.portfolio_items
    FOR ALL USING (public.is_staff(auth.uid()));

-- Briefs: Insert allowed for all (guest or user), Select own or staff
DROP POLICY IF EXISTS "Anyone can submit a brief" ON public.briefs;
CREATE POLICY "Anyone can submit a brief" ON public.briefs
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Users view own briefs" ON public.briefs;
CREATE POLICY "Users view own briefs" ON public.briefs
    FOR SELECT USING (auth.uid() = user_id OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff can manage briefs" ON public.briefs;
CREATE POLICY "Staff can manage briefs" ON public.briefs
    FOR ALL USING (public.is_staff(auth.uid()));

-- Brief Attachments: Insert allowed, select only if own brief or staff
DROP POLICY IF EXISTS "Anyone can upload brief attachment" ON public.brief_attachments;
CREATE POLICY "Anyone can upload brief attachment" ON public.brief_attachments
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "View brief attachments" ON public.brief_attachments;
CREATE POLICY "View brief attachments" ON public.brief_attachments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.briefs b 
            WHERE b.id = brief_id AND (b.user_id = auth.uid() OR public.is_staff(auth.uid()))
        )
    );

-- Projects: Customer owns project or assigned staff/admin
DROP POLICY IF EXISTS "Customer view own projects" ON public.projects;
CREATE POLICY "Customer view own projects" ON public.projects
    FOR SELECT USING (customer_id = auth.uid() OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Staff manage projects" ON public.projects;
CREATE POLICY "Staff manage projects" ON public.projects
    FOR ALL USING (public.is_staff(auth.uid()));

-- Proposals: Customer view accepted or sent proposals for their brief/project, Staff all
DROP POLICY IF EXISTS "Customer view proposals" ON public.proposals;
CREATE POLICY "Customer view proposals" ON public.proposals
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (
            SELECT 1 FROM public.briefs b WHERE b.id = brief_id AND b.user_id = auth.uid()
        ) OR
        EXISTS (
            SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid()
        )
    );

DROP POLICY IF EXISTS "Staff manage proposals" ON public.proposals;
CREATE POLICY "Staff manage proposals" ON public.proposals
    FOR ALL USING (public.is_staff(auth.uid()));

-- Milestones: Customer view on their project, Staff all
DROP POLICY IF EXISTS "Customer view project milestones" ON public.milestones;
CREATE POLICY "Customer view project milestones" ON public.milestones
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "Staff manage milestones" ON public.milestones;
CREATE POLICY "Staff manage milestones" ON public.milestones
    FOR ALL USING (public.is_staff(auth.uid()));

-- Previews & Approvals
DROP POLICY IF EXISTS "Customer view previews" ON public.previews;
CREATE POLICY "Customer view previews" ON public.previews
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "Staff manage previews" ON public.previews;
CREATE POLICY "Staff manage previews" ON public.previews
    FOR ALL USING (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Customer make approvals" ON public.approvals;
CREATE POLICY "Customer make approvals" ON public.approvals
    FOR INSERT WITH CHECK (
        decided_by = auth.uid() AND
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "View approvals" ON public.approvals;
CREATE POLICY "View approvals" ON public.approvals
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

-- Change requests
DROP POLICY IF EXISTS "Customer create change requests" ON public.change_requests;
CREATE POLICY "Customer create change requests" ON public.change_requests
    FOR INSERT WITH CHECK (
        requested_by = auth.uid() AND
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "View change requests" ON public.change_requests;
CREATE POLICY "View change requests" ON public.change_requests
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "Staff manage change requests" ON public.change_requests;
CREATE POLICY "Staff manage change requests" ON public.change_requests
    FOR ALL USING (public.is_staff(auth.uid()));

-- Messages: Customers only see non-internal notes on their project; Staff see all
DROP POLICY IF EXISTS "Customer view project messages" ON public.messages;
CREATE POLICY "Customer view project messages" ON public.messages
    FOR SELECT USING (
        (is_internal_note = false AND EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid()))
        OR public.is_staff(auth.uid())
    );

DROP POLICY IF EXISTS "Customer send project messages" ON public.messages;
CREATE POLICY "Customer send project messages" ON public.messages
    FOR INSERT WITH CHECK (
        sender_id = auth.uid() AND
        is_internal_note = false AND
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "Staff manage project messages" ON public.messages;
CREATE POLICY "Staff manage project messages" ON public.messages
    FOR ALL USING (public.is_staff(auth.uid()));

-- Invoices: Customer view own, Staff all
DROP POLICY IF EXISTS "Customer view invoices" ON public.invoices;
CREATE POLICY "Customer view invoices" ON public.invoices
    FOR SELECT USING (
        public.is_staff(auth.uid()) OR
        EXISTS (SELECT 1 FROM public.projects p WHERE p.id = project_id AND p.customer_id = auth.uid())
    );

DROP POLICY IF EXISTS "Staff manage invoices" ON public.invoices;
CREATE POLICY "Staff manage invoices" ON public.invoices
    FOR ALL USING (public.is_staff(auth.uid()));

-- Support tickets: Customer view/create own, Staff all
DROP POLICY IF EXISTS "Customer view support tickets" ON public.support_tickets;
CREATE POLICY "Customer view support tickets" ON public.support_tickets
    FOR SELECT USING (customer_id = auth.uid() OR public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "Customer insert support tickets" ON public.support_tickets;
CREATE POLICY "Customer insert support tickets" ON public.support_tickets
    FOR INSERT WITH CHECK (customer_id = auth.uid());

DROP POLICY IF EXISTS "Staff manage support tickets" ON public.support_tickets;
CREATE POLICY "Staff manage support tickets" ON public.support_tickets
    FOR ALL USING (public.is_staff(auth.uid()));

-- Audit events: Staff only
DROP POLICY IF EXISTS "Staff view audit events" ON public.audit_events;
CREATE POLICY "Staff view audit events" ON public.audit_events
    FOR SELECT USING (public.is_staff(auth.uid()));

DROP POLICY IF EXISTS "System insert audit events" ON public.audit_events;
CREATE POLICY "System insert audit events" ON public.audit_events
    FOR INSERT WITH CHECK (true);
