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
 * Booksy on-page booking.
 *
 * Booksy blocks plain <iframe> embedding (X-Frame-Options / frame-ancestors), so a raw
 * iframe renders blank. Their supported "embed" is a widget that opens the full booking
 * flow in an overlay on the page. We:
 *   1) render a styled "Book Now" button immediately (always works), and
 *   2) load Booksy's official widget script, which upgrades the button to open the
 *      booking flow in an on-page overlay instead of navigating away.
 */
(function setupBooksy() {
  const container = document.getElementById('booksy-widget-container');
  if (!container) return;

  const bizId = container.dataset.booksyBizId;
  const bookingUrl = container.dataset.booksyUrl;

  // 1) Immediate, guaranteed-working CTA.
  const btn = document.createElement('a');
  btn.className = 'btn btn-gold btn-lg booksy-book-btn';
  btn.href = bookingUrl;
  btn.target = '_blank';
  btn.rel = 'noopener';
  btn.textContent = 'Book Now';
  container.appendChild(btn);

  // 2) Load Booksy's official widget to enable the on-page overlay booking flow.
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://booksy.com/widget/code.js?id=' + encodeURIComponent(bizId) + '&country=us&lang=en';
  s.onerror = function () {
    // The button above already links straight to Booksy — nothing else needed.
    console.warn('Booksy widget script unavailable; using direct booking link.');
  };
  document.body.appendChild(s);
})();
