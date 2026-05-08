import "server-only";
import { createClient } from "@/lib/supabase/server";
import type {
  Database,
  IntegrationProvider,
  IntegrationStatus,
} from "@/lib/database.types";
import type { Thread, ThreadStatus } from "@/lib/types";

type Row = Database["public"]["Tables"]["integrations"]["Row"];

// Display metadata per provider — colors taken from the existing mock palette.
const PROVIDER_DISPLAY: Record<IntegrationProvider, { name: string; color: string }> = {
  github:          { name: "GitHub",   color: "#1F1B16" },
  slack:           { name: "Slack",    color: "#A23E2C" },
  discord:         { name: "Discord",  color: "#4A6478" },
  google_calendar: { name: "Calendar", color: "#6B7A5A" },
  gmail:           { name: "Email",    color: "#C68A3B" },
  voice:           { name: "Voice",    color: "#8A7E6E" },
};

const ALL_PROVIDERS: IntegrationProvider[] = [
  "github", "slack", "discord", "google_calendar", "gmail", "voice",
];

function statusToDisplay(s: IntegrationStatus): ThreadStatus {
  if (s === "syncing") return "Syncing";
  if (s === "paused" || s === "disconnected" || s === "error") return "Paused";
  return "Connected";
}

function lastSync(row: Row): string {
  if (row.status === "syncing") return "syncing…";
  if (!row.last_synced_at) return "never";
  return relativeTime(new Date(row.last_synced_at));
}

function relativeTime(then: Date): string {
  const diff = Date.now() - then.getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "just now";
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  return `${day} day${day === 1 ? "" : "s"} ago`;
}

export async function listThreads(): Promise<Thread[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("integrations")
    .select("*");
  if (error) throw error;

  const byProvider = new Map<IntegrationProvider, Row>();
  for (const row of data ?? []) byProvider.set(row.provider, row);

  return ALL_PROVIDERS.map((provider) => {
    const display = PROVIDER_DISPLAY[provider];
    const row = byProvider.get(provider);
    if (!row) {
      return {
        name: display.name,
        status: "Paused",
        last: "not connected",
        color: display.color,
      };
    }
    return {
      name: display.name,
      status: statusToDisplay(row.status),
      last: lastSync(row),
      color: display.color,
    };
  });
}
