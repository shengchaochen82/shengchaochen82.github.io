# Homepage Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 4 bugs, add per-section accent colors, polish the sidebar, and add scroll-triggered entrance animations — each committed and pushed independently.

**Architecture:** Jekyll static site with inline `<style>` blocks per include file. Changes are surgical edits to existing HTML/CSS/JS files. No build step required locally; `bundle exec jekyll serve` for preview.

**Tech Stack:** Jekyll, SCSS (`_sass/minimal-light.scss`), vanilla JS, Font Awesome 6, inline `<style>` per include.

---

### Task 1: Bug Fixes

**Files:**
- Modify: `_includes/about_research.html` — fix horizontal padding on `.about-intro`
- Modify: `index.md` — remove broken `.talk-marker`, fix `strong:hover` layout shift
- Modify: `_layouts/homepage.html` — remove redundant `dynamic-world-bg.js` script tag

- [ ] **Step 1: Fix `.about-intro` horizontal padding**

In `_includes/about_research.html`, find and change:
```css
/* BEFORE */
.about-intro {
  padding: 20px 0;
```
to:
```css
/* AFTER */
.about-intro {
  padding: 20px 24px;
```

- [ ] **Step 2: Remove broken talk-marker divs**

In `index.md`, inside each `.talk-card` div, remove the `<div class="talk-marker"></div>` line (appears 3 times). Also remove these CSS rules from the `<style>` block in `index.md`:
```css
/* REMOVE these entire rule blocks */
.talk-marker {
  position: absolute;
  left: -28px;
  top: 14px;
  width: 14px;
  height: 14px;
  background: #6699cc;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(102, 153, 204, 0.3);
  z-index: 2;
}
```

- [ ] **Step 3: Fix `strong:hover` layout shift**

In `index.md`, find this rule in the `<style>` block and replace it:
```css
/* BEFORE */
strong:hover, b:hover {
  color: #6699cc;
  transform: scale(1.02);
  transition: all 0.2s ease;
  display: inline-block;
}
```
```css
/* AFTER */
strong:hover, b:hover {
  color: #6699cc;
  transition: color 0.2s ease;
}
```

- [ ] **Step 4: Remove redundant dynamic-world-bg.js**

In `_layouts/homepage.html`, remove this line (the wave background is already handled by `svg-wave-bg.js`):
```html
<script src="{{ "/assets/js/svg-wave-bg.js" | relative_url }}"></script>
```
Wait — actually `svg-wave-bg.js` IS the one to keep. Remove the `dynamic-world-bg.js` div instead. In `_layouts/homepage.html`, remove:
```html
<div id="dynamic-world-bg" aria-hidden="true"></div>
```
And in `index.md` style block, remove the rule:
```css
#dynamic-world-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  opacity: 1;
}
```

- [ ] **Step 5: Verify in browser**

Run: `bundle exec jekyll serve`
Check: About section text has visible horizontal padding. No console errors about missing scripts. Hovering `<strong>` text no longer causes layout jump.

- [ ] **Step 6: Commit and push**

```bash
git add _includes/about_research.html index.md _layouts/homepage.html
git commit -m "Fix: about-intro padding, talk-marker in grid, strong hover layout shift, remove redundant bg div"
git push
```

---

### Task 2: Accent-Colored Sections

**Files:**
- Modify: `_includes/about_research.html` — blue accent on `.about-research-section`
- Modify: `_includes/news.html` — teal accent on `.news-section`
- Modify: `index.md` — gold on `.honors-section`, orange on `.experiences-section`, purple on `.talks-section`

Each section gets `border-top: 3px solid <accent>` on the section wrapper and a matching accent color override for its `h2`.

- [ ] **Step 1: About section — blue accent**

In `_includes/about_research.html`, update `.about-research-section`:
```css
/* BEFORE */
.about-research-section {
  margin: 30px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```
```css
/* AFTER */
.about-research-section {
  margin: 30px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #2563eb;
}
```

And add a heading override inside `.about-research-section`:
```css
.about-research-section > h2 {
  color: #1d4ed8;
}

@media (prefers-color-scheme: dark) {
  .about-research-section > h2 {
    color: #60a5fa;
  }
  .about-research-section {
    border-top-color: #3b82f6;
  }
}
```

