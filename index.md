---
layout: homepage
---

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

## Academic Services

<div class="services-entry">
  <a href="/services" class="services-card">
    <div class="services-icon">
      <i class="fas fa-clipboard-check"></i>
    </div>
    <div class="services-info">
      <h3>View My Academic Services</h3>
      <p>Conference Area Chair, Reviewer & Journal Reviewership</p>
    </div>
    <div class="services-arrow">
      <i class="fas fa-arrow-right"></i>
    </div>
  </a>
</div>

<style>
.services-entry {
  margin: 20px 0;
}

.services-card {
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 25px 30px;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  border-radius: 16px;
  box-shadow: 6px 6px 12px #d1d5db, -6px -6px 12px #ffffff;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border-left: 4px solid #f59e0b;
}

.services-card:hover {
  transform: translateX(8px) scale(1.02);
  box-shadow: 8px 8px 20px #c4c9d0, -8px -8px 20px #ffffff;
}

.services-icon {
  width: 55px;
  height: 55px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  background: linear-gradient(135deg, #f59e0b20, #f59e0b40);
  color: #f59e0b;
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
  flex-shrink: 0;
}

.services-info {
  flex: 1;
}

.services-info h3 {
  margin: 0 0 5px 0;
  font-size: 1.2rem;
  color: #333;
}

.services-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #666;
}

.services-arrow {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(145deg, #f8f9fa, #e9ecef);
  color: #f59e0b;
  box-shadow: 3px 3px 6px #d1d5db, -3px -3px 6px #ffffff;
  transition: all 0.3s ease;
  font-size: 1.1rem;
}

.services-card:hover .services-arrow {
  background: #f59e0b;
  color: white;
  transform: translateX(4px);
}

@media (max-width: 600px) {
  .services-card {
    padding: 20px;
    gap: 15px;
  }
  
  .services-icon {
    width: 45px;
    height: 45px;
    font-size: 1.3rem;
  }
  
  .services-info h3 {
    font-size: 1rem;
  }
  
  .services-info p {
    font-size: 0.8rem;
  }
}

@media (prefers-color-scheme: dark) {
  .services-card {
    background: linear-gradient(145deg, #2d3748, #1a202c);
    box-shadow: 6px 6px 12px #1a202c, -6px -6px 12px #3d4856;
  }
  
  .services-card:hover {
    box-shadow: 8px 8px 20px #151b24, -8px -8px 20px #3d4856;
  }
  
  .services-icon {
    background: linear-gradient(135deg, #fbbf2420, #fbbf2440);
    color: #fbbf24;
  }
  
  .services-info h3 {
    color: #e2e8f0;
  }
  
  .services-info p {
    color: #a0aec0;
  }
  
  .services-arrow {
    background: linear-gradient(145deg, #2d3748, #1a202c);
    box-shadow: 3px 3px 6px #1a202c, -3px -3px 6px #3d4856;
  }
}
</style>
