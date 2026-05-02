# ActionDigital — Redesign & Rebrand System Design

## Brand Identity

ActionDigital is a **3-in-1 platform**:

| Pillar | Voice | Audience |
|---|---|---|
| Digital Institute | Empowering, educational, structured | Students, professionals upskilling |
| Marketing Agency | Bold, results-driven, creative | Businesses seeking growth |
| AI Automation | Cutting-edge, intelligent, futuristic | Enterprises, tech-forward clients |

The visual language must unite all three: **precision + warmth + intelligence**.

---

## Design Philosophy — "Apple Intelligence Meets Deep Space"

> *"Clean enough to trust. Dark enough to feel powerful. Glass enough to feel alive."*

Inspired by **macOS Sequoia, iOS 18 / Apple Intelligence UI** — frosted glass layers, deep space backgrounds, smooth spring physics, and bento grid information architecture.

---

## Design System

### Color Palette — "Deep Orbit"

```css
/* Backgrounds — deep space, NOT pure black */
--bg-deep:      #05070F   /* deepest background */
--bg-base:      #090D1A   /* main background */
--bg-elevated:  #0E1426   /* cards, panels */
--bg-float:     rgba(14, 20, 38, 0.7)  /* glass layers */

/* Glass Surfaces */
--glass-light:  rgba(255, 255, 255, 0.04)
--glass-mid:    rgba(255, 255, 255, 0.08)
--glass-strong: rgba(255, 255, 255, 0.12)
--glass-border: rgba(255, 255, 255, 0.10)

/* Text */
--text-primary:   #F1F5FF   /* near-white, not pure */
--text-secondary: #8892A4   /* muted labels */
--text-accent:    #EF7E2E   /* brand orange — retained from current */

/* Accent System */
--accent-brand:   #EF7E2E   /* ActionDigital orange */
--accent-ai:      #6366F1   /* Indigo — AI/tech pillar */
--accent-glow-o:  rgba(239, 126, 46, 0.20)   /* orange glow */
--accent-glow-i:  rgba(99, 102, 241, 0.18)   /* indigo glow */

/* Status */
--success: #10B981
--error:   #EF4444
--warning: #F59E0B
```

**Palette rationale:**
- Deep space navy (not black) = Apple-style depth, avoids OLED burn/smear
- Brand orange retained = continuity, warmth, energy
- Indigo = AI, intelligence, trust (universally associated with tech/AI)
- Dual accent system lets each pillar have its own glow signature

---

### Typography — "Space Grotesk + DM Sans"

```css
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,400&display=swap');

--font-heading: 'Space Grotesk', sans-serif;   /* techy, unique character */
--font-body:    'DM Sans', sans-serif;          /* clean, highly readable */

/* Type Scale (fluid with clamp) */
--text-display: clamp(3rem, 6vw, 5.5rem)   /* Hero H1 */
--text-h1:      clamp(2rem, 4vw, 3.5rem)
--text-h2:      clamp(1.5rem, 3vw, 2.25rem)
--text-h3:      clamp(1.125rem, 2vw, 1.5rem)
--text-body:    1rem         /* 16px min — prevents iOS auto-zoom */
--text-sm:      0.875rem
--text-xs:      0.75rem
```

---

### Effects System — "Liquid Glass"

```css
/* Backdrop Glass */
.glass-card {
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 20px;
}

/* Glow utilities */
.glow-orange { box-shadow: 0 0 40px rgba(239, 126, 46, 0.20); }
.glow-indigo { box-shadow: 0 0 40px rgba(99, 102, 241, 0.18); }

/* Ambient blobs — 2-3 large blurred circles, slow CSS oscillation, opacity 0.08–0.12 */

/* Spring easing (Apple-feel) */
--ease-spring:  cubic-bezier(0.16, 1, 0.3, 1);   /* expo.out */
--ease-out:     cubic-bezier(0.0, 0.0, 0.2, 1);
--duration-micro: 150ms;
--duration-base:  280ms;
--duration-page:  450ms;
```

---

### Spacing & Radius

