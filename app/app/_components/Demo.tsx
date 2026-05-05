"use client";

import { useState } from "react";

type Trend = "up" | "down" | "flat";

type Goal = {
  name: string;
  target: string;
  value: number;
  delta: string;
  trend: Trend;
  note: string;
};

type Day = {
  id: string;
  label: string;
  date: string;
  threads: number;
  tags: string[];
  title: string;
  body: string[];
  quote: string | null;
  goals: Goal[];
  suggestion: string;
};

const DEMO_DAYS: Day[] = [
  {
    id: "thu",
    label: "Thursday",
    date: "17 May",
    threads: 6,
    tags: ["github", "calendar", "voice", "email"],
    title: "A long afternoon",
    body: [
      "A long, even day. You opened with email — fifty-two unread by 8:14, down to four by lunch — and pushed the inbox-zero branch shortly after. The afternoon held: two pull requests merged, a thirty-minute walk on the calendar.",
      "Sam called at 9:38 in the evening. The call ran fifty-eight minutes. Bedtime was 11:38 — your earliest in nine days.",
    ],
    quote: "You sounded warm when you spoke about the trip.",
    goals: [
      { name: "Earlier bedtime", target: "by 11:30", value: 0.78, delta: "+18 min", trend: "up", note: "you moved earlier this week" },
      { name: "Walk daily", target: "30 min", value: 0.86, delta: "6 of 7 days", trend: "up", note: "skipped Tuesday" },
      { name: "Read 4 hrs / wk", target: "4 hrs", value: 0.55, delta: "−18 min/day", trend: "down", note: "slipped after Tuesday" },
    ],
    suggestion: "The hour before bed went to Slack three nights running. A book on the bedside table, perhaps?",
  },
  {
    id: "wed",
    label: "Wednesday",
    date: "16 May",
    threads: 9,
    tags: ["slack", "voice", "calendar", "discord"],
    title: "The day Sam called",
    body: [
      "A talkative day. Slack steady through the morning — forty-one messages across six channels — and the design review ran longer than scheduled.",
      "Sam's call came in the late afternoon. Fifty-eight minutes, the longest of the week. Bedtime: 12:12.",
    ],
    quote: "You laughed twice — the recording caught it.",
    goals: [
      { name: "Earlier bedtime", target: "by 11:30", value: 0.32, delta: "−42 min", trend: "down", note: "the call ran late" },
      { name: "Walk daily", target: "30 min", value: 0.86, delta: "6 of 7 days", trend: "up", note: "thirty-eight minutes today" },
      { name: "Read 4 hrs / wk", target: "4 hrs", value: 0.55, delta: "−18 min/day", trend: "down", note: "no reading today" },
    ],
    suggestion: "Talking days are good days. But your bedtime drifted — a wind-down ritual could help next time.",
  },
  {
    id: "tue",
    label: "Tuesday",
    date: "15 May",
    threads: 5,
    tags: ["github", "calendar"],
    title: "Two reviews and a slow start",
    body: [
      "A slow start. The morning held a kind of fog you didn't push through; you reviewed two pull requests, declined a meeting, and walked at noon for the first time in days.",
      "Steady afternoon. No voice notes today. Bedtime: 1:14 — the latest this week.",
    ],
    quote: null,
    goals: [
      { name: "Earlier bedtime", target: "by 11:30", value: 0.18, delta: "−1h 44min", trend: "down", note: "slipped past midnight" },
      { name: "Walk daily", target: "30 min", value: 0.86, delta: "6 of 7 days", trend: "up", note: "first walk in three days" },
      { name: "Read 4 hrs / wk", target: "4 hrs", value: 0.55, delta: "−18 min/day", trend: "flat", note: "twenty-two minutes" },
    ],
    suggestion: "Slow days deserve early nights. Lights down by eleven would help the morning fog.",
  },
];

