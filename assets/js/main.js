'use strict';

const menuBtn = document.getElementById('menuBtn');
const navMenu = document.getElementById('navMenu');

if (menuBtn && navMenu) {
  const closeMenu = () => {
    navMenu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  };

  menuBtn.addEventListener('click', () => {
    const willOpen = !navMenu.classList.contains('open');
    navMenu.classList.toggle('open', willOpen);
    menuBtn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    document.body.classList.toggle('menu-open', willOpen);
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}
