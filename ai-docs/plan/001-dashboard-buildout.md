# Dashboard Buildout Plan

## Context

The current `app/app/dashboard/page.tsx` is a single 628-line client component with all components inlined and mock data hardcoded. The goal is to split it into a proper Next.js nested route tree, extract a typed mock-data layer, and build three missing surfaces: **Goals**, **Monthly Report**, and **Ask** (conversational debrief). This is a full web app build-out before transitioning to a React Native / Expo mobile app. The mock data layer uses clean, DOM-free TypeScript types so they can be shared with the future mobile package.

**Confirmed decisions:**
- Build everything in one session (all steps below)
- Mobile = React Native / Expo — separate codebase, shared TypeScript types + mock data layer
- Ask screen = fully mocked (600ms canned response, no API call yet)
- Backend lands before mobile work starts; mock layer is the API contract

---

## Outcome

- `/dashboard/*` becomes a real route tree with deep links and browser history
- Dashboard split into small, named, single-purpose components in `app/app/dashboard/_components/`
- Mock data lives in `app/lib/mock/` — typed, no DOM imports, swappable for a real API later
- Goals, Monthly Report, and Ask are fully designed screens, not stubs
- `ai-docs/` workspace holds architecture docs and design token reference

---

## File Layout (target)

```
ai-docs/
├── plan/
│   └── 001-dashboard-buildout.md
└── internal-documentation/
    ├── dashboard-architecture.md
    └── design-tokens-cheatsheet.md

app/app/
├── dashboard/
│   ├── layout.tsx                        # sidebar + voicecapture shell (server component)
│   ├── page.tsx                          # redirect → /dashboard/today
│   ├── today/page.tsx                    # this week's entries feed
│   ├── diary/
│   │   ├── page.tsx                      # full diary list, grouped by month
│   │   └── [entryId]/page.tsx            # single entry reading view
│   ├── reports/
│   │   ├── page.tsx                      # history list, weekly/monthly toggle
│   │   ├── weekly/[weekId]/page.tsx
│   │   └── monthly/[monthId]/page.tsx
│   ├── goals/page.tsx
│   ├── threads/page.tsx
│   ├── ask/page.tsx
│   └── _components/
│       ├── shell/
│       │   ├── Sidebar.tsx               # client, usePathname() for active state
│       │   ├── Topbar.tsx                # accepts crumb prop, each page passes its own
│       │   └── icons.tsx                 # NAV_ICONS map + <Icon /> primitive
│       ├── entry/
│       │   ├── EntryCard.tsx             # with <Link href> for diary route
│       │   ├── EntryList.tsx             # shared by Today + Diary
│       │   └── EntryView.tsx
│       ├── reports/
│       │   ├── StatRow.tsx
│       │   ├── WeeklyReport.tsx
│       │   ├── MonthlyReport.tsx         # + month-over-month row + top threads section
│       │   └── ReportHistoryList.tsx     # weekly/monthly toggle pill + chronological list
│       ├── goals/
│       │   ├── GoalCard.tsx              # title, reason, progress bar, status chip, sparkline
│       │   ├── GoalList.tsx
│       │   └── GoalEditorDialog.tsx      # HTML <dialog>, create/edit form
│       ├── ask/
│       │   ├── AskComposer.tsx
│       │   ├── ChatMessage.tsx           # user vs assistant bubble styles
│       │   └── ConversationView.tsx      # message list + suggested prompts empty state
│       └── voice/
│           └── VoiceCapture.tsx          # floating capture, lifted from dashboard page

app/lib/
└── mock/
    ├── types.ts        # Entry, Goal, WeeklyReport, MonthlyReport, ReportSummary, ChatMessage, StatItem, TopThread, ThreadStatus
    ├── entries.ts      # ENTRIES[], getEntry(id), listEntries(), listThisWeek()
    ├── reports.ts      # WEEKLY_REPORTS[], MONTHLY_REPORTS[], REPORT_HISTORY[], getWeeklyReport(), getMonthlyReport()
    ├── goals.ts        # GOALS[] with sparkline arrays
    ├── threads.ts      # THREADS[]
    └── ask.ts          # CANNED_RESPONSES[], getCannedResponse()
```

---

## Implementation Steps

### 1. Create `ai-docs/` workspace

- `ai-docs/plan/001-dashboard-buildout.md` — mirror of this plan
- `ai-docs/internal-documentation/dashboard-architecture.md` — route tree, data shape, component map
- `ai-docs/internal-documentation/design-tokens-cheatsheet.md` — table of tokens

### 2. Extract mock data layer (`app/lib/mock/`)

All types in `types.ts` must be pure TypeScript — zero DOM or React imports — so they can be copied into a future `packages/shared` monorepo workspace.

**New types (in addition to existing `Entry`, `ThreadStatus`):**

