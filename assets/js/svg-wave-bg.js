/**
 * SVG Wave Background - Real flowing wave elements with CSS animations
 * Creates elegant, organic wave animations using SVG paths
 */
(() => {
  const container = document.getElementById('dynamic-world-bg');
  if (!container) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  // Replace canvas with SVG container
  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  // Create SVG element
  const svgNS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(svgNS, "svg");
  svg.setAttribute("class", "wave-bg-svg");
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("aria-hidden", "true");
  
  // SVG styles
  svg.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `;

  // Wave definitions with natural curves
  const waves = [
    {
      id: 'wave1',
      paths: [
        'M0,300 C150,200 350,400 500,300 S850,200 1000,300 L1000,800 L0,800 Z',
        'M0,320 C180,220 320,420 500,320 S820,220 1000,320 L1000,800 L0,800 Z'
      ],
      color: isDark ? 'rgba(100, 140, 200, 0.08)' : 'rgba(100, 160, 220, 0.06)',
      speed: '25s',
      offset: '0'
    },
    {
      id: 'wave2',
      paths: [
        'M0,400 C200,300 300,500 500,400 S800,300 1000,400 L1000,800 L0,800 Z',
        'M0,380 C220,280 280,480 500,380 S820,280 1000,380 L1000,800 L0,800 Z'
      ],
      color: isDark ? 'rgba(130, 120, 190, 0.06)' : 'rgba(140, 130, 200, 0.05)',
      speed: '30s',
      offset: '-5s'
    },
    {
      id: 'wave3',
      paths: [
        'M0,500 C120,400 380,600 500,500 S880,400 1000,500 L1000,800 L0,800 Z',
        'M0,520 C140,420 360,620 500,520 S860,420 1000,520 L1000,800 L0,800 Z'
      ],
      color: isDark ? 'rgba(80, 160, 180, 0.05)' : 'rgba(80, 180, 200, 0.04)',
      speed: '35s',
      offset: '-10s'
    },
    {
      id: 'wave4',
      paths: [
        'M0,580 C180,500 320,660 500,580 S820,500 1000,580 L1000,800 L0,800 Z',
        'M0,560 C160,480 340,640 500,560 S840,480 1000,560 L1000,800 L0,800 Z'
      ],
      color: isDark ? 'rgba(150, 130, 180, 0.04)' : 'rgba(160, 140, 190, 0.03)',
      speed: '40s',
      offset: '-15s'
    }
  ];

  // Create defs for animations
  const defs = document.createElementNS(svgNS, "defs");
  
  // Add CSS animations inside SVG
  const style = document.createElementNS(svgNS, "style");
  style.textContent = `
    .wave-path {
      animation: wave-flow var(--wave-speed, 25s) ease-in-out infinite;
      animation-delay: var(--wave-delay, 0s);
    }
    
    @keyframes wave-flow {
      0%, 100% { d: path(var(--wave-path-1)); }
      50% { d: path(var(--wave-path-2)); }
    }
    
    .floating-particle {
      animation: float-up var(--float-speed, 20s) linear infinite;
      animation-delay: var(--float-delay, 0s);
      opacity: 0;
    }
    
    @keyframes float-up {
      0% {
        transform: translateY(100vh) translateX(0);
        opacity: 0;
      }
      10% {
        opacity: var(--particle-opacity, 0.3);
      }
      90% {
        opacity: var(--particle-opacity, 0.3);
      }
      100% {
        transform: translateY(-100px) translateX(var(--drift, 30px));
        opacity: 0;
      }
    }
    
    .glow-orb {
      animation: glow-pulse var(--glow-speed, 8s) ease-in-out infinite;
      animation-delay: var(--glow-delay, 0s);
    }
    
    @keyframes glow-pulse {
      0%, 100% { 
        opacity: var(--glow-min, 0.3);
        transform: scale(1);
      }
      50% { 
        opacity: var(--glow-max, 0.6);
        transform: scale(1.1);
      }
    }
  `;
  defs.appendChild(style);
  svg.appendChild(defs);

  // Create wave paths
  waves.forEach(wave => {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("id", wave.id);
    path.setAttribute("class", "wave-path");
    path.setAttribute("d", wave.paths[0]);
    path.setAttribute("fill", wave.color);
    path.style.setProperty('--wave-path-1', `"${wave.paths[0]}"`);
    path.style.setProperty('--wave-path-2', `"${wave.paths[1]}"`);
    path.style.setProperty('--wave-speed', wave.speed);
    path.style.setProperty('--wave-delay', wave.offset);
    svg.appendChild(path);
  });

  // Create floating particles
  const numParticles = 15;
  for (let i = 0; i < numParticles; i++) {
    const circle = document.createElementNS(svgNS, "circle");
    const x = 5 + Math.random() * 90; // 5% to 95% width
    const size = 2 + Math.random() * 4;
    const floatSpeed = 15 + Math.random() * 20;
    const floatDelay = Math.random() * 20;
    const drift = (Math.random() - 0.5) * 100;
    const opacity = 0.15 + Math.random() * 0.25;
    
    circle.setAttribute("cx", `${x}%`);
    circle.setAttribute("cy", "0");
    circle.setAttribute("r", size);
    circle.setAttribute("class", "floating-particle");
    circle.setAttribute("fill", isDark ? 'rgba(150, 180, 220, 0.6)' : 'rgba(100, 150, 200, 0.5)');
    circle.style.setProperty('--float-speed', `${floatSpeed}s`);
    circle.style.setProperty('--float-delay', `${floatDelay}s`);
    circle.style.setProperty('--drift', `${drift}px`);
    circle.style.setProperty('--particle-opacity', opacity);
    
    svg.appendChild(circle);
  }

  // Create ambient glow orbs
  const glowPositions = [
    { x: 15, y: 30, size: 150 },
    { x: 45, y: 50, size: 180 },
    { x: 75, y: 35, size: 160 },
    { x: 30, y: 70, size: 140 },
    { x: 85, y: 60, size: 170 }
  ];

  glowPositions.forEach((pos, i) => {
    const defs2 = document.createElementNS(svgNS, "defs");
    const gradientId = `glow-gradient-${i}`;
    const gradient = document.createElementNS(svgNS, "radialGradient");
    gradient.setAttribute("id", gradientId);
    gradient.setAttribute("cx", "50%");
    gradient.setAttribute("cy", "50%");
    gradient.setAttribute("r", "50%");
    
    const stop1 = document.createElementNS(svgNS, "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", isDark ? "rgba(100, 150, 200, 0.15)" : "rgba(120, 170, 220, 0.12)");
    
    const stop2 = document.createElementNS(svgNS, "stop");
    stop2.setAttribute("offset", "50%");
    stop2.setAttribute("stop-color", isDark ? "rgba(100, 150, 200, 0.05)" : "rgba(120, 170, 220, 0.04)");
    
    const stop3 = document.createElementNS(svgNS, "stop");
    stop3.setAttribute("offset", "100%");
    stop3.setAttribute("stop-color", "rgba(100, 150, 200, 0)");
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    gradient.appendChild(stop3);
    defs2.appendChild(gradient);
    svg.insertBefore(defs2, svg.firstChild.nextSibling);
    
    const ellipse = document.createElementNS(svgNS, "ellipse");
    ellipse.setAttribute("cx", `${pos.x}%`);
    ellipse.setAttribute("cy", `${pos.y}%`);
    ellipse.setAttribute("rx", pos.size);
    ellipse.setAttribute("ry", pos.size * 0.6);
    ellipse.setAttribute("fill", `url(#${gradientId})`);
    ellipse.setAttribute("class", "glow-orb");
    ellipse.style.setProperty('--glow-speed', `${6 + Math.random() * 6}s`);
    ellipse.style.setProperty('--glow-delay', `${Math.random() * 5}s`);
    ellipse.style.setProperty('--glow-min', '0.4');
    ellipse.style.setProperty('--glow-max', '0.8');
    
    svg.appendChild(ellipse);
  });

  // Replace canvas with SVG
  container.replaceWith(svg);

  // Handle resize
  function handleResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  }

  handleResize();
  window.addEventListener("resize", handleResize, { passive: true });

  // Handle dark mode change
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Reload to update colors for new theme
    location.reload();
  });
})();
