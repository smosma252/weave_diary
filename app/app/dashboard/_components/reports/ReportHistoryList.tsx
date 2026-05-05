"use client";

import Link from "next/link";
import { useState } from "react";
import type { ReportSummary } from "@/lib/mock/types";

interface ReportHistoryListProps {
  history: ReportSummary[];
}

type FilterType = "weekly" | "monthly";

export function ReportHistoryList({ history }: ReportHistoryListProps) {
  const [filter, setFilter] = useState<FilterType>("monthly");

  const filtered = history.filter((r) => r.type === filter);

  return (
    <div>
      {/* Toggle pill */}
      <div
        style={{
          display: "inline-flex",
          background: "var(--color-parchment-deep)",
          padding: 4,
          borderRadius: "var(--radius-pill)",
          marginBottom: 28,
        }}
      >
        {(["monthly", "weekly"] as FilterType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            style={{
              font: "var(--type-body)",
              padding: "6px 18px",
              borderRadius: "var(--radius-pill)",
              border: "none",
              cursor: "pointer",
              background: filter === type ? "var(--color-parchment-soft)" : "transparent",
              color: filter === type ? "var(--fg-1)" : "var(--fg-3)",
              transition: "background var(--duration) var(--ease), color var(--duration) var(--ease)",
            }}
          >
            {type === "monthly" ? "Monthly" : "Weekly"}
          </button>
        ))}
      </div>

      {/* Report cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((report) => (
          <Link
            key={report.id}
            href={`/dashboard/reports/${report.type}/${report.id}`}
            style={{ textDecoration: "none" }}
          >
            <article className="wd-card" style={{ cursor: "pointer" }}>
              <div className="meta" style={{ marginBottom: 6 }}>
                {report.dateRange}
              </div>
              <h3 style={{ font: "var(--type-h3)", color: "var(--fg-1)" }}>
                {report.label}
              </h3>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
