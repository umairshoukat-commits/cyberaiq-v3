# CyberAIQ AG — Design System (v3)

> Source of truth for all UI decisions. Regenerated via UI/UX Pro Max skill
> against the actual v3 component state, grounded in Palantir/Anthropic-tier
> enterprise cybersecurity positioning.
> Last updated: 2026-04-11
> Previous version preserved as `MASTER.old.md`.

---

## 0. What Changed vs v2 MASTER.md

This regeneration preserves all v2 brand fundamentals (colors, typography,
motion primitives, spacing, accessibility) and makes three explicit decisions
the v2 document left ambiguous:

1. **Inner page header pattern** — now defined (§6b)
2. **Card hover system** — now unified under one principle (§5a)
3. **Services section remediation** — exact fixes listed (§13)

Plus these additions/tightenings:

- **Icon system** (§5b) — explicit lucide-react mapping, per-card color variety
  *documented as intentional brand feature*, not inconsistency
- **Section background alternation** (§6a) — strict two-tone rule, kills all
  ad-hoc `#111520`, `#0D1017`, `#131720`, etc.
- **Hero video integration** (§6c) — exact spec matching the working v3 pattern
- **Animation consistency principle** (§7a) — each motion primitive mapped to
  its exclusive use case

Nothing about card **colors** changes. Per-card icon color variety
(orange/teal/purple/green) is a deliberate brand feature and stays.

---

## 1. Product Identity

| Attribute       | Value |
|-----------------|-------|
| Company         | CyberAIQ AG |
| Category        | Enterprise Cybersecurity Platform (AI + Cloud + Cyber + Quantum convergence) |
| Positioning     | Premium enterprise — Palantir / Anthropic / Scale.ai tier |
| Audience        | Enterprise CISOs, CTOs, government, finance, critical infrastructure |
| Tone            | Authoritative, technical, minimal, calm, restrained |
| Theme           | Dark mode only |

---

## 2. UI Style Classification

**Primary style: Dark Swiss Minimal** (hybrid, authored — not a stock template)

