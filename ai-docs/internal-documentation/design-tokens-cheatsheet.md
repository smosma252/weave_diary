# Design Tokens Cheatsheet

All tokens are CSS custom properties defined in `app/app/globals.css`. Reference them directly in inline styles or component CSS. Tailwind v4 exposes the color tokens as utilities via `@theme inline`.

---

## Surfaces (backgrounds)

| Token | Value | When to use |
|---|---|---|
| `--bg` | `#F4EFE6` (parchment) | Default page/app background |
| `--bg-elevated` | `#FAF6EE` (parchment-soft) | Cards, sidebar, floating panels |
| `--bg-sunken` | `#ECE5D7` (parchment-deep) | Input backgrounds, inset sections |
| `--bg-overlay` | `rgba(31,27,22,0.45)` | Modal backdrops |
| `--color-parchment-edge` | `#E2D9C6` | Subtle dividers, pressed states |

---

## Text (foreground)

| Token | Hex | When to use |
|---|---|---|
| `--fg-1` | `#1F1B16` | Primary body text, headings |
| `--fg-2` | `#3A332B` | Secondary text, labels |
| `--fg-3` | `#6B5F50` | Tertiary text, placeholders, meta |
| `--fg-4` | `#8A7E6E` | Disabled, decorative, ghost |
| `--fg-on-accent` | `#FAF6EE` | Text on madder / colored backgrounds |

---

## Brand Accent — Madder (the thread)

Use sparingly. One accent per surface is the rule.

| Token | Hex | When to use |
|---|---|---|
| `--color-madder` | `#A23E2C` | Links, active nav, the brand mark |
| `--color-madder-deep` | `#7E2E1F` | Hover states, `.btn-primary` bg |
| `--color-madder-soft` | `#D9A89C` | Text selections, subtle borders |
| `--color-madder-tint` | `#F2E2DD` | Active nav bg, `.tag.acc` bg |
| `--accent` | → madder | Semantic shorthand for accent color |
| `--accent-tint` | → madder-tint | Semantic shorthand for accent bg tint |

---

## Signal Colors — Ochre and Sage

| Token | Hex | When to use |
|---|---|---|
| `--color-ochre` | `#C68A3B` | Warning text, "slipping" goal chip |
| `--color-ochre-deep` | `#99672A` | Warning strong / hover |
| `--color-ochre-tint` | `#F4E6CE` | Warning background, `.tag` with ochre status |
| `--color-sage` | `#6B7A5A` | Success text, "on track" goal chip |
| `--color-sage-deep` | `#4F5B41` | Success strong / hover |
| `--color-sage-tint` | `#E0E4D5` | Success background, `.tag.sage` bg |
| `--warn` / `--warn-bg` | → ochre-deep / tint | Semantic warn pair |
| `--success` / `--success-bg` | → sage-deep / tint | Semantic success pair |

---

## Borders

| Token | When to use |
|---|---|
| `--border` | Default card / input border (`rgba(138,126,110, 0.28)`) |
| `--border-strong` | Hover / focus border (`rgba(138,126,110, 0.50)`) |
| `--border-hairline` | Sidebar divider, topbar underline (`rgba(138,126,110, 0.16)`) |

---

## Typography

### Font families

| Token | Stack | Role |
|---|---|---|
| `--font-serif` | Lora → Georgia → serif | Display, headings, diary prose, pull-quotes |
| `--font-sans` | Inter Tight → Inter → system-ui | UI chrome, labels, buttons, body copy |
| `--font-mono` | JetBrains Mono → SF Mono → Menlo | Metadata, dates, counts |

### Type ramps (font shorthand — weight / size / line-height / family)

| Token | Size | Use |
|---|---|---|
| `--type-display-1` | 56px serif 600 | Hero headlines (marketing only) |
| `--type-display-2` | 44px serif 600 | Section heroes |
| `--type-h1` | 36px serif 600 | Page titles |
| `--type-h2` | 28px serif 600 | Section headings |
| `--type-h3` | 22px serif 600 | Sub-section headings, card titles |
| `--type-h4` | 18px sans 600 | Small headings, sidebar group labels |
| `--type-prose` | 18px serif 400 | Diary entry body text |
| `--type-prose-sm` | 16px serif 400 | Entry excerpts, secondary prose |
| `--type-body` | 15px sans 400 | Default UI text |
| `--type-body-sm` | 13px sans 400 | Dense UI, table rows |
| `--type-label` | 13px sans 500 | Form labels, button-adjacent labels |
| `--type-button` | 14px sans 500 | Button text |
| `--type-caption` | 12px sans 400 | Tags, chips, footnotes |
| `--type-mono` | 13px mono 400 | Inline metadata |
| `--type-meta` | 11px mono 500 | Eyebrows, nav counts, timestamps |

