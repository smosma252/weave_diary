import type { Thread } from "./types";

export const THREADS: Thread[] = [
  { name: "GitHub", status: "Connected", last: "12 min ago", color: "#1F1B16", detail: "3 commits · 2 PRs today" },
  { name: "Slack", status: "Connected", last: "3 min ago", color: "#A23E2C", detail: "2 channels watched" },
  { name: "Discord", status: "Syncing", last: "syncing…", color: "#4A6478", detail: "1 server" },
  { name: "Calendar", status: "Connected", last: "1 hr ago", color: "#6B7A5A", detail: "3 events today" },
  { name: "Email", status: "Connected", last: "8 min ago", color: "#C68A3B", detail: "Inbox + Sent" },
  { name: "Voice", status: "Paused", last: "2 days ago", color: "#8A7E6E", detail: "Resume to weave in" },
];
