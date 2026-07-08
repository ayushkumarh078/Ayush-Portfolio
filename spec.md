# SPEC.md — Ayush Kumar / Portfolio "LDR-01"

> A single-page personal portfolio themed on the visual language of *Love, Death + Robots*: stark black-and-crimson anthology titling, chrome/holographic accents, glitch-and-scanline texture, and cold neon cyberpunk lighting. The goal is a site that reads like a title card for an episode called **"AYUSH_KUMAR.EXE"** — not a template with a red filter slapped on it.

---

## 1. Design Philosophy

Love, Death + Robots doesn't have one visual style — it has a *brand shell* (the iconic black/red/white anthology bumper with bold slab type and a rotating glyph) wrapped around wildly different animation styles per episode. We borrow the **shell**, not any one episode's specific look, because the shell is what's legally and aesthetically "LDR" without imitating a specific artist's copyrighted frames.

Core mood words: **mechanical, cinematic, cold, precise, dangerous, luxurious.**

Guiding principles:
1. **Anthology framing** — every section is presented like a numbered "episode" (EP.01, EP.02...) the way LDR numbers its shorts.
2. **Two-color-plus-chrome discipline** — the palette stays disciplined (near-black base, one hot accent, one cold accent, chrome/silver for structure) so it never turns into a rainbow.
3. **Glitch as punctuation, not wallpaper** — glitch/scanline/chromatic-aberration effects appear on hover/scroll-trigger, not as a constant animated background that hurts readability or performance.
4. **Type does the heavy lifting** — oversized, confident, slightly-too-tight headlines carry the "episode title" energy. Body copy stays highly legible (this is a resume — recruiters must be able to read it in 5 seconds).
5. **Machine-precision grid** — thin hairlines, corner brackets (like a HUD targeting reticle), and monospace metadata (dates, coordinates-style labels) reinforce "robot" without becoming a video game UI.

---

## 2. Color System

Defined as CSS custom properties in `:root`. Locked palette — do not introduce new hues.

```css
:root {
  /* Base */
  --void:        #05050a;   /* primary background, near-black w/ blue undertone */
  --void-2:      #0c0c14;   /* elevated panels / cards */
  --void-3:      #14141f;   /* borders, hairlines on dark */

  /* Chrome / structure (neutral, not pure gray — cool steel) */
  --chrome-100:  #f4f4f7;   /* primary text on dark */
  --chrome-300:  #b8b8c4;   /* secondary text */
  --chrome-500:  #7a7a8a;   /* muted / meta text */
  --chrome-700:  #3a3a46;   /* dividers */

  /* Hot accent — the LDR crimson */
  --signal-red:  #ff1f3d;
  --signal-red-dim: #7a0f1e;

  /* Cold accent — cyberpunk cyan (used sparingly as a counter-signal) */
  --signal-cyan: #33f0ff;

  /* Rare third accent — used ONLY for the glitch-flicker moment, never for UI */
  --glitch-mag:  #ff2fd8;

  --success-uplift: #33f0ff; /* reuse cyan for metric callouts, keep palette tight */
}
```

**Usage rules:**
- `--signal-red` = primary interactive accent (links, active nav dot, section numerals, key metric highlights). Max one large red element per viewport at a time — it should feel like a warning light, not a background.
- `--signal-cyan` = secondary/contrast accent for hover states and the glitch-split effect only.
- `--glitch-mag` only appears for <150ms during the RGB-split glitch animation. Never used in static UI.
- Body text is always `--chrome-100` or `--chrome-300` on `--void`/`--void-2` — never pure red-on-black body copy (fails accessibility and looks amateurish).

---

## 3. Typography

Two-family system, both free/Google Fonts so GitHub Pages needs no licensing or build step:

| Role | Font | Notes |
|---|---|---|
| Display / Headlines | **"Bebas Neue"** or **"Anton"** | Condensed, industrial slab-grotesk — matches LDR's bold title-card lettering. Used ALL CAPS, tight letter-spacing on huge sizes, wide letter-spacing on small eyebrow labels. |
| Body / UI | **"Inter"** | Clean, highly legible, variable weight. Used for all paragraph copy, nav, and card body text. |
| Meta / Data | **"JetBrains Mono"** or **"Space Mono"** | Used for dates, episode numbers (EP.01), tech-stack tags, and the HUD-style corner coordinates. Reinforces "machine" feel. |

