'use strict';

/* ── Cursor ── */
const cursor    = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

if (window.matchMedia('(hover: hover)').matches) {
  let curX = 0, curY = 0, dotX = 0, dotY = 0;
  window.addEventListener('mousemove', e => {
    dotX = e.clientX; dotY = e.clientY;
    cursorDot.style.left = dotX + 'px';
    cursorDot.style.top  = dotY + 'px';
  });
  function animateCursor() {
    curX += (dotX - curX) * 0.12;
    curY += (dotY - curY) * 0.12;
    cursor.style.left = curX + 'px';
    cursor.style.top  = curY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a, button, .project-card, .service-card, .skill-group-header, .current-item').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ── Header scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Theme ── */
const themeBtn   = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.addEventListener('click', () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ── Mobile nav ── */
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
navToggle.addEventListener('click', () => {
  const open = navToggle.classList.toggle('open');
  mobileNav.classList.toggle('open', open);
  navToggle.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('open');
    mobileNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  });
});

/* ── Active nav ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
function setActiveLink() {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(l => {
    l.classList.remove('active');
    if (l.getAttribute('href') === '#' + current) l.classList.add('active');
  });
}
window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('[data-reveal]');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); revealObs.unobserve(e.target); } });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObs.observe(el));
setTimeout(() => {
  document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('revealed'));
}, 100);

/* ── Typed text ── */
const phrases = ['Full-Stack Developer','Spring Boot Engineer','Flutter Developer','DevOps Enthusiast','Security Practitioner'];
const typedEl  = document.getElementById('typed-text');
let pIdx = 0, cIdx = 0, deleting = false;
function typeLoop() {
  const phrase = phrases[pIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++cIdx);
    if (cIdx === phrase.length) { deleting = true; setTimeout(typeLoop, 2200); return; }
    setTimeout(typeLoop, 70);
  } else {
    typedEl.textContent = phrase.slice(0, --cIdx);
    if (cIdx === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; }
    setTimeout(typeLoop, 35);
  }
}
typeLoop();

/* ── Skills accordion ── */
document.querySelectorAll('.skill-group-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const group  = btn.closest('.skill-group');
    const isOpen = group.classList.contains('open');
    document.querySelectorAll('.skill-group').forEach(g => { g.classList.remove('open'); g.querySelector('.skill-group-header').setAttribute('aria-expanded','false'); });
    if (!isOpen) { group.classList.add('open'); btn.setAttribute('aria-expanded','true'); }
  });
});

/* ── Back to top ── */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => { backTop.classList.toggle('visible', window.scrollY > 400); }, { passive: true });

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true; btn.textContent = 'Sending…';
    formStatus.textContent = ''; formStatus.className = 'form-status';
    const data = new FormData(contactForm);
    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send('service_6jod89k','template_zl5cp1i',{ from_name: data.get('from_name'), reply_to: data.get('reply_to'), message: data.get('message') });
      } else { await new Promise(r => setTimeout(r, 1000)); }
      formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch { formStatus.textContent = '✗ Something went wrong. Please email me directly.'; formStatus.className = 'form-status error'; }
    finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    }
  });
}

/* ── Stagger cards ── */
function staggerObserve(selector) {
  const cards = document.querySelectorAll(selector);
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = Array.from(cards).indexOf(entry.target);
        entry.target.style.transitionDelay = (idx % 3) * 0.08 + 's';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'none';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => { c.style.opacity='0'; c.style.transform='translateY(20px)'; c.style.transition='opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease, border-color 0.3s ease'; obs.observe(c); });
}
staggerObserve('.project-card');
staggerObserve('.service-card');
staggerObserve('.current-item');