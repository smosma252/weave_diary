# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeaveDiary is an AI-powered personal diary that auto-generates daily entries by pulling activity from connected platforms (Gmail, GitHub, Slack, Discord, Google Calendar) and weaving them into human-readable narratives. Voice notes are transcribed and merged in. Weekly/monthly intelligence reviews surface patterns and track progress against user-defined goals.

## Current State

Frontend-only landing page is built. No backend or API integrations exist yet. The UI is being redesigned — a new design system will be imported (replacing the current one) before further UI work continues.

### Tech Stack

- **Framework**: Next.js 16 (App Router), React 19, TypeScript 5 (strict)
- **Styling**: Tailwind CSS 4 via `@tailwindcss/postcss` — uses CSS `@theme` variables, not `tailwind.config.js`
- **Icons**: Material Symbols Outlined via Google Fonts CDN
- **Fonts**: Newsreader (serif, diary prose + display), Manrope (sans, UI chrome) via `next/font/google`

### Commands (run from `app/`)

```bash
npm run dev      # start dev server on localhost:3000
npm run build    # production build
npm run lint     # ESLint
```

### Source Structure (`app/app/`)

```
app/
├── layout.tsx         # root layout — fonts, icon CDN, dark class, dot-grid bg
├── page.tsx           # landing page (hero, ecosystem, bento, demo, footer)
├── globals.css        # Tailwind theme vars, utility classes, all animations
└── components/
    └── DiaryDemo.tsx  # tabbed Log/Story/Ad-lib demo with scroll-reveal
```

### Design System (see `DESIGN.md`)

- **Colors**: Hearthlight amber `#ffb77d` (primary), Growth green `#a0d663`, Burnished gold `#f7be1d`, 6 neutral steps (Void → Raised)
- **Elevation**: Tonal only — no drop shadows
- **Animations**: CSS scroll-driven (`animation-timeline: view()`) — no JS animation libraries
- **Background**: `.dot-grid` (radial gradient), `.grain` (texture overlay)
- **Buttons**: Pill/feature-rounded; no sharp corners
- **Rule**: 10% Hearthlight rule — warm amber tint appears on every surface

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