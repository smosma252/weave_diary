import type {
  MonthlyReport,
  ReportSummary,
  WeeklyReport,
} from "./types";

export const WEEKLY_REPORTS: WeeklyReport[] = [
  {
    weekId: "2026-w20",
    label: "Week of 11 May",
    dateRange: "11–17 May 2026",
    summary:
      "You shipped two pull requests, took a walk longer than thirty minutes on four days, and went to bed before midnight more often than not. The week was, by your own measures, a calmer one — and your voice notes carried less of the tightness they did the week before. Where things slipped a little: reading. You set a goal of forty minutes a day and averaged twenty-two. Not a verdict — just a note for next week.",
    highlights: [
      "Two pull requests shipped — both in the inbox-zero work",
      "Four walks over thirty minutes — the most this month",
      "One long evening call with Sam — the only one this week",
    ],
    stats: [
      { label: "Pull requests shipped", value: "2", delta: "+1", tone: "good" },
      { label: "Walks over 30 min", value: "4", delta: "+2", tone: "good" },
      { label: "Avg bedtime", value: "23:42", delta: "−18m", tone: "good" },
      { label: "Reading minutes / day", value: "22", delta: "−18", tone: "warn" },
      { label: "Voice notes", value: "11", delta: "±0", tone: "flat" },
    ],
    threads: ["github", "calendar", "voice", "slack"],
  },
  {
    weekId: "2026-w19",
    label: "Week of 4 May",
    dateRange: "4–10 May 2026",
    summary:
      "A heavier week. Three deploys, one rollback, and the design review on Wednesday that you carried into the rest of the days. You logged voice notes on five of seven days — the most so far this month — and most of them named the same tightness in your shoulders. The reading habit held; the bedtime did not.",
    highlights: [
      "Design review on Wednesday — the one you'd been quietly worried about",
      "Friday's rollback handled cleanly, by the deploy log",
      "Reading averaged thirty-eight minutes a day, near goal",
    ],
    stats: [
      { label: "Pull requests shipped", value: "1", delta: "−2", tone: "warn" },
      { label: "Walks over 30 min", value: "2", delta: "−1", tone: "warn" },
      { label: "Avg bedtime", value: "00:08", delta: "+22m", tone: "warn" },
      { label: "Reading minutes / day", value: "38", delta: "+11", tone: "good" },
      { label: "Voice notes", value: "9", delta: "+3", tone: "good" },
    ],
    threads: ["github", "calendar", "voice"],
  },
  {
    weekId: "2026-w18",
    label: "Week of 27 Apr",
    dateRange: "27 Apr – 3 May 2026",
    summary:
      "A short week — Monday was a holiday — and the kind that ends faster than it began. The numbers are thin because the week was thin. The walks held. The reading didn't.",
    highlights: [
      "Three working days, one deploy",
      "Saturday's long walk — two hours and change, the longest of April",
    ],
    stats: [
      { label: "Pull requests shipped", value: "1", delta: "—", tone: "flat" },
      { label: "Walks over 30 min", value: "3", delta: "—", tone: "flat" },
      { label: "Avg bedtime", value: "23:30", delta: "—", tone: "flat" },
      { label: "Reading minutes / day", value: "14", delta: "—", tone: "flat" },
      { label: "Voice notes", value: "5", delta: "—", tone: "flat" },
    ],
    threads: ["calendar", "voice"],
  },
];

export const MONTHLY_REPORTS: MonthlyReport[] = [
  {
    monthId: "2026-04",
    label: "April 2026",
    dateRange: "1–30 April 2026",
    summary:
      "April was a month of quiet repair. The numbers don't shout — they don't have to. You shipped less than March but slept more, walked more, and your voice notes were warmer in tone by the second half. The thread that mattered most this month was the calendar — not because of meetings, but because of the spaces between them.",
    highlights: [
      "First full month with bedtime under midnight on average",
      "Reading habit landed at thirty-one minutes a day — the steadiest yet",
      "Two long calls with family — the kind that don't need a reason",
      "One deploy rollback, handled without rancor",
    ],
    stats: [
      { label: "Entries written", value: "30" },
      { label: "Pull requests shipped", value: "9" },
      { label: "Walks over 30 min", value: "14" },
      { label: "Avg bedtime", value: "23:51" },
      { label: "Reading minutes / day", value: "31" },
      { label: "Voice notes", value: "38" },
    ],
    topThreads: [
      {
        name: "Calendar",
        signal: "14 walks over thirty minutes — the highest count this year",
      },
      {
        name: "GitHub",
        signal: "9 pull requests shipped, down from March's 14 but with fewer reverts",
      },
      {
        name: "Voice",
        signal: "38 notes, warmer in tone after the 14th by your own descriptors",
      },
    ],
    prevMonthComparison: [
      { label: "Pull requests", value: "9", delta: "−5", tone: "warn" },
      { label: "Walks", value: "14", delta: "+6", tone: "good" },
      { label: "Avg bedtime", value: "23:51", delta: "−24m", tone: "good" },
      { label: "Reading min / day", value: "31", delta: "+9", tone: "good" },
      { label: "Voice notes", value: "38", delta: "+12", tone: "good" },
    ],
  },
  {
    monthId: "2026-03",
    label: "March 2026",
    dateRange: "1–31 March 2026",
    summary:
      "March was a building month. Fourteen pull requests, two design reviews, and a sleep schedule that crept by twenty minutes a week in the wrong direction. The work was good. The cost — in your own words, more than once — was sleep.",
    highlights: [
      "Fourteen pull requests — the highest month this year",
      "Two design reviews delivered, both on time",
      "Reading dropped to twenty-two minutes a day",
    ],
    stats: [
      { label: "Entries written", value: "31" },
      { label: "Pull requests shipped", value: "14" },
      { label: "Walks over 30 min", value: "8" },
      { label: "Avg bedtime", value: "00:15" },
      { label: "Reading minutes / day", value: "22" },
      { label: "Voice notes", value: "26" },
    ],
    topThreads: [
      { name: "GitHub", signal: "14 pull requests — the highest month this year" },
      { name: "Calendar", signal: "Two design reviews, no missed reschedules" },
      { name: "Voice", signal: "26 notes, with sleep mentioned in 11 of them" },
    ],
    prevMonthComparison: [
      { label: "Pull requests", value: "14", delta: "+3", tone: "good" },
      { label: "Walks", value: "8", delta: "−2", tone: "warn" },
      { label: "Avg bedtime", value: "00:15", delta: "+22m", tone: "warn" },
      { label: "Reading min / day", value: "22", delta: "−6", tone: "warn" },
      { label: "Voice notes", value: "26", delta: "+4", tone: "good" },
    ],
  },
];

export const REPORT_HISTORY: ReportSummary[] = [
  ...MONTHLY_REPORTS.map<ReportSummary>((r) => ({
    id: r.monthId,
    type: "monthly",
    label: r.label,
    dateRange: r.dateRange,
  })),
  ...WEEKLY_REPORTS.map<ReportSummary>((r) => ({
    id: r.weekId,
    type: "weekly",
    label: r.label,
    dateRange: r.dateRange,
  })),
];

export function getWeeklyReport(weekId: string): WeeklyReport | undefined {
  return WEEKLY_REPORTS.find((r) => r.weekId === weekId);
}

export function getMonthlyReport(monthId: string): MonthlyReport | undefined {
  return MONTHLY_REPORTS.find((r) => r.monthId === monthId);
}
