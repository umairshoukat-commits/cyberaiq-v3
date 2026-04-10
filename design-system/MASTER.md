# CyberAIQ AG — Design System

> Source of truth for all UI decisions. Generated via UI/UX Pro Max skill,
> refined for premium enterprise cybersecurity positioning.
> Last updated: 2026-04-08

---

## 1. Product Identity

| Attribute       | Value |
|-----------------|-------|
| Company         | CyberAIQ AG |
| Category        | Enterprise Cybersecurity Platform (AI + Cloud + Cyber + Quantum convergence) |
| Positioning     | Premium enterprise — Palantir / Anthropic / Scale.ai tier |
| Audience        | Enterprise CISOs, CTOs, government, finance, critical infrastructure |
| Tone            | Authoritative, technical, minimal, calm |
| Theme           | Dark mode only |

---

## 2. UI Style Classification

**Primary style: Dark Swiss Minimal** (hybrid of three UI/UX Pro Max categories)

| Source Style | What We Take | What We Reject |
|---|---|---|
| Minimalism & Swiss Style | Grid discipline, white space, functional clarity, WCAG AAA | Stark white backgrounds, zero decoration |
| Dark Mode (OLED) | Deep blacks, high-contrast text, minimal glow | Neon accents, colorful glows |
| Trust & Authority | Security badges, metric pulse, professional colors | Certificate carousels, gold accents |

**Explicitly NOT:** Cyberpunk UI, Glassmorphism, Neumorphism, Liquid Glass, Skeuomorphism.

The site should feel like reading a classified briefing document at 2 AM — calm, dark, authoritative, with information presented clearly and without distraction.

---

## 3. Color Palette

### Backgrounds (4-level hierarchy)
| Token | Hex | Usage |
|-------|-----|-------|
| `--surface-0` / `--bg-base` | `#0A0A0A` | Page base |
| `--surface-1` / `--bg-surface-1` | `#141414` | Cards, elevated elements |
| `--surface-2` / `--bg-surface-2` | `#1A1A1A` | Hover states, active cards |
| `--surface-3` / `--bg-surface-3` | `#262626` | Modals, dropdowns |
| Hero background | `#050510` | Hero section only (deep blue-black) |
| Alternating sections | `#0A0A0A` / `#0F0F0F` | Creates depth rhythm without decoration |

### Text (3-level hierarchy)
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-primary` | `#FAFAFA` | Headings, emphasis, primary content |
| `--text-secondary` | `#A3A3A3` | Body text, descriptions |
| `--text-muted` | `#737373` | Labels, captions, timestamps |

### Accent Colors
| Token | Hex | Usage | Notes |
|-------|-----|-------|-------|
| `--accent-primary` | `#F97316` | CTAs, orange highlights, active states | **MANDATORY — non-negotiable** |
| `--accent-secondary` | `#2B7EC1` | Structural blue, links, secondary elements | Blue for trust/structure |
| CTA gradient | `linear-gradient(135deg, #F97316, #E84393, #8B5CF6)` | Primary CTA buttons only | Orange→pink→purple |

### Borders
| State | Value |
|-------|-------|
| Default | `rgba(255, 255, 255, 0.08)` |
| Hover | `rgba(255, 255, 255, 0.15)` |
| Active/accent | `rgba(249, 115, 22, 0.25)` |

