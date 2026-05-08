"use client";

import { useState, useTransition } from "react";
import type { Goal } from "@/lib/types";
import { createGoal, updateGoal } from "@/lib/actions/goals";
import { GoalCard } from "./GoalCard";
import { GoalEditorDialog } from "./GoalEditorDialog";

interface GoalListProps {
  goals: Goal[];
}

export function GoalList({ goals }: GoalListProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [, startTransition] = useTransition();

  function openNew() {
    setEditingGoal(null);
    setDialogOpen(true);
  }

  function openEdit(goal: Goal) {
    setEditingGoal(goal);
    setDialogOpen(true);
  }

  function handleClose() {
    setDialogOpen(false);
    setEditingGoal(null);
  }

  function handleSave(data: { title: string; reason: string; status: Goal["status"] }) {
    startTransition(async () => {
      if (editingGoal) {
        await updateGoal(editingGoal.id, data);
      } else {
        await createGoal(data);
      }
    });
  }

  return (
    <>
      {goals.length === 0 ? (
        <p
          style={{
            font: "var(--type-prose-sm)",
            fontStyle: "italic",
            color: "var(--fg-3)",
            textAlign: "center",
            padding: "48px 0",
          }}
        >
          You haven&apos;t set a goal yet. Tell WeaveDiary what you&apos;re working towards — it&apos;ll watch quietly.
        </p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onEdit={openEdit} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 24 }}>
        <button className="btn btn-secondary" onClick={openNew}>
          + New goal
        </button>
      </div>

      <GoalEditorDialog
        open={dialogOpen}
        goal={editingGoal}
        onClose={handleClose}
        onSave={handleSave}
      />
    </>
  );
}
