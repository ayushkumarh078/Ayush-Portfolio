document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollBar();
  initNav();
  initScrollAnimations();
  initTilt();
  initCountUp();
});

/* ── CURSOR ─────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const dot  = document.getElementById('c-dot');
  const ring = document.getElementById('c-ring');
  if (!dot || !ring) return;

  let mx = 0, my = 0, rx = 0, ry = 0;
  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  (function tick() {
    rx += (mx - rx) * 0.14;
    ry += (my - ry) * 0.14;
    dot.style.cssText  = `left:${mx}px;top:${my}px`;
    ring.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(tick);
  })();

  document.querySelectorAll('a,button,.proj-card,.num-card,.tl-card,.cert,.beyond-item').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('on'));
    el.addEventListener('mouseleave', () => ring.classList.remove('on'));
  });
}

/* ── SCROLL BAR ─────────────────────────────── */
function initScrollBar() {
  const bar = document.querySelector('.scroll-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });
}

/* ── NAV ─────────────────────────────────────── */
function initNav() {
  const nav    = document.querySelector('.nav');
  const toggle = document.getElementById('nav-toggle');
  const links  = document.querySelectorAll('.nav-links a');
  const secs   = document.querySelectorAll('[id]');

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
    toggle.querySelectorAll('span')[0].style.transform = open ? 'translateY(7.5px) rotate(45deg)' : '';
    toggle.querySelectorAll('span')[1].style.opacity   = open ? '0' : '';
  });

  links.forEach(l => l.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }));

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const a = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        a?.classList.add('active');
      }
    });
  }, { threshold: 0.35 });

  secs.forEach(s => io.observe(s));
}

/* ── SCROLL REVEAL ──────────────────────────── */
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => io.observe(el));
}

/* ── 3D TILT ON CARDS ───────────────────────── */
function initTilt() {
  document.querySelectorAll('.proj-card, .tl-card, .num-card, .h-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

/* ── COUNT UP ───────────────────────────────── */
function initCountUp() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.dataset.count;
        const dur = 1200;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1 - p, 3)) * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        };
        requestAnimationFrame(step);
      });
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-numbers, .proj-grid').forEach(el => io.observe(el));
}