Type scale (fluid, `clamp()`-based so it scales without breakpoints doing all the work):
- Hero name: `clamp(3.5rem, 12vw, 9rem)`
- Section titles: `clamp(2rem, 6vw, 4.5rem)`
- Card titles: `clamp(1.1rem, 2vw, 1.5rem)`
- Body: `1rem–1.125rem`, line-height `1.6`
- Meta/mono: `0.75rem–0.85rem`, letter-spacing `0.08em`, uppercase

---

## 4. Layout & Structure (single page, anchor-nav sections)

One `index.html`, one `style.css`, one small `script.js` (vanilla, no build tools — must run directly on GitHub Pages with zero config).

### Global chrome
- **Fixed top nav**: left = "AK://" wordmark (mono font, like a file path), right = section links styled as `01 ABOUT / 02 WORK / 03 PROJECTS / 04 SKILLS / 05 CONTACT`, current section underlined in `--signal-red`.
- **Corner brackets**: thin `--chrome-700` HUD-style corner brackets fixed in all 4 viewport corners (pure decorative `::before/::after`), like a targeting frame — reinforces the sci-fi console feel without being loud.
- **Custom cursor** (desktop only): small crosshair/dot that turns into a red ring on hoverable elements. Falls back to default cursor on touch devices.
- **Noise/grain overlay**: subtle animated SVG noise at ~4% opacity over the whole page for cinematic texture (cheap, CSS-only, no image asset needed).
- **Scroll progress bar**: 2px line at very top, fills `--signal-red` as user scrolls — like a playback scrubber.

### Section-by-section spec

**EP.00 — HERO**
- Full viewport height.
- Giant title: `AYUSH KUMAR` in Anton/Bebas, chrome-100, with a glitch/RGB-split hover effect on the name itself (mousemove-triggered subtle skew + red/cyan channel offset).
- Subtitle line (mono, small, red accent number): `EP.00 — SOFTWARE ENGINEER / QA & SYSTEMS`
- One-line positioning statement (Inter, chrome-300): something like *"Building and breaking systems — from FSSAI's national food-safety platforms to self-aiming trash cans."* (tone: confident, a little wry — matches anthology voice-over energy).
- Contact chips row: email, phone, LinkedIn, GitHub — pill buttons with hairline border, fill red on hover.
- Scroll cue: animated downward chevron / "SCROLL — 01" mono label.
- Background: pure `--void` with a faint animated scanline sweep (CSS `linear-gradient` + `@keyframes`, GPU-cheap) and a slow-rotating thin circular HUD ring behind the name (SVG, low opacity) — nods to the LDR bumper's rotating emblem without copying it.

**EP.01 — ABOUT / SUMMARY**
- Two-column: left = short bio paragraph built from resume (CS undergrad at VIT, just wrapped a QA internship at FSSAI HQ, cloud-certified, ships end-to-end projects solo). Right = a small "spec sheet" card styled like a robot data-plate:
  ```
  UNIT: AYUSH KUMAR
  CLASS: B.TECH CSE — VIT (2026)
  CERT: AZURE DP-900 · AWS CLOUD FOUNDATIONS · AWS CLOUD ARCHITECTING
  STATUS: OPEN TO WORK
  ```
- This data-plate motif (label: value, monospace, hairline-bordered box) recurs in Experience/Education for consistency.

**EP.02 — EXPERIENCE** (timeline layout)
- Vertical timeline with a red center line (or left-aligned line on mobile), each role as a node.
- Cards, most recent first:
  1. **QA & Testing Intern** — FSSAI Headquarters, Delhi — Jan 2026–Jun 2026
     - Bullets from resume: FoSCoS/Consumer Grievance/AMS/AMC test plans, workflow diagrams incl. edge cases & escalation paths, manual testing coverage, bug tracking, stakeholder validation.
  2. **Tech Lead** — Innovators Quest Club — Jul 2024–May 2025
     - Metrics pulled forward as bold callouts: **35% engagement increase**, **team of 10**, **25% YoY membership growth** — render these numbers in `--signal-cyan` inside the card as oversized mono stat chips (this is the "impressive at a glance" trick recruiters skim for).
  3. **Core Member & Event Organizer** — English Literacy Club — Jul 2023–May 2024
     - Bullets: 10+ literary events/debates/open mics, stakeholder comms between students/faculty, optimized promotion workflows.
- Each card has an `EP.02.0x` mono tag and date range in the timeline node.

