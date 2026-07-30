# Classic Template Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current "editorial minimal" Jekyll homepage with a new `classic` layout that visually replicates https://jingdu-cs.github.io/ (plain gray/white academic styling, table-style header, `[go top]` anchors, flat no-JS-panel sections) while keeping dark-mode support, mobile responsiveness, and the Jekyll data-driven content pipeline.

**Architecture:** A new `_layouts/classic.html` + `assets/css/classic.css` reproduce the reference template's visual rules with modern CSS. `index.md` switches to this layout and pulls in five new `_includes/classic_*.html` partials (Biography, Research Interest, Publications, Awards & Honors, Academia Services) that render from existing `_data/publications.yml` and a new `_data/services.yml`. The old editorial-minimal layout, includes, and CSS are deleted once the new layout is confirmed live. Full content mapping and rationale: `docs/superpowers/specs/2026-07-19-classic-template-redesign-design.md`.

**Tech Stack:** Jekyll 3.8.5 (GitHub Pages "legacy" build, branch `main`, path `/`), Liquid templating, plain CSS (no SCSS needed for the new files), no JS frameworks.

**Environment note:** The local Ruby is 2.6.10, too old for this Jekyll's gem dependencies (`bundle install` fails on `ffi` requiring Ruby ≥ 3.0) — there is no local `jekyll build`/`jekyll serve` available. Verification instead uses: (a) grep-based structural checks on each file right after writing it, and (b) after pushing, polling the live GitHub Pages build via `gh api repos/shengchaochen82/shengchaochen82.github.io/pages/builds/latest` (build_type is `legacy`, so pushes to `main` trigger a Pages build automatically) plus `curl`-ing the deployed page to confirm the new sections render.

**Working style:** Commit and push after every task (per project convention — see recent git log). Do not batch multiple tasks into one commit.

---

### Task 1: Classic stylesheet

**Files:**
- Create: `assets/css/classic.css`

- [ ] **Step 1: Write the file**

```css
/* ===========================
   Classic Template
   (plain academic homepage styling, modeled on
   https://jingdu-cs.github.io/files/styles/Screen_Styles.css)
   =========================== */

:root {
  --classic-bg: #ffffff;
  --classic-text: #333333;
  --classic-heading: #1a1a1a;
  --classic-title: #880000;
  --classic-border: #cccccc;
  --classic-link: #214c9a;
  --classic-link-hover: #d9671e;
  --classic-muted: #6b7280;
}

@media (prefers-color-scheme: dark) {
  :root {
    --classic-bg: #14171c;
    --classic-text: #d4d4d4;
    --classic-heading: #f5f5f5;
    --classic-title: #ff9c88;
    --classic-border: #33383f;
    --classic-link: #7fb2ff;
    --classic-link-hover: #ffab7a;
    --classic-muted: #9ca3af;
  }
}

html, body {
  margin: 0;
  padding: 0;
  background: var(--classic-bg);
}

body {
  color: var(--classic-text);
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 15px;
  line-height: 1.5;
  padding: 0 20px;
  -webkit-font-smoothing: antialiased;
}

.classic-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 28px 0 60px;
}

.classic-pagetitle {
  font-size: 26px;
  font-weight: 700;
  color: var(--classic-title);
  border-bottom: 1px solid var(--classic-border);
  padding-bottom: 6px;
  margin: 0 0 20px;
}

.classic-header {
  display: flex;
  gap: 26px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.classic-avatar {
  width: 140px;
  height: 140px;
  border-radius: 4px;
  object-fit: cover;
  flex-shrink: 0;
}

.classic-info p {
  margin: 3px 0;
  font-size: 15px;
}

.classic-name {
  font-size: 22px;
  font-weight: 700;
  color: var(--classic-heading);
  margin: 0 0 6px !important;
}

.classic-content {
  display: block;
}

.classic-section {
  padding-top: 32px;
}

.classic-section h1 {
  font-size: 20px;
  font-weight: 600;
  color: var(--classic-heading);
  border-bottom: 1px solid var(--classic-border);
  padding-bottom: 4px;
  margin: 0 0 14px;
}

.classic-section h2 {
  font-size: 16px;
  font-weight: 700;
  color: var(--classic-heading);
  margin: 20px 0 8px;
}

.classic-section h2:first-of-type {
  margin-top: 4px;
}

.classic-section p {
  margin: 0 0 10px;
}

.classic-section ul {
  padding-left: 26px;
  margin: 0 0 10px;
}

.classic-section li {
  margin: 5px 0;
}

.classic-pub {
  margin-bottom: 12px;
}

.classic-pub-title {
  font-weight: 700;
}

.classic-pub-meta {
  color: var(--classic-muted);
}

.classic-goto {
  font-size: 13px;
  margin-top: 14px !important;
}

a,
.classic-section a,
.classic-header a {
  color: var(--classic-link);
  text-decoration: none;
}

a:hover,
.classic-section a:hover,
.classic-header a:hover {
  color: var(--classic-link-hover);
  text-decoration: underline;
}

.classic-footer {
  border-top: 1px solid var(--classic-border);
  margin-top: 44px;
  padding-top: 18px;
  text-align: center;
  font-size: 13px;
  color: var(--classic-muted);
}

.classic-flagcounter {
  display: block;
  margin: 0 auto 12px;
}

.classic-flagcounter img {
  max-width: 220px;
  height: auto;
  opacity: 0.85;
  display: block;
  margin: 0 auto;
}

@media (max-width: 700px) {
  body {
    padding: 0 14px;
  }

  .classic-page {
    padding: 20px 0 44px;
  }

  .classic-pagetitle {
    font-size: 22px;
  }

  .classic-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .classic-avatar {
    width: 120px;
    height: 120px;
  }
}
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "prefers-color-scheme: dark" assets/css/classic.css && grep -c "max-width: 700px" assets/css/classic.css`
Expected: both commands print `1` (one dark-mode block, one mobile breakpoint present).

