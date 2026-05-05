---
name: GoalEditorDialog pattern — key-remount for form state sync
description: ESLint in this project blocks two common patterns for syncing controlled form state from props; use key-remount instead
type: feedback
---

Two patterns that look reasonable but fail ESLint in this codebase:

1. `setState` called synchronously inside `useEffect` body → `react-hooks/set-state-in-effect` error.
2. Reading or writing `ref.current` during the render phase → `react-hooks/refs` error.

**Why:** The Next.js ESLint config here enforces strict React best-practice hooks rules that flag both patterns.

**How to apply:** When a component needs to initialise local form state from an incoming prop that changes (e.g. an edit dialog that can open with different objects), the clean solution is:
- Extract the form into a separate inner component that takes initial values as props.
- Parent passes `key={entity?.id ?? 'new'}` to that inner component.
- Inner component initialises `useState` from the initial value props — React remounts it fresh whenever the key changes.
- The outer shell (dialog element) keeps its own `useEffect` for the native `dialog.showModal()` / `dialog.close()` call — that useEffect pattern is fine because it only imperatively drives the DOM, not React state.
