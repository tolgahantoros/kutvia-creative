/* ============================================================
   KUTVIA — Birleşik etkileşim katmanı (tüm markalar)
   ============================================================ */
'use strict';

(function () {
  /* ─── Navbar scroll ─── */
  const navbar = document.getElementById('navbar') || document.querySelector('.navbar, .header');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ─── Mobil menü ─── */
  const hamburger = document.getElementById('hamburger') || document.querySelector('.hamburger');
  const navLinks  = document.getElementById('navLinks') || document.getElementById('navMenu')
                 || document.querySelector('.nav-links, .nav-menu');
  let menuScrollY = 0;

  function lockBodyScroll() {
    menuScrollY = window.scrollY || window.pageYOffset || 0;
    if (menuScrollY > 0) window.scrollTo(0, 0);
    document.body.classList.add('menu-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    document.body.style.touchAction = 'none';
  }
  function unlockBodyScroll() {
    document.body.classList.remove('menu-open');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    document.body.style.touchAction = '';
    if (menuScrollY > 0) window.scrollTo(0, menuScrollY);
  }
  function closeMenu() {
    if (!hamburger || !navLinks) return;
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    unlockBodyScroll();
  }
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const willOpen = !navLinks.classList.contains('open');
      hamburger.classList.toggle('active', willOpen);
      navLinks.classList.toggle('open', willOpen);
      hamburger.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      if (willOpen) { navLinks.scrollTop = 0; lockBodyScroll(); }
      else unlockBodyScroll();
    });
    navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    window.addEventListener('resize', () => { if (window.innerWidth > 768) closeMenu(); });
  }

  /* ─── Scroll reveal ─── */
  const revealEls = document.querySelectorAll('[data-aos], .reveal');
  if (revealEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = parseInt(entry.target.dataset.delay || '0', 10);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ─── Sayaç animasyonu ─── */
  function animateCount(el, target, duration = 1800) {
    const unit = el.dataset.unit || '';
    let start = 0;
    const step = ts => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.floor(ease * target) + unit;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target + unit;
    };
    requestAnimationFrame(step);
  }
  const statsSection = document.querySelector('.hero-stats');
  const counters = document.querySelectorAll('.stat-num[data-target]');
  if (statsSection && counters.length) {
    const so = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        counters.forEach(el => animateCount(el, parseInt(el.dataset.target, 10)));
        so.disconnect();
      }
    }, { threshold: 0.5 });
    so.observe(statsSection);
  }

  /* ─── İletişim formu ─── */
  const form = document.getElementById('contactForm') || document.querySelector('.contact-form');
  const modal = document.getElementById('contactModal');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const span = btn.querySelector('span') || btn;
      const original = span.textContent;
      span.textContent = 'Gönderiliyor...';
      btn.disabled = true;
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        if (modal) {
          modal.classList.add('open');
          modal.setAttribute('aria-hidden', 'false');
          span.textContent = original;
        } else {
          span.textContent = '✓ Mesajınız Alındı!';
          btn.style.background = 'linear-gradient(135deg, #10B981, #0891B2)';
          setTimeout(() => { span.textContent = original; btn.style.background = ''; }, 3500);
        }
      }, 1100);
    });
  }
  if (modal) {
    const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };
    modal.querySelectorAll('#modalCloseBtn, #modalOkBtn').forEach(b => b.addEventListener('click', close));
    modal.addEventListener('click', e => { if (e.target === modal) close(); });
  }

  /* ─── Aktif menü vurgusu ─── */
  const sections = document.querySelectorAll('section[id]');
  const anchors  = navLinks ? navLinks.querySelectorAll('a') : [];
  if (sections.length && anchors.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
      anchors.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${current}` ? 'var(--text-primary)' : '';
      });
    }, { passive: true });
  }

  /* ─── Yıl ─── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = '2026';
})();
