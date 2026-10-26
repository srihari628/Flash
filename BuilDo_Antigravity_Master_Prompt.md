# BuilDo Antigravity master build prompt

Paste this entire prompt into Google Antigravity with the BuilDo blueprint attached. The colour and visual direction below supersede the violet and lime colours in the original blueprint. Build the responsive website and its customer and staff portals first, with a shared backend suitable for a future native app.

---

## 1 Your assignment and working method

Act as a senior product designer, frontend engineer, backend engineer and quality reviewer. Build BuilDo into a complete, working digital product ordering service. Work in the connected repository and use the already connected Supabase project after inspecting its existing configuration. Produce implemented software, not a static mockup, a slideshow of screens, or a plan without execution.

Read the attached blueprint and existing repository instructions first. Inspect the current framework, routes, dependencies, environment variable names, database schema, migrations, auth configuration and available integrations. Never print secrets. Preserve existing user data and working functionality. Do not reset the connected database, overwrite unrelated tables, relax access controls or invent credentials.

Write a concise implementation plan and then execute it in manageable vertical slices. Each slice must work from UI to persistence before it is considered complete. Make normal design and implementation decisions autonomously. Ask only for genuinely missing business information or unavailable credentials that block dependent functionality; continue independent work meanwhile.

If this is an existing Next.js or React project, work within its architecture. For a new repository, use Next.js with TypeScript, a maintainable styling system, and Supabase Auth, Postgres and Storage. Use a supported compatible dependency set; inspect actual package versions instead of guessing APIs. Keep one coherent animation approach. Do not install overlapping animation libraries just to create effects.

A finished-looking UI is not evidence of production readiness. Validate the customer journey, access isolation, payment handling, deployment configuration and performance, and report any remaining blockers honestly.

## 2 What BuilDo is

BuilDo is a managed service for custom websites, web applications, mobile applications, automations, deployments and bug fixes. Customers may have a business idea but lack a team to turn it into a working product. They share what they need, receive a human response, approve a scope and price, and follow delivery through a single workspace.

The simple customer story is: share an idea, approve the plan, receive a working product in days where the agreed scope permits it. We handle the work and remain responsible for delivery. A customer does not have to interview individual developers or understand technical jargon.

Founders include Yash and Priya, with two additional founding team members. Use only supplied names and biographies. The internal delivery team can grow through vetted paid developer assignments, while a project lead remains accountable to the customer.

Core headline: “Your idea. Live in days.”
Supporting message: “Custom websites, apps and automations. Built, tested and launched by our team.”
Primary CTA: “Tell us your idea”.
Secondary CTA: “Explore our work”.

The public emphasis is speed, custom craftsmanship and clear responsibility. Do not position us as a self-service AI website generator or a catalogue of resold templates. AI may help our delivery team, but customers buy a completed service.

Do not promise all custom products in a fixed number of hours. Every estimate must identify what is delivered and when the clock starts. The accepted proposal controls the actual scope and delivery date.

## 3 Art direction

Create an original premium editorial technology brand. Combine confident oversized typography, beautifully composed product previews, restrained colour, tactile details and a few memorable interactions. The site should feel carefully art-directed, inviting and expensive, while remaining clear about what people can buy.

Avoid a generic centred SaaS hero followed by six identical rounded cards. Use an asymmetric hero, varied editorial section layouts and a strong rhythm of light and dark surfaces. Keep navigation familiar and usable. Originality belongs in composition and presentation, not in making people hunt for buttons.

Use these references as research starting points:
- Awwwards typography: https://www.awwwards.com/websites/typography/
- Awwwards portfolio interaction reference: https://www.awwwards.com/inspiration/scroll-portfolio
- Pinterest editorial direction: https://www.pinterest.com/pin/1108026314570499305/
- Pinterest elegant editorial direction: https://in.pinterest.com/pin/editorial-elegant-website-luxury-website-elegant-website-for-photographers--910993830862809127/

Inspect accessible reference images and pages before claiming to have viewed them. Pinterest pages may be inaccessible; if so, use accessible alternatives and state that limitation. Extract principles such as typographic scale, generous whitespace, image framing and deliberate transitions. Do not copy a reference layout, logo, copy, animation or copyrighted imagery wholesale. Maintain a small reference note mapping inspiration to original design decisions.

The desired effect is delight, curiosity and confidence. Do not claim to manipulate dopamine or guarantee retention. Give people a satisfying experience through responsiveness, useful exploration and clear next steps. No fake scarcity, guilt-based exit messages, resetting countdowns, fabricated purchases or invented reviews.

