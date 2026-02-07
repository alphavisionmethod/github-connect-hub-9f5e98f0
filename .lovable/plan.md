
# Advanced CRM Email Automation System

## Overview

Transform your admin dashboard into a powerful CRM with automated email workflows similar to GoHighLevel. This system will handle:
- Automated welcome sequences for new backers
- Drip campaigns for waitlist nurturing
- Product update broadcasts
- Scheduled follow-ups and engagement tracking

---

## System Architecture

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                         ADMIN DASHBOARD                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │   Backers    │  │   Waitlist   │  │  Workflows   │  │  Broadcasts  │ │
│  │     Tab      │  │     Tab      │  │     Tab      │  │     Tab      │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘ │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │                      WORKFLOW BUILDER                                ││
│  │  ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐          ││
│  │  │ Trigger │ -> │ Wait    │ -> │ Email 1 │ -> │ Email 2 │ -> ...   ││
│  │  │ (Join)  │    │ (1 day) │    │ Welcome │    │ Tips    │          ││
│  │  └─────────┘    └─────────┘    └─────────┘    └─────────┘          ││
│  └─────────────────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATABASE TABLES                                  │
├─────────────────────────────────────────────────────────────────────────┤
│  email_templates    │  email_sequences    │  sequence_emails            │
│  - id               │  - id               │  - id                       │
│  - name             │  - name             │  - sequence_id              │
│  - subject          │  - trigger_type     │  - template_id              │
│  - html_content     │  - audience         │  - delay_days               │
│  - tier_specific    │  - active           │  - order_position           │
│  - category         │  - created_at       │  - conditions               │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         EDGE FUNCTIONS                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  process-email-queue     │  send-broadcast     │  run-scheduled-emails  │
│  (Cron: every hour)      │  (Manual trigger)   │  (Cron: daily)         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Feature Breakdown

### 1. Email Templates Library

A reusable template system with pre-built and custom templates.

**Pre-built Templates:**
| Template | Purpose | Audience |
|----------|---------|----------|
| Welcome - Operator | Thank backer, list benefits | Operator tier |
| Welcome - Sovereign | Premium welcome, exclusive access | Sovereign tier |
| Welcome - Governance | VIP welcome, schedule call CTA | Governance tier |
| Waitlist Welcome | Thanks for joining, what to expect | All waitlist |
| Product Update | Feature announcements | All contacts |
| Beta Invite | Access invitation | Priority queue |
| Payment Reminder | Gentle follow-up | Pending backers |

**Template Features:**
- Visual editor with live preview
- Dynamic variables: `{{name}}`, `{{tier}}`, `{{backer_number}}`
- Tier-specific styling (auto-apply brand colors)
- A/B testing support (future)

---

### 2. Email Sequences (Drip Campaigns)

Automated multi-step email journeys triggered by events.

**Backer Welcome Sequence:**
```text
Day 0: Welcome + Certificate (existing)
Day 2: "Getting Started" guide
Day 5: Product roadmap preview
Day 14: Exclusive community invite
Day 30: Feedback request
```

**Waitlist Nurture Sequence:**
```text
Day 0: Welcome to waitlist
Day 3: Problem/solution story
Day 7: Social proof (testimonials)
Day 14: Exclusive early-bird offer
Day 21: Urgency/scarcity message
```

**Investor Sequence:**
```text
Day 0: Thank you + data room access
Day 2: Founder video message
Day 7: Traction update
Day 14: Follow-up check-in
```

---

### 3. Workflow Automation Tab

New dashboard tab for managing all automation.

**UI Components:**
- Sequence cards with status (Active/Paused/Draft)
- Visual timeline showing email steps
- Quick actions: Edit, Pause, Duplicate, Delete
- Performance metrics: Sent, Opened, Clicked

**Workflow Builder:**
- Drag-and-drop sequence editor
- Conditional logic (if tier = X, send Y)
- Time delay settings (hours/days)
- Exit conditions (unsubscribe, converted)

---

### 4. Broadcast System

One-time emails to segmented audiences.

**Features:**
- Audience segmentation (tier, join date, engagement)
- Schedule for later
- Send test email first
- Track delivery status

**Segments:**
- All Backers
- Governance Only
- Waitlist (not converted)
- Investors
- Joined last 30 days
- Never opened email

---

### 5. Email Analytics Dashboard

Track performance across all communications.

**Metrics:**
- Total emails sent (daily/weekly/monthly)
- Delivery rate
- Open rate (requires tracking pixel)
- Click rate (requires link tracking)
- Unsubscribe rate
- Sequence completion rate

---

## Database Schema Changes

### New Tables

