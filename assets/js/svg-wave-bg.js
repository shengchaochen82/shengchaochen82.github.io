/**
 * Interactive Full-Screen Background - Immersive academic homepage experience
 */
(() => {
  const container = document.getElementById('dynamic-world-bg');
  if (!container) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return;
  
  let width = window.innerWidth;
  let height = window.innerHeight;
  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = width / 2;
  let targetMouseY = height / 2;
  let time = 0;
  const particles = [];
  const orbs = [];
  const waves = [];
  const fireflies = [];
  const ripples = [];
  
  class Particle {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 3 + 1;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = -Math.random() * 1.5 - 0.5;
      this.opacity = Math.random() * 0.5 + 0.2;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.hue = isDark ? 200 + Math.random() * 40 : 190 + Math.random() * 30;
    }
    
    update() {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance > 0.001 && distance < 170) {
        const force = (170 - distance) / 170;
        this.speedX += (dx / distance) * force * 0.2;
        this.speedY += (dy / distance) * force * 0.1;
      }
      
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.98;
      this.speedY *= 0.995;
      
      this.pulsePhase += this.pulseSpeed;
      
      if (this.y < -50 || this.x < -50 || this.x > width + 50) {
        this.reset();
      }
    }
    
    draw() {
      const pulse = Math.sin(this.pulsePhase) * 0.3 + 0.7;
      const actualOpacity = this.opacity * pulse;
      
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 3);
      gradient.addColorStop(0, `hsla(${this.hue}, 70%, 60%, ${actualOpacity})`);
      gradient.addColorStop(0.3, `hsla(${this.hue}, 70%, 50%, ${actualOpacity * 0.5})`);
      gradient.addColorStop(1, `hsla(${this.hue}, 70%, 40%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 3, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = `hsla(${this.hue}, 70%, 80%, ${actualOpacity})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  class Orb {
    constructor(index) {
      this.index = index;
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 80 + 40;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = Math.random() * 0.1 + 0.05;
      this.phase = Math.random() * Math.PI * 2;
      this.hue = isDark ? 190 + Math.random() * 70 : 205 + Math.random() * 75;
    }
    
    update() {
      this.x += this.speedX + Math.sin(time * 0.001 + this.phase) * 0.2;
      this.y += this.speedY + Math.cos(time * 0.001 + this.phase * 0.7) * 0.1;
      this.phase += 0.01;
      
      if (this.x < -this.size || this.x > width + this.size) this.speedX *= -1;
      if (this.y < -this.size || this.y > height + this.size) this.speedY *= -1;
      
      this.x = Math.max(-this.size, Math.min(width + this.size, this.x));
      this.y = Math.max(-this.size, Math.min(height + this.size, this.y));
    }
    
    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      gradient.addColorStop(0, `hsla(${this.hue}, 60%, 50%, ${this.opacity})`);
      gradient.addColorStop(0.4, `hsla(${this.hue}, 60%, 40%, ${this.opacity * 0.6})`);
      gradient.addColorStop(1, `hsla(${this.hue}, 60%, 30%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  class WaveLayer {
    constructor(amplitude, frequency, speed, yOffset, hue) {
      this.amplitude = amplitude;
      this.frequency = frequency;
      this.speed = speed;
      this.yOffset = yOffset;
      this.hue = hue;
      this.phase = Math.random() * Math.PI * 2;
    }
    
    draw() {
      ctx.strokeStyle = `hsla(${this.hue}, 50%, 50%, 0.1)`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      for (let x = 0; x <= width; x += 5) {
        const mouseInfluence = Math.exp(-Math.pow(x - mouseX, 2) / 100000) * 30;
        const y = this.yOffset + 
                  Math.sin((x * this.frequency) + (time * this.speed) + this.phase) * this.amplitude +
                  mouseInfluence;
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      
      ctx.stroke();
      
      const gradient = ctx.createLinearGradient(0, this.yOffset - this.amplitude, 0, height);
      gradient.addColorStop(0, `hsla(${this.hue}, 50%, 40%, 0.05)`);
      gradient.addColorStop(1, `hsla(${this.hue}, 50%, 30%, 0)`);
      
      ctx.fillStyle = gradient;
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      ctx.fill();
    }
  }

  function createFirefly() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.8 + Math.random() * 1.7,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: 0.01 + Math.random() * 0.02,
      hue: isDark ? 40 + Math.random() * 20 : 48 + Math.random() * 24
    };
  }
  
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    
    // Set pixel dimensions (actual drawing surface)
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    
    // Set CSS dimensions (display size)
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    
    // Scale context for high DPI
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    
    // Reinitialize elements with new dimensions
    particles.length = 0;
    for (let i = 0; i < 80; i++) {
      particles.push(new Particle());
    }
    
    orbs.length = 0;
    for (let i = 0; i < 7; i++) {
      orbs.push(new Orb(i));
    }
    
    waves.length = 0;
    waves.push(new WaveLayer(34, 0.003, 0.00045, height * 0.2, isDark ? 205 : 210));
    waves.push(new WaveLayer(46, 0.0025, 0.00035, height * 0.35, isDark ? 220 : 226));
    waves.push(new WaveLayer(30, 0.0048, 0.0008, height * 0.5, isDark ? 238 : 244));
    waves.push(new WaveLayer(40, 0.0035, 0.00055, height * 0.65, isDark ? 255 : 262));
    waves.push(new WaveLayer(26, 0.0053, 0.00095, height * 0.8, isDark ? 272 : 280));

    fireflies.length = 0;
    for (let i = 0; i < 20; i++) {
      fireflies.push(createFirefly());
    }

    ripples.length = 0;
  }
  
  function init() {
    // Set initial canvas styles
    canvas.style.cssText = `
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      width: 100vw !important;
      height: 100vh !important;
      pointer-events: none;
      z-index: -1;
      display: block;
    `;
    
    resize();
  }
  
  function animate() {
    time++;
    
    mouseX += (targetMouseX - mouseX) * 0.1;
    mouseY += (targetMouseY - mouseY) * 0.1;
    
    ctx.fillStyle = isDark ? 'rgba(14, 14, 30, 0.12)' : 'rgba(244, 247, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    waves.forEach(wave => wave.draw());
    
    orbs.forEach(orb => {
      orb.update();
      orb.draw();
    });

    for (let i = 0; i < fireflies.length; i++) {
      const f = fireflies[i];
      f.phase += f.speed;
      f.x += f.vx + Math.cos(time * 0.002 + f.phase) * 0.12;
      f.y += f.vy + Math.sin(time * 0.0025 + f.phase) * 0.1;

      if (f.x < -8) f.x = width + 8;
      if (f.x > width + 8) f.x = -8;
      if (f.y < -8) f.y = height + 8;
      if (f.y > height + 8) f.y = -8;

      const glow = 0.35 + Math.sin(f.phase) * 0.25;
      const g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7);
      g.addColorStop(0, `hsla(${f.hue}, 86%, 72%, ${0.38 + glow * 0.35})`);
      g.addColorStop(1, `hsla(${f.hue}, 86%, 60%, 0)`);
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r * 7, 0, Math.PI * 2);
      ctx.fill();
    }
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });

    for (let i = ripples.length - 1; i >= 0; i--) {
      const ripple = ripples[i];
      ripple.r += 2.4;
      ripple.alpha -= 0.012;
      if (ripple.alpha <= 0) {
        ripples.splice(i, 1);
        continue;
      }

      ctx.strokeStyle = `hsla(${isDark ? 212 : 220}, 88%, 72%, ${ripple.alpha})`;
      ctx.lineWidth = 1.8;
      ctx.beginPath();
      ctx.arc(ripple.x, ripple.y, ripple.r, 0, Math.PI * 2);
      ctx.stroke();
    }
    
    if (Math.abs(targetMouseX - mouseX) > 1 || Math.abs(targetMouseY - mouseY) > 1) {
      const trailGradient = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 100);
      trailGradient.addColorStop(0, `hsla(${isDark ? 200 : 210}, 70%, 60%, 0.1)`);
      trailGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      ctx.fillStyle = trailGradient;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 100, 0, Math.PI * 2);
      ctx.fill();
    }
    
    requestAnimationFrame(animate);
  }
  
  function handleResize() {
    resize();
  }
  
  function handleMouseMove(e) {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  }
  
  function handleTouchMove(e) {
    if (e.touches.length > 0) {
      targetMouseX = e.touches[0].clientX;
      targetMouseY = e.touches[0].clientY;
    }
  }

  function handleClick(e) {
    ripples.push({ x: e.clientX, y: e.clientY, r: 8, alpha: 0.42 });
  }

  function handleTouchStart(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      ripples.push({ x: touch.clientX, y: touch.clientY, r: 8, alpha: 0.42 });
    }
  }
  
  init();
  animate();
  
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: true });
  window.addEventListener("click", handleClick, { passive: true });
  window.addEventListener("touchstart", handleTouchStart, { passive: true });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    location.reload();
  });
  
  container.replaceWith(canvas);
})();
