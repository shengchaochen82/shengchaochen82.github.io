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
- **[Aug. 2024]** Federated Prompt Learning for Weather Foundation Models on Devices, **Main Trak & AI4CI Workshop in IJCAI-2024**, Jeju,
 South Korea

{% include_relative _includes/services_panel.html %}

<style>
/* Global Page Animations - scoped to avoid conflicts */

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Only animate section h2 elements that are direct children */
section > h2:not([style*="opacity"]) {
  opacity: 1;
}

/* List items hover effect - no opacity change on load */
section ul li:hover {
  transform: translateX(5px);
  background: rgba(102, 153, 204, 0.05);
  border-radius: 4px;
  padding-left: 8px;
  transition: all 0.3s ease;
}

/* Header hover effect */
header a:hover i {
  transform: scale(1.15) rotate(10deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Image hover effect - only for images that don't already have transforms */
img:not(.avatar):hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
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
</style>

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
- **[Aug. 2024]** Federated Prompt Learning for Weather Foundation Models on Devices, **Main Trak & AI4CI Workshop in IJCAI-2024**, Jeju,
 South Korea

 {% include_relative _includes/services_panel.html %}

<style>
/* Global Page Animations */

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Section fade-in animation */
section > h2 {
  opacity: 0;
  animation: fadeIn 0.6s ease forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* List items animation */
section ul li {
  opacity: 0;
  transition: all 0.3s ease;
}

section ul li:hover {
  transform: translateX(5px);
  background: rgba(102, 153, 204, 0.05);
  border-radius: 4px;
  padding-left: 8px;
}

/* Header hover effect */
header a:hover i {
  transform: scale(1.15) rotate(10deg);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Image hover effect */
img {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

img:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
}

/* Smooth focus effect */
*:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(102, 153, 204, 0.3);
}

*:focus-visible {
  outline: 2px solid #6699cc;
  outline-offset: 2px;
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
strong, b {
  display: inline-block;
  transition: all 0.2s ease;
}

strong:hover, b:hover {
  color: #6699cc;
  transform: scale(1.02);
}

/* Footer styling enhancement */
footer {
  opacity: 0;
  animation: fadeIn 0.8s ease 1.2s forwards;
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
</style>

{% include_relative _includes/about_research.html %}

{% include_relative _includes/news.html %}

 {% include_relative _includes/categorized_publications.html %}

## Honors and Awards
- Outstanding Master's Thesis of Hainan Province
- Outstanding Master’s Thesis <span style="color: red;">(1st place)</span>, Hainan University, China.
- Outstanding Graduates, Hainan University, China.
- National Scholarship <span style="color: red;">(Top 0.1%, 1/1218)</span>, Ministrt of Education, China.
- Outstanding Graduate Student, Hainan University, China.

## Experiences
- **[Jul. 2021 - Jan. 2023 & Mar. 2023 - Jun. 2024]** Research Intern (Machine Learning), Shenzhen Institue of Meteorological Innovation, China.

## Talks
- **[Apr. 2025]** Federtaed Intelligence in Web: A Tutorial, **WWW-2025**, Sydney, Australia
- **[Nov. 2024]** Personalized Adapter for Large Meteorology Model on Devices: Towards Weather Foundation Models, **FLFM Workshop in AJCAI-2024**, Melbourne, 
Australia
- **[Aug. 2024]** Federated Prompt Learning for Weather Foundation Models on Devices, **Main Trak & AI4CI Workshop in IJCAI-2024**, Jeju, 
 South Korea
 
 {% include_relative _includes/services_panel.html %}
