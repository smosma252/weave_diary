"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/auth";
import type { GoalStatus } from "@/lib/database.types";

interface GoalInput {
  title: string;
  reason: string;
  status: GoalStatus;
}

export async function createGoal(input: GoalInput): Promise<void> {
  const { supabase, user } = await requireUser();
  const { error } = await supabase.from("goals").insert({
    user_id: user.id,
    title: input.title,
    reason: input.reason,
    status: input.status,
  });
  if (error) throw error;
  revalidatePath("/dashboard/goals");
}

export async function updateGoal(id: string, patch: Partial<GoalInput>): Promise<void> {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("goals").update(patch).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/goals");
}

export async function deleteGoal(id: string): Promise<void> {
  const { supabase } = await requireUser();
  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/goals");
}
