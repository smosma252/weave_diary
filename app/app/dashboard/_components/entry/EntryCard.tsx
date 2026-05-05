import Link from "next/link";
import type { Entry } from "@/lib/mock/types";

interface EntryCardProps {
  entry: Entry;
}

export function EntryCard({ entry }: EntryCardProps) {
  const { id, date, title, excerpt, threads, minutes, mood } = entry;

  return (
    <Link
      href={`/dashboard/diary/${id}`}
      style={{ textDecoration: "none" }}
    >
      <article
        className="wd-card"
        style={{
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div className="meta">
          {date} · {minutes} min · {threads.length} threads
          {mood && (
            <span>
              {" "}
              · <span style={{ color: "var(--color-madder-deep)" }}>{mood}</span>
            </span>
          )}
        </div>
        <h3 style={{ font: "var(--type-h3)", color: "var(--fg-1)" }}>{title}</h3>
        <p
          style={{
            font: "var(--type-prose-sm)",
            color: "var(--fg-2)",
            textWrap: "pretty",
            margin: 0,
          }}
        >
          {excerpt}
        </p>
        <div
          style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}
        >
          {threads.map((t, i) => (
            <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
              {t}
            </span>
          ))}
        </div>
      </article>
    </Link>
  );
}
