import type { Goal } from "./types";

export const GOALS: Goal[] = [
  {
    id: "g1",
    title: "Read forty minutes a day",
    reason:
      "I want my mornings to start with my own voice, not someone else's notifications.",
    status: "slipping",
    progress: 0.55,
    sparkline: [0.78, 0.62, 0.5, 0.36],
    lastEvaluated: "2026-05-04",
  },
  {
    id: "g2",
    title: "Sleep before midnight on weeknights",
    reason:
      "The weeks where I do this are the weeks I recognise myself in the voice notes.",
    status: "on-track",
    progress: 0.82,
    sparkline: [0.55, 0.7, 0.74, 0.82],
    lastEvaluated: "2026-05-04",
  },
  {
    id: "g3",
    title: "Walk for thirty minutes, four days a week",
    reason:
      "Most of the ideas I'm proud of came on a walk. I keep forgetting that.",
    status: "on-track",
    progress: 0.91,
    sparkline: [0.6, 0.72, 0.85, 0.91],
    lastEvaluated: "2026-05-04",
  },
  {
    id: "g4",
    title: "Ship one piece of writing a month",
    reason:
      "Code is easy to ship; the rest is the part I keep deferring. Forcing the shape helps.",
    status: "paused",
    progress: 0.25,
    sparkline: [0.4, 0.32, 0.28, 0.25],
    lastEvaluated: "2026-04-21",
  },
];

export function getGoal(id: string): Goal | undefined {
  return GOALS.find((g) => g.id === id);
}

export function listGoals(): Goal[] {
  return GOALS;
}
