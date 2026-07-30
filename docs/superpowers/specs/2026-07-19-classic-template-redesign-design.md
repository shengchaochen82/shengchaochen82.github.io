# Classic Template Redesign

**Date:** 2026-07-19
**Scope:** Academic homepage at `/Users/pavelchen/Desktop/githubpage`
**Stack:** Jekyll + minimal-light theme (current), moving homepage rendering to a new `classic` layout
**Reference template:** https://jingdu-cs.github.io/ (source: `jingdu-cs/jingdu-cs.github.io`)

---

## Goal

Replace the current "editorial minimal" homepage design (sticky sidebar, aurora overlay, JS slide-out panels for Publications/Academic Services) with a literal visual replica of the reference template's look: table-style header block, plain gray/white academic styling, section headings with `[go top]` anchors, everything flowing on one page with no JS panels — while keeping the current site's dark-mode support and mobile responsiveness (the reference template has neither, but the user explicitly wants both kept), and keeping the Jekyll data-driven content pipeline (`_data/publications.yml`, services data) so future edits stay in data/markdown, not hand-edited HTML.

---

## Approach

Build a new `_layouts/classic.html` + `assets/css/classic.css` that reproduce the reference template's visual rules (fonts, colors, spacing, borders, section-header style, `[go top]` links) using modern CSS (flexbox/grid) instead of the reference's legacy table/empty-div layout hacks. Visual output matches; markup stays clean and maintainable. `index.md` and `_includes/*.html` are rewritten to emit the new section structure via Jekyll includes/data loops, not static hand-written HTML.

The old editorial-minimal layout (`_layouts/homepage.html`), its dedicated includes, and `assets/css/style.css`/`publications.css` (editorial-specific rules) are retired once the new layout is live — no dual-maintenance of two homepage skins.

The reconstruction-overlay toggle (`site.under_reconstruction` in `_config.yml`) and the flag-counter visitor widget carry over unchanged, independent of this redesign.

---

## Section-by-Section Content Mapping

The reference template has 6 sections (Biography, Research Interest, Publications, Awards & Honors, Academia Services, Teaching Experience) plus a header info block. The current site has extra sections (News, Talks, Experience) with no direct equivalent — approved mapping:

| New section | Source content |
|---|---|
| **Header** | Avatar (`assets/img/avatar.png`) + name + title/position + affiliation (AAII, UTS) + location + email, laid out like the reference's photo + info table |
| **Biography** | Current About paragraph, rewritten as flowing narrative prose that folds in **Experience** (Shenzhen Institute of Meteorological Innovation research internship) and **Talks** (WWW 2025 tutorial, AJCAI/IJCAI workshop talks) as narrative mentions — mirrors the reference's "I am now a postdoc... Previously I worked as..." style |
| **Research Interest** | Current About research-focus paragraph, expanded into a short paragraph + bullet list of focus areas (machine learning, multimodal learning, agentic AI, AI for scientific design/problem solving) |
| **Publications** | Existing thematic categories from `_data/publications.yml` (Federated Foundation Model, etc.), rendered as a flat, always-visible list per category (reference-style), replacing the current click-to-open slide-out panel |
| **Awards & Honors** | Direct migration of the current Honors & Awards list |
| **Academia Services** | Existing services data (Journal Reviewer, Conference Reviewer/PC Member, Area Chair, Associate Editor) from `_includes/services_panel.html`, rendered as a flat bullet list (reference-style) instead of a click-to-open panel |
| **Teaching Experience** | Omitted — no data exists yet. Section is left out entirely (not rendered with an empty heading) until the user has content to add |

**News section is dropped**: its paper-acceptance items duplicate what's already listed in Publications, and its award items duplicate Honors & Awards — folding it in would just create redundant listings.

---

## Non-Goals

- No change to the reconstruction-overlay content/behavior.
- No change to CNAME / custom domain / deployment.
- No new content is invented — all copy comes from existing site data, reworded only for narrative flow (Biography/Research Interest prose).
- Teaching Experience section is not stubbed out; it is simply absent until real content exists.

---

## Verification

- `bundle exec jekyll serve` (or equivalent) locally, visually compare each section against the reference template's layout/spacing/typography.
- Toggle OS dark mode and confirm readability/contrast across all new sections.
- Resize to mobile width and confirm the header/info block and section content reflow without overflow.
- Confirm `[go top]` anchors scroll correctly from every section.
- Confirm Publications and Academia Services render all existing data (no dropped entries) in the new flat-list style.