The ui-ux-pro-max skill's top raw match for "enterprise cybersecurity" was the
*Enterprise Gateway* pattern paired with *Trust & Authority* styling. Both
defaults target **light-mode corporate** (navy on #F8FAFC) — wrong for us.
We adopt the Enterprise Gateway *information architecture* (video hero →
solutions → proof → contact) but render it in dark mode with Swiss
minimalist discipline.

| Source Style | What We Take | What We Reject |
|---|---|---|
| Minimalism & Swiss Style | Grid discipline, whitespace, functional clarity, WCAG AAA | Stark white backgrounds, zero decoration |
| Dark Mode (OLED) | Deep blacks, high-contrast text, minimal glow | Neon accents, colorful glows |
| Trust & Authority | Real credentials, metric discipline, restrained motion | Certificate carousels, gold accents, light mode |
| Enterprise Gateway | Video hero, industry/role solutions, trust logo row | Mega menus, "I am a..." path selectors |

**Explicitly NOT:** Cyberpunk UI, Glassmorphism, Neumorphism, Liquid Glass,
Skeuomorphism, Matrix/terminal aesthetic.

The site should feel like reading a classified briefing document at 2 AM —
calm, dark, authoritative, with information presented clearly and without
distraction.

---

## 3. Color Palette

### Backgrounds (strict two-tone + hero + card surfaces)
| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-0` / `--bg-base` | `#0A0A0A` | Page base, odd-indexed sections |
| Section alt | `#0F0F0F` | Even-indexed sections (alternation rhythm) |
| `--surface-1` | `#141414` | Card backgrounds |
| `--surface-2` | `#1A1A1A` | Card hover background |
| `--surface-3` | `#262626` | Modals, dropdowns |
| Hero only | `#050510` | Deep blue-black — ONLY behind the homepage video hero |

**Forbidden ad-hoc backgrounds (remove wherever found):**
`#111520`, `#0D1017`, `#131720`, `#0F1219`, `#0a0a1a`, `rgb(15,18,25)`,
`rgb(17,21,32)`, `rgba(0,0,0,0)` on sections.

### Text (3-level hierarchy)
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FAFAFA` | Headings, emphasis, primary content |
| `--text-secondary` | `#A3A3A3` | Body text, descriptions, card list items |
| `--text-muted` | `#737373` | Labels, captions, timestamps ONLY |

Note: v2 used `#737373` on Services focus-area list items. Those are primary
information, not labels — they belong at `#A3A3A3`.

### Accent Colors
| Token | Hex | Usage | Notes |
|-------|-----|-------|-------|
| `--accent-primary` | `#F97316` | CTAs, interactive highlights, H2 accent word | **CTAs only — never body text** |
| `--accent-secondary` | `#2B7EC1` | Structural blue, links, teal-side decoration | Trust/structure |
| CTA gradient | `linear-gradient(135deg, #F97316, #E84393, #8B5CF6)` | Primary CTA buttons only | Orange→pink→purple |

### Per-card icon palette (intentional variety — preserved)

The homepage uses a four-color icon rotation across card grids. This is a
**deliberate brand feature**, not inconsistency. It signals that CyberAIQ
operates across four distinct domains (Cyber, AI, Cloud, Quantum) without
flattening them into one uniform look.

| Color | Hex | Typically used for |
|-------|-----|---------------------|
| Orange | `#F97316` | Cyber / primary |
| Teal | `#06B6D4` (or `#00A89D`) | Quantum / Identity |
| Purple | `#8B5CF6` | Cloud / AI reasoning |
| Green | `#10B981` | Data / Resilience |

**Rules:**
- Icon color variety is ALLOWED across cards within a grid.
- Each icon appears in a soft-tinted rounded square using its own color at
  `0.12` alpha for the background.
- Never more than four distinct accent hues per grid.
- Body/tagline text in these cards is always `#A3A3A3` or `#FAFAFA` — the
  color lives in the icon, not in the prose.

### Borders
| State | Value |
|-------|-------|
| Default | `rgba(255, 255, 255, 0.08)` |
| Hover | `rgba(255, 255, 255, 0.15)` |
| Active/accent | `rgba(249, 115, 22, 0.25)` |

### Color Rules
- **NEVER** neon green, matrix green, or cyberpunk neon anywhere.
- **NEVER** red as decoration — reserved for form errors only.
- **NEVER** orange on long-form body text, paragraphs, taglines, or section
  background tints. Orange is for CTAs, the single accent word in an H2, and
  interactive highlights only.
- **NEVER** colored section backgrounds. Sections alternate `#0A0A0A`/`#0F0F0F`
  with a hero-only exception at `#050510`.
- Blue `#2B7EC1` is structural — never decorative glow.

---

## 4. Typography

### Font Stack
| Role | Font | Fallback |
|------|------|----------|
| Display / Headings | Geist Sans (variable, self-hosted) | system-ui, -apple-system, sans-serif |
| Body / UI | Geist Sans (variable, self-hosted) | system-ui, -apple-system, sans-serif |
| Code / Technical | Geist Mono (variable, self-hosted) | JetBrains Mono, monospace |

Fonts are served locally from `/public/fonts/Geist-Variable.woff2` and
`/public/fonts/GeistMono-Variable.woff2`. Do not add Google Fonts network
imports — the skill's Inter suggestion is a fallback only.

### Type Scale
| Element | Size | Weight | Letter-spacing | Line-height |
|---------|------|--------|----------------|-------------|
| Hero h1 | `clamp(36px, 5.5vw, 68px)` | 700 | `-0.04em` | `1.05` |
| Section h2 | `clamp(28px, 4vw, 52px)` | 600 | `-0.03em` | `1.15` |
| Section h3 | `20px–24px` | 600 | `-0.02em` | `1.3` |
| Body | `18px` | 400 | `-0.01em` | `1.65` |
| Small / Labels | `12px–14px` | 500 | `0.05em–0.15em` | `1.4` |
| Eyebrow (uppercase) | `12px` | 500 | `0.15em` | `1.4` |

### Typography Rules
- All headings: `text-wrap: balance`
- Body text color: `#A3A3A3` (not white — reduces eye strain on dark)
- `-webkit-font-smoothing: antialiased` globally
- `color-scheme: dark` on html element
- Eyebrow/label text: uppercase, wide tracking, `#737373`

---

## 5. Component System

### Cards (base spec)
| Property | Default | Hover |
|----------|---------|-------|
| Background | `#141414` (or `rgba(255,255,255,0.03)` on tinted surfaces) | `#1A1A1A` (or `rgba(255,255,255,0.05)`) |
| Border | `1px solid rgba(255,255,255,0.08)` | `1px solid rgba(255,255,255,0.15)` |
| Border-radius | `12px` | — |
| Padding | `p-6 md:p-8` | — |
| Transform | — | `translateY(-4px)` |
| Box-shadow | none | `0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(249,115,22,0.04)` |
| Transition | `all 300ms cubic-bezier(0.16, 1, 0.3, 1)` | — |

**Card variants (color — preserved unchanged):**
- **Pillar cards:** 2px top border in the pillar's accent hue.
- **Leadership cards:** 2px top border in the card's accent hue.
- **Service cards:** clean, no top accent.
- **Marketplace cards:** 3px top border in `--accent-primary`.

### 5a. Card Hover System — **UNIFIED (Path B)**

**Principle:** *Enterprise trust is communicated through restraint and
consistency. Every card on the site reacts to hover the same way.*

#### Decision rationale

The v2 code shipped **three** different hover systems:
- Reality pills: `shine-card` only
- Pillars + Leadership: `gradient-border-card` (6s rotating conic gradient) +
  `shine-card`
- Services: cursor-following radial spotlight (`Card spotlight` prop)

This variation was accidental, not intentional — each section was built in
isolation. The ui-ux-pro-max Style Selection rule is explicit: *"Use the same
style across all pages."* The skill's Animation rules add: avoid decorative
infinite loops, use 150–300ms micro-interactions, prefer transform/opacity.
A rotating conic gradient running forever on every Pillar card violates both.

More importantly: **Palantir and Anthropic do not vary card hover by size.**
Their enterprise confidence comes from one restrained treatment applied
everywhere. Rotating gradient borders read as "creative portfolio" not
"classified briefing."

#### The single hover treatment

All cards — Reality, Pillars, Leadership, Services, Marketplace, FAQ,
AI-Resilience framework cards — use this exact hover:

```css
.card-hover {
  transition: background 300ms cubic-bezier(0.16, 1, 0.3, 1),
              border-color 300ms cubic-bezier(0.16, 1, 0.3, 1),
              transform 300ms cubic-bezier(0.16, 1, 0.3, 1),
              box-shadow 300ms cubic-bezier(0.16, 1, 0.3, 1);
}
.card-hover:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.15);
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
}
```

Plus the existing `shine-card` sweep (600ms diagonal) is **kept** as the
single decorative flourish — it fires once per hover, no infinite loop, no
layout cost.

#### What gets removed

- `gradient-border-card` class and its 6s `border-rotate` conic-gradient
  animation — deleted entirely from `global.css`.
- `Card` component's `spotlight` prop (cursor-following radial glow on
  Services cards) — removed.
