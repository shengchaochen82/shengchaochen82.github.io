---
layout: homepage
---

{% include_relative _includes/about_research.html %}

{% include_relative _includes/news.html %}

{% include_relative _includes/categorized_publications.html %}

<div class="honors-section">
  <h2 style="margin: 2px 0px 15px;">Honors and Awards</h2>
  <div class="honors-container">
    <div class="honor-item">Outstanding Master's Thesis of Hainan Province</div>
    <div class="honor-item highlight">Outstanding Master's Thesis (1st place)</div>
    <div class="honor-item">Outstanding Graduates</div>
    <div class="honor-item highlight">National Scholarship (Top 0.1%, 1/1218)</div>
    <div class="honor-item">Outstanding Graduate Student</div>
  </div>
</div>

<div class="experiences-section">
  <h2 style="margin: 2px 0px 15px;">Experiences</h2>
  <div class="experience-timeline">
    <div class="experience-item">
      <div class="experience-marker"></div>
      <div class="experience-card">
        <div class="experience-period">
          <div class="experience-icon"><i class="fas fa-calendar-alt"></i></div>
          <span class="experience-date">Jul. 2021 - Jan. 2023 & Mar. 2023 - Jun. 2024</span>
        </div>
        <div class="experience-details">
          <h3 class="experience-title">Research Intern (Machine Learning)</h3>
          <p class="experience-org"><i class="fas fa-building"></i> Shenzhen Institute of Meteorological Innovation, China</p>
          <p class="experience-desc">Conducted research on machine learning applications for meteorological prediction and climate modeling. Developed novel algorithms for time-series analysis and remote sensing data processing.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="talks-section">
  <h2 style="margin: 2px 0px 15px;">Talks</h2>
  <div class="talks-container">
    <div class="talk-card">
      <div class="talk-marker"></div>
      <div class="talk-content">
        <div class="talk-header">
          <div class="talk-meta">
            <span class="talk-date">Apr. 2025</span>
            <span class="talk-venue">WWW-2025, Sydney, Australia</span>
          </div>
        </div>
        <h3 class="talk-title">Federated Intelligence in Web: A Tutorial</h3>
      </div>
    </div>
    
    <div class="talk-card highlight">
      <div class="talk-marker"></div>
      <div class="talk-content">
        <div class="talk-header">
          <div class="talk-meta">
            <span class="talk-date">Nov. 2024</span>
            <span class="talk-venue">FLFM Workshop in AJCAI-2024, Melbourne, Australia</span>
          </div>
        </div>
        <h3 class="talk-title">Personalized Adapter for Large Meteorology Model on Devices</h3>
      </div>
    </div>
    
    <div class="talk-card">
      <div class="talk-marker"></div>
      <div class="talk-content">
        <div class="talk-header">
          <div class="talk-meta">
            <span class="talk-date">Aug. 2024</span>
            <span class="talk-venue">Main Track & AI4CI Workshop in IJCAI-2024, Jeju, South Korea</span>
          </div>
        </div>
        <h3 class="talk-title">Federated Prompt Learning for Weather Foundation Models on Devices</h3>
      </div>
    </div>
  </div>
</div>

{% include_relative _includes/services_panel.html %}

<style>
/* Honors Section Styles - Horizontal Row Layout */
.honors-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.honors-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.honor-item {
  background: white;
  border-radius: 25px;
  padding: 10px 18px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  cursor: default;
}

.honor-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(102, 153, 204, 0.15);
  border-color: rgba(102, 153, 204, 0.3);
}

.honor-item.highlight {
  background: linear-gradient(135deg, #fff5eb, #e0e7ff);
  border-color: rgba(102, 153, 204, 0.3);
}

/* Experiences Section Styles */
.experiences-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.experience-timeline {
  position: relative;
  padding-left: 30px;
}

.experience-timeline::before {
  content: '';
  position: absolute;
  left: 20px;
  top: 0;
  bottom: 0;
  width: 3px;
  background: linear-gradient(to bottom, #6699cc, rgba(102, 153, 204, 0.2));
}

.experience-item {
  position: relative;
  margin-bottom: 30px;
}

.experience-marker {
  position: absolute;
  left: -28px;
  top: 12px;
  width: 16px;
  height: 16px;
  background: #6699cc;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(102, 153, 204, 0.3);
  z-index: 2;
}

.experience-card {
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 153, 204, 0.04), transparent);
  transition: left 0.6s ease;
}

