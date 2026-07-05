document.addEventListener('DOMContentLoaded', () => {
  cursor();
  progress();
  nav();
  heroGlow();
  projGlow();
  reveal();
  tilt();
  countUp();
});

/* ──────────────────────────────────────
   CURSOR  (dot snaps, trail lags)
   ────────────────────────────────────── */
function cursor() {
  if (window.matchMedia('(hover:none)').matches) return;
  const dot   = document.getElementById('cursor');
  const trail = document.getElementById('cursor-trail');
  if (!dot || !trail) return;

  let mx=0, my=0, tx=0, ty=0;

  window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; }, {passive:true});

  (function loop() {
    tx += (mx-tx) * .13;
    ty += (my-ty) * .13;
    dot.style.left   = mx+'px';
    dot.style.top    = my+'px';
    trail.style.left = tx+'px';
    trail.style.top  = ty+'px';
    requestAnimationFrame(loop);
  })();

  const hot = 'a,button,.proj-card,.s-card,.exp-card,.cert-card,.float-card,.b-card,.pill-row span,.btn-glow,.btn-ghost';
  document.querySelectorAll(hot).forEach(el => {
    el.addEventListener('mouseenter', () => dot.classList.add('big'));
    el.addEventListener('mouseleave', () => dot.classList.remove('big'));
  });
}

/* ──────────────────────────────────────
   SCROLL PROGRESS BAR
   ────────────────────────────────────── */
function progress() {
  const bar = document.getElementById('progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - innerHeight);
    bar.style.width = (pct*100) + '%';
  }, {passive:true});
}

/* ──────────────────────────────────────
   NAVIGATION
   ────────────────────────────────────── */
function nav() {
  const navEl  = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('nav-menu');
  const links  = menu?.querySelectorAll('a');

  burger?.addEventListener('click', () => {
    const open = navEl.classList.toggle('open');
    burger.setAttribute('aria-expanded', open);
    const [s1, s2] = burger.querySelectorAll('span');
    s1.style.transform = open ? 'translateY(7.5px) rotate(45deg)' : '';
    s2.style.transform = open ? 'translateY(-7.5px) rotate(-45deg)' : '';
  });

  links?.forEach(l => l.addEventListener('click', () => {
    navEl.classList.remove('open');
    burger?.querySelectorAll('span').forEach(s => s.style.transform='');
  }));

  // Active section highlight
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links?.forEach(l => l.classList.remove('active'));
      const a = menu?.querySelector(`a[href="#${e.target.id}"]`);
      a?.classList.add('active');
    });
  }, {threshold: .35});

  document.querySelectorAll('[id]').forEach(s => io.observe(s));
}

/* ──────────────────────────────────────
   HERO MOUSE-TRACKING RADIAL GLOW
   ────────────────────────────────────── */
function heroGlow() {
  const hero = document.querySelector('.hero');
  const glow = document.getElementById('hero-glow');
  if (!hero || !glow) return;

  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
    const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
    glow.style.setProperty('--mx', x+'%');
    glow.style.setProperty('--my', y+'%');
  }, {passive:true});
}

/* ──────────────────────────────────────
   PROJECT CARD MOUSE-TRACKING GLOW
   ────────────────────────────────────── */
function projGlow() {
  document.querySelectorAll('.proj-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  * 100).toFixed(1);
      const y = ((e.clientY - r.top)  / r.height * 100).toFixed(1);
      card.querySelector('.proj-glow')?.style.setProperty('--mx', x+'%');
      card.querySelector('.proj-glow')?.style.setProperty('--my', y+'%');
    }, {passive:true});
  });
}

/* ──────────────────────────────────────
   SCROLL REVEAL
   ────────────────────────────────────── */
function reveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (!e.isIntersecting) return;
      setTimeout(() => e.target.classList.add('show'), i * 60);
      io.unobserve(e.target);
    });
  }, {threshold:.08, rootMargin:'0px 0px -40px 0px'});

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

/* ──────────────────────────────────────
   3D TILT ON CARDS
   ────────────────────────────────────── */
function tilt() {
  const cards = '.proj-card,.s-card,.exp-card,.float-card,.b-card,.cert-card';
  document.querySelectorAll(cards).forEach(card => {
    card.addEventListener('mousemove', e => {
      if (innerWidth < 768) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - .5;
      const y = (e.clientY - r.top)  / r.height - .5;
      // Only tilt if not already controlled by a hover transform in CSS
      const current = card.style.transform;
      if (!current || current === 'none') {
        card.style.transform = `perspective(700px) rotateX(${-y*6}deg) rotateY(${x*6}deg) translateY(-4px)`;
      }
    }, {passive:true});
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });
}

/* ──────────────────────────────────────
   COUNT-UP ANIMATION
   ────────────────────────────────────── */
function countUp() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const end = +el.dataset.count, dur = 1300;
        let t0 = null;
        const step = ts => {
          if (!t0) t0 = ts;
          const p = Math.min((ts - t0) / dur, 1);
          el.textContent = Math.floor((1 - Math.pow(1-p, 3)) * end);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = end;
        };
        requestAnimationFrame(step);
      });
    });
  }, {threshold:.3});

  document.querySelectorAll('.stats-grid, .proj-grid').forEach(el => io.observe(el));
}