- Inline `onMouseEnter`/`onMouseLeave` handlers in `Leadership.tsx` that
  re-implement hover imperatively — replaced with the CSS class.
- Pillar cards' existing top accent color stays (it's a static identity
  marker, not a hover effect).

#### Sections needing updates (code changes, not in this document)

| Section | Current | Target |
|---|---|---|
| Reality | `shine-card` only — no elevation on hover | add unified hover + keep shine |
| Pillars | `gradient-border-card shine-card` + `.pillar-card:hover` override | unified hover + shine, drop rotating border |
| Leadership | `gradient-border-card shine-card` + JS hover handlers | unified hover + shine, drop JS, drop rotating border |
| Services | `service-card` with `spotlight` prop | unified hover + shine, drop spotlight |
| Marketplace | no hover | add unified hover |
| FAQ accordion items | no hover | add unified hover (background only, no translateY on list items) |
| AI-Resilience `.fw-card` | custom teal hover | already close — normalize to the unified tokens |

#### What a designer could defend in a client meeting

> "We hold one hover state across the entire site. Enterprise buyers read
> consistency as discipline — the same reason Palantir doesn't layer five
> effects per card. The subtle elevation and border brighten signals
> interactivity, the one-shot shine sweep adds craft, and nothing runs
> forever in the background draining attention or battery. Variation across
> card sizes would force the visitor to re-learn the interface every 400
> pixels."

### 5b. Icon System (lucide-react)

**Library:** `lucide-react` (already in dependencies). No custom inline SVG
paths for anything lucide already ships.

