import type { MonthlyReport as MonthlyReportType } from "@/lib/types";
import { StatRow } from "./StatRow";

interface MonthlyReportProps {
  report: MonthlyReportType;
}

export function MonthlyReport({ report }: MonthlyReportProps) {
  const {
    label,
    dateRange,
    summary,
    highlights,
    stats,
    topThreads,
    prevMonthComparison,
  } = report;

  return (
    <div style={{ maxWidth: 720, margin: "0 auto" }}>
      <div className="meta" style={{ marginBottom: 8 }}>
        {dateRange} · monthly report
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
        <div style={{ marginBottom: 36 }}>
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
        </div>
      )}

      {prevMonthComparison.length > 0 && (
        <div style={{ marginBottom: 36 }}>
          <h3 style={{ font: "var(--type-h3)", marginBottom: 8 }}>
            Compared to last month
          </h3>
          <div>
            {prevMonthComparison.map((stat) => (
              <StatRow key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      )}

      {topThreads.length > 0 && (
        <div>
          <h3 style={{ font: "var(--type-h3)", marginBottom: 16 }}>
            Threads that mattered most
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {topThreads.map((thread) => (
              <div
                key={thread.name}
                style={{
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border-hairline)",
                }}
              >
                <h3
                  style={{
                    font: "var(--type-h3)",
                    color: "var(--fg-1)",
                    marginBottom: 4,
                  }}
                >
                  {thread.name}
                </h3>
                <div className="meta">{thread.signal}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
