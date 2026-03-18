/* ═══════════════════════════════════════════
   AMINE IBENHAMADA — PORTFOLIO JS
═══════════════════════════════════════════ */

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

  document.querySelectorAll('a, button, .project-card, .service-card, .skill-group-header').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
}

/* ── Header scroll ── */
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Theme toggle ── */
const themeBtn  = document.getElementById('themeBtn');
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

themeBtn.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
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

/* ── Active nav link on scroll ── */
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-link');

function setActiveLink() {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', setActiveLink, { passive: true });

/* ── Reveal on scroll ── */
const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// Trigger hero reveals immediately
setTimeout(() => {
  document.querySelectorAll('.hero [data-reveal]').forEach(el => {
    el.classList.add('revealed');
  });
}, 100);

/* ── Typed text ── */
const phrases = [
  'Full-Stack Developer',
  'Spring Boot Engineer',
  'Flutter Developer',
  'DevOps Enthusiast',
  'Security Practitioner',
];

const typedEl = document.getElementById('typed-text');
let phraseIdx = 0, charIdx = 0, deleting = false;
const SPEED_TYPE = 70, SPEED_DEL = 35, PAUSE = 2200;

function typeLoop() {
  const phrase = phrases[phraseIdx];

  if (!deleting) {
    charIdx++;
    typedEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, PAUSE);
      return;
    }
    setTimeout(typeLoop, SPEED_TYPE);
  } else {
    charIdx--;
    typedEl.textContent = phrase.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
    setTimeout(typeLoop, SPEED_DEL);
  }
}
typeLoop();

/* ── Skills accordion ── */
document.querySelectorAll('.skill-group-header').forEach(btn => {
  btn.addEventListener('click', () => {
    const group    = btn.closest('.skill-group');
    const isOpen   = group.classList.contains('open');

    // Close all
    document.querySelectorAll('.skill-group').forEach(g => {
      g.classList.remove('open');
      g.querySelector('.skill-group-header').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (if was closed)
    if (!isOpen) {
      group.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ── Back to top ── */
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  backTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── Contact form ── */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = 'Sending…';
    formStatus.textContent = '';
    formStatus.className = 'form-status';

    const data = new FormData(contactForm);
    const payload = {
      from_name: data.get('from_name'),
      reply_to:  data.get('reply_to'),
      message:   data.get('message'),
    };

    // If EmailJS is available, use it; otherwise simulate
    try {
      if (typeof emailjs !== 'undefined') {
        await emailjs.send('service_6jod89k', 'template_zl5cp1i', payload);
      } else {
        // Simulate network delay for demo
        await new Promise(r => setTimeout(r, 1200));
      }
      formStatus.textContent = "✓ Message sent! I'll get back to you soon.";
      formStatus.className = 'form-status success';
      contactForm.reset();
    } catch (err) {
      formStatus.textContent = '✗ Something went wrong. Please email me directly.';
      formStatus.className = 'form-status error';
    } finally {
      btn.disabled = false;
      btn.innerHTML = 'Send Message <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
    }
  });
}

/* ── Smooth project card stagger ── */
const projectCards = document.querySelectorAll('.project-card');
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const idx = Array.from(projectCards).indexOf(entry.target);
      entry.target.style.transitionDelay = (idx % 3) * 0.08 + 's';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

projectCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  cardObserver.observe(card);
});

/* ── Service cards stagger ── */
const serviceCards = document.querySelectorAll('.service-card');
const svcObserver  = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = Array.from(serviceCards).indexOf(entry.target);
      entry.target.style.transitionDelay = idx * 0.1 + 's';
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'none';
      svcObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

serviceCards.forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
  svcObserver.observe(card);
});