## 4 Locked colour system

The final palette is:

```css
:root {
  --brand: #B01287;
  --brand-hover: #930E70;
  --brand-soft: #F3E4F1;
  --ink: #171217;
  --ivory: #FAF7F2;
  --surface: #FFFFFF;
  --surface-dark: #241E24;
  --text-muted: #665B65;
  --text-muted-dark: #C4B9C2;
  --border-light: #DED3DB;
  --border-dark: #40353F;
}
```

Deep fuchsia is the signature. Obsidian and warm ivory provide the premium foundation. Soft orchid is a supporting tint. Do not introduce orange, red or blue as decorative brand colours. Choose accessible semantic status treatments separately and pair status colour with an icon and text; do not use colour alone to communicate errors or success.

Use fuchsia mainly for primary actions, selected states, the brand mark and short accents. Roughly 10–15 percent of a typical screen can carry the accent; this is a design guide, not a rigid quota. Let product imagery add detail without flooding the shell with unrelated colours.

No neon fog, luminous purple blobs, giant radial glows, animated gradient borders, glassmorphism everywhere, glitter, gold decoration or heavy bloom. Shadows should provide believable depth. Use a crisp matte visual language.

Use white or ivory text on deep fuchsia buttons, after measuring contrast. On dark surfaces, use ivory for text and an orchid focus ring rather than relying on dark fuchsia text. Keep normal body contrast at least 4.5:1 and large text at least 3:1; verify the actual combinations.

## 5 Typography and component system

Use Manrope for headings and wordmark treatment, and Inter for body, forms and dashboards. Load only necessary weights, preferably locally hosted appropriately licensed WOFF2 assets. If these are unavailable, use a robust system fallback without blocking rendering. Do not introduce a third family unless the existing project already has a justified brand requirement.

Desktop hero approximately 76–104 px with responsive clamp sizing, 0.98–1.06 line height and carefully tuned tracking. Mobile hero approximately 42–56 px, with wrapping checked at 360 px width. Body 16–18 px and comfortable line spacing. Forms should remain at least 16 px on mobile. Use tabular numerals for costs and dates.

Build reusable tokens for typography, spacing, surfaces, radii, borders, shadows, focus and motion. Use a restrained radius scale: approximately 10–16 px for controls, 16–24 px for selected product frames. Do not make every component a pill.

Create complete component states: default, hover, focus, pressed, selected, loading, disabled, validation error, success and empty. Disabled controls must explain why when the reason is not obvious. Icons should come from one consistent family. Avoid emoji as the main product icon system.

Use a content width around 1280 px, with considered margins on wide screens. Make forms narrower than galleries. Buttons and touch controls should be about 44–48 px tall or larger where helpful. Typography and whitespace must carry more visual weight than decoration.

## 6 Signature landing page composition

### Navigation
A compact BuilDo wordmark on the left; Products, Our work, How it works and FAQ; account access and one clear start action. Use a solid or nearly opaque navigation background when sticky. Mobile has a conventional accessible menu. The menu supports keyboard focus, Escape, scroll management and focus restoration.

### Hero
Use an obsidian canvas with an asymmetrically balanced composition. Place a small category line above the headline: “Custom digital products. Delivered with a plan.” The headline reads “Your idea.” and “Live in days.” with a deliberate line break. Use generous negative space and crisp ivory type.

On desktop, place a product composition to the right: one beautifully detailed web interface and a small mobile preview arranged as a unified object. Do not scatter many unrelated floating cards. Build readable UI details as real HTML/CSS where feasible, using generated artwork only inside the interface or as a decorative product render.

Introduce one signature interaction called Idea to live: a compact idea note transitions into an interface preview, then a clean delivery milestone. Run the introduction once in roughly 1.2–1.8 seconds without delaying buttons or hiding the headline. Provide a static final composition for reduced motion. Do not create a continuously spinning showcase.

Show “Tell us your idea” and “Explore our work” immediately. Place the configured response promise near the primary action. The promise is backed by operating settings, not invented availability indicators.

### Product selector
Use a spacious editorial selector rather than a wall of identical cards. Desktop: service names and concise outcomes on one side; a larger preview panel on the other. Clicking or focusing a service updates the panel. No information should depend on hover alone. Mobile: accessible vertical cards or tabs with a clear selected state.

