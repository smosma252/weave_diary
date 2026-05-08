// Display formatters for diary entry dates.

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

// "2026-05-17" -> "Thu · 17 May"
export function formatEntryDate(iso: string): string {
  const d = parseIsoDate(iso);
  return `${WEEKDAY[d.getUTCDay()]} · ${d.getUTCDate()} ${MONTH[d.getUTCMonth()]}`;
}

// "2026-05-17" -> "May" (used for month grouping in the diary list)
export function monthLabel(iso: string): string {
  const d = parseIsoDate(iso);
  return MONTH[d.getUTCMonth()];
}

export function todayIso(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function parseIsoDate(iso: string): Date {
  // Treat as UTC midnight so the displayed weekday/day don't drift with timezone.
  const [y, m, d] = iso.split("-").map((n) => parseInt(n, 10));
  return new Date(Date.UTC(y, (m ?? 1) - 1, d ?? 1));
}
