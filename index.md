---
layout: homepage
---

{% include_relative _includes/about_research.html %}

{% include_relative _includes/news.html %}

{% include_relative _includes/categorized_publications.html %}

<div class="ed-section">
  <h2>Honors &amp; Awards</h2>
  <ul class="ed-honors">
    <li><strong>AAII Best Student Paper Award</strong> &nbsp;·&nbsp; University of Technology Sydney</li>
    <li><strong>National Scholarship</strong> &nbsp;·&nbsp; Top 0.1% (1 / 1218)</li>
    <li><strong>Outstanding Master's Thesis</strong> &nbsp;·&nbsp; Hainan Province, China</li>
    <li><strong>Outstanding Master's Thesis</strong> &nbsp;·&nbsp; 1st place (institution)</li>
    <li>Outstanding Graduate Student</li>
    <li>Outstanding Graduates</li>
  </ul>
</div>

<div class="ed-section">
  <h2>Experience</h2>
  <ul class="ed-experience">
    <li>
      <span class="ed-exp-date">Jul 2021 – Jan 2023, Mar 2023 – Jun 2024</span>
      <span class="ed-exp-body">
        <strong>Research Intern, Machine Learning</strong><br>
        Shenzhen Institute of Meteorological Innovation, China.
        Conducted research on machine-learning applications for meteorological prediction and climate modeling — time-series analysis and remote-sensing data processing.
      </span>
    </li>
  </ul>
</div>

<div class="ed-section">
  <h2>Talks</h2>
  <ul class="ed-talks">
    <li>
      <span class="ed-talk-date">Apr 2025</span>
      <span class="ed-talk-body">
        <strong>Federated Intelligence in Web: A Tutorial</strong><br>
        <em>WWW 2025</em>, Sydney, Australia.
      </span>
    </li>
    <li>
      <span class="ed-talk-date">Nov 2024</span>
      <span class="ed-talk-body">
        <strong>Personalized Adapter for Large Meteorology Models on Devices</strong><br>
        <em>FLFM Workshop @ AJCAI 2024</em>, Melbourne, Australia.
      </span>
    </li>
    <li>
      <span class="ed-talk-date">Aug 2024</span>
      <span class="ed-talk-body">
        <strong>Federated Prompt Learning for Weather Foundation Models on Devices</strong><br>
        <em>Main Track &amp; AI4CI Workshop @ IJCAI 2024</em>, Jeju, South Korea.
      </span>
    </li>
  </ul>
</div>

{% include_relative _includes/services_panel.html %}

<style>
  .ed-honors {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ed-honors li {
    padding: 11px 0;
    border-bottom: 1px dotted #e5e7eb;
    font-size: 0.97rem;
    color: #1f2937;
  }

  .ed-honors li:last-child { border-bottom: none; }

  .ed-experience,
  .ed-talks {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .ed-experience li,
  .ed-talks li {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 22px;
    padding: 16px 0;
    border-bottom: 1px dotted #e5e7eb;
    align-items: baseline;
  }

  .ed-experience li:last-child,
  .ed-talks li:last-child {
    border-bottom: none;
  }

  .ed-exp-date,
  .ed-talk-date {
    color: #6b7280;
    font-size: 0.86rem;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }

  .ed-exp-body,
  .ed-talk-body {
    color: #1f2937;
    font-size: 0.97rem;
    line-height: 1.6;
  }

  .ed-exp-body strong,
  .ed-talk-body strong {
    color: #0a0a0a;
  }

  @media (max-width: 600px) {
    .ed-experience li,
    .ed-talks li {
      grid-template-columns: 1fr;
      gap: 4px;
    }
  }

  @media (prefers-color-scheme: dark) {
    .ed-honors li,
    .ed-experience li,
    .ed-talks li { border-bottom-color: #292929; color: #d4d4d4; }
    .ed-exp-date, .ed-talk-date { color: #9ca3af; }
    .ed-exp-body, .ed-talk-body { color: #d4d4d4; }
    .ed-exp-body strong, .ed-talk-body strong { color: #fafafa; }
  }
</style>
