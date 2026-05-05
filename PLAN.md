# Dashboard buildout plan

## Context

The current dashboard at `app/app/dashboard/page.tsx` is a single 628-line client component that renders Sidebar, Topbar, EntryCard, EntryView, WeeklyReport, ThreadsPanel, and VoiceCapture, using `useState` to swap between sections. Goals/Settings are stubs (just a heading), there's no monthly review, no conversational debrief, no entry detail URLs, and the mock data is hard-coded inline.

The product (per `README.md`) is built around six surfaces: **Today**, **Diary**, **Reports** (weekly + monthly), **Threads**, **Goals**, **Ask** (conversational debrief), and **Settings**. This round covers **Goals**, **Monthly reports + history**, and **Ask**, plus splits the dashboard into proper Next.js nested routes with co-located components and a typed mock-data layer. Settings is intentionally out of scope this round.

## Outcome

- `/dashboard/*` becomes a real route tree with deep links and browser history.
- Big page split into small, named, single-purpose components in `app/dashboard/_components/`.
- Mock data lives in one typed module, not inlined inside JSX, so swapping to a real API later is a contract change instead of a rewrite.
- Goals, monthly reports, and Ask are buildable, well-branded screens (not stubs).
- An `ai-docs/` workspace at the repo root holds future plans and internal docs.

---

## File layout (target)

```
ai-docs/
├── plan/                                    # future plan files copied here
│   └── 001-dashboard-buildout.md            # mirror of this plan, committed to repo
└── internal-documentation/
    ├── dashboard-architecture.md            # routes, data shape, component map
    └── design-tokens-cheatsheet.md          # which CSS var to reach for when

app/app/
├── dashboard/
│   ├── layout.tsx                           # sidebar + topbar shell (server component)
│   ├── page.tsx                             # redirect → /dashboard/today
│   ├── today/page.tsx                       # week-of entries feed
│   ├── diary/
│   │   ├── page.tsx                         # full diary list, paginated/grouped
│   │   └── [entryId]/page.tsx               # single entry reading view
│   ├── reports/
│   │   ├── page.tsx                         # default = current week, with toggle + history list
│   │   ├── weekly/[weekId]/page.tsx         # specific week
│   │   └── monthly/[monthId]/page.tsx       # specific month
│   ├── goals/page.tsx                       # list + create/edit, progress chips
│   ├── ask/page.tsx                         # chat-style conversational debrief
│   └── _components/
│       ├── shell/
│       │   ├── Sidebar.tsx                  # nav incl. active-route highlighting via usePathname
│       │   ├── Topbar.tsx                   # crumb + search
│       │   └── icons.tsx                    # NAV_ICONS map + <Icon /> primitive
│       ├── entry/
│       │   ├── EntryCard.tsx
│       │   ├── EntryList.tsx                # shared by Today + Diary
│       │   └── EntryView.tsx                # also handles VoiceQuote inline block
│       ├── reports/
│       │   ├── StatRow.tsx
│       │   ├── WeeklyReport.tsx
│       │   ├── MonthlyReport.tsx
│       │   └── ReportHistoryList.tsx
│       ├── goals/
│       │   ├── GoalCard.tsx                 # title, target, progress bar/dots, sparkline
│       │   ├── GoalList.tsx
│       │   └── GoalEditorDialog.tsx         # create/edit form (HTML <dialog> for now)
│       ├── ask/
│       │   ├── AskComposer.tsx              # input + send
│       │   ├── ChatMessage.tsx              # user vs WeaveDiary message bubble
│       │   └── ConversationView.tsx         # message list + suggested prompts empty state
│       └── voice/
│           └── VoiceCapture.tsx             # floating capture, lifted out of page

app/lib/
└── mock/
    ├── types.ts                             # Entry, Goal, Report, Thread, ChatMessage
    ├── entries.ts                           # ENTRIES + helpers (getEntry, getWeek)
    ├── reports.ts                           # WEEKLY_REPORTS, MONTHLY_REPORTS, history list
    ├── goals.ts                             # GOALS w/ progress data
    ├── threads.ts                           # THREADS (existing)
    └── ask.ts                               # canned conversation seed
```

The current `app/app/dashboard/page.tsx` becomes a tiny redirect (or moves under `today/`). All inline `style={{}}` on shell pieces stays as-is — the design tokens already drive everything; this is a structural refactor, not a re-skin.

---

## Implementation steps

1. **Create the `ai-docs/` workspace.**
   - `ai-docs/plan/001-dashboard-buildout.md` — copy of this plan, committed alongside the work.
   - `ai-docs/internal-documentation/dashboard-architecture.md` — short doc: route tree, data shape, where each component lives.
   - `ai-docs/internal-documentation/design-tokens-cheatsheet.md` — table of common token reaches (`--type-h1`, `--color-madder`, `.btn-primary`, etc.) so future component work doesn't reinvent them.

