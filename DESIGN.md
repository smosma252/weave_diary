---
name: WeaveDiary
description: An AI diary that writes itself — your scattered digital life, made coherent and yours.
colors:
  hearthlight: "#ffb77d"
  hearthlight-deep: "#d97707"
  hearthlight-faint: "#ffdcc3"
  growth: "#a0d663"
  growth-deep: "#447200"
  burnished-gold: "#f7be1d"
  void: "#0e0e0e"
  deep-canvas: "#131313"
  still-surface: "#1c1b1b"
  settled: "#20201f"
  lifted: "#2a2a2a"
  raised: "#353535"
  page: "#e5e2e1"
  margin-note: "#dbc2b0"
  warm-border: "#a38c7c"
  faint-border: "#554336"
  on-hearthlight: "#4d2600"
  on-hearthlight-deep: "#432100"
  error: "#ffb4ab"
typography:
  display:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "32px"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "Newsreader, Georgia, serif"
    fontSize: "24px"
    fontWeight: 500
    lineHeight: 1.3
  body-lg:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
  body-sm:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.05em"
rounded:
  pill: "9999px"
  section: "24px"
  feature: "16px"
  element: "12px"
  chip: "8px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.hearthlight}"
    textColor: "{colors.on-hearthlight}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-primary-hover:
    backgroundColor: "{colors.hearthlight-deep}"
    textColor: "{colors.on-hearthlight}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  button-cta:
    backgroundColor: "{colors.hearthlight-deep}"
    textColor: "{colors.on-hearthlight-deep}"
    rounded: "{rounded.pill}"
    padding: "20px 40px"
  button-cta-hover:
    backgroundColor: "{colors.hearthlight-deep}"
    textColor: "{colors.on-hearthlight-deep}"
    rounded: "{rounded.pill}"
    padding: "20px 40px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.page}"
    rounded: "{rounded.feature}"
    padding: "16px 32px"
  button-ghost-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.page}"
    rounded: "{rounded.feature}"
    padding: "16px 32px"
  feature-card:
    backgroundColor: "{colors.still-surface}"
    rounded: "{rounded.feature}"
    padding: "{spacing.lg}"
  nav-pill:
    backgroundColor: "{colors.settled}"
    rounded: "{rounded.pill}"
    padding: "12px 32px"
---

# Design System: WeaveDiary

## 1. Overview

**Creative North Star: "The Still Record"**

WeaveDiary's visual language is built on stillness as a design stance. The interface does not announce itself. It is a calm surface that holds the weight of a day's accumulated activity without dramatizing it — a tool that respects the user's attention by never competing for it. Every element is placed with intention; nothing moves without purpose; nothing decorates without function.

The palette is a near-black field with warm, tinted neutrals that carry the suggestion of aged paper and candlelight. The single accent — Hearthlight, a warm amber-orange — appears sparingly, marking what matters: a prompt, a CTA, an icon with meaning. Its rarity is its authority. The serif headline font (Newsreader) brings editorial weight and a faint analog quality to daily entries; the sans body (Manrope) carries information cleanly without personality-clash. Grain texture and a subtle dot-grid background add material depth without visual noise.

