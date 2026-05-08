# Move mock data to Supabase + add diary entry create/edit

## Context

The dashboard renders entirely from static mock files in `app/lib/mock/` (entries, goals, reports, threads, ask). Supabase auth + a first migration (`profiles`, `integrations`) already exist, plus `app/lib/supabase/{client,server,middleware}.ts` and `app/lib/database.types.ts`. We want to:

1. Replace every mock-import in the dashboard with real Supabase reads, keeping the existing data shapes intact.
2. Let signed-in users **create today's diary entry** and **edit any previous entry** (title, body paragraphs, voice note, mood, excerpt). Threads list and minutes stay auto-derived (placeholders for now since the synthesis pipeline doesn't exist yet).
3. Persist Ask conversations and goals so dialogs that already have UI become real.

This unblocks every downstream feature (synthesis, generation, integrations sync) by giving them a real read/write surface.

---

## Decisions locked

- **Threads UI** is derived from the existing `integrations` table (extended), not a new table.
- **Reports** stored as a single `reports` table with a JSONB `payload` column.
- **Ask** conversations + messages persisted now; assistant replies still come from the existing canned set until Claude is wired.
- **Entry editing** is in-place for today's entry; past entries get the same editor. Threads / minutes are not user-editable.

---

## 1. New migration: `supabase/migrations/0002_diary_schema.sql`

### 1a. Extend `integrations` to cover the Threads UI

- `alter type public.integration_provider add value 'voice';`
- `alter type public.integration_status add value 'syncing';` and `'paused';`
   - Note: postgres requires these in their own statement before being usable. The mock's `Connected | Syncing | Paused` maps to the existing enum after these additions; `disconnected` and `error` remain valid.
- No `color` / `detail` columns added — `color` lives in a code-level provider→hex map (matches design tokens); `detail` is a derived activity summary that becomes meaningful only once sync workers exist, so leave it nullable in the UI for now.
- A code-level `displayName` map turns enum values into "GitHub" / "Calendar" / "Voice" etc. Mirrors the mock's `Thread.name`.

### 1b. `entries`

```sql
create table public.entries (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  entry_date   date not null,
  title        text not null,
  excerpt      text,
  body         text[] not null default '{}',          -- ordered paragraphs
  mood         text,
  voice        text,
  minutes      int  not null default 1,
  threads      text[] not null default '{}',          -- e.g. {github,calendar,voice}
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique (user_id, entry_date)
);
```

RLS: select/insert/update/delete by `auth.uid() = user_id`.

`updated_at` auto-bumped via a trigger (reuse a single shared `set_updated_at()` trigger function defined once in this migration and applied to entries/goals/reports/ask_conversations).

### 1c. `goals`

```sql
create type public.goal_status as enum ('on-track', 'slipping', 'paused');

create table public.goals (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  title           text not null,
  reason          text,
  status          public.goal_status not null default 'on-track',
  progress        numeric(3,2) not null default 0,        -- 0..1
  sparkline       jsonb not null default '[]'::jsonb,     -- number[]
  last_evaluated  date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);
```

RLS: owner-only.

### 1d. `reports`

```sql
create type public.report_type as enum ('weekly', 'monthly');

create table public.reports (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  type        public.report_type not null,
  period_id   text not null,            -- "2026-w20" or "2026-04"
  label       text not null,
  date_range  text not null,
  summary     text,
  payload     jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  unique (user_id, type, period_id)
);
```

`payload` carries `highlights`, `stats`, `threads`, `topThreads`, `prevMonthComparison` matching the existing TS shapes 1:1. RLS: owner-only.

### 1e. `ask_conversations` + `ask_messages`

```sql
create type public.ask_role as enum ('user', 'assistant');

create table public.ask_conversations (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create table public.ask_messages (
  id               uuid primary key default gen_random_uuid(),
  conversation_id  uuid not null references public.ask_conversations(id) on delete cascade,
  user_id          uuid not null references auth.users(id) on delete cascade,
  role             public.ask_role not null,
  content          text not null,
  cited_text       text,
  created_at       timestamptz not null default now()
);

create index ask_messages_conversation_idx on public.ask_messages (conversation_id, created_at);
```

RLS on both: owner-only via `user_id`.

---

## 2. Type updates: `app/lib/database.types.ts`

Hand-extend the existing file to include rows/inserts/updates for `entries`, `goals`, `reports`, `ask_conversations`, `ask_messages`, plus the new enums (`goal_status`, `report_type`, `ask_role`) and the expanded `integration_provider` / `integration_status` values. The file already has a comment noting it can be regenerated via `npx supabase gen types typescript --linked` — that's the long-term plan, but extending by hand keeps the PR self-contained.

