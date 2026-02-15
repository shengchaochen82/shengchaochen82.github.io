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
      
      if (distance < 150) {
        const force = (150 - distance) / 150;
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
      this.hue = isDark ? 180 + Math.random() * 60 : 200 + Math.random() * 40;
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
  
  const particles = [];
  const orbs = [];
  const waves = [];
  
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
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }
    
    orbs.length = 0;
    for (let i = 0; i < 5; i++) {
      orbs.push(new Orb(i));
    }
    
    waves.length = 0;
    waves.push(new WaveLayer(50, 0.003, 0.0005, height * 0.3, isDark ? 200 : 210));
    waves.push(new WaveLayer(30, 0.005, 0.0007, height * 0.5, isDark ? 190 : 200));
    waves.push(new WaveLayer(40, 0.004, 0.0003, height * 0.7, isDark ? 210 : 220));
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
    
    ctx.fillStyle = isDark ? 'rgba(15, 15, 25, 0.1)' : 'rgba(245, 248, 255, 0.1)';
    ctx.fillRect(0, 0, width, height);
    
    waves.forEach(wave => wave.draw());
    
    orbs.forEach(orb => {
      orb.update();
      orb.draw();
    });
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
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
  
  init();
  animate();
  
  window.addEventListener("resize", handleResize, { passive: true });
  window.addEventListener("mousemove", handleMouseMove, { passive: true });
  window.addEventListener("touchmove", handleTouchMove, { passive: true });
  
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    location.reload();
  });
  
  container.replaceWith(canvas);
})();