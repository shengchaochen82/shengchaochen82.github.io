---
layout: homepage
---

{% include_relative _includes/about_research.html %}

{% include_relative _includes/news.html %}

{% include_relative _includes/categorized_publications.html %}

## Honors and Awards
- Outstanding Master's Thesis of Hainan Province
- Outstanding Master's Thesis <span style="color: red;">(1st place)</span>, Hainan University, China.
- Outstanding Graduates, Hainan University, China.
- National Scholarship <span style="color: red;">(Top 0.1%, 1/1218)</span>, Ministrt of Education, China.
- Outstanding Graduate Student, Hainan University, China.

## Experiences
- **[Jul. 2021 - Jan. 2023 & Mar. 2023 - Jun. 2024]** Research Intern (Machine Learning), Shenzhen Institue of Meteorological Innovation, China.

## Talks
- **[Apr. 2025]** Federtaed Intelligence in Web: A Tutorial, **WWW-2025**, Sydney, Australia
- **[Nov. 2024]** Personalized Adapter for Large Meteorology Model on Devices: Towards Weather Foundation Models, **FLFM Workshop in AJCAI-2024**, Melbourne,
Australia
- **[Aug. 2024]** Federated Prompt Learning for Weather Foundation Models on Devices, **Main Track & AI4CI Workshop in IJCAI-2024**, Jeju,
 South Korea

{% include_relative _includes/services_panel.html %}

<style>
/* Global Page Animations - scoped to avoid conflicts */

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Background color that will show through or behind canvas */
body {
  background-color: #f8f9fa;
}

.wrapper {
  background-color: transparent;
}

section {
  background-color: transparent;
}

#dynamic-world-bg {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  pointer-events: none;
  opacity: 0.6;
}

.about-research-section > h2,
.news-header > h2,
#publications-wrapper .pub-header h2,
#services-wrapper .pub-header h2 {
  animation: heading-breath 8s ease-in-out infinite;
}

@keyframes heading-breath {
  0%,
  100% {
    text-shadow: 0 0 0 rgba(102, 153, 204, 0.0);
  }
  50% {
    text-shadow: 0 0 7px rgba(102, 153, 204, 0.16);
  }
}

.about-icon,
.news-icon {
  animation: icon-breath 7s ease-in-out infinite;
}

@keyframes icon-breath {
  0%,
  100% {
    box-shadow: 0 8px 18px rgba(102, 153, 204, 0.2);
  }
  50% {
    box-shadow: 0 10px 22px rgba(102, 153, 204, 0.3);
  }
}

/* Header hover effect */
header a:hover i {
  transform: scale(1.15) rotate(10deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Text selection styling */
::selection {
  background: rgba(102, 153, 204, 0.2);
  color: #333;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #6699cc, #4477aa);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, #4477aa, #336699);
}

/* Selection animation for important text */
strong:hover, b:hover {
  color: #6699cc;
  transform: scale(1.02);
  transition: all 0.2s ease;
  display: inline-block;
}

/* Dark mode scrollbar */
@media (prefers-color-scheme: dark) {
  ::-webkit-scrollbar-track {
    background: #1a202c;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #4477aa, #6699cc);
  }

  ::selection {
    background: rgba(102, 153, 204, 0.3);
    color: #e2e8f0;
  }
}

@media (prefers-reduced-motion: reduce) {
  #dynamic-world-bg {
    display: none;
  }

  *,
  *::before,
  *::after {
    animation: none !important;
    transition: none !important;
  }
}
</style>