Services: Portfolio, Business website, Full stack web application, Ecommerce, Android and iOS app, Automation, Deployment and bug fixing, and Other requirements. Projects and MVPs can be a service or clearly named category. Each selection has a relevant outcome, scope-qualified timing, price only when approved, and a CTA that carries the service into the brief.

### Selected work
Use varied large and small image frames, with generous spacing and clear titles. Each opens an internal detail view with screenshots, features, role and permitted delivery evidence. No public live client links. Provide filters only if enough items make them useful.

### The delivery story
Show four concise stages: Share your idea, Approve your plan, Follow the build, Launch with support. Tie each to a small interface fragment from the real customer workspace. Use a vertical layout on mobile. Any desktop scroll treatment must preserve native scroll and avoid long pinned sections.

### Confidence and ownership
Explain the named project lead, scope approval, design review, deployment handover and agreed bug support. Make these specific and easy to scan. Include actual testimonials only when supplied and approved. If none exist, omit the testimonial block entirely.

### Work your way
Two elegant choices: “Let’s discuss it” and “Keep it in writing”. Both lead into the same brief flow with the preference preserved. No-call customers still approve a written proposal.

### Cost clarity and FAQ
Explain build fees versus domains, hosting and usage charges. FAQs should cover idea documents, no-call work, first reply, delivery timing, scope changes, ownership, support, recurring costs and store approval dependencies. Keep answers consistent with configured policies.

### Final invitation and footer
End with a strong ivory or obsidian composition and the message “What have you been waiting to build?” The CTA opens the real brief flow. Footer links must lead to real pages or supplied contact channels. Do not invent legal details, company registrations, addresses or social handles.

## 7 Image generation and portfolio truthfulness

Use available image-generation capabilities to produce original premium artwork, product display compositions and illustrative interface concepts. Generate assets when they add value, not as a substitute for implemented controls or readable page text.

Suggested asset briefs:
1. Editorial product composition: a matte obsidian workspace with ivory browser surfaces and restrained deep-fuchsia accents, realistic soft lighting, no neon bloom, uncluttered framing and generous negative space. No embedded promotional text.
2. Boutique commerce concept: elegant product photography and editorial catalogue composition using neutral ceramics or lifestyle objects. Build readable store UI with actual HTML/CSS and put the generated imagery inside it.
3. Service booking concept: clean calendar, service selection and confirmation screens, implemented as readable UI and captured as screenshots; use a fictional brand and label it as a concept.
4. Automation concept: a crisp vector-like visual of an incoming request, a processing step and an outcome; implement precise labels and interactions in code, not image-generated text.

Use existing authorised project screenshots when available. Preserve the actual interface and do not invent features or metrics. The public policy is screenshots and approved recordings without outbound client URLs; this does not prevent a customer from accessing their own private staging build.

Never label a generated concept “Built by us for a client” or imply that it is an existing live project. Store each item’s provenance as client_work, team_project or concept. Generated examples must visibly say “Concept preview”. If later we implement the concept, it can be described accurately as a team-built demo, not automatically as paid client work.

Track asset filenames, generation prompts and provenance. Use explicit dimensions and responsive sizes. Optimise to modern formats where supported. Keep the real page headline, prices and buttons as live text. Supply alt text, and mark purely decorative art appropriately.

## 8 Motion and 60 FPS engineering

Aim for smooth 60 FPS on representative supported devices, and measure it. Do not state that every device or browser will hold 60 FPS. At 60 Hz the overall frame budget is about 16.7 ms; avoid long main-thread work and expensive paint during scroll and interaction.

Use transform and opacity for most animation. Avoid continuously animating layout dimensions, large blur filters, shadows, background-position or full-screen backdrops. Use CSS for simple hover and focus transitions, and a single motion library only where choreography requires it.

Suggested timings: button feedback 120–180 ms; tab or card transition 180–260 ms; section entrance 350–550 ms. Entrance movements should be small, around 8–20 px. Reveal sections once; keep content readable without waiting for animation. A CTA arrow may move 3–4 px on hover and focus. Use restrained press feedback rather than large rubbery springs.

Pause or unmount offscreen animation. Avoid unbounded will-change use. Load noncritical interactions lazily. Do not animate every icon constantly. Give upload completion, successful brief submission and milestone approval a short purposeful confirmation. Do not celebrate payment before verified confirmation.

Respect prefers-reduced-motion. Remove nonessential movement and preserve functionality. Keep native scrolling; no scroll hijacking, forced horizontal scroll, custom cursor dependency or mandatory preload animation. Do not place heavy WebGL in the critical path. If a 3D effect cannot meet measured budgets, replace it with a lighter composition.

