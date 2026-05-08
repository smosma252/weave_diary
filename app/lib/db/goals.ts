import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type { Goal } from "@/lib/types";

type Row = Database["public"]["Tables"]["goals"]["Row"];

function rowToGoal(row: Row): Goal {
  const sparkline = Array.isArray(row.sparkline)
    ? (row.sparkline as number[]).filter((n) => typeof n === "number")
    : [];
  return {
    id: row.id,
    title: row.title,
    reason: row.reason ?? "",
    status: row.status,
    progress: Number(row.progress),
    sparkline,
    lastEvaluated: row.last_evaluated ?? "",
  };
}

export async function listGoals(): Promise<Goal[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(rowToGoal);
}

export async function getGoal(id: string): Promise<Goal | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data ? rowToGoal(data) : null;
}