---

## 3. Domain types: replace `app/lib/mock/types.ts` with `app/lib/types.ts`

Move the existing TS interfaces out of the `mock/` folder so they survive deletion. Keep the camelCase shapes (Entry, Goal, Thread, WeeklyReport, MonthlyReport, ReportSummary, ChatMessage, StatItem, TopThread, ThreadStatus). They become the wire format used by the read helpers; row-to-domain mappers in step 4 convert snake_case DB rows.

---

## 4. New data-access layer: `app/lib/db/`

Thin helpers that mirror existing mock helper signatures so page-level diffs stay tiny. Each file:

- `app/lib/db/entries.ts` — `getEntry(id)`, `getEntryByDate(date)`, `listEntries()`, `listThisWeek()`, `groupEntriesByMonth(entries)`. Reads via the server-side Supabase client; orders by `entry_date desc`. Maps DB rows → `Entry` (formats `entry_date` to display string `"Thu · 17 May"` via a new `lib/utils/dates.ts`).
- `app/lib/db/goals.ts` — `getGoal(id)`, `listGoals()`.
- `app/lib/db/reports.ts` — `getWeeklyReport(weekId)`, `getMonthlyReport(monthId)`, `listReportHistory()`.
- `app/lib/db/threads.ts` — `listThreads()` reads `integrations` rows for the user and projects them onto the `Thread` shape using a static `PROVIDER_DISPLAY` map (name + color). Synthesises a `Voice` row if no `voice` integration exists yet (so first-time users still see Voice in the list).
- `app/lib/db/ask.ts` — `getOrCreateConversation()`, `listMessages(conversationId)`.

All helpers take an optional pre-resolved Supabase client to avoid double-`createClient()` per page.

A new `app/lib/supabase/auth.ts` exports `requireUser()` — calls `auth.getUser()`, redirects to `/sign-in` if absent. Every dashboard page calls it first; this also gives helpers the `user.id` to scope queries against.

---

## 5. Server actions: `app/lib/actions/`

Use Next.js Server Actions (the dashboard pages are already server components, so this is the natural fit; no API routes needed).

- `app/lib/actions/entries.ts`
   - `createEntry(input)` — inserts a row for `(user_id, entry_date)`. If today's row exists, returns the existing id (idempotent).
   - `updateEntry(id, patch)` — title, body (paragraphs), excerpt, mood, voice. Excludes threads/minutes.
   - On success: `revalidatePath('/dashboard/today')`, `/diary`, `/diary/[id]`.
- `app/lib/actions/goals.ts` — `createGoal`, `updateGoal`, `deleteGoal`. Wired into `GoalEditorDialog` via `onSave`.
- `app/lib/actions/ask.ts` — `sendUserMessage(conversationId, content)` inserts the user row and appends a canned assistant row in the same transaction (preserving the existing UX), then revalidates the Ask path.

Every action verifies `auth.getUser()` server-side; RLS is the second layer of defence.

---

## 6. Page diffs (mock import → db helper)

Each is a 1–3 line change per page:

| File | Change |
|---|---|
| `app/dashboard/today/page.tsx` | `listThisWeek()` from `lib/db/entries`; if no entry exists for today's date, render a "Write today's entry" CTA that posts to `createEntry` and routes to `/diary/[id]/edit`. |
| `app/dashboard/diary/page.tsx` | `listEntries()` from `lib/db/entries`. |
| `app/dashboard/diary/[entryId]/page.tsx` | `getEntry(entryId)` from `lib/db/entries`. Add `Edit` button that links to `[entryId]/edit`. |
| `app/dashboard/diary/[entryId]/edit/page.tsx` (NEW) | Server component that loads the entry, renders the new `EntryEditor` client component bound to `updateEntry`. |
| `app/dashboard/reports/page.tsx` | `listReportHistory()` from `lib/db/reports`. |
| `app/dashboard/reports/weekly/[weekId]/page.tsx` | `getWeeklyReport()` from `lib/db/reports`. |
| `app/dashboard/reports/monthly/[monthId]/page.tsx` | `getMonthlyReport()` from `lib/db/reports`. |
| `app/dashboard/threads/page.tsx` | `listThreads()` from `lib/db/threads`. |
| `app/dashboard/goals/page.tsx` | `listGoals()` from `lib/db/goals`; pass server actions to `GoalList`. |
| `app/dashboard/goals/_components/goals/GoalList.tsx` | Wire `onSave` to `createGoal` / `updateGoal`. |
| `app/dashboard/ask/page.tsx` | Resolve conversation via `getOrCreateConversation()`, hydrate `AskClient` with persisted messages. |
| `app/dashboard/_components/ask/AskClient.tsx` | Replace `makeUserMessage` / `makeAssistantMessage` with `sendUserMessage` action; messages prop is now from DB. |

