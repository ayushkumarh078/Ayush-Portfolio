document.addEventListener('DOMContentLoaded', () => {
  initNebula();
  initCursor();
  initScrollBar();
  initNavigation();
  initScrollAnimations();
  initTiltCards();
  initCountUp();
  initMagneticElements();
});

/* ============================
   NEBULA CANVAS BACKGROUND
   ============================ */
function initNebula() {
  const canvas = document.getElementById('nebula-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles = [], mouse = { x: -9999, y: -9999 };

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', () => { resize(); buildParticles(); });
  resize();

  function buildParticles() {
    particles = [];
    const count = Math.floor((W * H) / 12000);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.2 + 0.3,
        alpha: Math.random() * 0.5 + 0.2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
  buildParticles();

  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const COLORS = ['rgba(168,85,247,', 'rgba(99,102,241,', 'rgba(236,72,153,', 'rgba(6,182,212,'];

  let t = 0;
  function frame() {
    ctx.clearRect(0, 0, W, H);
    t++;

    // Draw nebula blobs
    const blobData = [
      { x: W * 0.2, y: H * 0.3, r: Math.min(W, H) * 0.35, color: 'rgba(168,85,247,' },
      { x: W * 0.8, y: H * 0.6, r: Math.min(W, H) * 0.4, color: 'rgba(99,102,241,' },
      { x: W * 0.5, y: H * 0.1, r: Math.min(W, H) * 0.25, color: 'rgba(236,72,153,' },
    ];
    blobData.forEach(blob => {
      const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r);
      grad.addColorStop(0, blob.color + '0.04)');
      grad.addColorStop(1, blob.color + '0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw particles
    particles.forEach((p, i) => {
      // Drift slowly toward mouse slightly
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        p.vx += dx * 0.00008;
        p.vy += dy * 0.00008;
      }

      p.vx *= 0.995;
      p.vy *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      const alpha = p.alpha * (0.7 + 0.3 * Math.sin(t * 0.02 + p.phase));
      const color = COLORS[i % COLORS.length];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = color + alpha + ')';
      ctx.fill();

      // Lines to nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const ddx = p.x - particles[j].x;
        const ddy = p.y - particles[j].y;
        const d = Math.sqrt(ddx * ddx + ddy * ddy);
        if (d < 90) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = 'rgba(168,85,247,' + (0.08 * (1 - d / 90)) + ')';
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Lines to mouse
      if (dist < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = 'rgba(236,72,153,' + (0.2 * (1 - dist / 160)) + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    });

    requestAnimationFrame(frame);
  }
  frame();
}

/* ============================
   CUSTOM CURSOR
   ============================ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const dot = document.getElementById('cursor-dot');
  const glow = document.getElementById('cursor-glow');
  if (!dot || !glow) return;

  let mx = 0, my = 0, gx = 0, gy = 0;

  window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

  function animateCursor() {
    gx += (mx - gx) * 0.15;
    gy += (my - gy) * 0.15;
    dot.style.left = mx + 'px';
    dot.style.top = my + 'px';
    glow.style.left = gx + 'px';
    glow.style.top = gy + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .project-card, .stat-card, .exp-item, .skill-pill, .cert-card').forEach(el => {
    el.addEventListener('mouseenter', () => glow.classList.add('hovering'));
    el.addEventListener('mouseleave', () => glow.classList.remove('hovering'));
  });
}

/* ============================
   SCROLL PROGRESS BAR
   ============================ */
function initScrollBar() {
  const bar = document.querySelector('.scroll-bar');
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.width = (pct * 100) + '%';
  }, { passive: true });
}

/* ============================
   NAVIGATION
   ============================ */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');

  toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link on scroll
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const id = entry.target.getAttribute('id');
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => io.observe(s));
}

/* ============================
   SCROLL ANIMATIONS
   ============================ */
function initScrollAnimations() {
  const els = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), 80);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

/* ============================
   3D TILT CARDS
   ============================ */
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 8}deg) translateZ(6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    });
  });
}

/* ============================
   COUNT UP NUMBERS
   ============================ */
function initCountUp() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      io.unobserve(entry.target);
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = +el.getAttribute('data-count');
        const dur = 1400;
        let start = null;
        function step(ts) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(ease * target);
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target;
        }
        requestAnimationFrame(step);
      });
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.about-stats, .projects-grid').forEach(el => io.observe(el));
}

/* ============================
   MAGNETIC ELEMENTS
   ============================ */
function initMagneticElements() {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.25;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.25;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'translate(0, 0)';
    });
  });
}