- [ ] **Step 2: News section — teal accent**

In `_includes/news.html`, update `.news-section`:
```css
/* BEFORE */
.news-section {
  margin: 30px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```
```css
/* AFTER */
.news-section {
  margin: 30px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #0891b2;
}
```

Add heading override after the existing `.news-header h2` rule:
```css
.news-section > .news-header > h2 {
  color: #0e7490;
}

@media (prefers-color-scheme: dark) {
  .news-section {
    border-top-color: #22d3ee;
  }
  .news-section > .news-header > h2 {
    color: #22d3ee;
  }
}
```

- [ ] **Step 3: Honors section — gold accent**

In `index.md`, update `.honors-section`:
```css
/* BEFORE */
.honors-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```
```css
/* AFTER */
.honors-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #ca8a04;
}

.honors-section > h2 {
  color: #92400e;
}

@media (prefers-color-scheme: dark) {
  .honors-section {
    border-top-color: #fbbf24;
  }
  .honors-section > h2 {
    color: #fbbf24;
  }
}
```

- [ ] **Step 4: Experiences section — orange accent**

In `index.md`, update `.experiences-section`:
```css
/* BEFORE */
.experiences-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```
```css
/* AFTER */
.experiences-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #ea580c;
}

.experiences-section > h2 {
  color: #c2410c;
}

@media (prefers-color-scheme: dark) {
  .experiences-section {
    border-top-color: #fb923c;
  }
  .experiences-section > h2 {
    color: #fb923c;
  }
}
```

- [ ] **Step 5: Talks section — purple accent**

In `index.md`, update `.talks-section`:
```css
/* BEFORE */
.talks-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}
```
```css
/* AFTER */
.talks-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border-top: 3px solid #9333ea;
}

.talks-section > h2 {
  color: #7e22ce;
}

@media (prefers-color-scheme: dark) {
  .talks-section {
    border-top-color: #c084fc;
  }
  .talks-section > h2 {
    color: #c084fc;
  }
}
```

- [ ] **Step 6: Remove redundant inline margin styles from h2 tags**

In `index.md`, find the 3 section headings that have inline styles and strip the `style` attribute (the base CSS in `_sass/minimal-light.scss` already sets `h2 { margin: 2px 0px 15px; }`):

```html
<!-- BEFORE -->
<h2 style="margin: 2px 0px 15px;">Honors and Awards</h2>
<h2 style="margin: 2px 0px 15px;">Experiences</h2>
<h2 style="margin: 2px 0px 15px;">Talks</h2>
```
```html
<!-- AFTER -->
<h2>Honors and Awards</h2>
<h2>Experiences</h2>
<h2>Talks</h2>
```

- [ ] **Step 7: Verify in browser**

Run: `bundle exec jekyll serve`  
Check: Each section card has a distinct colored top border. Headings match the accent color. Dark mode switches to lighter accent variants.

- [ ] **Step 8: Commit and push**

```bash
git add _includes/about_research.html _includes/news.html index.md
git commit -m "Design: add per-section accent colors (blue/teal/gold/orange/purple)"
git push
```

---

### Task 3: Sidebar Polish

**Files:**
- Modify: `_layouts/homepage.html` — remove flag counter, add status pill, tighten avatar, add header entrance animation

- [ ] **Step 1: Remove flag counter widget**

In `_layouts/homepage.html`, remove this entire block:
```html
<div class="visitor-stats">
  <div class="stats-title"><i class="fas fa-chart-bar"></i> Visitor Statistics</div>
  <a href="https://info.flagcounter.com/skLf">
    <img src="https://s11.flagcounter.com/count2/skLf/bg_FFFFFF/txt_000000/border_CCCCCC/columns_3/maxflags_12/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" border="0" class="flag-counter">
  </a>
</div>

<br>
```

Also remove the `.visitor-stats`, `.stats-title`, `.flag-counter` CSS rules from the `<style>` block in `_layouts/homepage.html`.

- [ ] **Step 2: Add "Currently @ UTS" status pill**

In `_layouts/homepage.html`, after the `<email>` tag block and before the `<br>`, add:
```html
<div class="status-pill">
  <span class="status-dot"></span>
  <span class="status-text">PhD @ UTS · Sydney</span>
</div>
```

