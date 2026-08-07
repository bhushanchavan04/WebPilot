/* ===========================
   landing.js — interactions
=========================== */

// ── Download overlay ──────────────────────────────────────────────
const overlay  = document.getElementById('dl-overlay');
const closeBtn = document.getElementById('dl-close');

function openOverlay(e) {
  e.preventDefault();
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOverlay() {
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

// All buttons with class .dl-trigger open the overlay
document.querySelectorAll('.dl-trigger').forEach(function(btn) {
  btn.addEventListener('click', openOverlay);
});

// Close button
if (closeBtn) closeBtn.addEventListener('click', closeOverlay);

// Click outside card to close
overlay.addEventListener('click', function(e) {
  if (e.target === overlay) closeOverlay();
});

// ESC key to close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeOverlay();
});

// ── Hamburger menu ────────────────────────────────────────────────
var hamburger  = document.getElementById('hamburger');
var mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', function() {
    mobileMenu.classList.toggle('open');
  });

  // Close on mobile link click
  document.querySelectorAll('.mobile-link').forEach(function(link) {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('open');
    });
  });
}

// ── Nav shadow on scroll ──────────────────────────────────────────
var nav = document.getElementById('nav');
window.addEventListener('scroll', function() {
  if (window.scrollY > 10) {
    nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  } else {
    nav.style.boxShadow = 'none';
  }
}, { passive: true });

// ── Scroll reveal ─────────────────────────────────────────────────
var revealEls = document.querySelectorAll(
  '.feature-card, .model-card, .step, .hiw-text, .cta-text, .cta-terminal'
);

revealEls.forEach(function(el) {
  el.classList.add('reveal');
});

var observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(function(el) {
  observer.observe(el);
});

// ── Download confirm: create zip from extension folder ────────────
// The zip file (ai-browser-agent.zip) should be placed in the same
// directory as landing.html. If it doesn't exist yet, the browser
// will show a 404. You can generate it server-side or pre-package it.
//
// For local / GitHub Pages usage, you can pre-create the zip with:
//   powershell -command "Compress-Archive -Path 'path\to\folder\*' -DestinationPath 'ai-browser-agent.zip'"
//
// The dl-confirm-btn href already points to ai-browser-agent.zip with
// the download attribute set, so clicking it triggers the browser
// native download dialog automatically.