.experience-card:hover::before {
  left: 100%;
}

.experience-card:hover {
  transform: translateX(12px);
  box-shadow: 0 8px 32px rgba(102, 153, 204, 0.15);
  border-color: rgba(102, 153, 204, 0.3);
}

.experience-period {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.experience-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6699cc, #4477aa);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.experience-date {
  font-size: 0.9rem;
  font-weight: 700;
  color: #6699cc;
  display: flex;
  align-items: center;
  gap: 6px;
}

.experience-details {
  flex: 1;
}

.experience-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

.experience-org {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.experience-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

/* Talks Section Styles */
.talks-section {
  margin: 40px 0;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.talks-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 20px;
}

.talk-card {
  background: white;
  border-radius: 12px;
  padding: 18px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.talk-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(102, 153, 204, 0.04), transparent);
  transition: left 0.6s ease;
}

.talk-card:hover::before {
  left: 100%;
}

.talk-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 32px rgba(102, 153, 204, 0.15);
  border-color: rgba(102, 153, 204, 0.3);
}

.talk-card.highlight {
  background: linear-gradient(135deg, #fff5eb, #e0e7ff);
  border-color: rgba(102, 153, 204, 0.2);
}

.talk-marker {
  position: absolute;
  left: -28px;
  top: 16px;
  width: 14px;
  height: 14px;
  background: #6699cc;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 6px rgba(102, 153, 204, 0.3);
  z-index: 2;
}

.talk-content {
  padding-left: 20px;
}

.talk-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
  margin-bottom: 10px;
}

.talk-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 0.85rem;
  align-items: center;
}

.talk-date {
  color: #6699cc;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 4px;
}

.talk-venue {
  color: #555;
  display: flex;
  align-items: center;
  gap: 4px;
}

.talk-title {
  margin: 0 0 12px 0;
  font-size: 1.1rem;
  font-weight: 700;
  color: #333;
}

.talk-desc {
  font-size: 0.9rem;
  color: #555;
  line-height: 1.5;
}

/* Responsive Design */
@media (max-width: 768px) {
  .honors-container,
  .talks-container {
    grid-template-columns: 1fr;
  }
  
  .experience-timeline {
    padding-left: 20px;
  }
  
  .experience-marker {
    left: -20px;
  }
  
  .talk-marker {
    left: -20px;
  }
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .honors-section,
  .experiences-section,
  .talks-section {
    background: linear-gradient(145deg, #2d3748, #1a202c);
  }
  
  .honor-item,
  .experience-card,
  .talk-card {
    background: #2d3748;
    border-color: rgba(255, 255, 255, 0.1);
    color: #e2e8f0;
  }

  .honor-item:hover {
    box-shadow: 0 4px 12px rgba(102, 153, 204, 0.2);
    border-color: rgba(102, 153, 204, 0.4);
  }

  .experience-card::before,
  .talk-card::before {
    background: linear-gradient(90deg, transparent, rgba(102, 153, 204, 0.08), transparent);
  }

  .honor-item.highlight,
  .talk-card.highlight {
    background: linear-gradient(135deg, #1e3a5f, #1a365d);
  }

  .talk-title {
    color: #e2e8f0;
  }

  .talk-date {
    color: #63b3ed;
  }

  .talk-venue {
    color: #a0aec0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .honor-item,
  .experience-card,
  .talk-card {
    transition: none;
  }
}
</style>

<style>
/* Global Page Animations - scoped to avoid conflicts */

/* Smooth scroll behavior */
html {
  scroll-behavior: smooth;
}

/* Background color that will show through or behind canvas */
body {
  background-color: #f8f9fa;
  transition: background-color 0.3s ease;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #1a202c;
  }
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