Add styles to the `<style>` block in `_layouts/homepage.html`:
```css
.status-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin: 10px 0;
  padding: 5px 12px;
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.25);
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 600;
  color: #065f46;
}

.status-dot {
  width: 7px;
  height: 7px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse-dot 2s ease-in-out infinite;
  flex-shrink: 0;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(0.85); }
}

@media (prefers-color-scheme: dark) {
  .status-pill {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.3);
    color: #6ee7b7;
  }
}
```

- [ ] **Step 3: Tighten avatar padding**

In `_sass/minimal-light.scss`, find and update:
```css
/* BEFORE */
.image.avatar img {
  border-radius: 100%;
  width: 45%;
  padding: 20px;
}
```
```css
/* AFTER */
.image.avatar img {
  border-radius: 100%;
  width: 45%;
  padding: 12px;
}
```

- [ ] **Step 4: Add header entrance animation**

In `_layouts/homepage.html`, add to the `<style>` block:
```css
@media (prefers-reduced-motion: no-preference) {
  header {
    animation: header-enter 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  @keyframes header-enter {
    from {
      opacity: 0;
      transform: translateY(-12px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

- [ ] **Step 5: Verify in browser**

Run: `bundle exec jekyll serve`  
Check: Flag counter gone. Green pulsing "PhD @ UTS · Sydney" pill visible below email. Avatar sits tighter. Sidebar fades in on load.

- [ ] **Step 6: Commit and push**

```bash
git add _layouts/homepage.html _sass/minimal-light.scss
git commit -m "Polish: remove flag counter, add status pill, tighten avatar, header entrance animation"
git push
```

---

### Task 4: Scroll Animations + Soften Card Hover

**Files:**
- Create: `assets/js/scroll-animations.js`
- Modify: `_layouts/homepage.html` — add script tag, soften cubic-bezier on existing hover styles
- Modify: `_includes/news.html` — soften cubic-bezier
- Modify: `_includes/about_research.html` — soften cubic-bezier
- Modify: `index.md` — soften cubic-bezier on card hovers

- [ ] **Step 1: Create scroll-animations.js**

Create `assets/js/scroll-animations.js` with this content:
```js
(function () {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SELECTOR = [
    '.about-research-section',
    '.news-section',
    '#publications-wrapper',
    '.honors-section',
    '.experiences-section',
    '.talks-section',
    '#services-wrapper',
  ].join(', ');

  const style = document.createElement('style');
  style.textContent = `
    .scroll-hidden {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .scroll-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  function initObserver() {
    const sections = document.querySelectorAll(SELECTOR);
    sections.forEach(function (el) {
      el.classList.add('scroll-hidden');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
```

- [ ] **Step 2: Add script tag to layout**

In `_layouts/homepage.html`, after the `svg-wave-bg.js` script tag, add:
```html
<script src="{{ "/assets/js/scroll-animations.js" | relative_url }}"></script>
```

- [ ] **Step 3: Soften cubic-bezier in index.md**

In `index.md`, replace all instances of `cubic-bezier(0.34, 1.56, 0.64, 1)` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. There are 3 occurrences (`.experience-card`, `.talk-card`, `.honor-item`).

- [ ] **Step 4: Soften cubic-bezier in news.html**

In `_includes/news.html`, replace `cubic-bezier(0.34, 1.56, 0.64, 1)` with `cubic-bezier(0.25, 0.46, 0.45, 0.94)` in `.news-icon` and `.news-card` transition rules.

- [ ] **Step 5: Soften cubic-bezier in about_research.html**

In `_includes/about_research.html`, replace any `cubic-bezier(0.34, 1.56, 0.64, 1)` occurrences with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.

- [ ] **Step 6: Verify in browser**

Run: `bundle exec jekyll serve`  
Check: Sections fade in + slide up as you scroll down. Card hover transitions feel smooth without rubbery overshoot. Verify with DevTools that `IntersectionObserver` fires once per section.

- [ ] **Step 7: Commit and push**

```bash
git add assets/js/scroll-animations.js _layouts/homepage.html _includes/news.html _includes/about_research.html index.md
git commit -m "Animate: scroll entrance for sections, soften card hover spring"
git push
```