| Domain | Component | Notes |
|---|---|---|
| Cyber | `ShieldCheck` | — |
| AI | `BrainCircuit` | **replaces current generic-anchor-looking path** |
| Cloud | `Cloud` | — |
| Quantum | `Atom` | — |
| Identity | `Fingerprint` | — |
| Data | `Database` | — |
| Network | `Network` | — |
| Generic shield | `Shield` | reserved for meta/trust usage |

**Consistent weight:** `className="h-7 w-7"` `strokeWidth={1.5}`
(h-5 w-5 for small pill cards like Reality — keep stroke-width 1.5 for
parity).

**Color variety is explicitly allowed** across cards in a grid. A Pillars
row with one orange, one teal, one purple, one green icon is correct — that
variety is the brand.

**No emojis as icons, anywhere. Ever.**

### Buttons (unchanged)
| Variant | Background | Border | Hover |
|---------|-----------|--------|-------|
| Primary | CTA gradient | none | `scale(1.02) translateY(-2px)`, glow shadow |
| Secondary | transparent | `1.5px solid rgba(255,255,255,0.15)` | `bg-white/5`, `border-white/20`, `translateY(-1px)` |
| Ghost | transparent | `1px solid transparent` | subtle color shift |

All buttons: `rounded-lg`, `font-medium`, `200ms cubic-bezier(0.16, 1, 0.3, 1)`
transition, `scale(0.98)` on active/press.

### Images (in content sections)
| Property | Value |
|----------|-------|
| Container | `rounded-xl overflow-hidden` |
| Border | `1px solid rgba(255,255,255,0.08)` |
| Shadow | `0 10px 30px rgba(0,0,0,0.3)` |
| Hover | `scale(1.03)` on image, border brightens to `0.15` |
| Transition | `600ms cubic-bezier(0.16, 1, 0.3, 1)` |

---

## 6. Landing Page Pattern

**Pattern:** *Enterprise Gateway (dark)* — IA from ui-ux-pro-max, rendered in
dark Swiss minimal.

### 6a. Section Background Alternation (strict)

Sections alternate between exactly two tones. No exceptions, no ambient
ad-hoc backgrounds, no `#111520` anywhere.

| # | Section | Background |
|---|---|---|
| 1 | Hero (video) | `#050510` (hero exception) |
| 2 | Reality | `#0A0A0A` |
| 3 | Differentiators | `#0F0F0F` |
| 4 | Pillars | `#0A0A0A` |
| 5 | Hyperscaler Ticker | `#0F0F0F` |
| 6 | Stats | `#0A0A0A` |
| 7 | Who We Are | `#0F0F0F` |
| 8 | Philosophy | `#0A0A0A` |
| 9 | Services | `#0F0F0F` |
| 10 | Leadership | `#0A0A0A` |
| 11 | Pre-Footer CTA | `#0F0F0F` |
| 12 | Footer | `#0A0A0A` |

Inner pages follow the same alternation starting from `#0A0A0A` under the
page header.

**Removal list (code audit targets — not executed in this document):**
- `global.css` `section[style*="#111520"]` selectors — delete.
- `global.css` `section[style*="#0F1219"]` selectors — delete.
- Leadership section inline `background: "#111520"` — change to `#0A0A0A`.
- PageHero inline `backgroundColor: "#0a0a1a"` — change (see §6b).
- Services section `background: "var(--surface-1)"` (`#141414`) — change to
  `#0F0F0F`.
- Reality section `background: "var(--surface-1)"` — change to `#0A0A0A`.
- Pillars section `background: "var(--surface-1)"` — change to `#0A0A0A`.
- All section-level decorative `background-image` radial-gradients — remove.
  Depth comes from the two-tone alternation only.

### 6b. Inner Page Header Pattern — **TRUE MINIMALISM (Option A)**

**Used on:** `/services`, `/about`, `/partners`, `/careers`, `/contact`,
`/ai-resilience`.

#### Decision rationale

The v2 `PageHero.tsx` renders a 220–280px section with two radial-gradient
glows in a different hue per page, over a `#0a0a1a` background. The skill's
UX `color-contrast` and `reduced-motion` rules both flag low-signal gradient
washes as problematic, and the `style-match`/`consistency` rules reject
per-page color variation without a functional reason. The landing pattern
*Minimal Single Column* explicitly recommends "large typography, lots of
whitespace, no nav clutter" — which is exactly the Palantir/Anthropic move.

