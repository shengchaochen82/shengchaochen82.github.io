# Homepage Optimization Design

**Date:** 2026-04-05  
**Scope:** Academic homepage at `/Users/pavelchen/Desktop/githubpage`  
**Stack:** Jekyll + minimal-light theme, SCSS, vanilla JS

---

## Goals

Optimize the personal academic homepage across four areas: bug fixes, visual section differentiation, sidebar polish, and scroll animations. Each change is committed and pushed independently.

---

## A. Bug Fixes

| Issue | Location | Fix |
|-------|----------|-----|
| `.about-intro` missing horizontal padding | `_includes/about_research.html` | Change `padding: 20px 0` → `padding: 20px 24px` |
| `.talk-marker` broken in CSS grid | `index.md` | Remove `talk-marker` div and its styles (markers only work in flex/block timeline, not grid) |
| `strong:hover` layout shift | `index.md` | Remove `display: inline-block` and `transform: scale(1.02)` — keep only `color` transition |
| Redundant background script | `_layouts/homepage.html` | Remove `dynamic-world-bg.js` script tag (background handled by `svg-wave-bg.js`) |

---

## B. Accent-Colored Sections

Replace the uniform `linear-gradient(145deg, #ffffff, #f8f9fa)` card style with section-specific accents using a `border-top` stripe + matching heading/icon color:

| Section | Accent Color | Hex |
|---------|-------------|-----|
| About Me | Blue | `#2563eb` |
| News | Teal | `#0891b2` |
| Honors | Gold | `#ca8a04` |
| Experiences | Orange | `#ea580c` |
| Talks | Purple | `#9333ea` |

Implementation: add `border-top: 3px solid <accent>` to each section wrapper. Consolidate the repeated `style="margin: 2px 0px 15px;"` on `<h2>` tags into a `.section-heading` CSS class.

Dark mode: accent colors adjusted to their lighter variants for contrast.

---

## C. Sidebar Polish

- **Remove** the flag counter / visitor stats widget (`_layouts/homepage.html`)
- **Add** a minimal "Currently @ UTS" status pill in its place
- **Tighten** avatar spacing: reduce `padding: 20px` to `padding: 12px` on `.image.avatar img`
- **Add** a soft CSS `@keyframes` load entrance (fade + translateY) for the `header` element

---

## D. Animations

- **Scroll entrance:** `IntersectionObserver` on each section — fade-in + 20px slide-up on enter viewport. Threshold: 0.1. Once-only (no re-trigger).
- **Soften card hover:** Change `cubic-bezier(0.34, 1.56, 0.64, 1)` → `cubic-bezier(0.25, 0.46, 0.45, 0.94)` across all card hover transitions (removes the rubbery overshoot).
- **Respect `prefers-reduced-motion`:** All new animations must be wrapped in a `@media (prefers-reduced-motion: no-preference)` guard.

---

## Commit Order

1. Bug fixes (A)
2. Accent-colored sections (B)
3. Sidebar polish (C)
4. Scroll animations (D)
