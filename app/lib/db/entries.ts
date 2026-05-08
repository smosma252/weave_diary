import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type { Entry } from "@/lib/types";
import { formatEntryDate, monthLabel } from "@/lib/utils/dates";

type Row = Database["public"]["Tables"]["entries"]["Row"];

function rowToEntry(row: Row): Entry {
  return {
    id: row.id,
    isoDate: row.entry_date,
    date: formatEntryDate(row.entry_date),
    title: row.title,
    excerpt: row.excerpt ?? "",
    threads: row.threads,
    minutes: row.minutes,
    mood: row.mood ?? undefined,
    body: row.body.length > 0 ? row.body : undefined,
    voice: row.voice ?? undefined,
  };
}

async function client() {
  return createClient();
}

export async function listEntries(): Promise<Entry[]> {
  const supabase = await client();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .order("entry_date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToEntry);
}

export async function listThisWeek(): Promise<Entry[]> {
  const supabase = await client();
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const cutoff = sevenDaysAgo.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .gte("entry_date", cutoff)
    .order("entry_date", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(rowToEntry);
}

export async function getEntry(id: string): Promise<Entry | null> {
  const supabase = await client();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToEntry(data) : null;
}

export async function getEntryByDate(isoDate: string): Promise<Entry | null> {
  const supabase = await client();
  const { data, error } = await supabase
    .from("entries")
    .select("*")
    .eq("entry_date", isoDate)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToEntry(data) : null;
}

export function groupEntriesByMonth(
  entries: Entry[],
): { month: string; entries: Entry[] }[] {
  const groups = new Map<string, Entry[]>();
  for (const e of entries) {
    const month = monthLabel(e.isoDate);
    const list = groups.get(month) ?? [];
    list.push(e);
    groups.set(month, list);
  }
  return Array.from(groups.entries()).map(([month, list]) => ({
    month,
    entries: list,
  }));
}
