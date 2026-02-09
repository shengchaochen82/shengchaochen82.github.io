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
  const baseCount = 70;
  const maxLinkDistance = 180;
  const mouse = { x: 0, y: 0, active: false, pulse: 0 };

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
  }

  console.log("Initializing particle system with", particles.length, "particles");


  function step() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Draw mouse halo/glow effect
    if (mouse.active) {
      const pulseSize = 150 + Math.sin(Date.now() / 300) * 30;
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, pulseSize);
      gradient.addColorStop(0, "rgba(102, 153, 204, 0.15)");
      gradient.addColorStop(1, "rgba(102, 153, 204, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - pulseSize, mouse.y - pulseSize, pulseSize * 2, pulseSize * 2);
    }

    ctx.clearRect(0, 0, width, height);

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
