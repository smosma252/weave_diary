"use client";

import { useEffect, useRef, useState } from "react";
import type { Goal } from "@/lib/mock/types";

interface GoalFormData {
  title: string;
  reason: string;
  status: Goal["status"];
}

interface GoalEditorDialogProps {
  open: boolean;
  goal: Goal | null;
  onClose: () => void;
  onSave?: (data: GoalFormData) => void;
}

// Inner form — receives initial values as props and owns its own field state.
// Re-keyed by the parent when goal changes, so state initialises fresh each time.
interface GoalFormProps {
  initialTitle: string;
  initialReason: string;
  initialStatus: Goal["status"];
  isNew: boolean;
  onClose: () => void;
  onSave?: (data: GoalFormData) => void;
}

function GoalForm({
  initialTitle,
  initialReason,
  initialStatus,
  isNew,
  onClose,
  onSave,
}: GoalFormProps) {
  const [title, setTitle] = useState(initialTitle);
  const [reason, setReason] = useState(initialReason);
  const [status, setStatus] = useState<Goal["status"]>(initialStatus);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSave?.({ title, reason, status });
    onClose();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2
        style={{
          font: "var(--type-h2)",
          letterSpacing: "var(--tracking-tight)",
          marginBottom: 20,
        }}
      >
        {isNew ? "New goal" : "Edit goal"}
      </h2>

      {/* Title */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="goal-title"
          style={{
            display: "block",
            font: "var(--type-label)",
            color: "var(--fg-2)",
            marginBottom: 6,
          }}
        >
          Goal
        </label>
        <input
          id="goal-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What are you working towards?"
          required
          style={{
            width: "100%",
            background: "var(--bg-sunken)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 12px",
            font: "var(--type-body)",
            color: "var(--fg-1)",
            outline: "none",
          }}
        />
      </div>

      {/* Reason */}
      <div style={{ marginBottom: 16 }}>
        <label
          htmlFor="goal-reason"
          style={{
            display: "block",
            font: "var(--type-label)",
            color: "var(--fg-2)",
            marginBottom: 6,
          }}
        >
          Why this matters
        </label>
        <textarea
          id="goal-reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="In your own words…"
          rows={3}
          style={{
            width: "100%",
            background: "var(--bg-sunken)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 12px",
            font: "var(--type-body)",
            color: "var(--fg-1)",
            resize: "vertical",
            outline: "none",
          }}
        />
      </div>

      {/* Status */}
      <div style={{ marginBottom: 24 }}>
        <label
          htmlFor="goal-status"
          style={{
            display: "block",
            font: "var(--type-label)",
            color: "var(--fg-2)",
            marginBottom: 6,
          }}
        >
          Status
        </label>
        <select
          id="goal-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as Goal["status"])}
          style={{
            background: "var(--bg-sunken)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "10px 12px",
            font: "var(--type-body)",
            color: "var(--fg-1)",
            outline: "none",
          }}
        >
          <option value="on-track">On track</option>
          <option value="slipping">Slipping</option>
          <option value="paused">Paused</option>
        </select>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button type="button" className="btn btn-ghost" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
}

export function GoalEditorDialog({
  open,
  goal,
  onClose,
  onSave,
}: GoalEditorDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open / close the native dialog element
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)",
        padding: 24,
        maxWidth: 500,
        width: "100%",
        boxShadow: "var(--shadow-2)",
        color: "var(--fg-1)",
      }}
    >
      {/* key forces GoalForm to remount when switching between goals or new/edit mode */}
      <GoalForm
        key={goal?.id ?? "new"}
        initialTitle={goal?.title ?? ""}
        initialReason={goal?.reason ?? ""}
        initialStatus={goal?.status ?? "on-track"}
        isNew={goal === null}
        onClose={onClose}
        onSave={onSave}
      />
    </dialog>
  );
}