**EP.03 — PROJECTS** (the showcase grid — this is where "who the hell made this" happens)
- 3-card grid (stacks to 1 col on mobile), each project as a "film still" card: dark panel, thin border that lights up red on hover, subtle image/graphic placeholder area (since we have no real screenshots, use a generated abstract SVG/gradient "signal" graphic per card — circuit-line pattern, sensor-ring pattern, grid-scan pattern — matching each project's theme) + content below.
- Cards:
  1. **ATM Theft Detection System** — real-time fire/forced-entry/tampering detection via image recognition + IoT. Stat chips: `95% DETECTION ACCURACY`, `RESPONSE TIME ↓`. Stack tags: Python · OpenCV · IoT.
  2. **AI-Generated Quiz Website** — NLP-based quiz generation, AWS + SQL backend. Stat chips: `500+ USERS`, `70% LESS PREP TIME`. Stack tags: Python · Flask · NLP.
  3. **Self-Aiming Smart Trash Can** — Raspberry Pi + OpenCV + MobileNet SSD real-time waste detection with motorized centering. Stat chips: `5–20 FPS EDGE`, `5–10W POWER`. Stack tags: Raspberry Pi · OpenCV · MobileNet SSD.
- Hover interaction: card lifts slightly, border glows red, stat chips flicker in with a 100ms glitch-in animation (staggered), corner brackets appear on the card (echoing global HUD motif at micro scale).

**EP.04 — SKILLS** (grouped tag cloud, not boring progress bars)
- Grouped into the resume's own categories, each group with a mono eyebrow label:
  - `PROGRAMMING & DATA` → Python, R, Java, SQL, NoSQL, Redis
  - `TOOLS & PLATFORMS` → Excel, PowerPoint, Figma, APIs, LLMs
  - `CLOUD` → AWS, Microsoft Azure (DP-900)
  - `COLLABORATION & LEADERSHIP` → Project Management, Cross-functional Teamwork, Technical Documentation
- Each skill = a pill/chip with hairline border; on hover, chip inverts to red fill + chrome text and a tiny corner-bracket flicker — reinforces the HUD language established in hero/projects without new patterns.

**EP.05 — EDUCATION & CERTIFICATIONS** (compact data-plate row)
- Education: VIT — B.Tech CSE (May 2026); City Montessori School — Senior Secondary (87.2%) & ICSE 10th (89.6%). Presented as two stacked data-plates, not full-height cards (keep it compact since work/projects should dominate visual weight).
- Certifications as small badge row: Microsoft Azure DP-900 · AWS Cloud Foundations · AWS Cloud Architecting — rendered as chrome "seal" badges (circular, thin double-ring border, mono text) — a nice small flourish that reads as premium.

**EP.06 — BEYOND WORK** *(optional, light-touch)*
- One compact row for Football Captaincy (Sahara FC) and Community Mentor work — short, humanizing, doesn't compete visually with the professional sections. Small icon + one-line each.

**EP.FINAL — CONTACT / SIGN-OFF**
- Full-bleed dark section echoing the hero (bookend structure).
- Big line: `LET'S BUILD SOMETHING THAT DOESN'T BREAK.` (or similar punchy sign-off in the anthology voice).
- Email as the dominant CTA (mailto:, large Anton-styled text with red underline draw-on-hover).
- Row of icon links: Email · Phone · LinkedIn · GitHub.
- Footer mono line: `© 2026 AYUSH KUMAR — TRANSMISSION END` + a tiny rotating glyph echoing the hero's HUD ring (closes the loop, literally, like the LDR bumper's rotating logo appearing at both intro and outro of the anthology).

---

## 5. Motion & Interaction Spec

Keep everything **scroll-triggered or hover-triggered** — no autoplaying loops that fight for attention while someone is trying to read (recruiters bail on distracting motion).

| Element | Trigger | Effect |
|---|---|---|
| Section entrance | IntersectionObserver on scroll into view | Fade + 16px translate-Y, `120ms` stagger per child, `cubic-bezier(0.2, 0.8, 0.2, 1)` |
| Hero name | mousemove (desktop) | Subtle 3D-tilt (max 6deg) + chromatic-aberration split on `--signal-red`/`--signal-cyan` duplicated text layers |
| Nav active link | scroll position | Underline slides between links via `transform`, not layout reflow |
| Project card | hover | Lift `translateY(-6px)`, border color shift, corner brackets fade in, stat chips glitch-in |
| Stat numbers | scroll into view, once | Count-up animation from 0 to target value (JS, `~800ms`, eased) |
| Buttons/links | hover | Fill-sweep from left using `::before` pseudo-element, not JS |
| Scroll progress bar | scroll | `width` bound to scroll % via `requestAnimationFrame`-throttled listener |
| Glitch flicker (name, section numerals) | occasional, randomized, low-frequency (every ~8–12s, one element at a time) | 100–150ms RGB channel split + slight position jitter, then settles — echoes broadcast/VHS artifacting without being epileptic-trigger-risk (keep displacement small, no strobing full-screen flashes) |