function GoalRow({ g }: { g: Goal }) {
  const trendColor =
    g.trend === "up" ? "var(--color-sage-deep)" : g.trend === "down" ? "var(--color-madder)" : "var(--fg-3)";
  const trendArrow = g.trend === "up" ? "↗" : g.trend === "down" ? "↘" : "→";
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "4px 16px",
        padding: "14px 0",
        borderBottom: "1px solid var(--border-hairline)",
      }}
    >
      <div style={{ font: "500 15px/1.3 var(--font-sans)", color: "var(--fg-1)" }}>{g.name}</div>
      <div style={{ font: "var(--type-mono)", fontSize: 12, color: trendColor, whiteSpace: "nowrap" }}>
        {trendArrow} {g.delta}
      </div>
      <div style={{ gridColumn: "1 / -1", display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            flex: 1,
            height: 4,
            background: "var(--color-parchment-deep)",
            borderRadius: 999,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${Math.round(g.value * 100)}%`,
              height: "100%",
              background: g.trend === "down" ? "var(--color-madder)" : "var(--color-ink)",
              transition: "width 480ms cubic-bezier(0.22,0.61,0.36,1)",
            }}
          />
        </div>
        <div style={{ font: "var(--type-mono)", fontSize: 11, color: "var(--fg-3)", width: 56, textAlign: "right" }}>
          {g.target}
        </div>
      </div>
      <div style={{ gridColumn: "1 / -1", font: "italic 400 13px/1.4 var(--font-serif)", color: "var(--fg-2)" }}>
        — {g.note}
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeId, setActiveId] = useState("thu");
  const day = DEMO_DAYS.find((d) => d.id === activeId)!;

  return (
    <section
      id="demo"
      style={{ background: "var(--color-parchment-deep)", padding: "96px 40px" }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div className="wd-reveal" style={{ textAlign: "center", marginBottom: 48 }}>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Try it</div>
          <h2 className="h-section" style={{ maxWidth: 640, margin: "0 auto" }}>
            A week, in three Thursdays.
          </h2>
          <p className="lede" style={{ margin: "16px auto 0" }}>
            Pick a day. Read what WeaveDiary would have written, and where you stood on what you said mattered.
          </p>
        </div>

        <div
          role="tablist"
          style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}
        >
          {DEMO_DAYS.map((d) => {
            const on = d.id === activeId;
            return (
              <button
                key={d.id}
                role="tab"
                aria-selected={on}
                onClick={() => setActiveId(d.id)}
                style={{
                  font: "var(--type-button)",
                  padding: "10px 18px",
                  background: on ? "var(--color-ink)" : "var(--bg-elevated)",
                  color: on ? "var(--color-parchment-soft)" : "var(--fg-1)",
                  border: "1px solid " + (on ? "var(--color-ink)" : "var(--border)"),
                  borderRadius: "var(--radius-sm)",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  transition: "all 200ms cubic-bezier(0.22,0.61,0.36,1)",
                }}
              >
                <span style={{ font: "var(--type-mono)", fontSize: 11, opacity: 0.7 }}>{d.date}</span>
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr", gap: 24, alignItems: "stretch" }}>
          <article
            key={activeId}
            className="demo-day-fade"
            style={{
              background: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-lg)",
              padding: "32px 40px",
              boxShadow: "var(--shadow-1)",
            }}
          >
            <div className="meta" style={{ margin: 0 }}>
              {day.label}, {day.date} · {day.threads} threads
            </div>
            <h3
              style={{
                font: "600 32px/1.15 var(--font-serif)",
                letterSpacing: "-0.01em",
                color: "var(--fg-1)",
                margin: "8px 0 20px",
                textWrap: "balance",
              }}
            >
              {day.title}
            </h3>

            <div style={{ font: "400 17px/1.65 var(--font-serif)", color: "var(--fg-1)", textWrap: "pretty" }}>
              {day.body.map((p, i) => (
                <p key={i} style={{ margin: i ? "16px 0 0" : 0 }}>
                  {p}
                </p>
              ))}
            </div>

            {day.quote && (
              <blockquote
                style={{
                  margin: "24px 0 0",
                  padding: "14px 18px",
                  background: "var(--color-parchment-deep)",
                  borderRadius: "var(--radius-sm)",
                  font: "italic 400 16px/1.5 var(--font-serif)",
                  color: "var(--color-madder-deep)",
                }}
              >
                {day.quote}
              </blockquote>
            )}

            <div style={{ display: "flex", gap: 6, marginTop: 24, flexWrap: "wrap" }}>
              {day.tags.map((t, i) => (
                <span key={t} className={"tag" + (i === 0 ? " acc" : "")}>
                  {t}
                </span>
              ))}
            </div>
          </article>

          <aside key={activeId + "-aside"} className="demo-day-fade" style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "var(--bg-elevated)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)",
                padding: "24px 28px",
                flex: 1,
              }}
            >
              <div className="meta" style={{ margin: 0 }}>Against your goals</div>
              <h4 style={{ font: "600 18px/1.3 var(--font-serif)", color: "var(--fg-1)", margin: "6px 0 8px" }}>
                How you&rsquo;re tracking
              </h4>
              <div>
                {day.goals.map((g) => (
                  <GoalRow key={g.name} g={g} />
                ))}
              </div>
            </div>

            <div
              style={{
                background: "var(--color-ink)",
                color: "var(--color-parchment-soft)",
                borderRadius: "var(--radius-lg)",
                padding: "20px 24px",
                display: "flex",
                gap: 14,
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: "var(--color-madder)",
                  flex: "none",
                  display: "grid",
                  placeItems: "center",
                  color: "var(--color-parchment-soft)",
                  font: "italic 600 14px var(--font-serif)",
                }}
              >
                w
              </div>
              <div>
                <div
                  style={{
                    font: "var(--type-meta)",
                    textTransform: "uppercase",
                    letterSpacing: "var(--tracking-meta)",
                    color: "var(--color-loom-soft)",
                    marginBottom: 6,
                  }}
                >
                  A small thought
                </div>
                <p style={{ font: "italic 400 16px/1.5 var(--font-serif)", margin: 0, textWrap: "pretty" }}>
                  {day.suggestion}
                </p>
              </div>
            </div>
          </aside>
        </div>

        <p style={{ font: "var(--type-caption)", color: "var(--fg-3)", textAlign: "center", marginTop: 24 }}>
          Sample data — your diary will be quieter, and entirely yours.
        </p>
      </div>
    </section>
  );
}
