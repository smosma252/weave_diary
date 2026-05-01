# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

WeaveDiary is an AI-powered personal diary that auto-generates daily entries by pulling activity from connected platforms (Gmail, GitHub, Slack, Discord, Google Calendar) and weaving them into human-readable narratives. Voice notes are transcribed and merged in. Weekly/monthly intelligence reviews surface patterns and track progress against user-defined goals.

## Current State

Early development — only a README exists. No tech stack has been committed to yet. When adding the first code, update this file with:
- Build, lint, and test commands
- Chosen framework/language decisions
- Database schema overview
- Environment variable requirements

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