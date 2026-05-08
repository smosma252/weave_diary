import Link from "next/link";
import type { Entry } from "@/lib/types";

interface EntryViewProps {
  entry: Entry;
}

export function EntryView({ entry }: EntryViewProps) {
  const { id, date, title, body, threads, voice, minutes } = entry;

  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <Link
          href="/dashboard/diary"
          className="btn btn-ghost"
          style={{ padding: "6px 10px" }}
        >
          ← Back to diary
        </Link>
        <Link
          href={`/dashboard/diary/${id}/edit`}
          className="btn btn-secondary"
          style={{ padding: "6px 12px", fontSize: 13 }}
        >
          Edit
        </Link>
      </div>
      <div className="meta" style={{ marginBottom: 8 }}>
        {date} · {threads.length} threads · {minutes} min read
      </div>
      <h1
        style={{
          font: "var(--type-h1)",
          color: "var(--fg-1)",
          marginBottom: 18,
          letterSpacing: "-0.01em",
        }}
      >
        {title}
      </h1>
      <div style={{ display: "flex", gap: 6, marginBottom: 28, flexWrap: "wrap" }}>
        {threads.map((t, i) => (
          <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
            {t}
          </span>
        ))}
      </div>
      <div className="prose">
        {(body ?? []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
      {voice && (
        <div
          style={{
            marginTop: 36,
            padding: "16px 20px",
            background: "var(--color-madder-tint)",
            borderRadius: "var(--radius-md)",
            borderLeft: "2px solid var(--color-madder)",
          }}
        >
          <div
            className="meta"
            style={{ marginBottom: 6, color: "var(--color-madder-deep)" }}
          >
            From your voice note · 9:42 PM
          </div>
          <p
            style={{
              font: "var(--type-prose-sm)",
              fontStyle: "italic",
              color: "var(--color-ink)",
              margin: 0,
            }}
          >
            {voice}
          </p>
        </div>
      )}
    </article>
  );
}