A decorative gradient mesh (option c) or static hero-bg at 0.08 (option b)
would paper over the problem without solving it: inner pages don't need
atmosphere, they need information density and a confident anchor. A
per-page illustration (option e) is noise without editorial strength and
would triple the asset budget.

**We pick true minimalism.**

#### Exact spec

```
Section background:        #0A0A0A  (same as first body section — no gradient)
Min-height:                auto     (content-driven, not 220/280px)
Padding:                   pt-40 pb-12 md:pt-44 md:pb-16  (nav clearance only)
Max-width:                 max-w-[1280px] mx-auto px-6 md:px-10 lg:px-20
Alignment:                 left-aligned (NOT centered)

Eyebrow label:             uppercase 12px, tracking 0.15em, #737373
                           e.g. "SERVICES", "ABOUT", "CAREERS"
                           Appears ABOVE the heading.

H1:                        clamp(36px, 5vw, 56px), weight 600, tracking -0.03em
                           Color: #FAFAFA. Plain white — no orange accent word.
                           The eyebrow carries the section identity.

Subtitle:                  18px md:20px, color #A3A3A3, max-w-2xl
                           Sits 16px below the H1.

Accent line:               1px × 48px horizontal rule, 24px below subtitle.
                           Background: #F97316 (solid orange, not gradient).
                           This is the ONLY decoration on the page header.

Motion:                    H1 words slide up 40ms stagger, power3.out, 600ms.
                           Subtitle fades in at -0.3 offset.
                           Accent line scales from 0 → 48px width, 400ms,
                           power3.out, starting with the subtitle.
                           prefers-reduced-motion: all static.

Border-bottom:             1px solid rgba(255,255,255,0.06)
                           (visual separator into the first content section)
```

#### What gets removed from `PageHero.tsx`

- The `gradients` record (six per-page radial-gradient pairs) — delete.
- The `variant` prop — delete (header is the same on every page).
- The `#0a0a1a` background color — replace with `#0A0A0A`.
- The `::after` noise texture on `.page-hero` — delete (body already has a
  global 0.06 noise overlay).
- The teal bottom-separator gradient — replace with the 1px hairline.
- The 220/280px `min-h` — drop, let content size the section.
- Center alignment — switch to left-aligned.

#### Why this reads as Palantir-tier

Palantir's `/platforms/foundry`, Anthropic's `/research`, Scale.ai's
`/dod` — all three use exactly this shape: eyebrow, massive restrained
headline, single line of prose, thin rule, whitespace, content begins. No
gradient mesh, no hero image, no glow. Confidence is demonstrated by
*refusing* to decorate the header. That's the move.

### 6c. Hero Video Integration (homepage only)

The v3 homepage ships a working Pexels loop at `/public/videos/hero-loop.mp4`.
This pattern is correct and stays — with two corrections.

| Property | Value |
|---|---|
| Source | `/videos/hero-loop.mp4` (self-hosted in `public/`) |
| Poster | `/images/selections/hero-bg.webp` |
| `preload` | **`metadata`** (not `auto` — saves mobile bandwidth, avoids `document_idle` lock) |
| `autoPlay` `muted` `loop` `playsInline` | required for iOS |
| Opacity | `0.55` (current working value) |
| Vignette | radial + linear gradient stack to `rgba(5,5,16,0.x)` (current working values — keep) |
| Blend mode | `normal` |
| `aria-hidden` | `"true"` |
| Section bg under video | `#050510` |
| Bottom fade | `linear-gradient(to bottom, transparent, var(--surface-0))`, 200px tall |

**Reduced motion:**
```css
@media (prefers-reduced-motion: reduce) {
  .hero-video { display: none; }
  .hero-poster { display: block; } /* static fallback */
}
```
The poster already covers the `<video>` element in the DOM; reduced-motion
simply hides the video layer and lets the poster show.

**Mobile (<768px):**
Video is disabled entirely. Show the poster at the same 0.55 opacity with
the same vignette. Rationale: autoplay loops burn battery and cellular data
on the exact devices least likely to appreciate the motion, and iOS Safari
frequently stalls on `loop` anyway. Implement via:

