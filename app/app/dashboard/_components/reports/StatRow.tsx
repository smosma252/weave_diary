import type { StatItem } from "@/lib/types";

export function StatRow({ label, value, delta, tone }: StatItem) {
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
      <span style={{ font: "var(--type-body)", color: "var(--fg-2)", flex: 1 }}>
        {label}
      </span>
      <span
        style={{
          font: "var(--type-h3)",
          fontFamily: "var(--font-serif)",
          color: "var(--fg-1)",
        }}
      >
        {value}
      </span>
      {delta != null && (
        <span
          style={{
            font: "var(--type-mono-sm)",
            color: toneColor,
            width: 70,
            textAlign: "right",
          }}
        >
          {delta}
        </span>
      )}
    </div>
  );
}
