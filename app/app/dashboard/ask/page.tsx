import { requireUser } from "@/lib/supabase/auth";
import { getOrCreateConversation, listMessages } from "@/lib/db/ask";
import { Topbar } from "../_components/shell/Topbar";
import { AskClient } from "../_components/ask/AskClient";

export default async function AskPage() {
  const { user } = await requireUser();
  const conversationId = await getOrCreateConversation(user.id);
  const initialMessages = await listMessages(conversationId);

  return (
    <>
      <Topbar crumb="Ask" />
      <AskClient conversationId={conversationId} initialMessages={initialMessages} />
    </>
  );
}