```jsx
{isDesktop ? <video ... /> : <img src="/images/selections/hero-bg.webp" ... />}
```

or a CSS `@media (max-width: 767px) { video { display: none; } img { display: block; } }`
pairing. Either is fine.

**The animated gradient blobs (`.hero-blob-1..4`) stay** — they're the
atmospheric signature of the homepage hero and work in reduced-motion mode
as static gradients.

### Conversion Strategy (unchanged from v2)
- **Primary CTA:** "Start a Strategic Conversation" — hero + pre-footer.
- **Secondary CTA:** ghost button, paired with primary.
- **Trust signals:** Hyperscaler logos at 40% opacity in the ticker section.
- **Social proof:** Stats section with animated count-up.
- **No pricing page** — enterprise sales model.

### CTA Placement Rules
- Hero: one primary button (second CTA optional as ghost).
- Pre-footer: contained card with magnetic-hover primary button.
- Never more than 2 CTAs visible at once.
- Never stack more than 2 buttons horizontally.

---

## 7. Motion & Animation

### Easing Functions
| Name | Value | Use For |
|------|-------|---------|
| Spring out | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary — reveals, hovers, buttons |
| Power3 out | `power3.out` (GSAP) | Scroll reveals, PageHero h1 split |
| Expo out | `expo.out` (GSAP) | TextReveal word-by-word on H2 |
| Elastic | `elastic.out(1, 0.4)` (GSAP) | Magnetic buttons only |

### 7a. Animation Consistency Principle

> *Inconsistency is not style — each motion treatment must have a deliberate
> reason, and nothing runs forever in the background.*

Each motion primitive has one exclusive job. Do not mix, nest, or swap.

| Primitive | Exclusive use case | Do NOT use for |
|---|---|---|
| `TextReveal` | Section `<h2>` headings (word-by-word reveal) | Body paragraphs, H1, H3, card text |
| `ScrollReveal` | Short text blocks, single paragraphs, images | Grids (use StaggerReveal) |
| `StaggerReveal` | Card grids (Reality, Pillars, Leadership, Services, etc.) | Single elements |
| `CountUp` | Numeric metrics in Stats section | Anywhere else |
| `ParallaxCard` | Medium/large cards, desktop-only (`pointer: fine`, ≥1024px) | Mobile, small pills, buttons |
| `MagneticButton` | Pre-footer CTA buttons only | Any other button or link |

### Scroll Reveal Defaults
| Property | Value |
|----------|-------|
| translateY | `40px` (24px on mobile) |
| Duration | `0.6–0.8s` |
| Stagger (cards) | `0.08s–0.12s` |
| Trigger | `top 85%` viewport (90% for card grids, deeper trigger) |
| Once | `true` (never replay) |

### Text Reveal (H2 only)
- Words split into `overflow: hidden` masks
- Each word slides up from `translateY(100%)` to `0`
- Duration: `0.8–0.9s`, stagger: `0.04s`, ease: `expo.out`

### Performance Rules
- All animations use `transform` / `opacity` only (GPU composited).
- `will-change` only on fixed/persistent elements.
- `prefers-reduced-motion: reduce` kills ALL animation/transition durations
  globally.
- `?static=1` query param freezes everything for screenshot tools.
- Lenis smooth scroll: disabled on touch devices.
- No `requestAnimationFrame` loops on mobile.
- No infinite conic-gradient rotations, period.

---

## 8. Spacing System

### Section Padding
| Breakpoint | Value |
|------------|-------|
| Mobile | `py-24` (96px) |
| Tablet | `py-32` (128px) |
| Desktop (lg+) | `py-40` (160px) |

(v2 said 128/160. v3 components use 48/64/96 — `py-12 md:py-16 lg:py-24`.
Adopt the tighter scale as baseline; MASTER.md now matches reality.)

### Content Max-Width
| Element | Value |
|---------|-------|
| Container | `max-w-[1280px]` |
| Hero heading | `max-w-6xl` |
| Text blocks | `max-w-3xl` |
| Subtitle/description | `max-w-2xl` |

### Card Grid Gaps
| Breakpoint | Value |
|------------|-------|
| Mobile | `gap-4` |
| Desktop | `gap-6` |

### Card Internal Padding
`p-6 md:p-8` (24 / 32px)

