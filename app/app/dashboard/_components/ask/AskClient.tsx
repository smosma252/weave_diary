"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { ChatMessage } from "@/lib/types";
import { sendUserMessage } from "@/lib/actions/ask";
import { ConversationView } from "./ConversationView";
import { AskComposer } from "./AskComposer";

interface AskClientProps {
  conversationId: string;
  initialMessages: ChatMessage[];
}

export function AskClient({ conversationId, initialMessages }: AskClientProps) {
  const router = useRouter();
  const [optimistic, setOptimistic] = useState<ChatMessage | null>(null);
  const [pending, startTransition] = useTransition();

  // Render: server-truth list, with the in-flight user message appended if any.
  const messages = optimistic
    ? [...initialMessages, optimistic]
    : initialMessages;

  function handleSubmit(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    setOptimistic({
      id: `optimistic-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date().toISOString(),
    });

    startTransition(async () => {
      try {
        await sendUserMessage(conversationId, trimmed);
        router.refresh();
      } finally {
        setOptimistic(null);
      }
    });
  }

  return (
    <main
      className="wd-main"
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 720,
        height: "calc(100vh - var(--topbar-h))",
        paddingBottom: 24,
        boxSizing: "border-box",
      }}
    >
      <ConversationView messages={messages} onPromptClick={handleSubmit} />
      <AskComposer onSubmit={handleSubmit} disabled={pending} />
    </main>
  );
}
