"use client";

import { useEffect, useRef } from "react";
import type { ChatMessage as ChatMessageType } from "@/lib/types";
import { SUGGESTED_PROMPTS } from "@/lib/ask-prompts";
import { ChatMessage } from "./ChatMessage";

interface ConversationViewProps {
  messages: ChatMessageType[];
  onPromptClick: (prompt: string) => void;
}

export function ConversationView({
  messages,
  onPromptClick,
}: ConversationViewProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
          padding: "40px 0",
        }}
      >
        <p
          style={{
            font: "var(--type-prose-sm)",
            fontStyle: "italic",
            color: "var(--color-madder)",
            textAlign: "center",
            margin: 0,
          }}
        >
          What would you like to know?
        </p>
        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {SUGGESTED_PROMPTS.map((prompt) => (
            <button
              key={prompt}
              onClick={() => onPromptClick(prompt)}
              className="tag"
              style={{
                padding: "8px 14px",
                font: "var(--type-body)",
                cursor: "pointer",
                border: "none",
                background: "var(--color-parchment-deep)",
                color: "var(--fg-2)",
              }}
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        paddingBottom: 16,
      }}
    >
      {messages.map((msg) => (
        <ChatMessage key={msg.id} message={msg} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