---

## 9. Anti-Patterns to Avoid

### Cybersecurity Industry
| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| Neon green / Matrix aesthetic | Looks like a hacker tool | Neutral dark + warm orange accent |
| Glitch effects / scanlines | Suggests instability | Clean, stable transitions |
| Skull/lock icons as decoration | Cliché, triggers "threat" | Abstract geometric forms |
| Red as decorative accent | Red = error | Reserve red for error states |
| Animated backgrounds on every section | Performance + distraction | One hero effect, clean sections |
| Dense data dashboards on marketing | Visitors can't interpret | 3–4 headline metrics max |
| "Military-grade encryption" language | Meaningless buzzword | Specific claims (SOC 2, ISO 27001) |

### General Premium UI
| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| Emojis as icons | Unprofessional | lucide-react SVG |
| >2 accent colors on a surface | Visual chaos | Orange + blue structural |
| Glassmorphism on dark | Muddy, no contrast benefit | Solid `#141414` cards |
| Infinite loop decorative animation | Distracting, perceived-perf hit | Loading indicators only |
| Rotating gradient borders | Reads portfolio, not enterprise | Static hairline + shine sweep |
| Cursor-following card spotlights | One-off per section breaks system | Unified hover everywhere |
| Text on low-contrast bg | WCAG failure | 4.5:1 minimum |
| Scale on card hover | Layout shift | `translateY` only |
| 100% white body copy on dark | Eye strain | `#A3A3A3` body, `#FAFAFA` headings |
| Orange paragraph text | Violates CTA-only rule | `#A3A3A3` body, orange on CTA only |

---

## 10. Accessibility Requirements

### Mandatory (WCAG AA minimum, AAA where possible)
- [ ] Color contrast: 4.5:1 normal, 3:1 large text
- [ ] Focus states: 2px solid `var(--accent-primary)` outline
- [ ] Alt text: descriptive for meaningful, empty for decorative
- [ ] Keyboard navigation: tab order matches visual order
- [ ] Form labels: every input has an associated `<label>`
- [ ] Touch targets: minimum 44×44px
- [ ] `prefers-reduced-motion` respected globally
- [ ] Skip-to-content link present
- [ ] Video: `aria-hidden="true"`, muted, poster fallback
- [ ] Video: hidden under `prefers-reduced-motion: reduce`

### Current Implementation
- `::selection` styled with brand orange
- `color-scheme: dark` on `<html>`
- `<meta name="theme-color" content="#0A0A0A">`
- Skip link: `.sr-only` → visible on focus
- Global reduced-motion rule kills animation/transition durations
- `?static=1` freezes all for screenshot tools

---

## 11. Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (lucide-react only)
- [ ] All icons from lucide-react at stroke-width 1.5
- [ ] Icon color variety used only on icons, never on prose
- [ ] Hover states don't cause layout shift (translateY only)
- [ ] Card backgrounds use `#141414` or `rgba(255,255,255,0.03)` — never
      `rgba(255,255,255,0.02)` or lower (effectively invisible)
- [ ] Section backgrounds alternate strictly `#0A0A0A` / `#0F0F0F` (hero: `#050510`)
- [ ] No neon, no matrix green, no cyberpunk aesthetic anywhere
- [ ] No rotating conic-gradient borders
- [ ] No cursor-following radial spotlights
- [ ] No orange body text, orange paragraphs, or orange taglines

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Unified hover on every card (background + border + translateY + shine)
- [ ] Transitions are 150–300ms with spring easing
- [ ] Focus states visible for keyboard navigation
- [ ] Magnetic/parallax effects desktop-only (`pointer: fine`, ≥1024px)

### Performance
- [ ] Hero video: `preload="metadata"` (not `auto`)
- [ ] Hero video: hidden on <768px, poster shown instead
- [ ] Hero video: hidden under `prefers-reduced-motion`, poster shown
- [ ] All animations use transform/opacity
- [ ] Lazy loading on below-fold images
- [ ] `will-change` only on persistent elements
- [ ] No infinite-loop decorative animations

### Responsiveness
- [ ] 375px, 768px, 1024px, 1440px tested
- [ ] No horizontal scroll at any breakpoint
- [ ] Card grids stack properly on mobile