### Color Rules
- **NEVER** use neon green (#00FF41), matrix green, or cyberpunk neon colors
- **NEVER** use red (#FF3333) as a decorative accent — red is reserved for error states only
- **NEVER** use colored backgrounds on sections — only neutral dark tones from the hierarchy
- Orange #F97316 appears ONLY on: CTA buttons, interactive accents, small highlights. Never on large surfaces.
- Blue #2B7EC1 is structural — never used for decorative glow or large fills

---

## 4. Typography

### Font Stack
| Role | Font | Fallback |
|------|------|----------|
| Display / Headings | Geist Sans (variable) | system-ui, -apple-system, sans-serif |
| Body / UI | Geist Sans (variable) | system-ui, -apple-system, sans-serif |
| Code / Technical | Geist Mono (variable) | JetBrains Mono, monospace |

**Why Geist Sans (not Inter):** Geist is Vercel's system font, optimized for dark interfaces and technical content. It has tighter metrics than Inter, better optical alignment at small sizes, and a more distinctive character that matches the Palantir/Anthropic aesthetic. Inter is an excellent fallback but Geist is the right primary choice.

### Type Scale
| Element | Size | Weight | Letter-spacing | Line-height |
|---------|------|--------|----------------|-------------|
| Hero h1 | `clamp(36px, 5vw, 64px)` | 700 | `-0.04em` | `1.08` |
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
- Eyebrow/label text: uppercase, wide tracking, `#737373` for neutral or `#F97316` at 80% for accent

---

## 5. Component System

### Cards
| Property | Default | Hover |
|----------|---------|-------|
| Background | `#141414` | `#1A1A1A` |
| Border | `1px solid rgba(255,255,255,0.08)` | `1px solid rgba(255,255,255,0.15)` |
| Border-radius | `12px` | — |
| Padding | `p-6 md:p-8` | — |
| Transform | — | `translateY(-4px)` |
| Box-shadow | none | `0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(249,115,22,0.04)` |
| Transition | `all 300ms cubic-bezier(0.16, 1, 0.3, 1)` | — |

**Card variants:**
- **Pillar cards:** 2px top border with pillar accent color
- **Service cards:** Clean, no top accent
- **Leadership cards:** Clean, no top accent
- **Marketplace cards:** 3px top border with `--accent-primary`

### Buttons
| Variant | Background | Border | Hover |
|---------|-----------|--------|-------|
| Primary | CTA gradient | none | `scale(1.02) translateY(-2px)`, glow shadow |
| Secondary | transparent | `1.5px solid rgba(255,255,255,0.15)` | `bg-white/5`, `border-white/20`, `translateY(-1px)` |
| Ghost | transparent | `1px solid transparent` | subtle color shift |

All buttons: `rounded-lg`, `font-medium`, `200ms cubic-bezier(0.16, 1, 0.3, 1)` transition, `scale(0.98)` on active/press.

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

**Pattern: Enterprise Gateway** (adapted for cybersecurity)

### Homepage Section Order
| # | Section | Background | Purpose |
|---|---------|-----------|---------|
| 1 | Hero (Spline 3D) | `#050510` (transparent on desktop) | Mission statement + CTA + social proof |
| 2 | Reality | `#0A0A0A` | Problem awareness — 4 truths |
| 3 | Differentiators | `#0F0F0F` | Why choose CyberAIQ |
| 4 | Pillars | `#0A0A0A` | 4 service domains |
| 5 | Hyperscaler Ticker | `#0F0F0F` | Partner trust signal |
| 6 | Stats | `#0A0A0A` | Credibility metrics |
| 7 | Who We Are | `#0F0F0F` | Origin story + achievements |
| 8 | Philosophy | `#0A0A0A` | Vision + Mission cards |
| 9 | Services | `#0F0F0F` | Detailed offering |
| 10 | Leadership | `#0A0A0A` | Team qualities |
| 11 | Contact Form | `#0F0F0F` | Conversion |

### Conversion Strategy
- **Primary CTA:** "Start a Strategic Conversation" (gradient button) — hero + pre-footer
- **Secondary CTA:** "Learn More" / "Explore Our Services" (ghost button) — paired with primary
- **Trust signals:** Hyperscaler logos in hero (Microsoft, AWS, Google Cloud) at 40% opacity
- **Social proof:** Stats section with animated count-up numbers
- **No pricing page** — enterprise sales model (contact → consultation)

### CTA Placement Rules
- Hero: dual buttons (primary + ghost)
- Each service card: implicit (linked)
- Pre-footer: contained card with dual buttons + magnetic hover
- Never more than 2 CTAs visible at once
- Never stack more than 2 buttons horizontally

---

## 7. Motion & Animation

### Easing Functions
| Name | Value | Use For |
|------|-------|---------|
| Spring out | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary — reveals, hovers, buttons |
| Power3 out | `power3.out` (GSAP) | Scroll reveals |
| Expo out | `expo.out` (GSAP) | Text reveals (word-by-word) |
| Elastic | `elastic.out(1, 0.4)` (GSAP) | Magnetic buttons only |

### Scroll Reveal Defaults
| Property | Value |
|----------|-------|
| translateY | `40px` (24px on mobile) |
| Duration | `0.8s` |
| Stagger (cards) | `0.08s–0.12s` |
| Trigger | `top 85%` viewport |
| Once | `true` (never replay) |
| Delay between elements | `0.1s` |

### Text Reveal
- Words split into `overflow: hidden` spans
- Each word slides up from `translateY(100%)` to `0`
- Duration: `0.9s`, stagger: `0.04s`, ease: `expo.out`
- Trigger: `top 85%`

### Parallax Cards
- 3D tilt on mousemove via GSAP `quickTo`
- Depth: 6–10 degrees rotation
- Cursor-following radial glow: `rgba(249,115,22,0.06)`
- Desktop only (`pointer: fine`)

### Magnetic Buttons
- Pull toward cursor: strength `0.3–0.4`
- Ease: `elastic.out(1, 0.4)`
- Desktop only

### Performance Rules
- All animations use `transform` and `opacity` only (GPU composited)
- `will-change` only on fixed/persistent elements (Spline canvas)
- `prefers-reduced-motion: reduce` kills ALL animation/transition durations
- `?static=1` query param freezes everything for screenshot tools
- Spline 3D: desktop only (≥1024px), CSS gradient fallback on mobile
- Lenis smooth scroll: disabled on touch devices

---

## 8. Spacing System

### Section Padding
| Breakpoint | Value |
|------------|-------|
| Mobile | `py-32` (128px) |
| Desktop (md+) | `py-40` (160px) |

### Content Max-Width
| Element | Value |
|---------|-------|
| Container | `max-w-7xl` (1280px) |
| Hero heading | `max-w-6xl` (1152px) |
| Text blocks | `max-w-3xl` (768px) |
| Subtitle/description | `max-w-2xl` (672px) |

### Card Grid Gaps
| Breakpoint | Value |
|------------|-------|
| Mobile | `gap-4` (16px) |
| Desktop | `gap-6` (24px) |

### Card Internal Padding
`p-6 md:p-8` (24px mobile, 32px desktop)

---

## 9. Anti-Patterns to Avoid

### Category: Cybersecurity Industry
| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| Neon green (#00FF41) / Matrix aesthetic | Looks like a hacker tool, not an enterprise platform | Use neutral dark palette with warm orange accent |
| Glitch effects / scanlines | Suggests instability — opposite of what security clients want | Clean, stable transitions. No visual noise. |
| Skull/shield/lock icons as decoration | Clichéd, triggers "threat" association not "trust" | Use abstract geometric forms, clean line icons |
| Red as accent color | Red = danger/error in enterprise UX. Confusing as decoration. | Reserve red strictly for error states |
| Animated backgrounds on every section | Performance drain, distracts from content, looks gimmicky | One hero effect (Spline), then clean sections |
| Dense data dashboards on marketing site | Visitors can't interpret raw dashboards without context | Show 3–4 headline metrics with clear labels |
| "Military-grade encryption" language | Meaningless buzzword, erodes trust with technical audience | Specific claims: "AES-256", "SOC 2 Type II", "ISO 27001" |

### Category: General Premium UI
| Anti-Pattern | Why It's Wrong | What To Do Instead |
|---|---|---|
| Emojis as icons | Unprofessional for enterprise audience | SVG icons (Lucide, Heroicons) |
| More than 2 accent colors | Visual chaos, dilutes brand | Orange primary + blue structural only |
| Glassmorphism / blur on dark backgrounds | Looks muddy, no contrast benefit on dark | Solid card backgrounds (#141414) |
| Infinite loop animations on decorative elements | Distracting, hurts perceived performance | Loading indicators only |
| Text on low-contrast backgrounds | WCAG failure, poor readability | Minimum 4.5:1 contrast ratio |
| Layout-shifting hover effects (scale on cards) | Janky, pushes adjacent elements | `translateY` only (no layout recalc) |
| White text at 100% opacity for body copy | Too bright on dark, causes eye strain | Use `#A3A3A3` for body, `#FAFAFA` for headings |

---

## 10. Accessibility Requirements

### Mandatory (WCAG AA minimum)
- [ ] Color contrast: 4.5:1 for normal text, 3:1 for large text
- [ ] Focus states: 2px solid `var(--accent-primary)` outline on all interactive elements
- [ ] Alt text: descriptive for meaningful images, empty for decorative
- [ ] Keyboard navigation: tab order matches visual order
- [ ] Form labels: every input has an associated `<label>`
- [ ] Touch targets: minimum 44x44px
- [ ] `prefers-reduced-motion` respected globally
- [ ] Skip-to-content link present

### Current Implementation
- `::selection` styled with brand orange
- `color-scheme: dark` on `<html>`
- `<meta name="theme-color" content="#0A0A0A">`
- Skip link: `.sr-only` → visible on focus
- Reduced motion: global CSS rule kills all `animation-duration` and `transition-duration`
- Static mode: `?static=1` freezes all for screenshot tools

---

## 11. Pre-Delivery Checklist

### Visual Quality
- [ ] No emojis used as icons (SVG only: Lucide or custom)
- [ ] All icons from consistent set with matching stroke weight
- [ ] Hover states don't cause layout shift (translateY only)
- [ ] Card backgrounds use token colors (#141414), not rgba white
- [ ] Section backgrounds alternate correctly (#0A0A0A / #0F0F0F)
- [ ] No neon, no matrix green, no cyberpunk aesthetic anywhere

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover feedback on every interactive element (cards, buttons, links)
- [ ] Transitions are 150–300ms with spring easing
- [ ] Focus states visible for keyboard navigation
- [ ] Magnetic/parallax effects desktop-only (pointer: fine)

### Performance
- [ ] Spline 3D: only on desktop ≥1024px, CSS fallback on mobile
- [ ] All animations use transform/opacity (no layout properties)
- [ ] Lazy loading on below-fold images
- [ ] `will-change` only on persistent elements
- [ ] No `requestAnimationFrame` loops on mobile

### Responsiveness
- [ ] Tested at 375px (iPhone SE)
- [ ] Tested at 768px (iPad)
- [ ] Tested at 1024px (Spline threshold)
- [ ] Tested at 1440px (desktop reference)
- [ ] No horizontal scroll at any breakpoint
- [ ] Card grids stack properly on mobile

### Dark Mode Integrity
- [ ] Body text #A3A3A3 (not white)
- [ ] Heading text #FAFAFA
- [ ] Muted text #737373
- [ ] Borders barely visible (0.08 opacity) but structurally present
- [ ] No accidentally transparent-on-dark elements

---

## 12. File Architecture

```
src/
├── styles/
│   ├── global.css          # Global rules, card-premium, nav, footer, forms
│   └── tokens.css          # CSS custom properties (colors, spacing, radius)
├── components/
│   ├── motion/             # Reusable animation primitives
│   │   ├── ScrollReveal.tsx
│   │   ├── StaggerReveal.tsx
│   │   ├── TextReveal.tsx
│   │   ├── CountUp.tsx
│   │   ├── ParallaxCard.tsx
│   │   └── MagneticButton.tsx
│   ├── ui/                 # Static UI primitives
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── PageHero.tsx
│   ├── sections/           # Page sections
│   └── layout/             # Navbar, Footer, PreFooterCTA, SmoothScroll
├── layouts/
│   └── BaseLayout.astro    # <html>, <head>, global scripts
└── pages/                  # Astro pages
```

---

*This document is the single source of truth. All future UI tasks should reference
this file. If a decision contradicts MASTER.md, the decision must be justified
and MASTER.md updated accordingly.*
