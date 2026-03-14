'use strict';

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.setAttribute('aria-label', 'Menüyü aç');
    document.body.classList.remove('menu-open');
  };

  menuBtn.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', willOpen);
    menuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', willOpen ? 'Menüyü kapat' : 'Menüyü aç');
    document.body.classList.toggle('menu-open', willOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });

  document.addEventListener('click', event => {
    if (window.innerWidth > 860) return;
    const clickedInsideNav = navMenu.contains(event.target) || menuBtn.contains(event.target);
    if (!clickedInsideNav) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMenu();
  });
}