2. **Extract the mock-data layer (`app/lib/mock/`).**
   - Move `Entry`, `ThreadStatus` types out of `dashboard/page.tsx` into `types.ts`.
   - Add `Goal`, `WeeklyReport`, `MonthlyReport`, `ReportSummary`, `ChatMessage` types.
   - Seed each module with realistic, on-brand mock data (sentence case, no emoji, em-dashes ok).
   - Export simple lookup helpers (`getEntry(id)`, `listEntries()`, `getWeek(weekId)`).

3. **Split the shell into a route layout.**
   - `app/dashboard/layout.tsx` (server component) renders `<Sidebar />` + `<Topbar />` + `{children}` + `<VoiceCapture />`.
   - `Sidebar.tsx` becomes a client component using `usePathname()` for active-state — no more prop drilling `active`/`onNav`.
   - `Topbar.tsx` derives its crumb from the route segment via `usePathname` + a small `CRUMBS` map; entry-detail pages override via a `<Topbar.Slot>` pattern or a server-rendered `<Topbar crumb={…} />` from each route's `page.tsx`. Pick the simpler one (per-route prop) unless it clutters; document the choice in the architecture doc.

4. **Port existing screens to routes.**
   - `today/page.tsx` ← current `Today` body. Imports `EntryList` and `listThisWeek()`.
   - `diary/page.tsx` ← current `Diary` body, grouped by month.
   - `diary/[entryId]/page.tsx` ← `EntryView` driven by `getEntry(params.entryId)`. `notFound()` on miss. The existing onClick=open-detail flow becomes a `<Link href={\`/dashboard/diary/${id}\`}>`.
   - `reports/page.tsx` ← shows current week summary at top, then a chronological history list (cards) of past weeks + months. Toggle pill at top: `Weekly · Monthly`.
   - `reports/weekly/[weekId]/page.tsx` and `reports/monthly/[monthId]/page.tsx` ← reuse `WeeklyReport` / new `MonthlyReport` components.
   - `threads/page.tsx` ← unchanged content, just moved.

5. **Build new screens.**
   - **Goals** (`goals/page.tsx`): heading + lede, then a list of `GoalCard`s. Each card shows: title (serif), short reason ("Why this matters"), progress (sage chip if on track, ochre if slipping), small sparkline of activity-against-goal over last 4 weeks, last-evaluated meta line. "+ New goal" button opens `GoalEditorDialog` (native `<dialog>`, no library). Empty state copy: *"You haven't set a goal yet. Tell WeaveDiary what you're working towards — it'll watch quietly."*
   - **Monthly report** (`MonthlyReport.tsx`): same shape as weekly (prose paragraphs + StatRow list) but with a month-over-month comparison row and a "Threads that mattered most" section showing top 3 integrations by signal density.
   - **Ask** (`ask/page.tsx`): centered max-720px column, conversation list at top, composer pinned at bottom. Empty state: 3 suggested prompts as `.tag` chips (e.g. *"What's been quietly slipping?"*, *"When am I happiest in my voice notes?"*, *"What did I underestimate this month?"*). `ChatMessage` differentiates user (right-aligned, parchment-deep bg) from WeaveDiary (left-aligned, parchment-soft bg, serif body, with an italic madder pull-quote when it cites your own words). No backend wiring — composer's submit just appends a canned response from `mock/ask.ts` after a 600ms delay so the screen feels alive in the demo.

6. **Replace `dashboard/page.tsx`** with `redirect('/dashboard/today')`.

7. **Verify.**
   - `npm run lint` and `npm run build` in `app/` — both must pass.
   - Manual: visit `/dashboard`, confirm it lands on Today; click a diary card → entry route; back-button works; `Goals`, `Reports`, `Ask` all render with their empty/seed states; `VoiceCapture` floats on every dashboard route; deep-link `/dashboard/diary/1` directly works.
   - Confirm no regression on `/` landing page (untouched, but the `next/font` wiring is shared via root layout).

## Critical files to read before starting

- `app/app/dashboard/page.tsx` — source of all current dashboard markup.
- `app/app/globals.css` — design tokens + component classes (`.wd-app`, `.wd-sidebar`, `.wd-top`, `.wd-card`, `.btn-*`, `.tag`, `.prose`, `.meta`, `.eyebrow`).
- `app/app/page.tsx` — for marketing nav consistency (logo, brand name treatment) when reusing in shell.
- `app/app/layout.tsx` — confirms `next/font` variable wiring; do not duplicate.

## Out of scope (intentionally)

- Settings page (deferred).
- Real OAuth, real Claude API calls, real DB. The README's privacy/encryption requirements bind the *future* backend; this round is UI + types only.
- Mobile responsive pass for the dashboard shell. The marketing page already responds; the dashboard shell assumes desktop. We'll add a mobile sidebar drawer in a follow-up.
- Search functionality (the topbar search box stays a static visual placeholder).
