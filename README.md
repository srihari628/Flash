# BuilDo — Digital Product Studio

> **"Your idea. Live in days."**  
> Custom websites, web applications, mobile products, and automations. Scoped with clarity, engineered with precision, and delivered with full handover responsibility.

---

## 1. Overview & Architecture

BuilDo is a complete, production-ready digital product ordering and delivery service built according to the **BuilDo Antigravity Master Blueprint**. It bridges high-converting editorial design with an accountable engineering delivery pipeline.

### Core Technology Stack
- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19, TypeScript)
- **Styling**: Locked Editorial Design System via Vanilla CSS tokens & Tailwind CSS
- **Backend & Database**: [Supabase](https://supabase.com/) Postgres with strict Row Level Security (RLS)
- **Authentication**: Supabase Auth (Email/Password & Magic Link)
- **Storage**: Supabase Storage with quarantined private buckets (`brief-attachments`, `project-files`) and public showcase assets
- **Icons**: [Lucide React](https://lucide.dev/) (coherent iconography, zero emoji in main controls)
- **Typography**: [Manrope](https://fonts.google.com/specimen/Manrope) for headlines & wordmark; [Inter](https://fonts.google.com/specimen/Inter) for body, dashboards, and tabular pricing

---

## 2. Locked Brand Colour System

The visual design system strictly follows the locked palette:

```css
:root {
  --brand: #B01287;          /* Signature Deep Fuchsia */
  --brand-hover: #930E70;    /* Interactive Fuchsia Hover */
  --brand-soft: #F3E4F1;     /* Supporting Orchid Tint */
  --ink: #171217;            /* Obsidian Canvas */
  --ivory: #FAF7F2;          /* Warm Editorial Background */
  --surface: #FFFFFF;        /* Pure Surface */
  --surface-dark: #241E24;   /* Elevated Dark Container */
  --text-muted: #665B65;     /* Body Muted Grey */
  --text-muted-dark: #C4B9C2;/* Dark Canvas Secondary Text */
  --border-light: #DED3DB;   /* Crisp Border */
  --border-dark: #40353F;    /* Obsidian Frame Border */
}
```

---

## 3. Public & Portal Routes

### Public Pages
- `/`: **Homepage** featuring asymmetric obsidian Hero, signature **"Idea to live"** choreographed preview, live SLA badge, editorial **Product Selector**, **Selected Work**, 4-stage **Delivery Story**, **Work Your Way**, and Cost Clarity & FAQ.
- `/products`: Catalogue of all 8 standardized services with scope-qualified sprint durations, starting pricing, and deliverable summaries.
- `/products/[slug]`: Deep dive into specific capabilities (e.g. `/products/web-app`, `/products/ecommerce`).
- `/work`: Case studies with strict provenance labeling (`Concept preview`, `Studio build`, `Client engagement`) and internal specification views with zero forbidden external client links.
- `/work/[slug]`: Architectural breakdowns, technology stack details, and permitted delivery evidence.
- `/how-it-works`: Complete 4-stage delivery breakdown (Intake -> Proposal -> Staging Workspace -> Handover).
- `/about`: Truthful leadership biographies for founders **Yash** and **Priya**, plus team leads **Dev** and **Ananya**.
- `/faq`: Comprehensive pricing model, domain/hosting transparency, and intellectual property terms.
- `/contact`: Direct enquiry channel with guaranteed 6-hour review commitment.
- `/terms` & `/privacy`: Staging-governed commercial policies and strict client IP confidentiality terms.

### Intake Brief Flow
- `/brief`: 3-step interactive brief intake:
  - **Step 1**: Service selector + Type idea / Paste reference link / Drop up to 5 quarantined attachments.
  - **Step 2**: Feature tags, budget range, and preferred working mode (*"Let's discuss it"* with timezone-aware meeting windows vs *"Keep it in writing"* for 100% async delivery).
  - **Step 3**: Contact details, review summary, and submission. Includes auto-saved local draft recovery.
- `/brief/confirmation`: Receipt screen with unguessable opaque reference code (e.g. `BDO-26...`) and live 6-hour SLA countdown clock.

### Customer Workspace
- `/portal`: Private client dashboard displaying submitted briefs, proposal review triggers, active delivery sprints, and lead contact information.
- `/portal/projects/[id]`: Interactive project workspace:
  - **Milestone States**: Real milestones without invented progress percentages.
  - **Interactive Previews**: Versioned staging links (`v1.0`, `v2.0`) with one-click **"Approve Sprint"** or **"Request Changes with Notes"**.
  - **Lead Chat**: Real-time persisted conversation between client and assigned project leads.
  - **Production Handover Checklist**: Real-time IP transfer tracking (GitHub repo, domain cutover, credential vault, 14-day warranty).
- `/portal/proposals/[id]`: Client proposal review screen showing deliverables, exclusions, 40/30/30 milestone split, and formal **"Accept Proposal & Activate Sprint"** action.

### Staff / Admin Portal
- `/staff/leads`: Real-time triage dashboard for evaluating incoming client briefs, monitoring SLA countdown timers, and assigning lead owners.
- `/staff/proposals`: Structured proposal generator calculating milestone splits, deliverables, exclusions, and target delivery dates.
- `/staff/settings`: Operational SLA controls (elapsed hours vs business hours) and tamper-evident audit logs.

---

## 4. Database Schema & Security (Supabase Postgres)

The connected Supabase database is governed by `supabase/migrations/20261018000000_buildo_schema.sql` with full **Row Level Security (RLS)**:

- `profiles`: User accounts with explicit roles (`customer`, `staff`, `developer`, `reviewer`, `admin`). Strict RLS prevents customers from elevating their own permissions.
- `site_settings`: Live operational response SLA configuration (`target_hours: 6`, `mode: "elapsed_hours"`).
- `services`: Truthful standardized service specifications.
- `portfolio_items`: Architectural entries with required provenance (`client_work`, `team_project`, or `concept`).
- `briefs`: Client intake submissions with `submitted_at`, `response_due_at`, and opaque reference codes.
- `appointments`: Timezone-aligned consultation windows.
- `proposals` & `proposal_line_items`: Versioned immutable scope contracts.
- `projects` & `milestones`: Active delivery workspaces with explicit review and approval states.
- `previews` & `approvals`: Staging reviews with audit-tracked feedback notes.
- `messages`: Project-scoped conversations isolating internal staff notes from client messages.
- `invoices` & `payment_events`: Auditable milestone billing records.
- `audit_events`: Durable activity logs for critical operational events.

---

## 5. Local Setup & Testing

### Prerequisites
- Node.js 20+
- npm 10+

### Installation
```bash
# Clone and enter directory
cd Flash

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# .env.local is pre-configured with the connected Supabase project URL and keys
```

### Running Locally
```bash
# Start local development server
npm run dev

# Or compile production bundle
npm run build
npm run start
```

### Administrative Setup
To grant staff privileges to a registered user account:
```bash
node scripts/create-staff.js <user_email> staff
```

---

## 6. Implementation Report & Verification

- **Production Build**: Verified with zero compilation errors (`next build`).
- **Data Persistence**: Verified via Supabase MCP tool; sample brief submission (`BDO-2671DCDA5B` for Julian Vance) is actively persisted in `public.briefs` and `public.audit_events`.
- **SLA Clock**: Active 6-hour countdown calculated dynamically from submission timestamp.
- **Access Isolation**: Row Level Security successfully prevents unauthorized cross-tenant data access.

---

## 7. Branching Strategy & Pull Request Workflow

- **`main`**: Production-ready base branch containing verified, stable releases.
- **`feature/*`**: Feature branches for introducing scoped updates, component enhancements, or bug fixes.
- **Pull Requests**:
  1. Create a descriptive branch from `main`: `git checkout -b feature/<feature-name>`
  2. Implement changes, test locally (`npm run dev`), and verify the build (`npm run build`).
  3. Push to remote and open a Pull Request against `main`.

