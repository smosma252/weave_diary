"use server";

import { revalidatePath } from "next/cache";
import { requireUser } from "@/lib/supabase/auth";

// Canned assistant responses — kept here until the Claude API is wired in.
const CANNED_RESPONSES: { content: string; citedText?: string }[] = [
  {
    content:
      "Reading. You set the goal at forty minutes a day in March, and the trend has been falling for three weeks running — from thirty-eight, to thirty-one, to twenty-two. The drop coincides with the run-up to the design review, but the recovery hasn't followed the way it usually does.",
    citedText:
      "If I can keep the mornings, the rest takes care of itself. Just the mornings.",
  },
  {
    content:
      "Two patterns stand out. First, the voice notes after long walks — they tend to be slower, more reflective, and almost always positive in tone. Second, the ones recorded after a call with Sam or your mother. The week of the 13th has both, and it shows.",
    citedText: "It was good to hear them. I forget how much that helps.",
  },
  {
    content:
      "How much rest the calendar quietly bought you. April had fourteen walks over thirty minutes — your highest count this year — and the months you've described as 'building' months were the ones with the fewest. The walks aren't a break from the work; they're part of it.",
  },
  {
    content:
      "The weeks you describe as 'good' in voice notes are almost always the weeks bedtime stayed under midnight on at least four nights. You don't talk about sleep directly — but the sentiment in the notes tracks it cleanly.",
    citedText: "I keep forgetting that doing nothing is also doing something.",
  },
];

export async function sendUserMessage(
  conversationId: string,
  content: string,
): Promise<void> {
  if (!content.trim()) return;
  const { supabase, user } = await requireUser();

  const { error: insertUserErr } = await supabase.from("ask_messages").insert({
    conversation_id: conversationId,
    user_id: user.id,
    role: "user",
    content,
  });
  if (insertUserErr) throw insertUserErr;

  const canned = CANNED_RESPONSES[Math.floor(Math.random() * CANNED_RESPONSES.length)];
  const { error: insertAssistantErr } = await supabase.from("ask_messages").insert({
    conversation_id: conversationId,
    user_id: user.id,
    role: "assistant",
    content: canned.content,
    cited_text: canned.citedText ?? null,
  });
  if (insertAssistantErr) throw insertAssistantErr;

  await supabase
    .from("ask_conversations")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", conversationId);

  revalidatePath("/dashboard/ask");
}