```css
--radius-sm:  8px
--radius-md:  14px
--radius-lg:  20px
--radius-xl:  28px
--radius-2xl: 36px   /* large hero cards — Apple-style rounded rects */

/* 8pt grid */
--space-1: 4px    --space-2: 8px    --space-3: 12px
--space-4: 16px   --space-6: 24px   --space-8: 32px
--space-10: 40px  --space-12: 48px  --space-16: 64px
--space-20: 80px  --space-24: 96px
```

---

## Page Architecture

### Layout Pattern: Bento Grid + Full-bleed Sections

Every page alternates between:
1. Full-bleed dark section with ambient glow
2. Bento grid cards
3. Feature callout (large glass card)
4. Social proof or stats strip
5. CTA section

---

## Page-by-Page Redesign Plan

### 1. Home (`/`)
**Goal:** Communicate 3-in-1 identity in first 5 seconds

| Section | Design |
|---|---|
| **Navbar** | Frosted glass bar, sticky, blur on scroll, orange logo, `Get Started` CTA pill |
| **Hero** | Full-bleed deep space bg + 2 ambient blobs (orange + indigo), animated headline with word swap ("We Build **Brands** / **Solutions** / **Futures**"), dual CTA |
| **Stats Strip** | 4 glass pills: Students enrolled, Projects delivered, AI automations built, Partners |
| **Services Bento** | 3-col Apple-style bento grid: Institute card (indigo glow), Agency card (orange glow), AI card (gradient glow) |
| **Featured Projects** | Horizontal scroll cards with glass overlay + hover lift |
| **AI Showcase** | Split section: left = animated AI visualization, right = bullet features |
| **Testimonials** | Glass carousel with avatar, quote, rating stars |
| **Latest Blogs** | 3-col card grid, image + glass tag chips |
| **CTA Footer Banner** | Full-width glass panel, large headline + email capture |
| **Footer** | Dark, 4-col, social icons, newsletter |

---

### 2. About (`/about`)

| Section | Design |
|---|---|
| **Hero** | Page hero with blurred team photo background, glass overlay with mission statement |
| **Mission/Vision** | Side-by-side large glass cards |
| **Our Story** | Vertical timeline with glass milestone cards |
| **Values** | Bento grid — 6 value tiles with icons + glow |
| **Team** | Card grid (avatar, name, role, social links) |

---

### 3. Services (`/services`)
Three pillars as tabbed full sections:

| Tab | Color Signature | Sections |
|---|---|---|
| Institute | Indigo glow | Course catalog preview, curriculum highlights, certifications |
| Agency | Orange glow | Service cards (SEO, Branding, Social, Web Dev), case study strip |
| AI Automation | Gradient glow | Automation use-cases, tech stack badges, workflow diagram |

---

### 4. AI Dev (`/aidev`)
Dedicated AI page — most "techy" feel:
- Animated particle/grid hero background
- Feature cards with terminal-style code snippets
- Rotating use-case carousel
- "How It Works" 3-step glass flow diagram
- Integration logos marquee

---

### 5. Projects (`/projects`)
- Filterable masonry grid (by: Agency / Institute / AI)
- Each card: cover image + glass overlay with title, tags, CTA
- Modal/expanded view on click

---

### 6. Courses (`/courses`)
- Hero with search + filter bar (glass)
- Course cards: cover, instructor avatar, duration, price pill, progress bar
- Category pill filters

---

### 7. Blog (`/blog`)
- Featured post hero (large card)
- 3-col card grid below
- Tag filter pills
- Read time + author chip on each card

---

### 8. Contact (`/contact`)
- Split layout: left = large glass form, right = contact info cards + map
- Form inputs: glass-style with glow on focus
- WhatsApp CTA button (sticky on mobile)

---

### 9. Team (`/team`)
- Grid of glass profile cards
- Hover: slide to reveal bio + social links
- Filter by department

---

## Component Library (New)

