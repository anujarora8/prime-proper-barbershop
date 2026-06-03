// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});

// Close mobile nav when a link is tapped
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

/**
 * Booksy booking — opens the official Booksy widget in an on-page overlay.
 * Any element with [data-booksy-open] launches the dialog; the iframe is created
 * lazily on first open. Closes via the X, the backdrop, or the Escape key.
 */
(function booksyModal() {
  const WIDGET_URL =
    'https://booksy.com/widget-2021/index.html?id=1703643&lang=en&country=us&mode=dialog&theme=default';
  const modal = document.getElementById('booksyModal');
  const body = document.getElementById('booksyModalBody');
  if (!modal || !body) return;

  function open(e) {
    if (e) e.preventDefault();
    if (!body.querySelector('iframe')) {
      const frame = document.createElement('iframe');
      frame.src = WIDGET_URL;
      frame.title = 'Book with Prime & Proper on Booksy';
      frame.setAttribute('allow', 'payment');
      body.appendChild(frame);
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-booksy-open]').forEach((el) => el.addEventListener('click', open));
  modal.querySelectorAll('[data-booksy-close]').forEach((el) => el.addEventListener('click', close));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) close();
  });
})();