WeaveDiary explicitly rejects the aesthetic conventions of the tools its users have outgrown: no bullet-point journal chrome (Things, Obsidian, Bear, Day One's scrapbook feel), no Notion-style text-editor bleakness, no AI-first dashboard theatrics (gradient hero blobs, "powered by AI" badges, feature grids), no cold productivity SaaS minimalism. This is not a dashboard. It is a record.

**Key Characteristics:**
- Near-black canvas with warm tonal surface steps — depth through tone, not drop shadows
- One accent color used with strict restraint; its presence is a signal, not decoration
- Serif display type for headlines and diary copy; sans-serif for all UI chrome
- Grain texture on key surfaces as a material reference to analog paper
- Components that breathe: generous internal padding, deliberate radius choices
- Motion that confirms, not entertains: scroll-driven entrances, no idle animation

## 2. Colors: The Hearthlight Palette

A near-monochromatic dark field, warmed throughout by a consistent amber hue-tint in all neutrals, with Hearthlight as the sole expressive accent.

### Primary
- **Hearthlight** (`#ffb77d`): The warm amber-orange that carries all primary UI actions, iconography emphasis, and brand moments. Used on ≤10% of any screen. Its scarcity makes it legible as a signal, not decoration.
- **Hearthlight Deep** (`#d97707`): The saturated form of the accent — used for CTA buttons, the ecosystem hub element, and high-emphasis icon moments. Not a tint variant; a distinct role at maximum color conviction.
- **Hearthlight Faint** (`#ffdcc3`): The palest expression. Used in hover states and tinted illustrative contexts. Never as a background field.

### Secondary
- **Growth** (`#a0d663`): Chartreuse-green for goal-tracking and progress signals. Appears only where "advancement" is the explicit semantic. Not decorative.
- **Growth Deep** (`#447200`): The container form of Growth; used as tinted backgrounds behind progress indicators.

### Tertiary
- **Burnished Gold** (`#f7be1d`): Warm yellow-gold for tertiary accents and the system status indicator. Cooler in hue than Hearthlight — more mineral, less fire.

### Neutral
- **Void** (`#0e0e0e`): The lowest surface — dot-grid canvas and deepest background.
- **Deep Canvas** (`#131313`): The primary background and base surface. Near-black, but never pure black.
- **Still Surface** (`#1c1b1b`): The primary feature card background. Most feature content lives here.
- **Settled** (`#20201f`): Mid-elevation surfaces — diary card backgrounds in stacked views, nav pill fill.
- **Lifted** (`#2a2a2a`): High-elevation surfaces. Reserved for the top layer of content cards.
- **Raised** (`#353535`): The highest resting surface. Used for ghost-button hover fills and surface-variant contexts.
- **Page** (`#e5e2e1`): Primary text. Warm off-white — never pure white.
- **Margin Note** (`#dbc2b0`): Secondary text. A warm taupe: the color of pencil on aged paper. Used for body copy, captions, and descriptive text.
- **Warm Border** (`#a38c7c`): Full-opacity stroke for rare visible borders. Typically applied at `/20`–`/30` opacity.
- **Faint Border** (`#554336`): The default border token. Used at full opacity for hairline dividers; at `/20` and `/10` for card edges.

### Named Rules
**The Hearthlight Rule.** The accent appears on ≤10% of any screen. One icon, one CTA, one headline emphasis, one status dot — then stop. If you reach for Hearthlight a fourth time, the third use is wrong.

**The Warm Tint Rule.** No pure blacks or pure whites. Every neutral carries a warm hue shift — `#131313` not `#000000`; `#e5e2e1` not `#ffffff`. The palette reads warm even in deep dark.

## 3. Typography

**Display Font:** Newsreader (Georgia, serif — italic variant available and in active use)
**Body Font:** Manrope (system sans-serif fallback)

**Character:** Newsreader carries the editorial gravity of a measured publication — its italic is expressive without being precious; its roman is authoritative without being stiff. Manrope reads efficiently at small sizes with slightly rounded geometry that softens the pairing without sentimentalizing it. Together they produce a voice that is warm but not decorative, serious but not austere.

### Hierarchy
- **Display** (Newsreader 400, 48px, lh 1.1, ls -0.02em): Hero headlines only. One per screen. Used for "Where Digital Noise Becomes a Diary."
- **Headline** (Newsreader 400, 32px, lh 1.2): Section headings. Structural weight without demanding attention.
- **Title** (Newsreader 500, 24px, lh 1.3): Feature card headings, diary entry dates, sub-section introductions.
- **Body Large** (Manrope 400, 18px, lh 1.6): Lead paragraphs and hero subheadlines. Max 65ch.
- **Body** (Manrope 400, 16px, lh 1.6): Primary body copy. Max 75ch.
- **Body Small** (Manrope 400, 14px, lh 1.5): Captions, card meta, secondary descriptions.
- **Label** (Manrope 600, 12px, lh 1.2, ls 0.05em, uppercase): Navigation links, button text, category tags, system status. Always uppercase. This is the UI voice — tight, directional, unambiguous.

### Named Rules
**The Italic Signal Rule.** Newsreader italic is reserved for diary entry prose, pull quotes, and the brand name. It is not a UI emphasis tool. To emphasize a heading, use weight or scale — not italic.

**The Label Lock Rule.** Label text is always uppercase at 0.05em tracking. Never sentence-case a label. Never reduce the tracking. Never use Newsreader at label size.

## 4. Elevation

The WeaveDiary elevation model is **tonal-primary**: depth is read through surface tone stepping, not shadow size. The six surface levels (Void → Deep Canvas → Still Surface → Settled → Lifted → Raised) create a legible z-axis without drop shadows on resting elements.

A soft ambient shadow is permitted on elements that physically separate from the canvas — the navigation pill and the CTA container — to reinforce their elevation above the page without dramatizing it.

### Shadow Vocabulary
- **Nav ambient** (`box-shadow: 0 8px 32px rgba(0,0,0,0.37)`): The floating navigation pill only. Large radius, moderate opacity — the pill reads as above the canvas.
- **Accent glow** (`box-shadow: 0 10px 30px rgba(217,119,6,0.3)`): The primary CTA button only. Not depth-shadow; warmth-signal. Never replicated on more than one element per screen.
- **Hero stack** (`box-shadow: 0 8px 40px rgba(0,0,0,0.4)` approximated): The stacked diary card preview uses shadow to reinforce the physical paper-stack metaphor. This is figurative — actual UI cards at rest are flat.

### Named Rules
**The Flat-By-Default Rule.** Feature cards, bento tiles, and content containers are flat at rest. Tonal surface difference carries the depth signal. A shadow on a resting card means the card is asking for attention it has not earned.

**The Accent Shadow Exception.** The only permitted colored shadow is the Hearthlight glow on the CTA button — `rgba(217,119,6,0.2–0.3)`. No other element gets a colored ambient shadow.

## 5. Components

Components feel **unhurried and considered**. Generous internal padding prevents crowding. Border-radius choices are deliberate — pill for primary actions, 16px curves for feature surfaces, 12px for inner elements. No element is squeezed into a tight box.

### Buttons
- **Shape:** Primary and CTA use pill rounding (`9999px`). Ghost uses feature rounding (`16px`).
- **Primary** (Hearthlight `#ffb77d` bg, on-hearthlight `#4d2600` text, `10px 24px` padding, Label uppercase): Nav-scale. Compact — the brand color signal in the smallest footprint.
- **CTA** (Hearthlight Deep `#d97707` bg, on-hearthlight-deep `#432100` text, `20px 40px` padding, bold Body Large): Hero and terminal CTA. The one moment of full color conviction per page.
- **Ghost** (transparent bg, Faint Border `#554336` stroke, Page `#e5e2e1` text, `16px 32px` padding, 16px radius): Secondary action alongside CTA. Never colored border.
- **Hover:** Primary — `brightness(1.1)`. CTA — `scale(1.05)`. Ghost — Raised `#353535` fill. Transitions at 200–300ms `cubic-bezier(0.16,1,0.3,1)`.
- **Active:** `scale(0.95)` on primary and CTA. No color inversion.

### Chips / Tags
- **Mood tag** (rounded-full, accent-color/10 bg, accent-color/20 border, Label 10px uppercase): Diary card header labels (Reflective, Productive). Hearthlight family for emotional tone; Growth for positive momentum.
- **Live badge** (rounded-full, surface-variant/50 bg, faint-border/30 border, Hearthlight pulse dot, Label 12px uppercase): The "A New Ritual" hero callout. Announces intent without decoration.
- **Status indicator** (rounded-full, surface-variant/30 bg, faint-border/10 border, Growth or Burnished Gold pulse dot, Label 10px uppercase): Footer system state. Always understated — the dot is the signal.

### Cards / Containers
- **Feature card** (Still Surface `#1c1b1b` bg, Faint Border/20 stroke, 16px radius, 40px padding, `.grain` texture): Primary feature surface. Grain pseudo-element at 3% opacity. Flat at rest — no shadow.
- **Diary card** (Settled `#20201f` bg, Faint Border/30 stroke, 16px radius, 32px padding, `shadow-2xl`): The stacked hero preview. Shadow reinforces the physical paper-stack metaphor. The one card type that floats.
- **CTA container** (Settled `#20201f` bg, Faint Border/10 stroke, 24px radius, 80px vertical padding): Full-width terminal stage. The oversized italic background word ("Pause") sits at `opacity: 0.05` — readable only on close inspection by design.
- **Internal spacing:** 40px padding default. Never below 24px for any content-bearing surface.

### Inputs / Fields
Not yet present in the landing. When introduced: stroke style (not filled), 1px Faint Border at rest, Hearthlight border on focus, 12px radius, Manrope Body. Error: Error red (`#ffb4ab`) border only — no background tint.

### Navigation
- **Style:** Pill-shaped glassmorphism (surface/40 bg, backdrop-blur-xl, faint-border/10 border, rounded-full, nav-ambient shadow). Sticky, floating above the page with padding from the top edge.
- **Links:** Label uppercase, tracking-widest. Active link in Hearthlight; all others in Margin Note. Hover to Hearthlight at 300ms.
- **CTA in nav:** Compact primary button right-aligned. Ghost "Login" text link beside it.
- **Mobile:** Links collapse; logo and CTA persist.

### Integration Tiles (Signature Component)
Platform tiles in the ecosystem orbit: square chips (48×48px, 12px radius, Settled bg, Faint Border/30 stroke) with a single Material Symbol icon in Margin Note color. On hover: icon shifts to amber-500, border to Hearthlight/50, 200ms transition. The central hub breaks the pattern — a circle at full pill rounding, filled with Hearthlight Deep at full opacity, oversized icon in on-hearthlight. It is the one fully-saturated element on the screen.

### Scroll-Driven Entrance (Signature Motion Pattern)
The `.gi-v1` cascade: elements enter with `translateY(18px) → none` + `opacity 0 → 1` staggered in sequence (icon → heading → body → strip), each offset 8% within `animation-range: entry 0%–52%`, driven by `animation-timeline: view()`. Easing: `cubic-bezier(0.16,1,0.3,1)`. No JavaScript. This is the pattern for all scroll-driven entrances in the product — carry it forward consistently.

## 6. Do's and Don'ts

### Do:
- **Do** use Hearthlight on ≤10% of any screen. One icon, one CTA, one text emphasis, one status dot — then stop.
- **Do** use tonal surface stepping (Still Surface → Settled → Lifted → Raised) to convey depth before reaching for shadows.
- **Do** use Newsreader italic exclusively for diary prose, pull quotes, and the brand name. Never for UI heading emphasis.
- **Do** keep body copy at 65–75ch maximum line length. Wider than that needs two columns, not wider paragraphs.
- **Do** apply `.grain` texture to feature card surfaces representing diary content. It references the physical substrate honestly.
- **Do** give components breathing room. Default card padding is 40px. Never below 24px for content-bearing surfaces.
- **Do** use Label uppercase at 0.05em tracking for all UI chrome: nav links, button text, tags, status indicators.
- **Do** ease with `cubic-bezier(0.16,1,0.3,1)` for all entrances. Never ease-in, never bounce, never elastic.
- **Do** tint every neutral toward the warm amber hue. No pure `#000000` or `#ffffff` anywhere.

### Don't:
- **Don't** use bullet-point list UI: no task checkboxes, no icon + label + description rows in a repeated grid. WeaveDiary is not Things, Obsidian, Bear, or Day One.
- **Don't** use note-taking tool aesthetics: no block-by-block structure, no Notion/Craft/Roam editor chrome, no database table views.
- **Don't** use AI dashboard theatrics: no gradient hero blobs, no "Powered by AI" badge, no feature-count grids, no glowing model logos.
- **Don't** use cold productivity SaaS minimalism: white backgrounds, icon-heavy nav bars, grey neutrals without warmth, corporate sans-serif at every scale.
- **Don't** use `border-left` greater than 1px as a colored accent stripe on cards or list items. Use background tints or full borders instead.
- **Don't** use gradient text (`background-clip: text`). Emphasis belongs to weight, scale, or a Hearthlight solid color.
- **Don't** use glassmorphism outside the navigation pill. Backdrop-blur elsewhere is decoration without purpose.
- **Don't** add colored ambient shadows to any element except the CTA button. No teal glows, no purple auras, no general glow-blur decoration.
- **Don't** animate for idle decoration: no looping gradient shifts, no text shimmer, no pulsing background elements. Motion confirms a state change or marks a scroll arrival — nothing else.