**email_templates**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Template name |
| subject | text | Email subject line |
| html_content | text | Full HTML template |
| category | text | welcome, update, reminder, etc. |
| tier_specific | text | null, operator, sovereign, governance |
| is_active | boolean | Template available for use |
| created_at | timestamp | Creation date |
| updated_at | timestamp | Last modified |

**email_sequences**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Sequence name |
| description | text | Purpose description |
| trigger_type | text | on_signup, on_backer, manual |
| audience | text | waitlist, donors, investors, all |
| tier_filter | text | null (all) or specific tier |
| is_active | boolean | Sequence running |
| created_at | timestamp | Creation date |

**sequence_steps**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| sequence_id | uuid | FK to email_sequences |
| template_id | uuid | FK to email_templates |
| step_order | integer | Position in sequence (1, 2, 3...) |
| delay_hours | integer | Hours to wait before sending |
| conditions | jsonb | Optional: tier checks, etc. |

**email_queue**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| recipient_email | text | Target email |
| recipient_name | text | Personalization |
| template_id | uuid | FK to email_templates |
| sequence_id | uuid | FK if part of sequence |
| step_order | integer | Which step |
| scheduled_at | timestamp | When to send |
| sent_at | timestamp | Null until sent |
| status | text | pending, sent, failed |
| metadata | jsonb | Extra data (tier, backer#, etc.) |

**email_logs**
| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| queue_id | uuid | FK to email_queue |
| recipient_id | uuid | FK to donors/waitlist |
| recipient_type | text | donor, waitlist |
| email_id | text | Resend email ID |
| status | text | sent, delivered, opened, clicked, bounced |
| opened_at | timestamp | When opened (if tracked) |
| clicked_at | timestamp | When clicked (if tracked) |
| created_at | timestamp | Log creation |

---

## Edge Functions

### 1. process-email-queue
- **Trigger**: Cron job (every hour)
- **Purpose**: Send all emails where `scheduled_at <= now()` and `status = pending`
- **Logic**:
  1. Fetch pending emails from queue
  2. Render template with recipient data
  3. Send via Resend
  4. Update status and log

### 2. enqueue-sequence-emails
- **Trigger**: Database trigger on donor/waitlist insert
- **Purpose**: Add sequence emails to queue when new contact joins
- **Logic**:
  1. Check trigger type matches
  2. Calculate scheduled times based on delays
  3. Insert all steps into email_queue

### 3. send-broadcast
- **Trigger**: Manual from dashboard
- **Purpose**: Queue a one-time email to a segment
- **Logic**:
  1. Accept template_id and audience filter
  2. Query matching contacts
  3. Insert into email_queue with immediate schedule

### 4. get-email-analytics
- **Trigger**: Dashboard API call
- **Purpose**: Aggregate email performance metrics

---

## Frontend Components

### New Files

**src/components/admin/WorkflowsTab.tsx**
- Sequence list with cards
- Create/Edit sequence modal
- Visual step editor

**src/components/admin/TemplateEditor.tsx**
- HTML template editor
- Live preview pane
- Variable insertion toolbar

**src/components/admin/BroadcastSender.tsx**
- Audience selector
- Template picker
- Schedule options
- Send confirmation

**src/components/admin/EmailAnalytics.tsx**
- Metrics cards
- Charts (sent over time, open rates)
- Sequence performance table

### Dashboard Updates

Add new tabs to existing dashboard:
- Workflows (sequence management)
- Templates (email library)
- Broadcasts (one-time sends)
- Analytics (performance tracking)

---

## Implementation Phases

### Phase 1: Foundation (Core Infrastructure)
1. Create database tables for templates, sequences, queue, logs
2. Build `process-email-queue` edge function with cron
3. Migrate existing welcome email to template system
4. Add Workflows tab to dashboard with sequence list

### Phase 2: Sequence Builder
1. Create sequence editor UI with step management
2. Implement `enqueue-sequence-emails` trigger function
3. Add pre-built sequences (Backer Welcome, Waitlist Nurture)
4. Enable pause/resume functionality

### Phase 3: Templates & Broadcasts
1. Build template editor with live preview
2. Create broadcast sender with audience segmentation
3. Add template library with pre-built options

### Phase 4: Analytics & Optimization
1. Implement email logging and tracking
2. Build analytics dashboard with charts
3. Add open/click tracking (Resend webhooks)

---

## Prerequisites

1. **RESEND_API_KEY**: You'll need to add this secret if not already configured
2. **Verified Domain**: Emails must come from a verified domain in Resend
3. **Cron Setup**: Enable pg_cron extension for scheduled processing

---

## Summary

This CRM system will give you:
- Automated welcome sequences for all backer tiers
- Waitlist nurturing drip campaigns  
- One-click broadcast emails
- Visual workflow builder
- Complete email analytics
- Template library with tier-specific branding

All managed from your existing admin dashboard with a professional, GHL-style interface.