### Letter-spacing

| Token | Value | Use |
|---|---|---|
| `--tracking-tight` | `-0.01em` | Display / H1 headings |
| `--tracking-normal` | `0` | Body and prose |
| `--tracking-wide` | `0.04em` | — |
| `--tracking-meta` | `0.08em` | `.meta`, `.eyebrow`, nav group labels |

---

## Spacing (4px baseline grid)

| Token | px |
|---|---|
| `--space-1` | 4 |
| `--space-2` | 8 |
| `--space-3` | 12 |
| `--space-4` | 16 |
| `--space-5` | 20 |
| `--space-6` | 24 |
| `--space-7` | 32 |
| `--space-8` | 40 |
| `--space-9` | 56 |
| `--space-10` | 72 |
| `--space-11` | 96 |
| `--space-12` | 128 |

---

## Radii

| Token | px | Use |
|---|---|---|
| `--radius-xs` | 4 | Tight chips, tiny badges |
| `--radius-sm` | 6 | Buttons, inputs |
| `--radius-md` | 10 | Cards (`.wd-card`) |
| `--radius-lg` | 16 | Large surfaces, modals |
| `--radius-pill` | 999 | Tags, toggles |

---

## Shadows

| Token | Use |
|---|---|
| `--shadow-1` | Default card lift (subtle) |
| `--shadow-2` | Hover card lift, dropdowns, modals |
| `--shadow-focus` | 3px madder ring — keyboard focus outline |

---

## Motion

| Token | Value | Use |
|---|---|---|
| `--ease` | `cubic-bezier(0.22, 0.61, 0.36, 1)` | All transitions |
| `--duration-fast` | `120ms` | Micro-interactions (hover bg swap) |
| `--duration` | `220ms` | Standard transitions |
| `--duration-slow` | `360ms` | Entrance animations |

No bounce. No scale transforms on hover. No parallax. `prefers-reduced-motion` respected throughout.

---

## Layout Constants

| Token | Value | Use |
|---|---|---|
| `--sidebar-w` | `244px` | Dashboard sidebar width |
| `--topbar-h` | `56px` | Dashboard topbar height |
| `--container` | `1180px` | Marketing page max-width |
| `--container-narrow` | `780px` | Narrow marketing sections |
| `--measure-prose` | `68ch` | Max line length for `.prose` |

---

## Component Classes

Prefer these over building equivalent styles from scratch.

| Class | What it gives you |
|---|---|
| `.btn` | Base button — font, padding, radius, transition |
| `.btn-primary` | Madder-deep fill, white text, 600 weight |
| `.btn-secondary` | Elevated bg, border, ink text |
| `.btn-ghost` | Transparent, ink text, parchment-deep hover |
| `.wd-card` | Elevated bg, border, 10px radius, shadow-1, hover lift |
| `.tag` | Pill chip — parchment-deep bg, fg-2 text |
| `.tag.acc` | Madder-tint bg, madder-deep text |
| `.tag.sage` | Sage-tint bg, sage-deep text |
| `.prose` | 18px serif body, measure-prose max-width, madder em |
| `.meta` | 11px mono, uppercase, tracking-meta, fg-3 |
| `.eyebrow` | Same as `.meta` but madder color |
| `.mono` | 13px mono, fg-3 |
| `.lede` | 20px serif, fg-2, 600px max-width — landing page sub-headlines |
| `.wd-app` | Grid shell: sidebar + main |
| `.wd-sidebar` | Sidebar panel styles |
| `.wd-nav` | Nav link list — active, hover states |
| `.wd-top` | Sticky topbar with backdrop blur |
| `.wd-main` | `padding: 32px 40px 80px; max-width: 920px` |
| `.wd-reveal` | Scroll-triggered entrance (view() timeline) |
| `.wd-reveal-stagger` | Parent that staggers `.wd-reveal` children |
| `.wd-pulse` | Infinite opacity pulse (recording indicator) |
| `.paper-grain` | Opt-in SVG paper texture overlay |