Target LCP at or below 2.5 seconds, CLS at or below 0.1 and INP at or below 200 ms under an explicitly documented test and monitoring plan. These are engineering targets, not verified field results. Use browser performance traces on scroll and the brief flow, and add field measurement when traffic exists. Lighthouse is useful but does not prove animation frame rate or real-user INP.

## 9 Real routes and navigation

Implement public routes for Home, Products, service detail, Our work, work detail, How it works, About, FAQ and Contact. Include approved policy pages; unfinished policy text must remain marked as awaiting approval in staging and block public commerce launch rather than masquerading as reviewed terms.

Implement start brief, submission confirmation, account access, customer projects, project detail, messages, billing and support. Add staff leads, proposal management, delivery assignments, catalogue management and workspace operations. Use clear nested routes and consistent layouts.

Every visible button must navigate, mutate real data or open a working interaction. No empty hrefs, fake success toasts, local arrays pretending to be orders, or public demo metrics that look real. When no data exists, provide an intentional empty state and a relevant next action.

## 10 Idea intake and connection flow

Build a three-step flow with a review screen, back navigation and recoverable drafts.

Step one: service selection plus Type my idea, Paste a shared link or Upload a document. Ask who the product is for and what it should do. Accept “I’m not sure”. Shared ChatGPT links are optional references; do not request access credentials or imply private chats can be imported. If a link cannot be accessed, let the customer paste or upload the relevant content.

Step two: essential features, preferred launch date, budget range including Not sure, existing design/content and working mode. Offer “Let’s discuss it” or “Keep it in writing”. The first route collects timezone and preferred meeting windows; a requested time is not confirmed until availability is checked and accepted.

Step three: name, email and phone with country code. Make phone required when phone or WhatsApp is the selected contact channel; otherwise optional. Include the preferred channel and separate optional marketing consent. Show the full summary before submission.

Save anonymous text drafts locally with a clear expiry and warning for shared devices; clear them after successful submission. Do not put private files, credentials or Supabase secrets in localStorage. Prefer authenticated drafts after sign-in. Offer verified email access when customers need to claim their brief. Never let someone read a brief just by entering another person’s email or guessing a reference number.

Use a server-side lead submission endpoint with validation, request size limits, rate limits and spam controls. Anonymous users cannot directly select from the lead table. Return an opaque receipt identifier without exposing confidential data. Bind later account access through verified identity or a short-lived signed claim flow.

Support five attachments of up to 10 MB each in PDF, DOCX, TXT, PNG and JPG. Validate actual type, quarantine until scan approval and give upload progress and retry. Implement secure temporary upload sessions for guests or require verified access before private file upload. Do not allow unrestricted anonymous storage writes. If scanning infrastructure is absent, keep files quarantined and show the operational blocker rather than claiming they are safe.

## 11 Six hour reply and appointments

Model response settings explicitly: elapsed-hour coverage or business-hour coverage, office timezone and opening hours if relevant. The intended six elapsed-hour promise requires daily staffing. Do not silently substitute business hours while displaying “within six hours”. If not configured, say “Share your brief for a human review” until the founders activate a concrete promise.

Store submitted_at, response_due_at, first_human_response_at and response_owner_id. Immediate automated acknowledgement is separate from the first human response. Use a durable job or scheduled process for owner notification and escalation. Suggested reminders at two, four and five hours apply to the elapsed-hour setting; business-hour mode must calculate correctly.

Appointments need requested, confirmed, cancelled and completed states. Store timestamps consistently and display the customer’s timezone. Prevent overlapping confirmed appointments for the same staff member. If calendar integration is unavailable, the internal scheduling record can still work, but never claim an external calendar invitation was sent.

## 12 Supabase data and permission model

Inspect the existing Supabase project before creating migrations. Reuse appropriate existing entities. Add reversible, version-controlled migrations and explicit foreign keys, indexes, validation and uniqueness constraints. Keep frontend types consistent with the actual schema.

Core entities: profiles, organisations and memberships if needed, staff_roles, services, packages, portfolio_items, leads, briefs, brief_attachments, appointments, proposals, proposal_versions, proposal_line_items, orders, projects, project_members, milestones, tasks, previews, approvals, change_requests, messages, invoices, payment_events, support_tickets, notification_outbox, audit_events and site_settings. Combine entities where a simpler model preserves requirements; do not create unused abstractions.

