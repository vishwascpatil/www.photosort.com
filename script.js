/* =============================================
   PHOTOSORT LANDING PAGE — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // =================== NAVBAR SCROLL ===================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // =================== MOBILE NAV TOGGLE ===================
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      const spans = navToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }

  // =================== SCROLL ANIMATIONS ===================
  const animateElements = document.querySelectorAll(
    '.feature-card, .step-card, .showcase-row, .privacy-card, .download-card, .stats-bar'
  );

  animateElements.forEach(el => el.classList.add('animate-on-scroll'));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  animateElements.forEach(el => observer.observe(el));

  // =================== AUTO-DETECT OS FOR PRIMARY BUTTON ===================
  const userAgent = navigator.userAgent.toLowerCase();
  const isMac = userAgent.includes('macintosh') || userAgent.includes('mac os');
  const isWindows = userAgent.includes('windows');

  const heroWin = document.getElementById('heroDownloadWindows');
  const heroMac = document.getElementById('heroDownloadMac');

  if (isMac && heroMac && heroWin) {
    // Swap order — Mac first
    heroMac.classList.remove('btn-secondary');
    heroMac.classList.add('btn-primary');
    heroWin.classList.remove('btn-primary');
    heroWin.classList.add('btn-secondary');
    heroMac.parentNode.insertBefore(heroMac, heroWin);
  }

  // =================== SMOOTH SCROLL (fallback) ===================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const position = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: position, behavior: 'smooth' });
      }
    });
  });

  // =================== PARALLAX GLOWS ===================
  window.addEventListener('mousemove', (e) => {
    const glows = document.querySelectorAll('.hero-glow');
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    glows.forEach((glow, i) => {
      const factor = i === 0 ? 1 : -0.7;
      glow.style.transform = `translate(calc(-50% + ${x * factor}px), ${y * factor}px)`;
    });
  }, { passive: true });
});