| Component | File | Description |
|---|---|---|
| `GlassCard` | `components/ui/GlassCard.tsx` | Base glass container, configurable blur/border/glow |
| `GlassNavbar` | `components/Header.tsx` | Sticky frosted nav with scroll-blur effect |
| `HeroSection` | `components/Hero.tsx` | Full-bleed with ambient blobs + spring-animated headline |
| `BentoGrid` | `components/ui/BentoGrid.tsx` | CSS grid bento layout with configurable columns |
| `GlowButton` | `components/ui/GlowButton.tsx` | CTA button with brand orange glow on hover |
| `PillBadge` | `components/ui/PillBadge.tsx` | Tag chip (glass style) |
| `StatCard` | `components/ui/StatCard.tsx` | Animated counter + label glass tile |
| `ProjectCard` | `components/ui/ProjectCard.tsx` | Image + glass overlay hover reveal |
| `CourseCard` | `components/CourseCard.tsx` | Card with progress bar, instructor, price |
| `TestimonialCard` | `components/ui/TestimonialCard.tsx` | Quote + avatar + stars |
| `AmbientBlob` | `components/ui/AmbientBlob.tsx` | Absolutely-positioned blurred circle, CSS animated |
| `GlassInput` | `components/ui/GlassInput.tsx` | Form input with glass bg + glow focus ring |
| `SectionHeading` | `components/ui/SectionHeading.tsx` | Eyebrow label + heading + subtext system |
| `AnimatedCounter` | `components/ui/AnimatedCounter.tsx` | Number count-up on scroll into view |
| `GradientText` | `components/ui/GradientText.tsx` | Orange→indigo gradient text for key words |
| `ScrollMarquee` | `components/ui/ScrollMarquee.tsx` | Infinite scroll strip for logos/skills/tags |

---

## Implementation Phases

### Phase 1 — Foundation
1. Update `globals.css` — new CSS variables (colors, fonts, effects, spacing)
2. Load new fonts (Space Grotesk + DM Sans) in `layout.tsx`
3. Build `GlassCard`, `GlowButton`, `AmbientBlob`, `SectionHeading` base components
4. Redesign `Header.tsx` (glass navbar)
5. Redesign `Footer.tsx`

### Phase 2 — Homepage
6. Rebuild `Hero.tsx`
7. Rebuild `Services.tsx` → Bento Grid
8. Rebuild `Testimonials.tsx`
9. Rebuild `LatestBlogs.tsx`
10. Rebuild `Projects/CoursesSection.tsx`

### Phase 3 — Inner Pages
11. About, Team, Services detail, AI Dev, Projects, Blog, Contact

### Phase 4 — LMS & Dashboard
12. Course cards, dashboard UI, enrollment flows

### Phase 5 — Admin & Polish
13. Admin panel glass redesign
14. Animations, transitions, reduced-motion support
15. Mobile responsiveness audit (375px → 1440px)

---

## Design Rules (Non-negotiable)

- **No pure `#000000`** — use deep navy (`#05070F`) as darkest bg
- **No emoji icons** — Lucide React only (already installed)
- **One primary CTA per section** — no competing actions
- **Glass blur only on elevated elements** (nav, modals, cards) — not decorative use
- **All animations respect `prefers-reduced-motion`**
- **Touch targets ≥ 44px** on all mobile interactive elements
- **Body text minimum 16px** — prevents iOS auto-zoom
- **Brand orange (`#EF7E2E`) = energy & action** — CTAs, highlights, hover states
- **Indigo (`#6366F1`) = intelligence & AI** — AI section accents, tech elements
- **Text contrast ≥ 4.5:1** — test both light and dark glass surfaces
- **No horizontal scroll** on any breakpoint
- **Breakpoints:** 375px / 768px / 1024px / 1440px

---

## Tech Stack Notes

- **Next.js 16 App Router** — use Server Components where possible; client only for interactive elements
- **Tailwind CSS v4** — extend via `@theme` in `globals.css`, no separate config file
- **motion-shim** — currently a noop; replace with CSS transitions + `@keyframes` for reliability
- **Lucide React** — already installed, use consistently throughout
- **Vercel Analytics** — already wired, keep intact

---

*Plan created: 2026-05-02*
*Status: Ready for Phase 1 implementation*
