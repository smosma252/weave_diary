import { requireUser } from "@/lib/supabase/auth";
import { listThreads } from "@/lib/db/threads";
import type { Thread, ThreadStatus } from "@/lib/types";
import { Topbar } from "../_components/shell/Topbar";

function statusDotColor(status: ThreadStatus): string {
  if (status === "Connected") return "#4F5B41";
  if (status === "Syncing") return "#C68A3B";
  return "#8A7E6E";
}

function ThreadRow({ name, status, last, color }: Thread) {
  const dot = statusDotColor(status);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        padding: "14px 18px",
        borderBottom: "1px solid var(--border-hairline)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 8,
          background: color,
          display: "grid",
          placeItems: "center",
          color: "var(--color-parchment-soft)",
          fontFamily: "var(--font-serif)",
          fontWeight: 600,
        }}
      >
        {name[0]}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            font: "var(--type-body)",
            fontWeight: 500,
            color: "var(--fg-1)",
          }}
        >
          {name}
        </div>
        <div className="mono" style={{ fontSize: 12 }}>
          last sync · {last}
        </div>
      </div>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          font: "var(--type-meta)",
          textTransform: "uppercase",
          letterSpacing: "var(--tracking-meta)",
          color: "var(--fg-3)",
        }}
      >
        <span
          style={{ width: 6, height: 6, borderRadius: 999, background: dot }}
        />
        {status}
      </span>
      <button
        className="btn btn-secondary"
        style={{ padding: "6px 12px", fontSize: 13 }}
      >
        Manage
      </button>
    </div>
  );
}

export default async function ThreadsPage() {
  await requireUser();
  const threads = await listThreads();
  const connectedCount = threads.filter((t) => t.status === "Connected").length;

  return (
    <>
      <Topbar crumb="Threads" />
      <main className="wd-main">
        <h1
          style={{
            font: "var(--type-h1)",
            marginBottom: 6,
            letterSpacing: "-0.01em",
          }}
        >
          Your threads
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--fg-2)",
            marginBottom: 24,
          }}
        >
          The tools WeaveDiary listens to.
        </p>
        <div className="wd-card" style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              padding: "16px 18px",
              borderBottom: "1px solid var(--border-hairline)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <div>
              <h3 style={{ font: "var(--type-h3)" }}>Your threads</h3>
              <div className="meta" style={{ marginTop: 2 }}>
                {connectedCount} connected · woven into every entry
              </div>
            </div>
            <button className="btn btn-primary" style={{ marginLeft: "auto" }}>
              + Connect
            </button>
          </div>
          {threads.map((t) => (
            <ThreadRow key={t.name} {...t} />
          ))}
        </div>
      </main>
    </>
  );
}
