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

/* Hero Gradient Background - "Dynamic World Understanding" theme */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -9999;
  pointer-events: none;
  background: 
    radial-gradient(at 40% 20%, rgba(102, 153, 204, 0.03)0px, transparent 50%),
    radial-gradient(at 20% 40%, rgba(139, 92, 246, 0.04)0px, transparent 50%),
    radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.06) 0px, transparent 50%);
  animation: dynamicWorldShift 30s ease-in-out infinite;
  background-size: 400% 400%;
  background-position: center;
}

/* Subtle particle effect using CSS */
body::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -9998;
  pointer-events: none;
}

.particle-particle {
  position: absolute;
  border-radius: 50%;
  opacity: 0;
  animation: particleFloat 20s linear infinite;
}

@keyframes particleFloat {
  0% {
    transform: translateY(100vh) rotate(0deg);
    opacity: 0;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Generate multiple particles */
.article-particle:nth-child(1) { animation-delay: 0s; left: 10%; top: 20%; width: 6px; height: 6px; background: rgba(102, 153, 204, 0.15); animation-duration: 18s; }
.article-particle:nth-child(2) { animation-delay: 2s; left: 20%; top: 30%; width: 8px; height: 8px; background: rgba(102, 153, 204, 0.2); animation-duration: 22s; }
.article-particle:nth-child(3) { animation-delay: 4s; left: 30%; top: 40%; width: 4px; height: 4px; background: rgba(102, 153, 204, 0.1); animation-duration: 25s; }
.article-particle:nth-child(4) { animation-delay: 6s; left: 70%; top: 25%; width: 10px; height: 10px; background: rgba(102, 153, 204, 0.15); animation-duration: 28s; }
.article-particle:nth-child(5) { animation-delay: 8s; left: 10%; top: 60%; width: 6px; height: 6px; background: rgba(102, 153, 204, 0.2); animation-duration: 20s; }
.article-particle:nth-child(6) { animation-delay: 10s; left: 40%; top: 30%; width: 8px; height: 8px; background: rgba(102, 153, 204, 0.08); animation-duration: 24s; }
.article-particle:nth-child(7) { animation-delay: 12s; left: 60%; top: 50%; width: 10px; height: 10px; background: rgba(102, 153, 204, 0.1); animation-duration: 26s; }
.article-particle:nth-child(8) { animation-delay: 14s; left: 80%; top: 70%; width: 4px; height: 4px; background: rgba(102, 153, 204, 0.05); animation-duration: 22s; }
.article-particle:nth-child(9) { animation-delay: 16s; left: 90%; top: 40%; width: 6px; height: 6px; background: rgba(102, 153, 204, 0.08); animation-duration:30s; }
.article-particle:nth-child(10) { animation-delay: 18s; left: 20%; top: 50%; width: 8px; height: 8px; background: rgba(102, 153, 204, 0.12); animation-duration: 24s; }
.article-particle:nth-child(11) { animation-delay: 20s; left: 70%; top: 30%; width: 10px; height: 10px; background: rgba(102, 153, 204, 0.06); animation-duration: 28s; }
.article-particle:nth-child(12) { animation-delay: 22s; left: 30%; top: 60%; width: 4px; height: 4px; background: rgba(102, 15, 153, 204, 0.08); animation-duration: 22s; }
}

@keyframes dynamicWorldShift {
  0% {
    background-position: 0% 0%;
  }
 33% {
    background-position: 33% 0%;
  }
  66% {
    background-position: 66% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}

@keyframes dynamicWorldShift {
  0% {
    background-position: 0% 0%;
  }
  33% {
    background-position: 33% 0%;
  }
  66% {
    background-position: 66% 0%;
  }
  100% {
    background-position: 100% 0%;
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
  body::before {
    background: 
      radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.04)0px, transparent 50%),
      radial-gradient(at 20% 40%, rgba(139, 92, 246, 0.04)0px, transparent 50%),
      radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.06) 0px, transparent 50%);
  }

  .article-particle {
    background: rgba(99, 102, 241, 0.15);
  }

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

  /* Reduce motion for accessibility */
  body::before {
    animation: dynamicWorldShift 60s ease-in-out infinite;
  }

  .article-particle:nth-child(n) {
    animation-duration: calc(var(--particle-duration, 30s));
  }
}

  /* Reduce hover effects */
  .about-card:hover,
  .news-card:hover,
  .paper-item:hover,
  .venue-item:hover,
  .category-bar:hover {
    animation-duration: 0.5s;
    transition-duration: 0.2s;
  }
}
}

/* Disable animations on user preference */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01s !important;
    transition-duration: 0.01s !important;
  }
}
</style>