All pages add `await requireUser()` at the top.

---

## 7. New component: `app/dashboard/_components/entry/EntryEditor.tsx`

Client component. Inputs:
- `title` (text input, serif `var(--type-h1)`)
- `mood` (text input, free-form to preserve existing mood values like "calm", "warm")
- `excerpt` (textarea, 1–2 lines)
- `body` (single textarea split on blank line into paragraphs on save; mirrors the `string[]` shape)
- `voice` (textarea, italic styling matching `EntryView`)

Submit calls the bound server action via `useTransition`; on success it calls `router.push` to the read view. Cancel routes back. Re-uses existing inputs from `GoalEditorDialog` for visual parity (same `var(--bg-sunken)`, `var(--border)`, `var(--radius-sm)` treatment).

`EntryView.tsx` gets a small "Edit" link in the top-right corner that routes to `[entryId]/edit`.

---

## 8. Cleanup

- Delete `app/lib/mock/` entirely after pages compile against the db helpers.
- **Consolidate Supabase folders**: there are currently two — `supabase/` at the repo root (canonical, holds `migrations/0001_init_profiles_integrations.sql`) and `app/supabase/` (only contains `.temp/` CLI cache files: `project-ref`, `linked-project.json`, version pins). Delete `app/supabase/` outright. Both folders are still untracked, so this is safe. Going forward, all `npx supabase` commands must be run from the repo root.
- Add a root `.gitignore` (none exists today — only `app/.gitignore`) with at minimum `supabase/.temp/` and `.env.local` so CLI cache and secrets don't ever land in git.
- The dashboard's empty states need light copy (Today: "no entry yet — write today's first lines"; Diary: "your diary is empty"; Reports: "weekly reviews show up here once you've used WeaveDiary for a week"; Goals: "add your first goal"; Ask: existing UI already handles empty conversation).

---

## 9. Critical files to modify

- `supabase/migrations/0002_diary_schema.sql` (new)
- `app/lib/database.types.ts`
- `app/lib/types.ts` (new — moved from `lib/mock/types.ts`)
- `app/lib/supabase/auth.ts` (new — `requireUser()`)
- `app/lib/utils/dates.ts` (new — `formatEntryDate`, `parseEntryDate`)
- `app/lib/db/{entries,goals,reports,threads,ask}.ts` (new)
- `app/lib/actions/{entries,goals,ask}.ts` (new)
- `app/app/dashboard/_components/entry/EntryEditor.tsx` (new)
- `app/app/dashboard/diary/[entryId]/edit/page.tsx` (new)
- 9 existing dashboard pages (small import swaps + `requireUser`)
- 2 existing components: `EntryView.tsx` (Edit link), `AskClient.tsx` (action wiring), `GoalList.tsx` (action wiring)
- Delete: `app/lib/mock/{ask,entries,goals,reports,threads,types}.ts`
- Delete: `app/supabase/` (entire directory — only contains regenerable CLI temp files)
- New: `.gitignore` at repo root (covers `supabase/.temp/`, `.env.local`, etc.)

---

## 10. Verification

1. `cd app && npm run lint && npm run build` — clean.
2. Apply migration to a local Supabase: `supabase db push` (or run 0002 SQL manually). Confirm `entries`, `goals`, `reports`, `ask_conversations`, `ask_messages` exist with RLS on.
3. Sign in. Each dashboard page renders without errors and shows empty state copy.
4. **Today**: click "Write today's entry" → editor opens → save title/body/voice → redirected to read view → row visible in `entries` table with today's date.
5. **Diary entry**: open the entry just created → click Edit → change title and add a paragraph → save → read view reflects changes; `updated_at` advanced.
6. Try editing a *different* user's entry id by URL — RLS returns 404 via `notFound()`.
7. **Goals**: add a goal via the existing dialog → row appears in `goals`. Edit it → `updated_at` advances. Status badge reflects the saved value.
8. **Threads**: connect a fake integrations row via SQL (or leave empty) → page lists Voice synthetic row; with one connected provider the row shows correct color from the display map.
9. **Ask**: send a message → user row + canned assistant row both persisted in `ask_messages`. Refresh page → conversation re-hydrates from DB, no mock import remaining.
10. Sign out → any `/dashboard/*` URL redirects to `/sign-in`.
11. `grep -r "lib/mock"` returns zero matches across `app/`.
