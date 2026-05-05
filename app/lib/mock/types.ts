// Pure TypeScript types — zero DOM or React imports.
// These are the API contract for the future backend and the shared shape
// for the React Native client.

export type ThreadStatus = "Connected" | "Syncing" | "Paused";

export interface Entry {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  threads: string[];
  minutes: number;
  mood?: string;
  body?: string[];
  voice?: string;
}

export interface Goal {
  id: string;
  title: string;
  reason: string;
  status: "on-track" | "slipping" | "paused";
  progress: number;
  sparkline: number[];
  lastEvaluated: string;
}

export interface StatItem {
  label: string;
  value: string;
  delta?: string;
  tone?: "good" | "warn" | "flat";
}

export interface WeeklyReport {
  weekId: string;
  label: string;
  dateRange: string;
  summary: string;
  highlights: string[];
  stats: StatItem[];
  threads: string[];
}

export interface TopThread {
  name: string;
  signal: string;
}

export interface MonthlyReport {
  monthId: string;
  label: string;
  dateRange: string;
  summary: string;
  highlights: string[];
  stats: StatItem[];
  topThreads: TopThread[];
  prevMonthComparison: StatItem[];
}

export interface ReportSummary {
  id: string;
  type: "weekly" | "monthly";
  label: string;
  dateRange: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  citedText?: string;
  timestamp: string;
}

export interface Thread {
  name: string;
  status: ThreadStatus;
  last: string;
  color: string;
  detail?: string;
}
