---
name: Dashboard architecture decisions
description: Route tree, component map, server/client split, and relative import path depth for the dashboard refactor
type: project
---

## Route tree (implemented 2026-05-05)

All dashboard routes live under `app/app/dashboard/`:
- `/dashboard` → redirect to `/dashboard/today` (page.tsx is now a redirect-only file)
- `/dashboard/today` → server page, `listThisWeek()`
- `/dashboard/diary` → server page, `listEntries()`, `groupByMonth`
- `/dashboard/diary/[entryId]` → async server page, `getEntry(params.entryId)`
- `/dashboard/reports` → server page, `REPORT_HISTORY`
- `/dashboard/reports/weekly/[weekId]` → async server page
- `/dashboard/reports/monthly/[monthId]` → async server page
- `/dashboard/goals` → server page, `GOALS`
- `/dashboard/threads` → server page, `THREADS` (inline `ThreadRow`)
- `/dashboard/ask` → client page (`"use client"`), manages messages state

## Component map

All components live in `app/app/dashboard/_components/`:
- `shell/`: `icons.tsx` (no client), `Sidebar.tsx` (client — usePathname), `Topbar.tsx` (no client)
- `voice/`: `VoiceCapture.tsx` (client — useState/useEffect)
- `entry/`: `EntryCard.tsx`, `EntryList.tsx`, `EntryView.tsx` (all server)
- `reports/`: `StatRow.tsx`, `WeeklyReport.tsx`, `MonthlyReport.tsx` (server), `ReportHistoryList.tsx` (client — toggle state)
- `goals/`: `GoalCard.tsx` (server), `GoalList.tsx` (client — dialog state), `GoalEditorDialog.tsx` (client — native dialog)
- `ask/`: `ChatMessage.tsx` (server), `AskComposer.tsx` (client), `ConversationView.tsx` (client)

## Import path depth — relative imports

From nested dynamic routes, count carefully:
- `diary/[entryId]/page.tsx` → `../../_components` (2 up = `dashboard/`)
- `reports/page.tsx` → `../_components` (1 up = `dashboard/`)
- `reports/weekly/[weekId]/page.tsx` → `../../../_components` (3 up = `dashboard/`)
- `reports/monthly/[monthId]/page.tsx` → `../../../_components` (3 up = `dashboard/`)

**Why:** Using `../../../../` on the deeply nested report pages caused a build failure (pointed to `app/` not `dashboard/`). `@/*` alias maps to `app/` directory root, so `@/app/dashboard/_components` would also work but is verbose.

**How to apply:** When adding new nested routes under `reports/`, count up to `dashboard/` level for `_components` imports — do not assume 4 `../` traversals reach it.

## Layout shell

`dashboard/layout.tsx` is a server component. Sidebar is client (usePathname), Topbar is rendered by each page (not the layout), VoiceCapture is client floating fixed element.

## Styling convention

Inline styles with `var(--token)` CSS custom properties are the established pattern throughout. No Tailwind utilities for colour/font/shadow. Component classes `.wd-card`, `.btn`, `.tag`, `.meta`, `.prose` are used as className. No new libraries.