### Dark Mode Integrity
- [ ] Body text `#A3A3A3` (not white, not `#737373` on content)
- [ ] Heading text `#FAFAFA`
- [ ] Muted text `#737373` on labels/captions only
- [ ] Borders visible but subtle (0.08 → 0.15 on hover)

---

## 12. File Architecture

```
src/
├── styles/
│   ├── global.css          # Global rules, unified card hover, nav, footer, forms
│   └── tokens.css          # CSS custom properties (colors, spacing, radius)
├── components/
│   ├── motion/             # Reusable animation primitives (see §7a)
│   │   ├── ScrollReveal.tsx
│   │   ├── StaggerReveal.tsx
│   │   ├── TextReveal.tsx
│   │   ├── CountUp.tsx
│   │   ├── ParallaxCard.tsx
│   │   └── MagneticButton.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── Card.tsx        # spotlight prop REMOVED
│   │   └── PageHero.tsx    # simplified per §6b
│   ├── sections/
│   └── layout/             # Navbar, Footer, PreFooterCTA, SmoothScroll
├── layouts/
│   └── BaseLayout.astro
└── pages/
```

---

## 13. Services Section — Remediation

The Services section (`src/components/sections/Services.tsx`) has six
verified issues. None of these are about card color — color variety stays.

| # | Issue | Current | Target |
|---|---|---|---|
| 1 | Decorative background image | full-width `/images/selections/Services.webp` at `opacity: 0.12` plus gradient mask | **remove entirely** — section uses `#0F0F0F` flat per §6a |
| 2 | Marketplace card background | `background: "rgba(255, 255, 255, 0.02)"` (98% transparent → cards nearly invisible) | `background: "rgba(255, 255, 255, 0.03)"` (matches unified card system) |
| 3 | Service card description color | `color: "var(--accent-primary)" opacity: 0.8` — orange prose, violates CTA-only | `color: "var(--text-secondary)"` (`#A3A3A3`) |
| 4 | Service card tagline color | `color: meta.color` — colored per card (orange/blue/purple/teal italic prose) | `color: "var(--text-secondary)"` italic, or `var(--text-primary)` if emphasis needed. Never the icon color. |
| 5 | Focus-area list item color | `color: "var(--text-muted)"` (`#737373`) — too dim, this is primary info | `color: "var(--text-secondary)"` (`#A3A3A3`) |
| 6 | AI Enablement & Automation icon | generic custom path that reads like an anchor/hook | `BrainCircuit` from `lucide-react`, `h-7 w-7`, `strokeWidth={1.5}` |

Also while in that file:

- 7. Drop the `spotlight` prop on the `<Card>` — unified hover covers it (§5a).
- 8. Change section wrapper `background: "var(--surface-1)"` → `#0F0F0F` (§6a).
- 9. The marketplace cards' `borderTop: "3px solid var(--accent-primary)"`
     stays — that's the Marketplace variant accent and is intentional.
- 10. The mid-card `linear-gradient` teal hairline between focus-areas and
      tagline — keep, but thin it to match the section separator weight
      (`height: 1px`, lower opacity).

All other Services content (copy, icon list for the other three domains,
marketplace three-card layout, CTA button) is correct and stays untouched.

---

## 14. Icon Migration Map (all sections)

For the next implementation pass, these inline SVG paths should be replaced
with lucide-react components:

| File | Current inline SVG | Target lucide component |
|---|---|---|
| `Services.tsx` | Cyber shield path | `ShieldCheck` |
| `Services.tsx` | "brain-circuit" custom path | `BrainCircuit` |
| `Services.tsx` | Cloud path | `Cloud` |
| `Services.tsx` | Quantum atom path | `Atom` |
| `Pillars.tsx` | Shield / brain / atom / cloud | `ShieldCheck` / `BrainCircuit` / `Atom` / `Cloud` |
| `Reality.tsx` | Zap / Fingerprint / Sparkles / Globe | `Zap` / `Fingerprint` / `Sparkles` / `Globe` |
| `Leadership.tsx` | Cloud-plus / Globe-arrows / Graduation-cap-ish | `CloudCog` / `Globe2` / `GraduationCap` |

Color tokens on each icon stay as currently defined.

---

*This document is the single source of truth. All future UI tasks should
reference this file. If a decision contradicts MASTER.md, the decision must
be justified and MASTER.md updated accordingly.*
