import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type {
  MonthlyReport,
  ReportSummary,
  StatItem,
  TopThread,
  WeeklyReport,
} from "@/lib/types";

type Row = Database["public"]["Tables"]["reports"]["Row"];

interface WeeklyPayload {
  highlights?: string[];
  stats?: StatItem[];
  threads?: string[];
}

interface MonthlyPayload {
  highlights?: string[];
  stats?: StatItem[];
  topThreads?: TopThread[];
  prevMonthComparison?: StatItem[];
}

function rowToWeekly(row: Row): WeeklyReport {
  const p = (row.payload ?? {}) as WeeklyPayload;
  return {
    weekId: row.period_id,
    label: row.label,
    dateRange: row.date_range,
    summary: row.summary ?? "",
    highlights: p.highlights ?? [],
    stats: p.stats ?? [],
    threads: p.threads ?? [],
  };
}

function rowToMonthly(row: Row): MonthlyReport {
  const p = (row.payload ?? {}) as MonthlyPayload;
  return {
    monthId: row.period_id,
    label: row.label,
    dateRange: row.date_range,
    summary: row.summary ?? "",
    highlights: p.highlights ?? [],
    stats: p.stats ?? [],
    topThreads: p.topThreads ?? [],
    prevMonthComparison: p.prevMonthComparison ?? [],
  };
}

export async function listReportHistory(): Promise<ReportSummary[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("type,period_id,label,date_range")
    .order("period_id", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r) => ({
    id: r.period_id,
    type: r.type,
    label: r.label,
    dateRange: r.date_range,
  }));
}

export async function getWeeklyReport(
  weekId: string,
): Promise<WeeklyReport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("type", "weekly")
    .eq("period_id", weekId)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToWeekly(data) : null;
}

export async function getMonthlyReport(
  monthId: string,
): Promise<MonthlyReport | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("reports")
    .select("*")
    .eq("type", "monthly")
    .eq("period_id", monthId)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToMonthly(data) : null;
}
