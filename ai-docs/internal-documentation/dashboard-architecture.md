# Dashboard Architecture

## Route Tree

```
/dashboard                          → redirect to /dashboard/today
/dashboard/today                    → this week's entry feed
/dashboard/diary                    → full diary list, grouped by month
/dashboard/diary/[entryId]          → single entry reading view
/dashboard/reports                  → report history list (weekly/monthly toggle)
/dashboard/reports/weekly/[weekId]  → specific weekly report
/dashboard/reports/monthly/[monthId] → specific monthly report
/dashboard/goals                    → goal list + create/edit
/dashboard/threads                  → connected integrations panel
/dashboard/ask                      → conversational debrief (chat UI)
```

All routes share a single layout at `app/app/dashboard/layout.tsx` that renders the sidebar shell and floating voice capture button. Settings is intentionally deferred.

---

## Layout Shell

`app/app/dashboard/layout.tsx` — server component

```
┌──────────────────────────────────────────────────────────┐
│ Sidebar (244px)  │  {children}                           │
│                  │  (each page renders its own Topbar)   │
│                  │                                       │
│                  │                                       │
└──────────────────┴───────────────────────────────────────┘
                                            ◉ VoiceCapture (floating)
```

- `Sidebar` is a **client component** — uses `usePathname()` to highlight the active nav item. No `active` prop, no `onNav` callback.
- `Topbar` is rendered by each **page** (not the layout), accepting a `crumb` string prop. This keeps the layout a server component and avoids any slot/provider complexity.
- `VoiceCapture` is a client component rendered at the layout level so it floats on every route.

---

## Component Map

```
app/app/dashboard/_components/
├── shell/
│   ├── Sidebar.tsx           client — usePathname, NAV_ITEMS, .wd-sidebar / .wd-nav
│   ├── Topbar.tsx            client — crumb prop, search box, .wd-top
│   └── icons.tsx             NAV_ICONS map (SVG paths), <Icon name /> primitive
│
├── entry/
│   ├── EntryCard.tsx         .wd-card, <Link href="/dashboard/diary/[id]">
│   ├── EntryList.tsx         maps Entry[] → EntryCard, month-group header for Diary view
│   └── EntryView.tsx         full prose reading view, voice quote block
│
├── reports/
│   ├── StatRow.tsx           single label + value row
│   ├── WeeklyReport.tsx      summary prose + StatRow list + highlights
│   ├── MonthlyReport.tsx     same + month-over-month comparison row + top threads section
│   └── ReportHistoryList.tsx Weekly/Monthly toggle pill, chronological card list
│
├── goals/
│   ├── GoalCard.tsx          title (serif), reason, progress bar, status chip, SVG sparkline, meta
│   ├── GoalList.tsx          maps Goal[] → GoalCard, passes edit callback
│   └── GoalEditorDialog.tsx  HTML <dialog>, controlled create/edit form (title, reason, target)
│
├── ask/
│   ├── AskComposer.tsx       text input + send button, fires onSubmit(text)
│   ├── ChatMessage.tsx       user bubble (right, parchment-deep) vs assistant bubble (left, parchment-soft, serif)
│   └── ConversationView.tsx  scrollable message list; empty state = 3 suggested prompt chips
│
└── voice/
    └── VoiceCapture.tsx      fixed-position floating button, .wd-pulse recording indicator
```

---

## Data Shape

All types live in `app/lib/mock/types.ts`. Zero DOM or React imports — safe to copy to a future shared package.

```ts
export type ThreadStatus = "Connected" | "Syncing" | "Paused"

export interface Entry {
  id: string
  date: string          // "Monday, April 28"
  title: string
  excerpt: string
  threads: string[]
  minutes: number
  mood?: string
  body?: string[]       // paragraphs
  voice?: string        // transcribed voice note excerpt
}

export interface Goal {
  id: string
  title: string
  reason: string        // "Why this matters"
  status: "on-track" | "slipping" | "paused"
  progress: number      // 0–1
  sparkline: number[]   // 4 weekly data points, 0–1
  lastEvaluated: string // ISO date
}

export interface StatItem {
  label: string
  value: string
}

export interface WeeklyReport {
  weekId: string
  label: string         // "Week of Apr 28"
  dateRange: string
  summary: string
  highlights: string[]
  stats: StatItem[]
  threads: string[]
}

export interface TopThread {
  name: string
  signal: string        // e.g. "14 commits — highest month this year"
}

export interface MonthlyReport {
  monthId: string
  label: string         // "April 2026"
  dateRange: string
  summary: string
  highlights: string[]
  stats: StatItem[]
  topThreads: TopThread[]
  prevMonthComparison: StatItem[]
}

export interface ReportSummary {
  id: string
  type: "weekly" | "monthly"
  label: string
  dateRange: string
}

export interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  citedText?: string    // triggers madder italic pull-quote in assistant bubble
  timestamp: string     // ISO date
}

export interface Thread {
  name: string
  icon: string          // key into NAV_ICONS or a local SVG path
  status: ThreadStatus
  detail: string        // e.g. "3 commits · 2 PRs"
}
```

### Mock data modules

| File | Exports |
|---|---|
| `app/lib/mock/entries.ts` | `ENTRIES`, `getEntry(id)`, `listEntries()`, `listThisWeek()` |
| `app/lib/mock/reports.ts` | `WEEKLY_REPORTS`, `MONTHLY_REPORTS`, `REPORT_HISTORY`, `getWeeklyReport(weekId)`, `getMonthlyReport(monthId)` |
| `app/lib/mock/goals.ts` | `GOALS` |
| `app/lib/mock/threads.ts` | `THREADS` |
| `app/lib/mock/ask.ts` | `CANNED_RESPONSES`, `getCannedResponse()` |

---

## Data Flow per Route

| Route | Data call | Component |
|---|---|---|
| `/dashboard/today` | `listThisWeek()` | `<EntryList />` |
| `/dashboard/diary` | `listEntries()` | `<EntryList groupByMonth />` |
| `/dashboard/diary/[entryId]` | `getEntry(params.entryId)` | `<EntryView />` |
| `/dashboard/reports` | `REPORT_HISTORY` | `<ReportHistoryList />` |
| `/dashboard/reports/weekly/[weekId]` | `getWeeklyReport(params.weekId)` | `<WeeklyReport />` |
| `/dashboard/reports/monthly/[monthId]` | `getMonthlyReport(params.monthId)` | `<MonthlyReport />` |
| `/dashboard/goals` | `GOALS` | `<GoalList />` |
| `/dashboard/threads` | `THREADS` | inline table |
| `/dashboard/ask` | `getCannedResponse()` (on submit) | `<ConversationView />` + `<AskComposer />` |

---

## Key Design Decisions

**Per-page Topbar (not layout-level):** Each `page.tsx` renders `<Topbar crumb="Goals" />` directly. This keeps `layout.tsx` a server component and avoids React context or slot patterns. The slight verbosity is worth the simplicity.

**No `active` prop on Sidebar:** Sidebar reads `usePathname()` internally and compares against each nav item's `href`. No prop drilling from layout into sidebar.

**HTML `<dialog>` for GoalEditorDialog:** Web-only; the future React Native app will use its own modal pattern. No library dependency.

**Ask screen is fully mocked:** `getCannedResponse()` returns a random item from a fixed array. A 600ms `setTimeout` simulates latency so the UI feels live. No backend or API key required.

**Mock data as the API contract:** When the real backend lands, each helper (`getEntry`, `listThisWeek`, etc.) becomes an async function calling a real endpoint. The call sites in page components do not change.
