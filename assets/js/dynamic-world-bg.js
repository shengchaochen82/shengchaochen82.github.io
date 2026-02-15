(() => {
  const canvas = document.getElementById("dynamic-world-bg");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Organic flowing blobs
  const blobs = [];
  const numBlobs = 6;

  // Floating particles with trails
  const particles = [];
  const numParticles = 40;

  // Elegant flowing ribbons
  const ribbons = [];
  const numRibbons = 5;

  // Soft light orbs
  const lightOrbs = [];
  const numOrbs = 8;

  const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, active: false };

  // Simplex noise implementation for organic movement
  const SimplexNoise = (function() {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const grad3 = [[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]];
    let perm = new Array(512);
    let permMod12 = new Array(512);
    
    const seed = Math.random() * 65536;
    let p = new Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor((seed + i * 127) % (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) {
      perm[i] = p[i & 255];
      permMod12[i] = perm[i] % 12;
    }
    
    return {
      noise2D: function(xin, yin) {
        let n0, n1, n2;
        const s = (xin + yin) * F2;
        const i = Math.floor(xin + s);
        const j = Math.floor(yin + s);
        const t = (i + j) * G2;
        const X0 = i - t;
        const Y0 = j - t;
        const x0 = xin - X0;
        const y0 = yin - Y0;
        let i1, j1;
        if (x0 > y0) { i1 = 1; j1 = 0; }
        else { i1 = 0; j1 = 1; }
        const x1 = x0 - i1 + G2;
        const y1 = y0 - j1 + G2;
        const x2 = x0 - 1.0 + 2.0 * G2;
        const y2 = y0 - 1.0 + 2.0 * G2;
        const ii = i & 255;
        const jj = j & 255;
        const gi0 = permMod12[ii + perm[jj]];
        const gi1 = permMod12[ii + i1 + perm[jj + j1]];
        const gi2 = permMod12[ii + 1 + perm[jj + 1]];
        let t0 = 0.5 - x0 * x0 - y0 * y0;
        if (t0 < 0) n0 = 0.0;
        else {
          t0 *= t0;
          n0 = t0 * t0 * (grad3[gi0][0] * x0 + grad3[gi0][1] * y0);
        }
        let t1 = 0.5 - x1 * x1 - y1 * y1;
        if (t1 < 0) n1 = 0.0;
        else {
          t1 *= t1;
          n1 = t1 * t1 * (grad3[gi1][0] * x1 + grad3[gi1][1] * y1);
        }
        let t2 = 0.5 - x2 * x2 - y2 * y2;
        if (t2 < 0) n2 = 0.0;
        else {
          t2 *= t2;
          n2 = t2 * t2 * (grad3[gi2][0] * x2 + grad3[gi2][1] * y2);
        }
        return 70.0 * (n0 + n1 + n2);
      }
    };
  })();

  const noise = SimplexNoise;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    initBlobs(width, height);
    initParticles(width, height);
    initRibbons(width, height);
    initLightOrbs(width, height);
  }

  function initBlobs(width, height) {
    blobs.length = 0;
    const colors = [
      { r: 102, g: 153, b: 204 },
      { r: 147, g: 112, b: 219 },
      { r: 70, g: 180, b: 180 },
      { r: 180, g: 130, b: 200 },
      { r: 100, g: 170, b: 210 },
      { r: 150, g: 120, b: 180 },
    ];
    for (let i = 0; i < numBlobs; i++) {
      blobs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 100 + Math.random() * 200,
        color: colors[i % colors.length],
        alpha: 0.015 + Math.random() * 0.025,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        noiseScale: 0.0008 + Math.random() * 0.001,
        speed: 0.15 + Math.random() * 0.25,
        phase: Math.random() * Math.PI * 2,
        breatheSpeed: 0.0003 + Math.random() * 0.0005,
      });
    }
  }

  function initParticles(width, height) {
    particles.length = 0;
    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: 0,
        vy: 0,
        size: 1.5 + Math.random() * 2.5,
        alpha: 0.2 + Math.random() * 0.4,
        trail: [],
        maxTrailLength: 15 + Math.floor(Math.random() * 20),
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
        hue: Math.random() * 60 + 180,
      });
    }
  }

  function initRibbons(width, height) {
    ribbons.length = 0;
    for (let i = 0; i < numRibbons; i++) {
      ribbons.push({
        points: [],
        numPoints: 80,
        baseY: (height / (numRibbons + 1)) * (i + 1),
        amplitude: 40 + Math.random() * 60,
        frequency: 0.008 + Math.random() * 0.012,
        speed: 0.3 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        color: `hsla(${200 + i * 20}, 50%, 60%, 0.08)`,
        width: 1.5 + Math.random() * 1.5,
      });
    }
  }

  function initLightOrbs(width, height) {
    lightOrbs.length = 0;
    for (let i = 0; i < numOrbs; i++) {
      lightOrbs.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 30 + Math.random() * 50,
        alpha: 0.03 + Math.random() * 0.05,
        speed: 0.2 + Math.random() * 0.4,
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.001 + Math.random() * 0.002,
        hue: 200 + Math.random() * 60,
        noiseOffsetX: Math.random() * 1000,
        noiseOffsetY: Math.random() * 1000,
      });
    }
  }

  function drawBlobs(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < blobs.length; i++) {
      const b = blobs[i];
      
      const breathe = 0.85 + Math.sin(time * b.breatheSpeed + b.phase) * 0.15;
      const currentRadius = b.radius * breathe;
      
      b.x += noise.noise2D(time * 0.0001 + b.noiseOffsetX, 0) * b.speed;
      b.y += noise.noise2D(0, time * 0.0001 + b.noiseOffsetY) * b.speed;

      if (b.x < -b.radius) b.x = width + b.radius;
      if (b.x > width + b.radius) b.x = -b.radius;
      if (b.y < -b.radius) b.y = height + b.radius;
      if (b.y > height + b.radius) b.y = -b.radius;

      const gradient = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, currentRadius);
      gradient.addColorStop(0, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha})`);
      gradient.addColorStop(0.4, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 0.6})`);
      gradient.addColorStop(0.7, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, ${b.alpha * 0.2})`);
      gradient.addColorStop(1, `rgba(${b.color.r}, ${b.color.g}, ${b.color.b}, 0)`);

      ctx.beginPath();
      ctx.arc(b.x, b.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawRibbons(time) {
    const width = window.innerWidth;

    for (let i = 0; i < ribbons.length; i++) {
      const r = ribbons[i];
      
      ctx.beginPath();
      ctx.strokeStyle = r.color;
      ctx.lineWidth = r.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let x = -20; x <= width + 20; x += 4) {
        const noiseVal = noise.noise2D(x * r.frequency + time * 0.0003 * r.speed, r.phase);
        const y = r.baseY + noiseVal * r.amplitude;
        
        if (x === -20) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
    }
  }

  function drawParticles(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const flowScale = 0.0005;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      const angle = noise.noise2D(p.x * flowScale + p.noiseOffsetX, p.y * flowScale + p.noiseOffsetY) * Math.PI * 4;
      const speed = 0.8 + noise.noise2D(p.x * flowScale * 2, p.y * flowScale * 2) * 0.5;
      
      p.vx = Math.cos(angle) * speed;
      p.vy = Math.sin(angle) * speed;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 200 && dist > 0) {
          const attraction = (1 - dist / 200) * 0.015;
          p.vx += dx * attraction;
          p.vy += dy * attraction;
        }
      }

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -20) p.x = width + 20;
      if (p.x > width + 20) p.x = -20;
      if (p.y < -20) p.y = height + 20;
      if (p.y > height + 20) p.y = -20;

      p.trail.unshift({ x: p.x, y: p.y });
      if (p.trail.length > p.maxTrailLength) {
        p.trail.pop();
      }

      if (p.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(p.trail[0].x, p.trail[0].y);
        
        for (let j = 1; j < p.trail.length; j++) {
          ctx.lineTo(p.trail[j].x, p.trail[j].y);
        }
        
        const trailGradient = ctx.createLinearGradient(
          p.trail[0].x, p.trail[0].y,
          p.trail[p.trail.length - 1].x, p.trail[p.trail.length - 1].y
        );
        trailGradient.addColorStop(0, `hsla(${p.hue}, 60%, 70%, ${p.alpha})`);
        trailGradient.addColorStop(1, `hsla(${p.hue}, 60%, 70%, 0)`);
        
        ctx.strokeStyle = trailGradient;
        ctx.lineWidth = p.size * 0.6;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      const glowSize = p.size * 3;
      const glowGradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowSize);
      glowGradient.addColorStop(0, `hsla(${p.hue}, 60%, 75%, ${p.alpha * 0.8})`);
      glowGradient.addColorStop(0.5, `hsla(${p.hue}, 60%, 70%, ${p.alpha * 0.3})`);
      glowGradient.addColorStop(1, `hsla(${p.hue}, 60%, 65%, 0)`);
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, glowSize, 0, Math.PI * 2);
      ctx.fillStyle = glowGradient;
      ctx.fill();
    }
  }

  function drawLightOrbs(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < lightOrbs.length; i++) {
      const orb = lightOrbs[i];
      
      orb.x += noise.noise2D(time * 0.00005 + orb.noiseOffsetX, 0) * orb.speed;
      orb.y += noise.noise2D(0, time * 0.00005 + orb.noiseOffsetY) * orb.speed;

      if (orb.x < -orb.radius) orb.x = width + orb.radius;
      if (orb.x > width + orb.radius) orb.x = -orb.radius;
      if (orb.y < -orb.radius) orb.y = height + orb.radius;
      if (orb.y > height + orb.radius) orb.y = -orb.radius;

      const pulse = 0.8 + Math.sin(time * orb.pulseSpeed + orb.phase) * 0.2;
      const currentRadius = orb.radius * pulse;
      const currentAlpha = orb.alpha * (0.7 + pulse * 0.3);

      const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, currentRadius);
      gradient.addColorStop(0, `hsla(${orb.hue}, 70%, 85%, ${currentAlpha})`);
      gradient.addColorStop(0.3, `hsla(${orb.hue}, 60%, 75%, ${currentAlpha * 0.5})`);
      gradient.addColorStop(0.7, `hsla(${orb.hue}, 50%, 65%, ${currentAlpha * 0.15})`);
      gradient.addColorStop(1, `hsla(${orb.hue}, 40%, 60%, 0)`);

      ctx.beginPath();
      ctx.arc(orb.x, orb.y, currentRadius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawMouseAura(time) {
    if (!mouse.active) return;

    const auraSize = 120 + Math.sin(time * 0.003) * 20;
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, auraSize);
    gradient.addColorStop(0, 'rgba(180, 200, 230, 0.06)');
    gradient.addColorStop(0.5, 'rgba(160, 180, 210, 0.03)');
    gradient.addColorStop(1, 'rgba(140, 160, 200, 0)');

    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, auraSize, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();
  }

  function step() {
    const time = Date.now();
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    drawBlobs(time);
    drawLightOrbs(time);
    drawRibbons(time);
    drawParticles(time);
    drawMouseAura(time);

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
