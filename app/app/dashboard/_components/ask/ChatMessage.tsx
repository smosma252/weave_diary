import type { ChatMessage as ChatMessageType } from "@/lib/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            background: "var(--color-parchment-deep)",
            color: "var(--fg-1)",
            font: "var(--type-body)",
            padding: "12px 16px",
            borderRadius: "var(--radius-md)",
            alignSelf: "flex-end",
          }}
        >
          {message.content}
        </div>
      </div>
    );
  }

  // Assistant
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          maxWidth: "80%",
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-hairline)",
          color: "var(--fg-1)",
          font: "var(--type-prose-sm)",
          padding: "16px 20px",
          borderRadius: "var(--radius-md)",
          alignSelf: "flex-start",
        }}
      >
        <p style={{ margin: 0 }}>{message.content}</p>
        {message.citedText && (
          <div
            style={{
              borderLeft: "2px solid var(--color-madder)",
              paddingLeft: 12,
              marginTop: 12,
              fontStyle: "italic",
              color: "var(--color-madder-deep)",
              font: "var(--type-prose-sm)",
            }}
          >
            {message.citedText}
          </div>
        )}
      </div>
    </div>
  );
}
