(() => {
  const canvas = document.getElementById("dynamic-world-bg");
  if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const particles = [];
  const baseCount = 34;
  const maxLinkDistance = 140;
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const desired = Math.max(24, Math.floor((width * height) / 28000));
    const count = Math.min(baseCount, desired);
    particles.length = 0;
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: Math.random() * 1.4 + 0.7,
      });
    }
  }

  function step() {
    const width = window.innerWidth;
    const height = window.innerHeight;
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
        if (md < 150 && md > 0) {
          const pull = (1 - md / 150) * 0.02;
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

        const alpha = (1 - dist / maxLinkDistance) * 0.09;
        ctx.strokeStyle = `rgba(102, 153, 204, ${alpha.toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }
    }

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      ctx.fillStyle = "rgba(102, 153, 204, 0.26)";
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      if (mouse.active) {
        const dmx = mouse.x - p.x;
        const dmy = mouse.y - p.y;
        const mdist = Math.hypot(dmx, dmy);
        if (mdist < 120) {
          const haloAlpha = (1 - mdist / 120) * 0.1;
          ctx.strokeStyle = `rgba(102, 153, 204, ${haloAlpha.toFixed(3)})`;
          ctx.lineWidth = 1;
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
