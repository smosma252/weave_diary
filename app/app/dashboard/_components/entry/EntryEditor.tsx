"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { Entry } from "@/lib/types";
import { updateEntry } from "@/lib/actions/entries";

interface EntryEditorProps {
  entry: Entry;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-sunken)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  padding: "10px 12px",
  font: "var(--type-body)",
  color: "var(--fg-1)",
  outline: "none",
  boxSizing: "border-box",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  font: "var(--type-label)",
  color: "var(--fg-2)",
  marginBottom: 6,
};

export function EntryEditor({ entry }: EntryEditorProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState(entry.title);
  const [excerpt, setExcerpt] = useState(entry.excerpt ?? "");
  const [mood, setMood] = useState(entry.mood ?? "");
  const [body, setBody] = useState((entry.body ?? []).join("\n\n"));
  const [voice, setVoice] = useState(entry.voice ?? "");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const paragraphs = body
      .split(/\n{2,}/)
      .map((p) => p.trim())
      .filter(Boolean);

    startTransition(async () => {
      try {
        await updateEntry(entry.id, {
          title: title.trim() || "Untitled",
          excerpt: excerpt.trim() || null,
          body: paragraphs,
          mood: mood.trim() || null,
          voice: voice.trim() || null,
        });
        router.push(`/dashboard/diary/${entry.id}`);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not save entry.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="meta" style={{ marginBottom: 8 }}>
        {entry.date} · {entry.threads.length} threads · {entry.minutes} min read
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="entry-title" style={labelStyle}>Title</label>
        <input
          id="entry-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            ...inputStyle,
            font: "var(--type-h2)",
            letterSpacing: "-0.01em",
            color: "var(--fg-1)",
          }}
          placeholder="A long afternoon"
          required
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="entry-mood" style={labelStyle}>Mood (optional)</label>
        <input
          id="entry-mood"
          type="text"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
          style={inputStyle}
          placeholder="calm, focused, warm…"
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="entry-excerpt" style={labelStyle}>Excerpt</label>
        <textarea
          id="entry-excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={2}
          style={{ ...inputStyle, resize: "vertical" }}
          placeholder="One or two lines that capture the day."
        />
      </div>

      <div style={{ marginBottom: 20 }}>
        <label htmlFor="entry-body" style={labelStyle}>
          Body — separate paragraphs with a blank line
        </label>
        <textarea
          id="entry-body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={12}
          style={{
            ...inputStyle,
            font: "var(--type-prose)",
            resize: "vertical",
            lineHeight: 1.7,
          }}
          placeholder={"Thursday, the 17th — a quiet day with a long afternoon...\n\nThere was a walk in there too..."}
        />
      </div>

      <div style={{ marginBottom: 24 }}>
        <label htmlFor="entry-voice" style={labelStyle}>Voice note (optional)</label>
        <textarea
          id="entry-voice"
          value={voice}
          onChange={(e) => setVoice(e.target.value)}
          rows={3}
          style={{ ...inputStyle, fontStyle: "italic", resize: "vertical" }}
          placeholder="What you said into the recorder."
        />
      </div>

      {error && (
        <div
          className="meta"
          style={{
            color: "var(--color-madder-deep)",
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => router.push(`/dashboard/diary/${entry.id}`)}
          disabled={pending}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={pending}>
          {pending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}