```ts
Goal {
  id: string
  title: string
  reason: string              // "Why this matters"
  status: "on-track" | "slipping" | "paused"
  progress: number            // 0–1
  sparkline: number[]         // 4 weekly data points, 0–1
  lastEvaluated: string       // ISO date string
}

WeeklyReport {
  weekId: string
  label: string               // e.g. "Week of Apr 28"
  dateRange: string
  summary: string
  highlights: string[]
  stats: StatItem[]
  threads: string[]
}

MonthlyReport {
  monthId: string
  label: string               // e.g. "April 2026"
  dateRange: string
  summary: string
  highlights: string[]
  stats: StatItem[]
  topThreads: TopThread[]
  prevMonthComparison: StatItem[]
}

ReportSummary { id, type: "weekly" | "monthly", label, dateRange }
ChatMessage { id, role: "user" | "assistant", content: string, citedText?: string, timestamp: string }
StatItem { label: string, value: string }
TopThread { name: string, signal: string }
```

Seed data: sentence case, no emoji, em-dashes ok, warm/literary tone.

### 3. Split shell into route layout

`app/app/dashboard/layout.tsx` (server component):
- Renders `<Sidebar />` + `<div class="wd-main">{children}</div>` + `<VoiceCapture />`
- Each `page.tsx` renders its own `<Topbar crumb="…" />` at the top of its content (simpler than a slot pattern)

`Sidebar.tsx` — client component using `usePathname()` for active-state, no prop drilling.

### 4. Port existing screens to routes

| Route | Source | Notes |
|---|---|---|
| `/dashboard` | — | `redirect('/dashboard/today')` |
| `/dashboard/today` | current `Today` body | `listThisWeek()` → `<EntryList />` |
| `/dashboard/diary` | current `Diary` body | `listEntries()` grouped by month |
| `/dashboard/diary/[entryId]` | `EntryView` | `getEntry(id)`, `notFound()` on miss |
| `/dashboard/reports` | current `Reports` body | history list + toggle pill |
| `/dashboard/reports/weekly/[weekId]` | — | `getWeeklyReport(weekId)` → `<WeeklyReport />` |
| `/dashboard/reports/monthly/[monthId]` | — | `getMonthlyReport(monthId)` → `<MonthlyReport />` |
| `/dashboard/threads` | current `ThreadsPanel` body | `THREADS` |

### 5. Build new screens

**Goals (`goals/page.tsx`)**
- Heading + lede, then `<GoalList goals={GOALS} />`
- Each `GoalCard`: title (serif), reason, progress bar, status chip (sage = on-track, ochre = slipping), 4-point SVG sparkline, last-evaluated meta
- "+ New goal" button opens `<GoalEditorDialog />` (HTML `<dialog>`)
- Empty state: *"You haven't set a goal yet. Tell WeaveDiary what you're working towards — it'll watch quietly."*

**Monthly Report (`MonthlyReport.tsx`)**
- Prose summary + `StatRow` list
- Month-over-month comparison row (delta shown as `+X` / `−X` in sage/ochre)
- "Threads that mattered most" — top 3 entries with signal descriptor

**Ask (`ask/page.tsx`)**
- Centered max-720px column
- `<ConversationView />` scrollable at top, `<AskComposer />` pinned at bottom
- Submit: appends user message immediately → 600ms delay → appends `getCannedResponse()`
- Empty state: 3 suggested prompt chips — *"What's been quietly slipping?"*, *"When am I happiest in my voice notes?"*, *"What did I underestimate this month?"*
- `ChatMessage` styles: user = right-aligned, parchment-deep bg; assistant = left-aligned, parchment-soft bg, serif body, madder italic pull-quote when `citedText` present

### 6. Replace `dashboard/page.tsx`

```tsx
import { redirect } from 'next/navigation'
export default function Dashboard() { redirect('/dashboard/today') }
```

### 7. Verify

```bash
cd app
npm run lint    # must pass
npm run build   # must pass, zero type errors
```

Manual checklist:
- [ ] `/dashboard` redirects to `/dashboard/today`
- [ ] Today screen renders entry cards
- [ ] Click diary card → `/dashboard/diary/[id]`; back button works
- [ ] Deep-link `/dashboard/diary/1` directly works
- [ ] Goals renders cards with progress + sparklines; "+ New goal" opens dialog
- [ ] `/dashboard/reports` shows toggle + history; clicking through to weekly/monthly works
- [ ] Ask empty state shows 3 chips; submit shows user bubble + canned response after 600ms
- [ ] VoiceCapture floats on every dashboard route
- [ ] `/` landing page and Demo component unaffected

---

## Out of Scope (this round)

- Settings page
- Real OAuth, Claude API calls, database
- Mobile responsive pass for dashboard shell (assumes desktop)
- Search functionality (topbar search stays a visual placeholder)
- Authentication
