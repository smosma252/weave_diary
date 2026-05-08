import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/database.types";
import type { ChatMessage } from "@/lib/types";

type MessageRow = Database["public"]["Tables"]["ask_messages"]["Row"];

function rowToMessage(row: MessageRow): ChatMessage {
  return {
    id: row.id,
    role: row.role,
    content: row.content,
    citedText: row.cited_text ?? undefined,
    timestamp: row.created_at,
  };
}

// Returns the user's most recent conversation, creating one if none exists.
export async function getOrCreateConversation(userId: string): Promise<string> {
  const supabase = await createClient();
  const { data: existing, error: selectErr } = await supabase
    .from("ask_conversations")
    .select("id")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (selectErr) throw selectErr;
  if (existing) return existing.id;

  const { data: created, error: insertErr } = await supabase
    .from("ask_conversations")
    .insert({ user_id: userId })
    .select("id")
    .single();
  if (insertErr) throw insertErr;
  return created.id;
}

export async function listMessages(conversationId: string): Promise<ChatMessage[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("ask_messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(rowToMessage);
}
