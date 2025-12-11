// Basic interactive behaviors: nav toggle, smooth scroll, tabs, accordion, form handling
document.addEventListener('DOMContentLoaded', function () {
  // Year in footer
  const yr = document.getElementById('year');
  if (yr) yr.textContent = new Date().getFullYear();

  // Nav toggle for mobile
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if (mainNav.style.display === 'flex') mainNav.style.display = '';
      else mainNav.style.display = 'flex';
    });
  }

  // Smooth scroll for nav links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // close mobile nav if open
        if (window.innerWidth < 700 && mainNav) mainNav.style.display = '';
      }
    });
  });

  // Tabs: simple show/hide (only alters active class; content is static)
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(t => {
    t.addEventListener('click', function () {
      tabs.forEach(x => x.classList.remove('active'));
      this.classList.add('active');
      // Could filter cards if desired (left as simple UI control)
    });
  });

  // Accordion
  const accToggles = document.querySelectorAll('.accordion-toggle');
  accToggles.forEach(btn => {
    btn.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // close all
      accToggles.forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const p = b.nextElementSibling;
        if (p) p.style.display = 'none';
      });
      // toggle this
      if (!expanded) {
        this.setAttribute('aria-expanded', 'true');
        const panel = this.nextElementSibling;
        if (panel) panel.style.display = 'block';
      }
    });
  });

  // Contact form submit (demo only)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Minimal UX: show success then reset
      const btn = contactForm.querySelector('button[type="submit"]');
      const initial = btn.innerHTML;
      btn.innerHTML = 'Sending...';
      setTimeout(() => {
        btn.innerHTML = initial;
        alert('Thanks — your message has been submitted (demo).');
        contactForm.reset();
      }, 800);
    });
  }
});
