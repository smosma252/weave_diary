import type { WeeklyReport as WeeklyReportType } from "@/lib/mock/types";
import { StatRow } from "./StatRow";

interface WeeklyReportProps {
  report: WeeklyReportType;
}

export function WeeklyReport({ report }: WeeklyReportProps) {
  const { label, dateRange, summary, highlights, stats } = report;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="meta" style={{ marginBottom: 8 }}>
        {dateRange} · weekly report
      </div>
      <h1
        style={{
          font: "var(--type-h1)",
          marginBottom: 24,
          letterSpacing: "-0.01em",
        }}
      >
        {label}
      </h1>
      <div className="prose" style={{ marginBottom: 36 }}>
        <p>{summary}</p>
      </div>

      <h3 style={{ font: "var(--type-h3)", marginBottom: 8 }}>By the numbers</h3>
      <div style={{ marginBottom: 36 }}>
        {stats.map((stat) => (
          <StatRow key={stat.label} {...stat} />
        ))}
      </div>

      {highlights.length > 0 && (
        <>
          <h3 style={{ font: "var(--type-h3)", marginBottom: 12 }}>Highlights</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {highlights.map((item, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "8px 0",
                  borderBottom: "1px solid var(--border-hairline)",
                  font: "var(--type-body)",
                  color: "var(--fg-2)",
                }}
              >
                <span
                  style={{
                    color: "var(--color-madder)",
                    flexShrink: 0,
                    marginTop: 1,
                  }}
                >
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