Use UUIDs, timestamps and explicit lifecycle states. Store money as integer minor units with currency, not floating-point prices. Accepted proposals are immutable snapshots. Prevent concurrent acceptance from creating duplicate orders. Allocate privileged role changes through trusted admin operations only. A user must never grant themselves admin by editing profile metadata.

Enable and test row-level security on every exposed private table. Public access can read only published services, approved portfolio items and explicitly public settings. Customers can access only their own briefs and projects. Developers can access assigned work and necessary materials, not all leads or financial records. Finance and admin access must be separately enforced.

Keep service-role or secret keys server-side and never ship them in browser bundles. Use publishable keys only in their intended context with access policies in place. Do not bypass RLS as a quick UI fix. Privileged server endpoints must independently authenticate and authorise every operation.

Use private buckets for idea files, messages and handover documents, with scoped expiring signed URLs after authorisation. Public showcase assets belong in a separate bucket. Authorise Realtime subscriptions and keep private channels project-scoped. Realtime should synchronise real persisted messages and status changes, not fabricate activity.

## 13 Quotes prices and real payments

Customers can submit an enquiry without paying. Custom work becomes a confirmed order only after scope acceptance and the required payment or an explicitly approved commercial exception.

A proposal contains deliverables, exclusions, revisions, start date, delivery target, client dependencies, milestones, support, ownership and costs. Separate development, domain registration, renewal, hosting, external subscriptions, usage allowances and applicable taxes. Mark estimated costs and proposal validity clearly. Never invent live domain availability or provider prices.

Support two configurable payment arrangements:
A. Advance before development, with an editable milestone schedule. The blueprint’s 40/30/30 split is a suggested configuration, not an automatically published policy.
B. Paid design discovery credited against the build if the customer proceeds, followed by the agreed build payment. Alternatively allow a founder-approved limited free preview; document exactly what is included.

Use the payment provider already configured in the repository or a well-defined provider adapter. Supabase alone does not process card or UPI payments. Obtain missing provider configuration without inventing credentials. In staging use the provider’s actual test mode and label it clearly.

Create checkout sessions server-side using the approved proposal amount. Verify webhook signatures, enforce unique provider event IDs and process state changes transactionally. Do not mark paid from a browser redirect or user-supplied amount. Handle pending, failed, expired, duplicate, refunded and disputed events where supported. Keep an auditable reconciliation path.

If payment credentials are missing, keep enquiry and proposal workflows working, show a truthful unavailable checkout state and report the configuration needed. Do not replace checkout with a fake success animation. Domain purchases, real charges, refunds and other money movements require explicit operational authorisation.

## 14 Customer workspace

Build a clean, mostly ivory workspace with a strong hierarchy and restrained fuchsia accents. It should feel related to the landing page but prioritise clarity.

Display the project lead, agreed scope version, start and target dates, next action, milestones, conversations, previews, approvals, invoices and support. Distinguish an enquiry from a paid order. Show real milestone states rather than an invented completion percentage.

Design approvals reference a specific preview version. Support approve and request changes with comments. A new feature becomes a change request with price and timing impact, accepted before extra work starts. Track delays and revised dates with reasons.

Handover contains source access, ownership transfer checklist, operating notes, deployment information and support terms. Do not place passwords in public records or ordinary chat. Customers can access their own private preview links even though the public gallery has no live links.

Use realtime messages where configured, with sending, sent, failed and retry states, access controls and unread indicators backed by real records. Provide email notifications only through a configured sender. Notification delivery failure must not undo a successful brief or payment record.

## 15 Staff portal and delivery capacity

Create usable staff interfaces, not empty placeholder pages. Provide searchable leads with owners and response deadlines, a proposal editor, project assignments, milestones, review queues and support tickets. Add catalogue and portfolio management with draft and published states.

Roles: founder admin, lead coordinator, project lead, developer, reviewer and finance. A person may hold multiple roles, but permissions remain explicit. Server-side enforcement is mandatory even if navigation hides unauthorised screens.

Track developer skills, availability and assignments. Confirm capacity before promising dates. Support manual assignment first; do not build an unnecessary open marketplace. Maintain an audit log for pricing changes, role changes, proposal approvals, refunds and release decisions. Separate internal notes from customer-visible messages.

Show meaningful metrics from real records: qualified leads, first response time, proposals, paying customers, on-time delivery and support backlog. Developer payout and project cost records may be manual initially, but must not display invented balances or automatically transfer funds.

