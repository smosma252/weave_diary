import { requireUser } from "@/lib/supabase/auth";
import { listGoals } from "@/lib/db/goals";
import { Topbar } from "../_components/shell/Topbar";
import { GoalList } from "../_components/goals/GoalList";

export default async function GoalsPage() {
  await requireUser();
  const goals = await listGoals();

  return (
    <>
      <Topbar crumb="Goals" />
      <main className="wd-main">
        <h1
          style={{
            font: "var(--type-h1)",
            marginBottom: 6,
            letterSpacing: "-0.01em",
          }}
        >
          Goals
        </h1>
        <p
          style={{
            font: "var(--type-body)",
            color: "var(--fg-2)",
            marginBottom: 28,
          }}
        >
          What you&apos;re working towards. WeaveDiary watches quietly and tells you when something starts to slip.
        </p>
        <GoalList goals={goals} />
      </main>
    </>
  );
}