- [ ] **Step 3: Commit**

```bash
git add assets/css/classic.css
git commit -m "$(cat <<'EOF'
Add classic.css for the new classic-template layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 2: Classic layout

**Files:**
- Create: `_layouts/classic.html`

- [ ] **Step 1: Write the file**

```html
<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
  <head>
    <title>{{ site.title }} | {{ site.affiliation }}</title>

    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="{{ site.description }}">
    {% if site.keywords %}
    <meta name="keywords" content="{{ site.keywords }}">
    {% endif %}
    {% if site.canonical %}
    <link rel="canonical" href="{{ site.canonical }}"/>
    {% endif %}

    <link rel="icon" media="(prefers-color-scheme:dark)" href="{{ site.favicon_dark }}" type="image/png" />
    <link rel="icon" media="(prefers-color-scheme:light)" href="{{ site.favicon }}" type="image/png" />
    <script src="./assets/js/favicon-switcher.js" type="application/javascript"></script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="stylesheet" href="./assets/css/classic.css">
  </head>
  <body>
    {% if site.under_reconstruction %}
    <div id="reconstruction-overlay" role="main" aria-label="Site under reconstruction">
      <div class="recon-blob blob-1"></div>
      <div class="recon-blob blob-2"></div>
      <div class="recon-blob blob-3"></div>
      <div class="recon-blob blob-4"></div>
      <div class="recon-blob blob-5"></div>
      <div class="recon-inner">
        {% if site.avatar %}
        <img src="{{ site.avatar }}" alt="Shengchao Chen" class="recon-avatar" />
        {% endif %}
        <h1 class="recon-name">Shengchao Chen</h1>
        <p class="recon-subtitle">AI Researcher</p>
        <div class="recon-tags">
          <span>Machine Learning</span>
          <span>Multimodal Learning</span>
          <span>Agentic AI</span>
          <span>AI for Science</span>
        </div>
        <div class="recon-divider"></div>
        <p class="recon-status">✦ &nbsp;This site is being reimagined</p>
      </div>
    </div>

    <style>
      #reconstruction-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #050810;
        overflow: hidden;
      }

      #reconstruction-overlay::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: 1;
        pointer-events: none;
        background:
          radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 100%),
          radial-gradient(ellipse at 50% 50%, transparent 36%, rgba(5, 8, 16, 0.6) 100%);
      }

      .recon-blob {
        position: absolute;
        border-radius: 50%;
        pointer-events: none;
      }

      .blob-1 {
        width: 720px;
        height: 720px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.88) 0%, transparent 70%);
        filter: blur(130px);
        opacity: 0.38;
        top: -220px;
        left: -160px;
      }

      .blob-2 {
        width: 580px;
        height: 580px;
        background: radial-gradient(circle, rgba(16, 185, 129, 0.82) 0%, transparent 70%);
        filter: blur(120px);
        opacity: 0.34;
        bottom: -160px;
        right: -90px;
      }

      .blob-3 {
        width: 480px;
        height: 480px;
        background: radial-gradient(circle, rgba(168, 85, 247, 0.85) 0%, transparent 70%);
        filter: blur(110px);
        opacity: 0.31;
        top: 22%;
        right: -120px;
      }

      .blob-4 {
        width: 380px;
        height: 380px;
        background: radial-gradient(circle, rgba(6, 182, 212, 0.78) 0%, transparent 70%);
        filter: blur(100px);
        opacity: 0.27;
        bottom: 14%;
        left: 2%;
      }

      .blob-5 {
        width: 300px;
        height: 300px;
        background: radial-gradient(circle, rgba(251, 113, 133, 0.72) 0%, transparent 70%);
        filter: blur(110px);
        opacity: 0.2;
        top: 6%;
        right: 14%;
      }

      @keyframes blob-drift-1 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(150px, 110px) scale(1.16); }
      }

      @keyframes blob-drift-2 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-110px, -75px) scale(0.86); }
      }

      @keyframes blob-drift-3 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-75px, 95px) scale(1.12); }
      }

      @keyframes blob-drift-4 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(95px, -60px) scale(1.08); }
      }

      @keyframes blob-drift-5 {
        0%   { transform: translate(0, 0) scale(1); }
        100% { transform: translate(-55px, 75px) scale(1.18); }
      }

      @keyframes recon-gradient {
        0%   { background-position: 0% center; }
        100% { background-position: 300% center; }
      }

      @media (prefers-reduced-motion: no-preference) {
        .blob-1 { animation: blob-drift-1 28s ease-in-out infinite alternate; }
        .blob-2 { animation: blob-drift-2 34s ease-in-out infinite alternate; }
        .blob-3 { animation: blob-drift-3 31s ease-in-out infinite alternate; }
        .blob-4 { animation: blob-drift-4 38s ease-in-out infinite alternate; }
        .blob-5 { animation: blob-drift-5 26s ease-in-out infinite alternate; }
        .recon-status { animation: recon-gradient 6s linear infinite; }
      }

      .recon-inner {
        position: relative;
        z-index: 2;
        text-align: center;
        max-width: 580px;
        width: 100%;
        padding: 0 28px;
      }

      .recon-avatar {
        width: 108px;
        height: 108px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 26px;
        box-shadow: 0 8px 40px rgba(0, 0, 0, 0.6), 0 0 0 3px rgba(99, 102, 241, 0.45);
      }

      .recon-name {
        font-size: 3.8rem;
        font-weight: 700;
        letter-spacing: -0.03em;
        color: #f8fafc;
        margin: 0 0 14px;
        line-height: 1.05;
        text-shadow: 0 2px 32px rgba(99, 102, 241, 0.5);
      }

      .recon-subtitle {
        font-size: 0.9rem;
        color: #94a3b8;
        margin: 0 0 28px;
        font-weight: 500;
        letter-spacing: 0.2em;
        text-transform: uppercase;
      }

      .recon-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        justify-content: center;
        margin-bottom: 34px;
      }

      .recon-tags span {
        padding: 7px 18px;
        border-radius: 20px;
        font-size: 0.88rem;
        font-weight: 600;
        background: rgba(255, 255, 255, 0.07);
        border: 1px solid rgba(255, 255, 255, 0.13);
        color: #cbd5e1;
      }

      .recon-divider {
        width: 64px;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(129, 140, 248, 0.8), transparent);
        margin: 0 auto 28px;
      }

      .recon-status {
        font-size: 1rem;
        font-weight: 600;
        letter-spacing: 0.07em;
        margin: 0;
        background: linear-gradient(90deg, #818cf8, #22d3ee, #34d399, #a78bfa, #818cf8);
        background-size: 300% auto;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      @media (max-width: 480px) {
        .recon-name { font-size: 2.6rem; }
        .recon-avatar { width: 88px; height: 88px; }
        .blob-1 { opacity: 0.28; }
        .blob-2 { opacity: 0.25; }
        .blob-3 { opacity: 0.22; }
        .blob-4, .blob-5 { opacity: 0.18; }
      }
    </style>
    {% endif %}

    {% assign email_clean = site.email | replace: ' (AT) ', '@' | replace: '(AT)', '@' %}

    <div class="classic-page">
      <a id="top"></a>
      <h1 class="classic-pagetitle">{{ site.title }} @ {{ site.affiliation }}</h1>

      <div class="classic-header">
        {% if site.avatar %}
        <img class="classic-avatar" src="{{ site.avatar }}" alt="{{ site.title }}" />
        {% endif %}
        <div class="classic-info">
          <p class="classic-name">{{ site.title }}</p>
          <p>AI Researcher</p>
          <p><a href="{{ site.affiliation_link }}" target="_blank">{{ site.affiliation }}</a></p>
          <p>Sydney, Australia</p>
          <p>Email: <a href="mailto:{{ email_clean }}">{{ email_clean }}</a></p>
        </div>
      </div>

      <main class="classic-content">
        {{ content }}
      </main>

      {% if site.enable_footnote %}
      <div class="classic-footer">
        <a href="https://info.flagcounter.com/skLf" aria-label="Visitor statistics" class="classic-flagcounter">
          <img src="https://s11.flagcounter.com/count2/skLf/bg_FFFFFF/txt_000000/border_CCCCCC/columns_3/maxflags_12/viewers_0/labels_1/pageviews_1/flags_0/percent_0/" alt="Flag Counter" />
        </a>
        <p>© 2020–2026 Shengchao Chen &nbsp;·&nbsp; Last updated Jul 2026</p>
      </div>
      {% endif %}
    </div>

    {% if site.google_analytics %}
    <script>
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
      ga('create', '{{ site.google_analytics }}', 'auto');
      ga('send', 'pageview');
    </script>
    {% endif %}
  </body>
</html>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "classic.css" _layouts/classic.html && grep -c "reconstruction-overlay" _layouts/classic.html && grep -c "{{ content }}" _layouts/classic.html`
Expected: `1`, `2` (the div id and the CSS selector both contain the string), `1`.

- [ ] **Step 3: Commit**

```bash
git add _layouts/classic.html
git commit -m "$(cat <<'EOF'
Add classic layout (header block + reconstruction overlay carried over)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 3: Academia Services data file

**Files:**
- Create: `_data/services.yml`

- [ ] **Step 1: Write the file**

```yaml
associate_editor:
  title: "Associate Editor"
  venues:
    - name: "JESIT"
      full: "Journal of Electrical Systems and Information Technology"
      link: "https://jesit.springeropen.com/"

area_chair:
  title: "Area Chair"
  venues:
    - name: "IJCNN 2025"
      full: "International Joint Conference on Neural Networks"
      link: "https://2025.ijcnn.org/"

conference_reviewer:
  title: "Conference Reviewer / PC Member"
  venues:
    - name: "NeurIPS"
      full: "Neural Information Processing Systems"
      years: "2023 – 2026"
      link: "https://neurips.cc/"
    - name: "ICML"
      full: "International Conference on Machine Learning"
      years: "2024 – 2026"
      link: "https://icml.cc/"
    - name: "ICLR"
      full: "International Conference on Learning Representations"
      years: "2024 – 2026"
      link: "https://iclr.cc/"
    - name: "AAAI"
      full: "AAAI Conference on Artificial Intelligence"
      years: "2024 – 2026"
      link: "https://www.aaai.org/"
    - name: "IJCAI"
      full: "International Joint Conference on Artificial Intelligence"
      years: "2023 – 2026"
      link: "https://www.ijcai.org/"
    - name: "CVPR"
      full: "Computer Vision and Pattern Recognition"
      years: "2024 – 2026"
      link: "https://cvpr.thecvf.com/"
    - name: "ECCV"
      full: "European Conference on Computer Vision"
      years: "2024, 2026"
      link: "https://eccv.ecva.net/"
    - name: "MICCAI"
      full: "Medical Image Computing and Computer Assisted Intervention"
      years: "2024 – 2026"
      link: "https://miccai.org/"
    - name: "KDD"
      full: "ACM SIGKDD Conference on Knowledge Discovery and Data Mining"
      years: "2024 – 2026"
      link: "https://www.kdd.org/"
    - name: "ECAI"
      full: "European Conference on Artificial Intelligence"
      years: "2024 – 2026"
      link: "https://ecai2024.eu/"
    - name: "ICASSP"
      full: "IEEE Int. Conf. on Acoustics, Speech and Signal Processing"
      years: "2024 – 2026"
      link: "https://2025.ieeeicassp.org/"
    - name: "ICME"
      full: "IEEE Int. Conf. on Multimedia and Expo"
      years: "2024 – 2026"
      link: "https://2025.ieee-icme.org/"
    - name: "ICCV"
      full: "International Conference on Computer Vision"
      link: "https://iccv.thecvf.com/"
    - name: "WWW"
      full: "The Web Conference"
      link: "https://www.iw3c2.org/"
    - name: "MM"
      full: "ACM International Conference on Multimedia"
      link: "https://www.acmmm.org/"

journal_reviewer:
  title: "Journal Reviewer"
  venues:
    - name: "JMLR"
      full: "Journal of Machine Learning Research"
      link: "https://www.jmlr.org/"
    - name: "TPAMI"
      full: "IEEE Transactions on Pattern Analysis and Machine Intelligence"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=34"
    - name: "TNNLS"
      full: "IEEE Transactions on Neural Networks and Learning Systems"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=5962385"
    - name: "TKDE"
      full: "IEEE Transactions on Knowledge and Data Engineering"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=69"
    - name: "TGRS"
      full: "IEEE Transactions on Geoscience and Remote Sensing"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=36"
    - name: "TETC"
      full: "IEEE Transactions on Emerging Topics in Computing"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=6877122"
    - name: "KBS"
      full: "Knowledge-Based Systems"
      link: "https://www.sciencedirect.com/journal/knowledge-based-systems"
    - name: "AIM"
      full: "Artificial Intelligence in Medicine"
      link: "https://www.sciencedirect.com/journal/artificial-intelligence-in-medicine"
    - name: "Information Systems"
      full: "Information Systems (Elsevier)"
      link: "https://www.sciencedirect.com/journal/information-systems"
    - name: "Computer Networks"
      full: "Computer Networks (Elsevier)"
      link: "https://www.sciencedirect.com/journal/computer-networks"
    - name: "TMI"
      full: "IEEE Transactions on Medical Imaging"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=42"
    - name: "TDSC"
      full: "IEEE Transactions on Dependable and Secure Computing"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=8858"
    - name: "TCE"
      full: "IEEE Transactions on Consumer Electronics"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=30"
    - name: "TII"
      full: "IEEE Transactions on Industrial Informatics"
      link: "https://ieeexplore.ieee.org/xpl/RecentIssue.jsp?punumber=41"
    - name: "TMLR"
      full: "Transactions on Machine Learning Research"
      link: "https://jmlr.org/tmlr/"
```

- [ ] **Step 2: Sanity-check the file**

Run: `ruby -ryaml -e "d = YAML.load_file('_data/services.yml'); puts d.keys.inspect; puts d['journal_reviewer']['venues'].length; puts d['conference_reviewer']['venues'].length"`
Expected: prints `["associate_editor", "area_chair", "conference_reviewer", "journal_reviewer"]`, then `15`, then `15` (matches the counts already shown in the live Academic Services panel badges).

- [ ] **Step 3: Commit**

```bash
git add _data/services.yml
git commit -m "$(cat <<'EOF'
Add _data/services.yml (data-driven Academia Services list)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 4: Biography include

**Files:**
- Create: `_includes/classic_biography.html`

- [ ] **Step 1: Write the file**

```html
<section class="classic-section" id="biography">
  <h1>Biography</h1>
  <p>I am affiliated with the <a href="https://www.uts.edu.au/research/australian-artificial-intelligence-institute" target="_blank">Australian Artificial Intelligence Institute (AAII)</a> at the <a href="https://www.uts.edu.au/" target="_blank">University of Technology Sydney</a>, where my research focuses on machine learning, multimodal learning, agentic AI, and AI for scientific design and problem solving. I do research purely out of curiosity.</p>
  <p>Previously, I was a research intern in machine learning at the Shenzhen Institute of Meteorological Innovation, China (Jul 2021 – Jan 2023, Mar 2023 – Jun 2024), where I worked on machine-learning applications for meteorological prediction and climate modeling, including time-series analysis and remote-sensing data processing.</p>
  <p>I have delivered invited talks and tutorials, including <em>Federated Intelligence in Web: A Tutorial</em> at WWW 2025 (Sydney, Australia), <em>Personalized Adapter for Large Meteorology Models on Devices</em> at the FLFM Workshop @ AJCAI 2024 (Melbourne, Australia), and <em>Federated Prompt Learning for Weather Foundation Models on Devices</em> at the Main Track &amp; AI4CI Workshop @ IJCAI 2024 (Jeju, South Korea).</p>
  <p>I am actively seeking collaborations with both academia and industry to tackle real-world challenges. If my research resonates with you, please feel free to <a href="mailto:shengchao.chen.uts@gmail.com">reach out</a>.</p>
  <p class="classic-goto"><a href="#top">[go top]</a></p>
</section>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "Shenzhen Institute of Meteorological Innovation" _includes/classic_biography.html && grep -c "WWW 2025" _includes/classic_biography.html`
Expected: both print `1` (confirms Experience and Talks content made it into the narrative).

- [ ] **Step 3: Commit**

```bash
git add _includes/classic_biography.html
git commit -m "$(cat <<'EOF'
Add classic Biography include (folds in Experience and Talks)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 5: Research Interest include

**Files:**
- Create: `_includes/classic_research_interest.html`

- [ ] **Step 1: Write the file**

```html
<section class="classic-section" id="research-interest">
  <h1>Research Interest</h1>
  <p>My research focuses on <strong>machine learning</strong>, <strong>multimodal learning</strong>, <strong>agentic AI</strong>, and <strong>AI for scientific design and problem solving</strong>, with an emphasis on developing approaches that enable intelligent agents to learn from and reason about a dynamic, open world. My work centers on the following focus areas:</p>
  <ul>
    <li>Machine Learning</li>
    <li>Multimodal Learning</li>
    <li>Agentic AI</li>
    <li>AI for Scientific Design and Problem Solving</li>
  </ul>
  <p class="classic-goto"><a href="#top">[go top]</a></p>
</section>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "<li>" _includes/classic_research_interest.html`
Expected: `4`

- [ ] **Step 3: Commit**

```bash
git add _includes/classic_research_interest.html
git commit -m "$(cat <<'EOF'
Add classic Research Interest include

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 6: Publications include

**Files:**
- Create: `_includes/classic_publications.html`

- [ ] **Step 1: Write the file**

```html
<section class="classic-section" id="publications">
  <h1>Publications &nbsp;<small><a href="https://scholar.google.com/citations?user=9R3tsmUAAAAJ&hl=en" target="_blank">Google Scholar →</a></small></h1>
  {% for category in site.data.publications %}
    {% if category[0] != 'main' and category[0] != 'other' %}
      {% assign cat = category[1] %}
      <h2>{{ cat.title }}</h2>
      {% if cat.description %}<p><em>{{ cat.description }}</em></p>{% endif %}
      <ul>
        {% for paper in cat.papers %}
        <li class="classic-pub">
          <span class="classic-pub-title">
            {% if paper.pdf %}<a href="{{ paper.pdf }}" target="_blank">{{ paper.title }}</a>{% else %}{{ paper.title }}{% endif %}
          </span><br>
          {{ paper.authors }}<br>
          <span class="classic-pub-meta">{{ paper.conference }}</span>
          {% if paper.code or paper.page or paper.notes %}
          <br>
          {% if paper.code %}<a href="{{ paper.code }}" target="_blank">Code</a>{% endif %}
          {% if paper.page %}{% if paper.code %} &nbsp;·&nbsp; {% endif %}<a href="{{ paper.page }}" target="_blank">Project page</a>{% endif %}
          {% if paper.notes %}{% if paper.code or paper.page %} &nbsp;·&nbsp; {% endif %}<span class="classic-pub-meta">{{ paper.notes }}</span>{% endif %}
          {% endif %}
        </li>
        {% endfor %}
      </ul>
    {% endif %}
  {% endfor %}
  <p class="classic-goto"><a href="#top">[go top]</a></p>
</section>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "site.data.publications" _includes/classic_publications.html && grep -c "category\[0\] != 'main'" _includes/classic_publications.html`
Expected: both print `1`. This mirrors the loop guard already proven working in `_includes/categorized_publications.html:9-10`, so the same `main`/`other` keys are correctly skipped.

- [ ] **Step 3: Commit**

```bash
git add _includes/classic_publications.html
git commit -m "$(cat <<'EOF'
Add classic Publications include (flat list, no JS panel)

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 7: Awards & Honors include

**Files:**
- Create: `_includes/classic_honors.html`

- [ ] **Step 1: Write the file**

```html
<section class="classic-section" id="honors">
  <h1>Awards &amp; Honors</h1>
  <ul>
    <li><strong>AAII Best Student Paper Award</strong> &nbsp;·&nbsp; University of Technology Sydney</li>
    <li><strong>National Scholarship</strong> &nbsp;·&nbsp; Top 0.1% (1 / 1218)</li>
    <li><strong>Outstanding Master's Thesis</strong></li>
    <li><strong>Outstanding Master's Thesis</strong> &nbsp;·&nbsp; 1st place</li>
    <li>Outstanding Graduate Student</li>
    <li>Outstanding Graduates</li>
  </ul>
  <p class="classic-goto"><a href="#top">[go top]</a></p>
</section>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "<li>" _includes/classic_honors.html`
Expected: `6` (matches the 6 items currently in `index.md`'s `.ed-honors` list)

- [ ] **Step 3: Commit**

```bash
git add _includes/classic_honors.html
git commit -m "$(cat <<'EOF'
Add classic Awards & Honors include

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 8: Academia Services include

**Files:**
- Create: `_includes/classic_services.html`

- [ ] **Step 1: Write the file**

```html
<section class="classic-section" id="academia-services">
  <h1>Academia Services</h1>
  {% assign service_order = "associate_editor,area_chair,conference_reviewer,journal_reviewer" | split: "," %}
  {% for key in service_order %}
    {% assign cat = site.data.services[key] %}
    <h2>{{ cat.title }}</h2>
    <ul>
      {% for venue in cat.venues %}
      <li>
        {% if venue.link %}<a href="{{ venue.link }}" target="_blank">{{ venue.name }}</a>{% else %}{{ venue.name }}{% endif %}{% if venue.full %}, {{ venue.full }}{% endif %}{% if venue.years %} <small>({{ venue.years }})</small>{% endif %}.
      </li>
      {% endfor %}
    </ul>
  {% endfor %}
  <p class="classic-goto"><a href="#top">[go top]</a></p>
</section>
```

- [ ] **Step 2: Sanity-check the file**

Run: `grep -c "site.data.services" _includes/classic_services.html`
Expected: `1`

- [ ] **Step 3: Commit**

```bash
git add _includes/classic_services.html
git commit -m "$(cat <<'EOF'
Add classic Academia Services include

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

---

### Task 9: Switch `index.md` to the classic layout (go-live)

This is the task that makes the new design visible on the live site. Everything up to here has been additive and non-breaking.

**Files:**
- Modify: `index.md` (entire file — replace contents)

- [ ] **Step 1: Replace `index.md`**

```markdown
---
layout: classic
---

{% include_relative _includes/classic_biography.html %}

{% include_relative _includes/classic_research_interest.html %}

{% include_relative _includes/classic_publications.html %}

{% include_relative _includes/classic_honors.html %}

{% include_relative _includes/classic_services.html %}
```

This removes the old `layout: homepage` front matter, the old `{% include_relative _includes/about_research.html %}` / `news.html` / `categorized_publications.html` / `services_panel.html` includes, the hand-written Honors/Experience/Talks HTML blocks, and their trailing `<style>` block — all of that content now lives in the Task 4–8 includes or `classic.css`.

- [ ] **Step 2: Sanity-check the file**

Run: `cat index.md`
Expected: exactly the 8 lines above (front matter + 5 include lines with blank-line separators), no leftover `<div class="ed-section">`, no leftover `<style>` block.

- [ ] **Step 3: Commit and push**

```bash
git add index.md
git commit -m "$(cat <<'EOF'
Switch homepage to the classic layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

- [ ] **Step 4: Wait for the GitHub Pages build and check its status**

Run: `sleep 60 && gh api repos/shengchaochen82/shengchaochen82.github.io/pages/builds/latest`
Expected: JSON with `"status": "built"`. If `"status": "errored"`, the same response's `error.message` field names the Liquid/YAML problem — fix it in the relevant file from Tasks 1–9, commit, push, and re-run this step.

- [ ] **Step 5: Smoke-test the live page**

Run: `curl -s https://www.schen.pro/ | grep -o '<h1[^>]*>[^<]*</h1>' `
Expected: output includes recognizable section headings, e.g. `Biography`, `Research Interest`, `Publications`, `Awards & Honors`, `Academia Services`, plus the page title `<h1 class="classic-pagetitle">Shengchao Chen @ University of Technology Sydney</h1>` (note: while `site.under_reconstruction` is `true` the overlay covers the page visually in a browser, but the underlying HTML — and this curl check — still contains the full classic-layout markup).

Note: `site.under_reconstruction` is currently `true`, so a human visiting the site in a browser will see the aurora overlay, not the new classic design, until the overlay is toggled off. That's expected — this task only verifies the underlying markup is correct.

---

### Task 10: Retire the old editorial-minimal files

Only start this task after Task 9's Step 4 shows `"status": "built"` with no errors — the classic layout must be confirmed working before the old files it replaces are removed.

**Files:**
- Delete: `_layouts/homepage.html`
- Delete: `_includes/about_research.html`
- Delete: `_includes/news.html`
- Delete: `_includes/categorized_publications.html`
- Delete: `_includes/services_panel.html`
- Delete: `assets/css/style.scss`
- Delete: `assets/css/style-no-dark-mode.scss`
- Delete: `assets/css/publications.css`
- Delete: `assets/css/publications-no-dark-mode.css`
- Delete: `assets/css/font.css`
- Delete: `assets/css/font_sans_serif.css`
- Delete: `services.md`

`services.md` is an orphaned standalone "Academic Services" page (`layout: homepage`, not linked from any nav/menu — confirmed via repo-wide grep) whose content is now fully superseded by the new Academia Services section in `index.md`. Deleting `_layouts/homepage.html`/`style.scss` without removing it would leave it rendering unstyled, so it goes in the same cleanup.

- [ ] **Step 1: Confirm nothing else still references these files**

Run:
```bash
grep -rl "layout: homepage" --include="*.md" .
grep -rln "about_research.html\|news.html\|categorized_publications.html\|services_panel.html" --include="*.html" --include="*.md" . | grep -v "^_includes/\(about_research\|news\|categorized_publications\|services_panel\)\.html$"
grep -rl "style.css\|style-no-dark-mode\|publications.css\|publications-no-dark-mode\|font.css\|font_sans_serif" --include="*.html" .
```
Expected: the first command lists only `services.md` (being deleted in this same task); the second and third print nothing (no other file references these).

- [ ] **Step 2: Delete the files**

```bash
git rm _layouts/homepage.html \
       _includes/about_research.html \
       _includes/news.html \
       _includes/categorized_publications.html \
       _includes/services_panel.html \
       assets/css/style.scss \
       assets/css/style-no-dark-mode.scss \
       assets/css/publications.css \
       assets/css/publications-no-dark-mode.css \
       assets/css/font.css \
       assets/css/font_sans_serif.css \
       services.md
```

- [ ] **Step 3: Commit and push**

```bash
git commit -m "$(cat <<'EOF'
Remove retired editorial-minimal layout, includes, and CSS

Superseded by the classic layout (index.md now uses layout: classic).
services.md is also removed — it was an unlinked standalone page whose
content is now covered by the Academia Services section on the homepage.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
git push
```

- [ ] **Step 4: Re-check the GitHub Pages build**

Run: `sleep 60 && gh api repos/shengchaochen82/shengchaochen82.github.io/pages/builds/latest`
Expected: `"status": "built"`. If `"errored"`, read `error.message`, restore whichever deleted file it names was still needed (`git revert` the deletion of just that file), commit, push, and re-check.

---

### Task 11: Final manual verification

Automated checks (Tasks 1–10) confirm the build doesn't error and the expected markup is present. This task is the human-in-the-loop pass for things that can't be grepped: visual layout, dark mode, and mobile behavior. Hand this checklist to the user since there's no local browser/Jekyll server available in this environment (see the Ruby-version note in the plan header).

- [ ] Temporarily set `under_reconstruction: false` in `_config.yml`, commit, push, wait for the Pages build, and open `https://www.schen.pro/` in a browser
- [ ] Compare section-by-section against https://jingdu-cs.github.io/ — header block, Biography, Research Interest, Publications, Awards & Honors, Academia Services should look structurally equivalent (plain serif type, gray/white palette, `[go top]` links working)
- [ ] Toggle OS dark mode (System Settings → Appearance) and confirm text stays readable with good contrast in both the header and every section
- [ ] Resize the browser to a phone width (~375px) or use responsive dev tools and confirm the header photo/info stack vertically and no text overflows horizontally
- [ ] Click through the "Google Scholar →" link and a few "PDF"/"Code" links in Publications to confirm URLs resolve
- [ ] Once satisfied, restore `under_reconstruction: true` in `_config.yml` (or set to `false` permanently if the user wants the redesigned site live now) — this is the user's call, confirm with them before pushing this last flip
