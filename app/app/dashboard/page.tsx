"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Entry = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  threads: string[];
  minutes: number;
  mood?: string;
  body?: string[];
  voice?: string;
};

const ENTRIES: Entry[] = [
  {
    id: "1",
    date: "Thu · 17 May",
    title: "A long afternoon",
    excerpt:
      "You shipped two pull requests, took a walk longer than thirty minutes, and went to bed before midnight.",
    threads: ["github", "calendar", "voice"],
    minutes: 4,
    mood: "calm",
    body: [
      "Thursday, the 17th — a quiet day with a long afternoon. The morning ran on email; by midday you'd cleared the inbox down to the last few stragglers and pushed the inbox-zero branch. The afternoon was for the long thing: you shipped feat/inbox-zero just after three, and the second PR — a small fix to the scheduler — went up an hour later.",
      "There was a walk in there too. A little over thirty minutes, by the calendar. You came back and made tea.",
      "Sam called in the evening, briefly. You sounded warm when you spoke about the trip. Bedtime was 11:38.",
    ],
    voice:
      "I think the week is settling. The thing with Sam felt good. I don't know — I might sleep well tonight.",
  },
  {
    id: "2",
    date: "Wed · 16 May",
    title: "The day Sam called",
    excerpt:
      "A good catch-up — there was warmth in your voice when you talked about the trip.",
    threads: ["slack", "voice", "mood"],
    minutes: 5,
    mood: "warm",
  },
  {
    id: "3",
    date: "Tue · 15 May",
    title: "Two reviews and a slow start",
    excerpt:
      "Quiet morning, then back-to-back reviews after lunch. Bedtime crept past one again.",
    threads: ["github", "calendar"],
    minutes: 3,
  },
  {
    id: "4",
    date: "Mon · 14 May",
    title: "Beginning of a steadier week",
    excerpt: "Forty minutes of reading before standup. The week opened with intent.",
    threads: ["calendar", "voice"],
    minutes: 4,
    mood: "focused",
  },
  {
    id: "5",
    date: "Sun · 13 May",
    title: "Long walk, no laptop",
    excerpt:
      "No commits, no email, no Slack. The longest walk of the month so far.",
    threads: ["calendar"],
    minutes: 2,
    mood: "rested",
  },
];

type Page = "today" | "diary" | "reports" | "threads" | "goals" | "settings";

const CRUMBS: Record<Page, string> = {
  today: "Today",
  diary: "Diary",
  reports: "Reports",
  threads: "Threads",
  goals: "Goals",
  settings: "Settings",
};

export default function Dashboard() {
  const [page, setPage] = useState<Page>("today");
  const [entry, setEntry] = useState<Entry | null>(null);

  let body: React.ReactNode;
  if (entry) {
    body = <EntryView entry={entry} onBack={() => setEntry(null)} />;
  } else if (page === "today") {
    body = <Today onOpen={(e) => e.body && setEntry(e)} />;
  } else if (page === "diary") {
    body = <Diary onOpen={(e) => e.body && setEntry(e)} />;
  } else if (page === "reports") {
    body = <WeeklyReport />;
  } else if (page === "threads") {
    body = (
      <>
        <h1 style={{ font: "var(--type-h1)", marginBottom: 6, letterSpacing: "-0.01em" }}>
          Your threads
        </h1>
        <p style={{ font: "var(--type-body)", color: "var(--fg-2)", marginBottom: 24 }}>
          The tools WeaveDiary listens to.
        </p>
        <ThreadsPanel />
      </>
    );
  } else {
    body = <h1 style={{ font: "var(--type-h1)" }}>{CRUMBS[page]}</h1>;
  }

  return (
    <div className="wd-app">
      <Sidebar
        active={page}
        onNav={(p) => {
          setPage(p);
          setEntry(null);
        }}
      />
      <div>
        <Topbar crumb={entry ? `Diary · ${entry.date}` : CRUMBS[page]} />
        <main className="wd-main">{body}</main>
      </div>
      <VoiceCapture />
    </div>
  );
}

/* ── Sidebar ─────────────────────────────────────────────── */

const NAV_ICONS: Record<string, string> = {
  today: "M4 6h16M4 12h16M4 18h10",
  weave: "M12 3v6 M12 15v6 M5 12h2 M17 12h2 M7 7l1.5 1.5 M16.5 7L15 8.5 M7 17l1.5-1.5 M16.5 17L15 15.5",
  reports: "M4 19V5 M9 19v-8 M14 19v-12 M19 19V9",
  threads: "M5 12c4 0 4-6 8-6s4 12 8 12",
  goals: "M12 3a9 9 0 100 18 9 9 0 000-18z M12 8v4l3 2",
  settings:
    "M12 8a4 4 0 100 8 4 4 0 000-8z M19.4 15a7 7 0 000-6l1.6-1.4-2-3.4-2 1a7 7 0 00-5.2-3l-.4-2.2H7.6L7.2 2a7 7 0 00-5.2 3l-2-1-2 3.4L-.4 9a7 7 0 000 6L-2 16.4l2 3.4 2-1a7 7 0 005.2 3l.4 2.2h2.8l.4-2.2a7 7 0 005.2-3l2 1 2-3.4z",
};

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24">
      <path d={d} />
    </svg>
  );
}

