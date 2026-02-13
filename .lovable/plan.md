
# Fund Our Project + Investor Pitch Page + Permanent Navigation

This plan covers three major changes: updating the CTAs and creating two new dedicated pages, plus making the navigation bar always visible.

---

## 1. Permanent Transparent Navigation Bar

**Current behavior:** The FloatingNav only appears after scrolling 100px, then disappears when scrolling back up.

**New behavior:**
- Navigation is **always visible** (remove the scroll-based show/hide logic)
- Fully transparent with backdrop blur (glass effect) at all times
- Replace "Join Waitlist" CTA button with **"Fund Our Project"** (gradient button) that links to `/fund`
- Same change in mobile menu
- No content on the page gets hidden or erased when scrolling

**File:** `src/components/FloatingNav.tsx`

---

## 2. "Founding Members" Card CTA Change

**Current:** Button says "Request beta invite"
**New:** Button says **"Fund Our Project"** and navigates to `/fund` using React Router

**File:** `src/components/SovereignBackerSection.tsx`

---

## 3. "Talk to the founders" Card CTA Change

**Current:** Button says "Talk to the founders" with no action
**New:** Button navigates to `/pitch` page

**File:** `src/components/SovereignBackerSection.tsx`

---

## 4. New `/fund` Page — Donation/Funding Page

A beautiful, dark-themed page matching the existing visual identity with:

### Donation Tiers (3 cards + 1 open donation)
- **Supporter** — $25: "Back the mission. Get early updates"
- **Builder** — $100: "Priority beta access + name in credits"
- **Visionary** — $500: "All Builder perks + monthly founder calls"
- **Open Donation** — Custom amount input: "Donate without expecting anything in return"

Each tier card features the purple-to-gold gradient top border, glass card styling, and a CTA button. Clicking a tier opens a simple form collecting name, email, amount, and optional message, then saves to a `donations` database table.

### Design
- Same deep dark background (#0B0812) with radial glows
- Animated entrance with framer-motion
- Back button to return to homepage
- Mobile responsive grid (1 col mobile, 2 col tablet, 4 col desktop)

**New file:** `src/pages/Fund.tsx`

---

## 5. New `/pitch` Page — Investor Pitch Presentation

A comprehensive investor-facing page with:

### Sections
1. **Hero** — "SITA OS — Investor Brief" with a gradient headline
2. **PDF Viewer Area** — A prominent card with a placeholder message ("Pitch deck PDF coming soon") that will display the uploaded PDF once provided. For now, a styled placeholder card.
3. **Funding Phases Timeline** — A vertical timeline showing:
   - **Pre-Seed** (current phase, highlighted): $600,000 target
   - **Seed**: Amount configurable (placeholder $2,000,000)
   - **Series A**: Amount configurable (placeholder $8,000,000)
   - Each phase shows: stage name, target amount, status badge (Active/Upcoming), and a brief description of fund allocation
4. **Use of Funds** — A breakdown section showing what the funding covers (e.g., Engineering 40%, Product 25%, Go-to-Market 20%, Operations 15%) with animated progress bars
5. **CTA** — "Talk to the Founders" button linking to a contact form or email

### Backend (Database Table: `funding_rounds`)
- Columns: `id`, `phase_name`, `target_amount`, `current_amount`, `status` (active/upcoming/completed), `description`, `display_order`, `created_at`, `updated_at`
- Pre-seeded with Pre-Seed ($600,000), Seed, Series A data
- Editable from the admin dashboard later

### Design
- Matching dark theme with glass cards
- The active funding phase gets a glowing border treatment
- Timeline uses a vertical line with circular nodes (filled for active, outlined for upcoming)
- Fully responsive

**New file:** `src/pages/Pitch.tsx`

---

## 6. Database Tables

### `donations` table
```
id (uuid, PK)
name (text, nullable)
email (text, not null)
amount (numeric, not null)
tier (text) — 'supporter' | 'builder' | 'visionary' | 'open'
message (text, nullable)
status (text, default 'pending')
created_at (timestamptz)
```
RLS: Allow anonymous inserts (public form), admin-only reads.

### `funding_rounds` table
```
id (uuid, PK)
phase_name (text, not null)
target_amount (numeric, not null)
current_amount (numeric, default 0)
status (text) — 'active' | 'upcoming' | 'completed'
description (text)
fund_allocation (jsonb) — e.g. {"Engineering": 40, "Product": 25, ...}
display_order (integer)
created_at (timestamptz)
updated_at (timestamptz)
```
RLS: Public reads (investor page is public), admin-only writes.

Pre-seed data via migration:
- Pre-Seed: $600,000, status 'active'
- Seed: $2,000,000, status 'upcoming'
- Series A: $8,000,000, status 'upcoming'

---

## 7. Route Registration

Add `/fund` and `/pitch` routes in `src/App.tsx`.

---

## Summary of Files Changed/Created

| File | Action |
|------|--------|
| `src/components/FloatingNav.tsx` | Edit: always visible, transparent, "Fund Our Project" CTA |
| `src/components/SovereignBackerSection.tsx` | Edit: update both card CTAs with navigation |
| `src/pages/Fund.tsx` | Create: donation page with 4 tiers |
| `src/pages/Pitch.tsx` | Create: investor pitch page with phases timeline |
| `src/App.tsx` | Edit: add two new routes |
| Migration SQL | Create: `donations` + `funding_rounds` tables with RLS + seed data |
