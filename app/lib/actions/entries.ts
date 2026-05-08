"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/supabase/auth";
import { todayIso } from "@/lib/utils/dates";
import type { Database } from "@/lib/database.types";

type EntryUpdate = Database["public"]["Tables"]["entries"]["Update"];

interface EntryPatch {
  title?: string;
  excerpt?: string | null;
  body?: string[];
  mood?: string | null;
  voice?: string | null;
}

// Idempotent: returns the existing id if today's entry already exists.
export async function createTodayEntry(): Promise<string> {
  const { supabase, user } = await requireUser();
  const isoDate = todayIso();

  const { data: existing } = await supabase
    .from("entries")
    .select("id")
    .eq("entry_date", isoDate)
    .maybeSingle();
  if (existing) return existing.id;

  const { data: created, error } = await supabase
    .from("entries")
    .insert({
      user_id: user.id,
      entry_date: isoDate,
      title: "Today",
      body: [],
      threads: [],
      minutes: 1,
    })
    .select("id")
    .single();
  if (error) throw error;

  revalidatePath("/dashboard/today");
  revalidatePath("/dashboard/diary");
  return created.id;
}

// Server-action wrapper used by buttons that POST without arguments.
export async function startTodayEntry(): Promise<void> {
  const id = await createTodayEntry();
  redirect(`/dashboard/diary/${id}/edit`);
}

export async function updateEntry(id: string, patch: EntryPatch): Promise<void> {
  const { supabase } = await requireUser();

  const update: EntryUpdate = {};
  if (patch.title !== undefined) update.title = patch.title;
  if (patch.excerpt !== undefined) update.excerpt = patch.excerpt;
  if (patch.body !== undefined) update.body = patch.body;
  if (patch.mood !== undefined) update.mood = patch.mood;
  if (patch.voice !== undefined) update.voice = patch.voice;

  const { error } = await supabase.from("entries").update(update).eq("id", id);
  if (error) throw error;

  revalidatePath("/dashboard/today");
  revalidatePath("/dashboard/diary");
  revalidatePath(`/dashboard/diary/${id}`);
  revalidatePath(`/dashboard/diary/${id}/edit`);
}