## 16 Notifications analytics and operational readiness

Use a transactional outbox or equivalent reliable queue for email, reminders and notifications, with retries and deduplication. Inspect configured providers. For missing email, SMS, WhatsApp or calendar services, build a clear adapter and report the missing integration. Never display “message sent” when only a database record was created.

Track view_service, start_brief, submit_brief, request_discussion, accept_proposal and verified_payment events. Avoid sending private idea text, uploads, email or phone to analytics. Marketing pixels must respect the chosen consent configuration. Server-confirmed payment events are the source of purchase reporting.

Add structured error logging without secrets or private documents. Provide useful monitoring for failed jobs, overdue responses, upload quarantine and webhook errors. Validate backup and restore capability before claiming operational readiness. Keep secrets in environment configuration and provide an example environment file containing names and placeholders only.

Implement metadata, canonical URLs, social previews and an appropriate sitemap for public pages. Exclude account, customer, admin and private project routes from indexing, while enforcing authorisation regardless of robots settings. Use structured data only for real business facts; never invent reviews or ratings.

## 17 Build sequence and quality gates

First: inspect the repository and connected backend, then define tokens, routes, schema and access policies.
Second: create the art-directed homepage and responsive service experience with approved or clearly labelled concept assets.
Third: implement the brief submission vertical slice, uploads, receipt and staff lead view using actual persistence.
Fourth: add verified customer access, proposals, acceptance, payments where configured and the project workspace.
Fifth: complete staff assignment, approvals, change requests, support and reliable notifications.
Sixth: review the complete system in a browser at narrow mobile, tablet, laptop and wide desktop widths, then fix issues.

Test critical behaviours with appropriate automated tests and manual verification:
- Valid text, link and file briefs persist and appear to the authorised staff member.
- Invalid and duplicate submissions behave safely; users do not lose their input.
- Guest lead claiming cannot expose another customer’s data.
- Customer A cannot read or mutate Customer B’s project, files, messages or invoices.
- A normal user cannot become staff through a profile update.
- RLS tests run with real customer roles, not only with a privileged service key.
- Written-only and appointment routes both produce a reviewable proposal.
- Proposal acceptance is versioned and duplicate clicks cannot duplicate orders.
- Payments are confirmed only by verified provider evidence, with replay and failure handling.
- Design review and change requests preserve history and enforce permissions.
- Files stay private and quarantined until the configured checks complete.
- UI is usable with keyboard, reduced motion, touch, zoom and failed network requests.
- Links, buttons, loading states, empty states and errors work across all routes.
- Public showcase items carry accurate provenance and no forbidden outbound client links.

Profile the hero, scrolling and brief flow. Document test device, browser, viewport and network conditions. Fix large images, excessive script, blocking fonts, layout shifts and long tasks before adding extra effects. Where field data is unavailable, label the result as laboratory testing. Do not report an unmeasured 60 FPS claim.

## 18 Final handover

Continue until the implemented scope is coherent and tested. Do not stop after creating the hero. If a provider is blocked, finish independent functionality and identify the exact remaining setup without claiming the whole system is live.

Deliver the working repository, schema migrations, RLS policies, seed data limited to truthful service content and clearly labelled concepts, environment-variable template, generated-asset provenance, setup instructions and deployment notes. Include a concise implementation report with what works, what was tested, measured performance, and missing external configuration or business policies.

Provide an administrator setup path that does not create public default credentials. Use staging for testing. Do not deploy to production, purchase domains, send campaigns, charge cards or publish unapproved client work merely because the code is finished.

The final quality standard is a distinctive luxury interface with a complete, dependable purchasing and delivery workflow. Make BuilDo memorable through strong composition, expressive fuchsia accents, useful previews and carefully timed interactions. Keep the experience fast, readable and simple from the first visit to final handover.

---

## Technical references for implementation

Consult the current official documentation when implementing version-sensitive APIs:
- Supabase row-level security: https://supabase.com/docs/guides/database/postgres/row-level-security
- Supabase Storage access control: https://supabase.com/docs/guides/storage/security/access-control
- Supabase private file delivery: https://supabase.com/docs/guides/storage/serving/downloads
- Animation performance: https://web.dev/articles/animations-guide
- Reduced motion: https://web.dev/articles/prefers-reduced-motion

These links support the technical requirements. The visual direction and implementation choices in this prompt are BuilDo-specific design proposals, not endorsements or claims made by those sources.