**Accessibility guardrail:** wrap all decorative motion in `@media (prefers-reduced-motion: reduce)` fallback that disables glitch/tilt/parallax and keeps simple opacity fades only.

---

## 6. Technical Architecture

```
/
├── index.html          # all content, semantic sections, one file
├── style.css           # all styling, CSS custom properties, no framework
├── script.js           # vanilla JS: IntersectionObserver, count-up, cursor, nav highlight, glitch timer
├── assets/
│   ├── favicon.svg      # small red/black glyph echoing the HUD ring
│   └── og-image.png     # optional social preview card (dark, name + role, for link unfurls)
└── README.md            # short project readme (what it is, tech used, live link)
```

- **No build step, no npm dependencies, no frameworks.** Pure HTML5 + CSS3 (custom properties, `clamp()`, grid/flexbox) + vanilla ES6 JS. This guarantees zero-friction GitHub Pages deployment — push to `main`, enable Pages on `/root`, done.
- Fonts loaded via Google Fonts `<link>` (Bebas Neue/Anton, Inter, JetBrains Mono) with `preconnect` for performance; system-font fallback stack defined in CSS in case of offline/blocked CDN.
- All SVG decorative graphics (HUD rings, corner brackets, project "signal" art, noise texture) written as inline SVG or CSS — no external image dependencies to keep load fast and the repo tiny.
- Responsive via fluid type (`clamp()`) + CSS Grid `auto-fit`/`minmax()` rather than a long list of fixed breakpoints; a small number of breakpoints (`768px`, `1024px`) handle nav collapse (hamburger below 768px) and grid column collapse.
- Semantic HTML throughout (`<nav>`, `<section id="...">`, `<article>` per project/experience card, proper heading hierarchy `h1`→`h2`→`h3`) for SEO and screen-reader sanity — this should be as technically clean under the hood as it is flashy on the surface.
- Meta tags: title, description, Open Graph tags, favicon — small details that make the link preview itself look considered when shared.

---

## 7. Performance & Quality Bar

- Lighthouse targets: **Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO = 100** on a static single page — there's no excuse not to hit this with zero frameworks.
- No layout shift: reserve space for fonts (`font-display: swap` + fallback stack sized closely), no images loading in above the fold except inline SVG.
- Contrast-check all text/background pairs against WCAG AA, especially chrome-300-on-void and any red-on-dark usage — red is accent-only for exactly this reason.
- Keyboard navigable: visible focus states styled to match the aesthetic (red focus ring, not browser default, but never `outline: none` without a replacement).
- Test at 375px (mobile), 768px (tablet), 1440px+ (desktop) minimum.

---

## 8. Deployment (GitHub Pages)

1. Repo root contains `index.html` directly (no `/dist`, no build).
2. Settings → Pages → Source: `Deploy from a branch` → `main` / `/root`.
3. Optional: custom domain via `CNAME` file if the user has one.
4. Add `README.md` with a live-demo link and a one-line tech summary once deployed.

---

## 9. Tone-of-Voice Notes for Copy

- Write like an anthology voice-over crossed with a confident engineer, not a resume objective statement. Short declarative sentences. Numbers do the bragging, not adjectives.
- Avoid generic phrases like "passionate," "hard-working," "team player" — the LDR framing (episode numbers, data-plates, HUD language) should carry the "impressive" feeling structurally, so the actual copy can stay terse and let the work speak.
- Every metric already on the resume (35%, 25% YoY, 95% accuracy, 500+ users, 70% time reduction, 5–20 FPS) gets promoted to a visually distinct stat chip somewhere — these are the scannable proof-points that make a reviewer stop scrolling.

---

## 10. Out of Scope (for this pass)

- No CMS/backend — content is hardcoded in `index.html` since it's a personal one-pager.
- No dark/light mode toggle — the entire aesthetic is built around the dark "void" palette; a light mode would require a second full design system for no real user benefit here.
- No blog/CMS section — can be a v2 addition (`/blog` as a separate future page) but not part of this one-pager spec.