function NavItem({
  icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: keyof typeof NAV_ICONS;
  label: string;
  count?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <a className={active ? "active" : ""} onClick={onClick}>
      <Icon d={NAV_ICONS[icon]} />
      <span>{label}</span>
      {count != null && <span className="count">{count}</span>}
    </a>
  );
}

function Sidebar({ active, onNav }: { active: Page; onNav: (p: Page) => void }) {
  return (
    <aside className="wd-sidebar">
      <Link href="/" className="brand" style={{ textDecoration: "none" }}>
        <Image src="/brand/logo-mark.svg" alt="" width={28} height={28} />
        <span className="brand-name">WeaveDiary</span>
      </Link>
      <div className="wd-nav">
        <NavItem icon="today" label="Today" active={active === "today"} onClick={() => onNav("today")} />
        <NavItem icon="weave" label="Diary" count="217" active={active === "diary"} onClick={() => onNav("diary")} />
        <NavItem
          icon="reports"
          label="Reports"
          active={active === "reports"}
          onClick={() => onNav("reports")}
        />
      </div>
      <div className="group">Connections</div>
      <div className="wd-nav">
        <NavItem
          icon="threads"
          label="Threads"
          count="6"
          active={active === "threads"}
          onClick={() => onNav("threads")}
        />
        <NavItem
          icon="goals"
          label="Goals"
          count="3"
          active={active === "goals"}
          onClick={() => onNav("goals")}
        />
      </div>
      <div style={{ marginTop: "auto" }}>
        <div className="wd-nav">
          <NavItem
            icon="settings"
            label="Settings"
            active={active === "settings"}
            onClick={() => onNav("settings")}
          />
        </div>
      </div>
    </aside>
  );
}

/* ── Topbar ──────────────────────────────────────────────── */

function Topbar({ crumb }: { crumb: string }) {
  return (
    <header className="wd-top">
      <span className="crumb">{crumb}</span>
      <div className="search">
        <svg viewBox="0 0 24 24">
          <circle cx="11" cy="11" r="6" />
          <path d="M16 16l4 4" />
        </svg>
        <span>Search your diary…</span>
      </div>
    </header>
  );
}

/* ── Pages ───────────────────────────────────────────────── */

function Today({ onOpen }: { onOpen: (e: Entry) => void }) {
  return (
    <>
      <div className="meta" style={{ marginBottom: 8 }}>
        Thursday, the 17th of May
      </div>
      <h1 style={{ font: "var(--type-h1)", marginBottom: 6, letterSpacing: "-0.01em" }}>
        This week, in your own words
      </h1>
      <p style={{ font: "var(--type-body)", color: "var(--fg-2)", marginBottom: 28 }}>
        Your latest entries — woven from 6 connected threads.
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ENTRIES.map((e) => (
          <EntryCard key={e.id} entry={e} onClick={() => onOpen(e)} />
        ))}
      </div>
    </>
  );
}

function Diary({ onOpen }: { onOpen: (e: Entry) => void }) {
  return (
    <>
      <h1 style={{ font: "var(--type-h1)", marginBottom: 24, letterSpacing: "-0.01em" }}>Your diary</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {ENTRIES.map((e) => (
          <EntryCard key={e.id} entry={e} onClick={() => onOpen(e)} />
        ))}
      </div>
    </>
  );
}

/* ── Entry card / view ───────────────────────────────────── */

