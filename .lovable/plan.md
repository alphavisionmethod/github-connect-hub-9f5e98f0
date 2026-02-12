

# Workflow Automation System -- GoHighLevel-Style

## Overview

Transform the current email-only sequence system into a full trigger-action workflow automation engine inspired by GoHighLevel. The current system only supports email sequences with delays. The new system will support multiple trigger types, diverse action types, conditional logic, and a visual workflow builder.

## Current State

- **WorkflowsTab.tsx**: Lists email sequences with play/pause, expand to see steps
- **SequenceBuilderModal.tsx**: Creates sequences with 3 trigger types (on_signup, on_backer, manual) and email-only steps with delays
- **Database tables**: `email_sequences`, `sequence_steps`, `email_templates`, `email_queue`, `email_logs`
- All steps are email-only -- no other action types

## What Changes

### 1. New Database Tables (Supabase Migrations)

**`workflows` table** (replaces reliance on `email_sequences` for this UI)
- `id`, `name`, `description`, `is_active`, `created_at`, `updated_at`

**`workflow_triggers` table**
- `id`, `workflow_id` (FK), `trigger_type` (enum: `form_submission`, `contact_created`, `appointment_booked`, `tag_added`, `email_opened`, `link_clicked`, `manual`, `contact_replied`, `pipeline_stage_changed`)
- `trigger_config` (JSONB -- stores filter conditions like which form, which tag, etc.)

**`workflow_actions` table**
- `id`, `workflow_id` (FK), `action_order`, `action_type` (enum: `send_email`, `send_sms`, `add_tag`, `remove_tag`, `update_contact`, `assign_user`, `wait_delay`, `if_else`, `webhook`, `internal_notification`, `move_pipeline`)
- `action_config` (JSONB -- stores action-specific settings like template_id, delay_hours, conditions, webhook_url, etc.)
- `parent_action_id` (nullable FK to self -- for if/else branching)
- `branch` (nullable -- `yes` or `no` for if/else children)

**`workflow_executions` table** (execution log / receipts)
- `id`, `workflow_id`, `contact_id`, `contact_email`, `status` (`running`, `completed`, `failed`, `paused`), `started_at`, `completed_at`

**`workflow_execution_steps` table**
- `id`, `execution_id`, `action_id`, `status`, `executed_at`, `result` (JSONB), `error`

### 2. New UI Components

**WorkflowsTab.tsx** -- Refactored
- List of workflows with name, trigger badge, action count, status toggle, last run time
- "Create Workflow" button opens builder
- Filter by active/paused
- Quick stats: active workflows, total executions, actions configured

**WorkflowBuilderModal.tsx** -- New (replaces SequenceBuilderModal for new workflows)
- **Step 1 - Settings**: Name, description
- **Step 2 - Trigger**: Pick a trigger type from categorized grid (Contact, Appointment, Communication, Pipeline). Each trigger has its own config panel (e.g., "which form?" for form_submission)
- **Step 3 - Actions**: Visual vertical timeline where you add actions sequentially
  - Each action is a card with icon, type label, and inline config
  - "+" button between actions to insert
  - Drag to reorder
  - Action types grouped: Communication (Send Email, Send SMS), CRM (Add Tag, Update Contact, Assign User), Logic (Wait/Delay, If/Else), Integration (Webhook, Internal Notification)
  - If/Else shows branching with Yes/No paths
- **Step 4 - Review and Activate**: Summary view before saving

**TriggerSelector.tsx** -- New
- Categorized grid of trigger types with icons and descriptions
- Search/filter triggers

**ActionCard.tsx** -- New
- Reusable card for each action in the builder timeline
- Shows action icon, type, summary of config
- Edit/delete buttons
- Inline config panel when expanded

**ActionConfigPanel.tsx** -- New
- Dynamic form that changes based on action type:
  - Send Email: template picker, subject override
  - Wait/Delay: hours/days picker
  - Add Tag: tag name input
  - If/Else: condition builder (field, operator, value)
  - Webhook: URL, method, headers, body
  - Update Contact: field picker + value

### 3. Backend -- New Edge Function

**`execute-workflow` edge function**
- Receives trigger event payload (contact_id, trigger_type, metadata)
- Looks up active workflows matching the trigger
- Creates execution record
- Processes actions sequentially:
  - `send_email`: queues email via existing `email_queue`
  - `wait_delay`: schedules next step at future time
  - `add_tag` / `update_contact`: updates Supabase records
  - `if_else`: evaluates condition, picks branch
  - `webhook`: calls external URL
- Logs each step result to `workflow_execution_steps`

### 4. Trigger Integration Points

- **Form submission**: The existing waitlist signup flow calls `execute-workflow` with trigger `form_submission`
- **Contact created (backer)**: The existing backer flow calls `execute-workflow` with trigger `contact_created`
- **Manual**: Admin clicks "Run" on a workflow, selects contacts

### 5. File Changes Summary

| File | Change |
|------|--------|
| `src/components/admin/WorkflowsTab.tsx` | Major refactor -- new workflow list UI with trigger/action counts |
| `src/components/admin/SequenceBuilderModal.tsx` | Keep for legacy; new workflows use WorkflowBuilderModal |
| `src/components/admin/WorkflowBuilderModal.tsx` | **New** -- multi-step workflow builder |
| `src/components/admin/TriggerSelector.tsx` | **New** -- trigger type picker |
| `src/components/admin/ActionCard.tsx` | **New** -- action timeline card |
| `src/components/admin/ActionConfigPanel.tsx` | **New** -- dynamic action config forms |
| `supabase/functions/execute-workflow/index.ts` | **New** -- workflow execution engine |
| Supabase migrations | **New** -- 4 new tables |

### 6. Implementation Order

1. Create database migrations (workflows, workflow_triggers, workflow_actions, workflow_executions, workflow_execution_steps)
2. Build TriggerSelector component
3. Build ActionCard and ActionConfigPanel components
4. Build WorkflowBuilderModal (combines trigger + actions into a multi-step builder)
5. Refactor WorkflowsTab to list new workflows alongside legacy sequences
6. Create `execute-workflow` edge function
7. Wire trigger points (waitlist signup, backer creation) to call the edge function

### 7. Trigger Types Available at Launch

| Trigger | Description |
|---------|-------------|
| Form Submission | When someone submits the waitlist/contact form |
| Contact Created | When a new backer or waitlist entry is added |
| Manual | Admin triggers on selected contacts |
| Tag Added | When a tag is applied to a contact |
| Email Opened | When a recipient opens an email |
| Link Clicked | When a recipient clicks a link in an email |

### 8. Action Types Available at Launch

| Action | Description |
|--------|-------------|
| Send Email | Send an email using a template |
| Wait / Delay | Pause workflow for X hours/days |
| Add Tag | Apply a tag to the contact |
| Remove Tag | Remove a tag from the contact |
| Update Contact | Update a contact field |
| If/Else | Branch based on a condition |
| Webhook | Call an external URL (Zapier, n8n, etc.) |
| Internal Notification | Notify admin via email |

