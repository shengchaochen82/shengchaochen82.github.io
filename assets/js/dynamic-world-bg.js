(() => {
  const canvas = document.getElementById("dynamic-world-bg");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];
  const trails = [];
  const baseCount = 70;
  const maxLinkDistance = 180;
  const mouse = { x: 0, y: 0, active: false, pulse: 0 };
  const waves = [];
  const numWaves = 3;

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const desired = Math.max(40, Math.floor((width * height) / 20000));
    const count = Math.min(baseCount, desired);
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2.0 + 1.5,
      });
    }
    
    initWaves();
  }

  console.log("Initializing particle system with", particles.length, "particles");
  
  function initWaves() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    waves.length = 0;
    for (let i = 0; i < numWaves; i += 1) {
      waves.push({
        amplitude: 20 + Math.random() * 15,
        wavelength: 300 + Math.random() * 200,
        speed: 0.5 + Math.random() * 0.3,
        offset: Math.random() * Math.PI * 2,
        y: Math.random() * height,
      });
    }
  }
  
  function drawWaves() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const time = Date.now() / 1000;
    
    for (let i = 0; i < waves.length; i += 1) {
      const wave = waves[i];
      const yOffset = Math.sin(time * wave.speed + wave.offset) * wave.amplitude;
      const y = wave.y + yOffset;
      
      ctx.beginPath();
      ctx.moveTo(0, y);
      for (let x = 0; x <= width; x += 10) {
        const localY = y + Math.sin((x + time * 50) / wave.wavelength * Math.PI * 2) * wave.amplitude * 0.5;
        ctx.lineTo(x, localY);
      }
      ctx.strokeStyle = `rgba(102, 153, 204, 0.04)`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  function step() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    drawWaves();
    
    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -8) p.x = width + 8;
      if (p.x > width + 8) p.x = -8;
      if (p.y < -8) p.y = height + 8;
      if (p.y > height + 8) p.y = -8;

      if (mouse.active) {
        const dxm = mouse.x - p.x;
        const dym = mouse.y - p.y;
        const md = Math.hypot(dxm, dym);
        if (md < 250 && md > 0) {
          const pull = (1 - md / 250) * 0.06;
          p.x += dxm * pull;
          p.y += dym * pull;
        }
      }
    }

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.hypot(dx, dy);
        if (dist > maxLinkDistance) continue;

        const alpha = (1 - dist / maxLinkDistance) * 0.18;
        ctx.strokeStyle = `rgba(102, 153, 204, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      const alpha = 0.4 + Math.sin(Date.now() / 2000 + i) * 0.15;
      ctx.fillStyle = `rgba(102, 153, 204, ${alpha.toFixed(3)})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (mouse.active) {
        const dmx = mouse.x - p.x;
        const dmy = mouse.y - p.y;
        const mdist = Math.hypot(dmx, dmy);
        if (mdist < 200) {
          const haloAlpha = (1 - mdist / 200) * 0.25;
          ctx.strokeStyle = `rgba(102, 153, 204, ${haloAlpha.toFixed(3)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }

    if (mouse.active) {
      const pulseSize = 150 + Math.sin(Date.now() / 300) * 30;
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, pulseSize);
      gradient.addColorStop(0, "rgba(102, 153, 204, 0.15)");
      gradient.addColorStop(1, "rgba(102, 153, 204, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - pulseSize, mouse.y - pulseSize, pulseSize * 2, pulseSize * 2);
    }

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
    { passive: true },
  );
  window.addEventListener(
    "mouseleave",
    () => {
      mouse.active = false;
    },
    { passive: true },
  );
  window.requestAnimationFrame(step);
})();