function EntryCard({ entry, onClick }: { entry: Entry; onClick: () => void }) {
  const { date, title, excerpt, threads, minutes, mood } = entry;
  return (
    <article
      className="wd-card"
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 10 }}
      onClick={onClick}
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
      <p style={{ font: "var(--type-prose-sm)", color: "var(--fg-2)", textWrap: "pretty", margin: 0 }}>
        {excerpt}
      </p>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
        {threads.map((t, i) => (
          <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

function EntryView({ entry, onBack }: { entry: Entry; onBack: () => void }) {
  const { date, title, body, threads, voice } = entry;
  return (
    <article style={{ maxWidth: 720, margin: "0 auto" }}>
      <button className="btn btn-ghost" style={{ marginBottom: 16, padding: "6px 10px" }} onClick={onBack}>
        ← Back to diary
      </button>
      <div className="meta" style={{ marginBottom: 8 }}>
        {date} · {threads.length} threads · 4 min read
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
          <div className="meta" style={{ marginBottom: 6, color: "var(--color-madder-deep)" }}>
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

/* ── Weekly report ───────────────────────────────────────── */

function StatRow({
  label,
  value,
  delta,
  tone,
}: {
  label: string;
  value: string;
  delta: string;
  tone?: "good" | "warn" | "flat";
}) {
  const toneColor =
    tone === "good"
      ? "var(--color-sage-deep)"
      : tone === "warn"
      ? "var(--color-ochre-deep)"
      : "var(--fg-3)";
  return (
    <div
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 14,
        padding: "12px 0",
        borderBottom: "1px solid var(--border-hairline)",
      }}
    >
      <span style={{ font: "var(--type-body)", color: "var(--fg-2)", flex: 1 }}>{label}</span>
      <span style={{ font: "var(--type-h3)", fontFamily: "var(--font-serif)", color: "var(--fg-1)" }}>
        {value}
      </span>
      <span style={{ font: "var(--type-mono-sm)", color: toneColor, width: 70, textAlign: "right" }}>
        {delta}
      </span>
    </div>
  );
}

function WeeklyReport() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="meta" style={{ marginBottom: 8 }}>
        Week of 11–17 May · weekly report
      </div>
      <h1 style={{ font: "var(--type-h1)", marginBottom: 24, letterSpacing: "-0.01em" }}>
        A steadier week than last
      </h1>
      <div className="prose" style={{ marginBottom: 36 }}>
        <p>
          You shipped <em>two pull requests</em>, took a walk longer than thirty minutes on four days, and went to
          bed before midnight more often than not. The week was, by your own measures, a calmer one — and your
          voice notes carried less of the tightness they did the week before.
        </p>
        <p>
          Where things slipped a little: reading. You set a goal of forty minutes a day and averaged twenty-two.
          Not a verdict — just a note for next week.
        </p>
      </div>
      <h3 style={{ font: "var(--type-h3)", marginBottom: 8 }}>By the numbers</h3>
      <div>
        <StatRow label="Pull requests shipped" value="2" delta="+1" tone="good" />
        <StatRow label="Walks over 30 min" value="4" delta="+2" tone="good" />
        <StatRow label="Avg bedtime" value="23:42" delta="−18m" tone="good" />
        <StatRow label="Reading minutes / day" value="22" delta="−18" tone="warn" />
        <StatRow label="Voice notes" value="11" delta="±0" tone="flat" />
      </div>
    </div>
  );
}

/* ── Threads panel ───────────────────────────────────────── */

type ThreadStatus = "Connected" | "Syncing" | "Paused";

function ThreadRow({
  name,
  status,
  last,
  color,
}: {
  name: string;
  status: ThreadStatus;
  last: string;
  color: string;
}) {
  const dot =
    status === "Connected" ? "#4F5B41" : status === "Syncing" ? "#C68A3B" : "#8A7E6E";
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
        <div style={{ font: "var(--type-body)", fontWeight: 500, color: "var(--fg-1)" }}>{name}</div>
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
        <span style={{ width: 6, height: 6, borderRadius: 999, background: dot }} />
        {status}
      </span>
      <button className="btn btn-secondary" style={{ padding: "6px 12px", fontSize: 13 }}>
        Manage
      </button>
    </div>
  );
}

function ThreadsPanel() {
  const threads: Array<{ name: string; status: ThreadStatus; last: string; color: string }> = [
    { name: "GitHub", status: "Connected", last: "12 min ago", color: "#1F1B16" },
    { name: "Slack", status: "Connected", last: "3 min ago", color: "#A23E2C" },
    { name: "Discord", status: "Syncing", last: "syncing…", color: "#4A6478" },
    { name: "Calendar", status: "Connected", last: "1 hr ago", color: "#6B7A5A" },
    { name: "Email", status: "Connected", last: "8 min ago", color: "#C68A3B" },
    { name: "Voice", status: "Paused", last: "2 days ago", color: "#8A7E6E" },
  ];
  return (
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
            6 connected · woven into every entry
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
  );
}

/* ── Voice capture (floating) ────────────────────────────── */

function VoiceCapture() {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [recording]);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)
      .toString()
      .padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  return (
    <div style={{ position: "fixed", right: 32, bottom: 32, zIndex: 10 }}>
      {recording ? (
        <div
          className="wd-card"
          style={{
            padding: "14px 18px",
            display: "flex",
            alignItems: "center",
            gap: 14,
            boxShadow: "var(--shadow-2)",
          }}
        >
          <span
            className="wd-pulse"
            style={{ width: 10, height: 10, borderRadius: 999, background: "var(--color-madder)" }}
          />
          <span className="mono" style={{ color: "var(--fg-1)" }}>
            {fmt(seconds)}
          </span>
          <span style={{ font: "var(--type-body-sm)", color: "var(--fg-2)" }}>Recording…</span>
          <button
            className="btn btn-primary"
            onClick={() => {
              setRecording(false);
              setSeconds(0);
            }}
          >
            Stop &amp; weave in
          </button>
        </div>
      ) : (
        <button
          className="btn btn-primary"
          style={{
            padding: "12px 20px",
            boxShadow: "var(--shadow-2)",
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
          }}
          onClick={() => setRecording(true)}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          >
            <rect x="9" y="3" width="6" height="12" rx="3" />
            <path d="M5 11a7 7 0 0014 0 M12 18v3" />
          </svg>
          Add a voice note
        </button>
      )}
    </div>
  );
}
