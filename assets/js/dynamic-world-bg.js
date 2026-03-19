(() => {
  const canvas = document.getElementById("dynamic-world-bg");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Smooth bezier wave paths (SVG-like curves)
  const waves = [];
  const numWaves = 4;

  // Gentle floating particles
  const particles = [];
  const numParticles = 35;

  // Soft ambient glow
  const glows = [];
  const numGlows = 5;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };
  let time = 0;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initWaves(width, height);
    initParticles(width, height);
    initGlows(width, height);
  }

  // Easing functions for smooth, natural motion
  function easeInOutSine(t) {
    return -(Math.cos(Math.PI * t) - 1) / 2;
  }

  function smoothstep(min, max, value) {
    const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
    return x * x * (3 - 2 * x);
  }

  function initWaves(width, height) {
    waves.length = 0;
    for (let i = 0; i < numWaves; i++) {
      waves.push({
        baseY: height * (0.2 + i * 0.2),
        amplitude: 25 + Math.random() * 35,
        wavelength: 0.003 + Math.random() * 0.004,
        speed: 0.00008 + Math.random() * 0.00012,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.03 + Math.random() * 0.04,
        thickness: 1 + Math.random() * 1.5,
        hue: 200 + i * 15,
      });
    }
  }

  function initParticles(width, height) {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        baseX: Math.random() * width,
        baseY: Math.random() * height,
        radius: 1.5 + Math.random() * 2.5,
        opacity: 0.15 + Math.random() * 0.3,
        driftX: 0.1 + Math.random() * 0.3,
        driftY: 0.05 + Math.random() * 0.15,
        phase: Math.random() * Math.PI * 2,
        breatheSpeed: 0.0008 + Math.random() * 0.0012,
        hue: 200 + Math.random() * 40,
      });
    }
  }

  function initGlows(width, height) {
    glows.length = 0;
    const colors = [
      { r: 120, g: 160, b: 220 },
      { r: 160, g: 130, b: 200 },
      { r: 100, g: 180, b: 200 },
      { r: 150, g: 150, b: 210 },
      { r: 130, g: 170, b: 210 },
    ];
    for (let i = 0; i < numGlows; i++) {
      glows.push({
        x: (width / (numGlows + 1)) * (i + 1),
        y: height * (0.3 + Math.random() * 0.4),
        radius: 120 + Math.random() * 100,
        color: colors[i],
        opacity: 0.025 + Math.random() * 0.035,
        phase: Math.random() * Math.PI * 2,
        breatheSpeed: 0.0002 + Math.random() * 0.0003,
        driftX: 0.02 + Math.random() * 0.04,
        driftY: 0.015 + Math.random() * 0.03,
        baseX: (width / (numGlows + 1)) * (i + 1),
        baseY: height * (0.3 + Math.random() * 0.4),
      });
    }
  }

  function drawSVGStyleWaves() {
    const width = window.innerWidth;

    for (let i = 0; i < waves.length; i++) {
      const w = waves[i];
      
      ctx.beginPath();
      ctx.strokeStyle = `hsla(${w.hue}, 45%, 65%, ${w.opacity})`;
      ctx.lineWidth = w.thickness;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      const points = [];
      const segments = 100;
      
      for (let j = 0; j <= segments; j++) {
        const x = (j / segments) * width;
        const normalizedX = j / segments;
        
        // Multiple overlapping sine waves for natural variation
        const wave1 = Math.sin(x * w.wavelength + time * w.speed + w.phase) * w.amplitude;
        const wave2 = Math.sin(x * w.wavelength * 1.5 + time * w.speed * 0.7) * w.amplitude * 0.4;
        const wave3 = Math.sin(x * w.wavelength * 0.5 + time * w.speed * 1.3) * w.amplitude * 0.25;
        
        // Smooth vertical drift
        const drift = Math.sin(time * 0.0001 + w.phase) * 15;
        
        const y = w.baseY + wave1 + wave2 + wave3 + drift;
        points.push({ x, y });
      }

      // Draw smooth bezier curve through points (SVG-like path)
      ctx.moveTo(points[0].x, points[0].y);
      
      for (let j = 1; j < points.length - 2; j++) {
        const xc = (points[j].x + points[j + 1].x) / 2;
        const yc = (points[j].y + points[j + 1].y) / 2;
        ctx.quadraticCurveTo(points[j].x, points[j].y, xc, yc);
      }
      
      // Last two points
      const last = points.length - 1;
      ctx.quadraticCurveTo(
        points[last - 1].x, points[last - 1].y,
        points[last].x, points[last].y
      );

      ctx.stroke();
    }
  }

  function drawParticles() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Gentle sinusoidal drift (like floating in water/air)
      const driftX = Math.sin(time * 0.0002 + p.phase) * 30;
      const driftY = Math.cos(time * 0.00015 + p.phase * 1.3) * 20;
      
      p.x = p.baseX + driftX;
      p.y = p.baseY + driftY;

      // Slow base position drift
      p.baseX += p.driftX;
      p.baseY += p.driftY;

      if (p.baseX > width + 50) p.baseX = -50;
      if (p.baseY > height + 50) p.baseY = -50;

      // Breathing effect for size
      const breathe = 0.8 + Math.sin(time * p.breatheSpeed + p.phase) * 0.2;
      const currentRadius = p.radius * breathe;
      const currentOpacity = p.opacity * (0.7 + breathe * 0.3);

      // Soft glow around particle
      const gradient = ctx.createRadialGradient(
        p.x, p.y, 0,
        p.x, p.y, currentRadius * 4
      );
      gradient.addColorStop(0, `hsla(${p.hue}, 50%, 75%, ${currentOpacity})`);
      gradient.addColorStop(0.4, `hsla(${p.hue}, 45%, 70%, ${currentOpacity * 0.4})`);
      gradient.addColorStop(1, `hsla(${p.hue}, 40%, 65%, 0)`);

      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius * 4, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Core particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue}, 55%, 80%, ${currentOpacity * 1.2})`;
      ctx.fill();
    }
  }

  function drawGlows() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < glows.length; i++) {
      const g = glows[i];

      // Gentle floating movement
      const driftX = Math.sin(time * 0.00005 + g.phase) * 60;
      const driftY = Math.cos(time * 0.00004 + g.phase * 1.2) * 40;
      
      g.x = g.baseX + driftX;
      g.y = g.baseY + driftY;

      // Slow base position drift
      g.baseX += g.driftX;
      g.baseY += g.driftY;

      if (g.baseX > width + g.radius) g.baseX = -g.radius;
      if (g.baseX < -g.radius) g.baseX = width + g.radius;
      if (g.baseY > height + g.radius) g.baseY = -g.radius;
      if (g.baseY < -g.radius) g.baseY = height + g.radius;

      // Breathing effect
      const breathe = 0.85 + Math.sin(time * g.breatheSpeed + g.phase) * 0.15;
      const currentRadius = g.radius * breathe;
      const currentOpacity = g.opacity * (0.75 + breathe * 0.25);

      const gradient = ctx.createRadialGradient(
        g.x, g.y, 0,
        g.x, g.y, currentRadius
      );
      gradient.addColorStop(0, `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, ${currentOpacity})`);
      gradient.addColorStop(0.3, `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, ${currentOpacity * 0.6})`);
      gradient.addColorStop(0.6, `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, ${currentOpacity * 0.2})`);
      gradient.addColorStop(1, `rgba(${g.color.r}, ${g.color.g}, ${g.color.b}, 0)`);

      ctx.beginPath();
      ctx.arc(g.x, g.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawMouseEffect() {
    if (!mouse.active) return;

    // Soft, subtle mouse glow
    const gradient = ctx.createRadialGradient(
      mouse.x, mouse.y, 0,
      mouse.x, mouse.y, 100
    );
    gradient.addColorStop(0, 'rgba(180, 200, 230, 0.04)');
    gradient.addColorStop(0.5, 'rgba(160, 180, 210, 0.02)');
    gradient.addColorStop(1, 'rgba(140, 160, 200, 0)');

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 100, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function step(timestamp) {
    time = timestamp || Date.now();
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    // Layer order: glows (background) -> waves -> particles -> mouse effect
    drawGlows();
    drawSVGStyleWaves();
    drawParticles();
    drawMouseEffect();

    window.requestAnimationFrame(step);
  }

  resize();
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener(
    "mousemove",
    (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
      mouse.active = true;
    },
    { passive: true }
  );
  window.addEventListener(
    "mouseleave",
    () => {
      mouse.active = false;
    },
    { passive: true }
  );
  window.requestAnimationFrame(step);
})();
