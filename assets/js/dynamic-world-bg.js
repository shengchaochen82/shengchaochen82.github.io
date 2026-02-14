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
  const flowingLines = [];
  const auroras = [];
  const stars = [];
  const baseCount = 80;
  const mouse = { x: 0, y: 0, active: false };

  function resize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    particles.length = 0;
    const count = Math.min(baseCount, Math.floor((width * height) / 25000));
    for (let i = 0; i < count; i += 1) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.3 + 0.1,
      });
    }

    initFlowingLines();
    initAuroras();
    initStars();
  }

  function initFlowingLines() {
    flowingLines.length = 0;
    const numLines = 8;
    for (let i = 0; i < numLines; i += 1) {
      flowingLines.push({
        points: [],
        yBase: Math.random() * window.innerHeight,
        amplitude: 30 + Math.random() * 50,
        frequency: 0.002 + Math.random() * 0.003,
        speed: 0.5 + Math.random() * 1,
        offset: Math.random() * Math.PI * 2,
        color: `rgba(102, 153, 204, ${0.08 + Math.random() * 0.08})`,
        width: 1 + Math.random() * 2,
      });
    }
  }

  function initAuroras() {
    auroras.length = 0;
    const numAuroras = 3;
    const colors = [
      { r: 102, g: 153, b: 204 },
      { r: 147, g: 112, b: 219 },
      { r: 70, g: 180, b: 180 },
    ];
    for (let i = 0; i < numAuroras; i += 1) {
      auroras.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.5,
        width: 200 + Math.random() * 300,
        height: 100 + Math.random() * 150,
        color: colors[i % colors.length],
        alpha: 0.08 + Math.random() * 0.08,
        speed: 0.2 + Math.random() * 0.3,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function initStars() {
    stars.length = 0;
    const numStars = 50;
    for (let i = 0; i < numStars; i += 1) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.5 + 0.5,
        twinkleSpeed: 0.002 + Math.random() * 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }
  }

  function drawAuroras(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < auroras.length; i += 1) {
      const a = auroras[i];
      const wave = Math.sin(time * 0.001 + a.phase) * 20;
      
      const gradient = ctx.createLinearGradient(
        a.x - a.width / 2,
        a.y + wave,
        a.x + a.width / 2,
        a.y + a.height + wave
      );
      gradient.addColorStop(0, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, 0)`);
      gradient.addColorStop(0.3, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${a.alpha})`);
      gradient.addColorStop(0.7, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, ${a.alpha * 0.5})`);
      gradient.addColorStop(1, `rgba(${a.color.r}, ${a.color.g}, ${a.color.b}, 0)`);

      ctx.beginPath();
      ctx.moveTo(a.x - a.width / 2, a.y + wave);
      
      for (let x = 0; x <= a.width; x += 5) {
        const waveY = Math.sin((x + time * a.speed) * 0.02) * 30;
        ctx.lineTo(a.x - a.width / 2 + x, a.y + wave + waveY);
      }
      
      for (let x = a.width; x >= 0; x -= 5) {
        const waveY = Math.sin((x + time * a.speed) * 0.02) * 30;
        ctx.lineTo(a.x - a.width / 2 + x, a.y + a.height + wave + waveY);
      }
      
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }
  }

  function drawFlowingLines(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < flowingLines.length; i += 1) {
      const line = flowingLines[i];
      ctx.beginPath();
      ctx.strokeStyle = line.color;
      ctx.lineWidth = line.width;
      ctx.lineCap = 'round';

      const startY = line.yBase + Math.sin(time * 0.0005 + line.offset) * 50;
      ctx.moveTo(0, startY);

      for (let x = 0; x <= width; x += 3) {
        const y = startY + 
          Math.sin((x * line.frequency) + (time * 0.001 * line.speed) + line.offset) * line.amplitude +
          Math.sin((x * line.frequency * 2) + (time * 0.002 * line.speed)) * line.amplitude * 0.3;
        ctx.lineTo(x, y);
      }

      ctx.stroke();
    }
  }

  function drawStars(time) {
    for (let i = 0; i < stars.length; i += 1) {
      const s = stars[i];
      const twinkle = 0.3 + Math.sin(time * s.twinkleSpeed + s.phase) * 0.7;
      const alpha = 0.2 + twinkle * 0.4;
      
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * twinkle, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      ctx.fill();

      if (twinkle > 0.8) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
        const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
        glow.addColorStop(0, `rgba(200, 220, 255, ${alpha * 0.3})`);
        glow.addColorStop(1, 'rgba(200, 220, 255, 0)');
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }
  }

  function drawParticles(time) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < particles.length; i += 1) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;

      if (mouse.active) {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0) {
          const pull = (1 - dist / 150) * 0.03;
          p.x += dx * pull;
          p.y += dy * pull;
        }
      }

      const pulse = 0.5 + Math.sin(time * 0.002 + i) * 0.5;
      const alpha = p.alpha * (0.7 + pulse * 0.3);
      
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.8 + pulse * 0.4), 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200, 220, 255, ${alpha})`;
      ctx.fill();
    }

    for (let i = 0; i < particles.length; i += 1) {
      const a = particles[i];
      for (let j = i + 1; j < particles.length; j += 1) {
        const b = particles[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.15;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(150, 180, 220, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseEffect(time) {
    if (!mouse.active) return;

    const pulseSize = 100 + Math.sin(time * 0.005) * 20;
    const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, pulseSize);
    gradient.addColorStop(0, 'rgba(150, 200, 255, 0.08)');
    gradient.addColorStop(0.5, 'rgba(150, 200, 255, 0.03)');
    gradient.addColorStop(1, 'rgba(150, 200, 255, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, pulseSize, 0, Math.PI * 2);
    ctx.fill();
  }

  function step() {
    const time = Date.now();
    const width = window.innerWidth;
    const height = window.innerHeight;

    ctx.clearRect(0, 0, width, height);

    drawAuroras(time);
    drawFlowingLines(time);
    drawStars(time);
    drawParticles(time);
    drawMouseEffect(time);

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
