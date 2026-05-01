# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeaveDiary is an AI-powered personal diary that auto-generates daily entries by pulling activity from connected platforms (Gmail, GitHub, Slack, Discord, Google Calendar) and weaving them into human-readable narratives. Voice notes are transcribed and merged in. Weekly/monthly intelligence reviews surface patterns and track progress against user-defined goals.

## Current State

Frontend landing page and an in-app dashboard mock are built. No backend or API integrations exist yet.

### Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5 (strict)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss` — uses CSS `@theme` variables. Most styling is via design tokens (CSS custom properties) and component classes in `globals.css`, not Tailwind utilities.
- **Fonts**: Lora (serif, editorial + diary), Inter Tight (sans, UI), JetBrains Mono (metadata) via `next/font/google`. Wired to `--font-lora`, `--font-inter-tight`, `--font-jetbrains-mono` CSS variables.

### Commands (run from `app/`)

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

### Source Structure (`app/app/`)

```
app/
├── layout.tsx              # root layout — next/font wiring only
├── page.tsx                # marketing landing page (Nav, Hero, HowItWorks, Threads, Quote, CTA, Footer)
├── globals.css             # design tokens, base resets, component classes (.btn, .wd-card, .wd-app, …)
└── dashboard/
    └── page.tsx            # client-side dashboard (Sidebar, Topbar, Today/Diary/Reports/Threads, VoiceCapture)

public/brand/               # logo marks, thread/skein icons, paper-grain SVG
```

### Design System ("paper, ink, and a single woven thread")

- **Brand essence**: warm, literary, quietly intelligent. Paper-feel, not SaaS. No emoji, no exclamations. Sentence case everywhere.
- **Surfaces**: warm parchment family — `--color-parchment` (#F4EFE6) base, `--color-parchment-soft` elevated, `--color-parchment-deep` sunken.
- **Text**: warm near-blacks — `--color-ink` (#1F1B16), with `--fg-2`/`--fg-3` for secondary/tertiary.
- **Accent**: madder red `#A23E2C` ("the thread") — used sparingly for emphasis, links, brand mark. Plus ochre and sage.
- **Type**: serif (Lora) for display + diary prose, sans (Inter Tight) for UI chrome, mono (JetBrains Mono) for metadata. Use `var(--type-h1)`, `var(--type-prose)`, `var(--type-meta)` etc. shorthand fonts.
- **Radii**: 6px buttons/inputs, 10px cards, 16px large surfaces. Pill only for tags.
- **Elevation**: warm paper-soft shadows via `var(--shadow-1)` / `var(--shadow-2)`. No glassmorphism, no purple/blue gradients.
- **Motion**: 220ms `cubic-bezier(0.22, 0.61, 0.36, 1)`. No bounce, no scale, no parallax.

The full design source kit lives outside the repo (in the user's Downloads folder). Tokens were ported into `globals.css`; reference component classes there before adding new utility-laden markup.

### Environment Variables

None yet. Will be required when OAuth integrations and Claude API are wired up.

## Planned Architecture (from README)

**Core data flow:**
1. Integration connectors fetch read-only activity from each platform via OAuth
2. A synthesis layer aggregates and deduplicates activity into a daily context bundle
3. Claude API generates the diary entry narrative from that bundle
4. Entries are stored and surfaced via a web/mobile UI
5. Voice notes are transcribed (e.g. Whisper) and merged into entries before generation

**Key domain concepts:**
- **Entry** — one diary entry per day per user, combining all platform activity + voice notes
- **Integration** — an OAuth-connected platform source (Gmail, GitHub, etc.); read-only scopes where possible
- **Goal** — a user-defined personal/professional objective that the synthesis layer evaluates activity against
- **Review** — a weekly or monthly aggregate report generated from the entry history

## Privacy Requirements

- All OAuth scopes must be read-only wherever the platform allows
- User data encrypted at rest and in transit
- Users must be able to: disconnect any integration, export all diary data, and delete their account + all data
- WeaveDiary must never store raw platform credentials — use token refresh flows

## AI Integration Notes

When implementing the diary generation step, use the Claude API (`anthropic` SDK). Key considerations:
- Use prompt caching for the system prompt and any static context to reduce costs on high-frequency generation
- Batch entry generation (e.g. end-of-day jobs) is a good fit for the Batches API
- The synthesis layer should produce a structured context bundle before passing to Claude — do not pass raw API payloads directly