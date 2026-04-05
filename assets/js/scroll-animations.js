(function () {
  // Respect prefers-reduced-motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SELECTOR = [
    '.about-research-section',
    '.news-section',
    '#publications-wrapper',
    '.honors-section',
    '.experiences-section',
    '.talks-section',
    '#services-wrapper',
  ].join(', ');

  const style = document.createElement('style');
  style.textContent = `
    .scroll-hidden {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                  transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    .scroll-visible {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);

  function initObserver() {
    const sections = document.querySelectorAll(SELECTOR);
    sections.forEach(function (el) {
      el.classList.add('scroll-hidden');
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-visible');
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      { threshold: 0.08 }
    );

    sections.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initObserver);
  } else {
    initObserver();
  }
})();
