import type { Goal } from "@/lib/mock/types";

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
}

function statusChipStyle(status: Goal["status"]): React.CSSProperties {
  if (status === "on-track") {
    return {
      background: "var(--color-sage-tint)",
      color: "var(--color-sage-deep)",
    };
  }
  if (status === "slipping") {
    return {
      background: "var(--color-ochre-tint)",
      color: "var(--color-ochre-deep)",
    };
  }
  // paused
  return {
    background: "var(--color-parchment-deep)",
    color: "var(--fg-3)",
  };
}

function statusLabel(status: Goal["status"]): string {
  if (status === "on-track") return "On track";
  if (status === "slipping") return "Slipping";
  return "Paused";
}

function progressBarColor(status: Goal["status"]): string {
  if (status === "on-track") return "var(--color-sage-deep)";
  if (status === "slipping") return "var(--color-ochre-deep)";
  return "var(--fg-4)";
}

interface SparklineProps {
  points: number[];
}

function Sparkline({ points }: SparklineProps) {
  const W = 80;
  const H = 24;
  const n = points.length;

  const coords = points.map((v, i) => {
    const x = n === 1 ? W / 2 : (i / (n - 1)) * W;
    const y = H - v * H;
    return { x, y };
  });

  const polylinePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");

  return (
    <svg
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: "visible" }}
    >
      <polyline
        points={polylinePoints}
        stroke="var(--color-madder)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {coords.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r="2"
          fill="var(--color-madder)"
        />
      ))}
    </svg>
  );
}

export function GoalCard({ goal, onEdit }: GoalCardProps) {
  const { title, reason, status, progress, sparkline, lastEvaluated } = goal;

  return (
    <article className="wd-card">
      {/* Status chip — top right */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <span
          className="tag"
          style={{
            ...statusChipStyle(status),
          }}
        >
          {statusLabel(status)}
        </span>
      </div>

      {/* Title */}
      <h3
        style={{
          font: "var(--type-h3)",
          color: "var(--fg-1)",
          marginBottom: 8,
        }}
      >
        {title}
      </h3>

      {/* Reason */}
      <p
        style={{
          font: "var(--type-prose-sm)",
          color: "var(--fg-2)",
          fontStyle: "italic",
          marginBottom: 16,
          margin: "0 0 16px",
        }}
      >
        {reason}
      </p>

      {/* Progress bar */}
      <div
        style={{
          background: "var(--color-parchment-deep)",
          height: 6,
          borderRadius: "var(--radius-pill)",
          marginBottom: 14,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: progressBarColor(status),
            borderRadius: "var(--radius-pill)",
            transition: "width 220ms ease",
          }}
        />
      </div>

      {/* Sparkline */}
      <div style={{ marginBottom: 16 }}>
        <Sparkline points={sparkline} />
      </div>

      {/* Bottom meta row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span className="meta">last evaluated · {lastEvaluated}</span>
        <button
          className="btn btn-ghost"
          style={{ padding: "4px 10px", fontSize: 13 }}
          onClick={() => onEdit(goal)}
        >
          Edit
        </button>
      </div>
    </article>
  );
}
