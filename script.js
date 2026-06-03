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
 * Booksy embed.
 * Loads the official Booksy widget for Prime & Proper Barber Co. (business ID 1703643).
 * The widget renders a live "Book Now" button that opens the booking flow.
 * A static fallback link is always present in the markup so booking works even if
 * the third-party script is blocked or unavailable.
 */
(function loadBooksyWidget() {
  const BOOKSY_ID = '1703643';
  const s = document.createElement('script');
  s.async = true;
  s.src = 'https://booksy.com/widget/code.js?id=' + BOOKSY_ID + '&country=us&lang=en';
  s.onerror = function () {
    // Fallback link in the markup already covers this case — nothing more to do.
    console.warn('Booksy widget could not load; using direct booking link.');
  };
  document.body.appendChild(s);
})();
