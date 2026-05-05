"use client";

import { useState } from "react";

interface AskComposerProps {
  onSubmit: (text: string) => void;
  disabled?: boolean;
}

export function AskComposer({ onSubmit, disabled = false }: AskComposerProps) {
  const [value, setValue] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
    setValue("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        borderTop: "1px solid var(--border-hairline)",
        padding: "16px 0 0",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask your diary anything…"
        disabled={disabled}
        style={{
          flex: 1,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius-sm)",
          padding: "10px 14px",
          font: "var(--type-body)",
          color: "var(--fg-1)",
          outline: "none",
        }}
      />
      <button
        type="submit"
        className="btn btn-primary"
        disabled={disabled || value.trim() === ""}
      >
        Send
      </button>
    </form>
  );
}
