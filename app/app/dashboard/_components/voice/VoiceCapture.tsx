"use client";

import { useEffect, useState } from "react";

export function VoiceCapture() {
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
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "var(--color-madder)",
            }}
          />
          <span className="mono" style={{ color: "var(--fg-1)" }}>
            {fmt(seconds)}
          </span>
          <span style={{ font: "var(--type-body-sm)", color: "var(--fg-2)" }}>
            Recording…
          </span>
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
