"use client";

import { useState } from "react";
import type { ChatMessage } from "@/lib/mock/types";
import { makeAssistantMessage, makeUserMessage } from "@/lib/mock/ask";
import { ConversationView } from "./ConversationView";
import { AskComposer } from "./AskComposer";

export function AskClient() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);

  function handleSubmit(text: string) {
    const userMsg = makeUserMessage(text);
    setMessages((prev) => [...prev, userMsg]);
    setPending(true);

    setTimeout(() => {
      const assistantMsg = makeAssistantMessage();
      setMessages((prev) => [...prev, assistantMsg]);
      setPending(false);
    }, 600);
  }

  function handlePromptClick(prompt: string) {
    handleSubmit(prompt);
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
      <ConversationView messages={messages} onPromptClick={handlePromptClick} />
      <AskComposer onSubmit={handleSubmit} disabled={pending} />
    </main>
  );
}
