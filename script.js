/* ============================================================
   CINEMATIC PORTFOLIO — SCRIPT
   Canvas Background Engine:
   - HERO: Matrix Code Rain (indigo/white chars, dark bg)
   - SCROLL 30%+: Smoothly crossfades to Neural Network particles
   - SCROLL 70%+: Crossfades to Deep Space starfield
   Plus: cursor glow, nav, staggered hero reveal, scroll reveals
   ============================================================ */

/* ─── ENTRY ─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('bg-canvas');
  const engine = new CinematicEngine(canvas);

  initHeroReveal();
  initNav(engine);
  initScrollReveal();
  initCursor();
  engine.start();
});

/* ============================================================
   HERO STAGGERED REVEAL
   ============================================================ */
function initHeroReveal() {
  const items = [
    { selector: '.hero-tag', delay: 200 },
    { selector: '.hero-name span:first-child', delay: 500 },
    { selector: '.hero-name span:last-child', delay: 650 },
    { selector: '.hero-role', delay: 900 },
    { selector: '.hero-desc', delay: 1100 },
    { selector: '.hero-btns', delay: 1300 },
    { selector: '.chips', delay: 1500 },
  ];
  items.forEach(({ selector, delay }) => {
    const el = document.querySelector(selector);
    if (el) setTimeout(() => el.classList.add('show'), delay);
  });
}

/* ============================================================
   SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

/* ============================================================
   NAV
   ============================================================ */
function initNav(engine) {
  const nav     = document.getElementById('nav');
  const burger  = document.getElementById('burger');
  const links   = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('dark', window.scrollY > 80);
  }, { passive: true });

  burger?.addEventListener('click', () => nav.classList.toggle('open'));
  links.forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));

  // Active link tracking
  const sections = document.querySelectorAll('section[id]');
  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-links a[href="#${e.target.id}"]`)?.classList.add('active');
    });
  }, { threshold: 0.35 });
  sections.forEach(s => sio.observe(s));
}

/* ============================================================
   CURSOR GLOW (soft magnetic glow) & DOT
   ============================================================ */
function initCursor() {
  const glow = document.getElementById('cursor-glow');
  const dot = document.getElementById('cursor-dot');
  if (!glow || !dot || window.matchMedia('(hover:none)').matches) return;

  let cx = innerWidth / 2, cy = innerHeight / 2;
  let tx = cx, ty = cy;

  window.addEventListener('mousemove', e => { 
    tx = e.clientX; 
    ty = e.clientY; 
    dot.style.left = tx + 'px';
    dot.style.top = ty + 'px';
  }, { passive: true });

  const interactables = document.querySelectorAll('a, button, .glass');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      glow.style.width  = '480px';
      glow.style.height = '480px';
      glow.style.background = 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)';
      dot.style.width = '10px';
      dot.style.height = '10px';
    });
    el.addEventListener('mouseleave', () => {
      glow.style.width  = '320px';
      glow.style.height = '320px';
      glow.style.background = 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)';
      dot.style.width = '6px';
      dot.style.height = '6px';
    });
  });

  (function animate() {
    cx += (tx - cx) * 0.1;
    cy += (ty - cy) * 0.1;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    requestAnimationFrame(animate);
  })();
}

/* ============================================================
   CINEMATIC CANVAS ENGINE
   Manages three animation modes with smooth blending:
   Mode 0 — Matrix Code Rain (hero — CS classic)
   Mode 1 — Neural Network  (mid sections — AI/data)
   Mode 2 — Deep Space Stars (contact — clean, dark)
   ============================================================ */
class CinematicEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx    = canvas.getContext('2d');
    this.mode   = 0;
    this.blend  = 0;      // 0..1 — transition progress
    this.nextMode = 0;
    this.transitioning = false;
    this.frame  = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize(), { passive: true });

    this._initMatrix();
    this._initNeural();
    this._initStars();
  }

  resize() {
    this.canvas.width  = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this._initMatrix(); // re-calc columns
  }

  setMode(m) {
    if (m === this.mode && !this.transitioning) return;
    if (m !== this.nextMode) {
      this.nextMode = m;
      this.blend = 0;
      this.transitioning = true;
    }
  }

  start() {
    const tick = () => {
      this.frame++;
      this._tick();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ─── MATRIX ─────────────────────────────────────────── */
  _initMatrix() {
    const fs = 15;
    this.mat = {
      fs,
      chars: '01アイウエカキクケABCDEFabcdef<>{}[]()=+*|;:,.~`',
      cols:  Math.ceil(this.canvas.width / fs),
      drops: [],
    };
    for (let i = 0; i < this.mat.cols; i++) {
      this.mat.drops[i] = Math.random() * -150;
    }
  }

  _drawMatrix(alpha) {
    const { ctx, canvas } = this;
    const { fs, chars, cols, drops } = this.mat;

    // Slow trail fade — creates the "ghost" streaks
    ctx.fillStyle = `rgba(2, 8, 20, 0.06)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = `${fs}px 'JetBrains Mono', monospace`;

    for (let i = 0; i < cols; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fs;
      const y = drops[i] * fs;

      // Bright leading character
      if (Math.random() > 0.97) {
        ctx.fillStyle = `rgba(220, 230, 255, ${alpha})`;
      } else if (Math.random() > 0.85) {
        ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.8})`;
      } else {
        ctx.fillStyle = `rgba(79, 70, 229, ${alpha * 0.5})`;
      }
      ctx.fillText(char, x, y);

      // Reset column when it hits bottom
      if (y > canvas.height && Math.random() > 0.97) drops[i] = 0;
      drops[i] += 0.5;
    }
  }

  /* ─── NEURAL NETWORK ─────────────────────────────────── */
  _initNeural() {
    const count = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 20000));
    this.neural = {
      nodes: Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r:  Math.random() * 2.5 + 1,
        phase: Math.random() * Math.PI * 2,
      })),
    };
  }

  _drawNeural(alpha) {
    const { ctx, canvas, neural, frame } = this;

    // Soft fade — very slow ghost trails
    ctx.fillStyle = `rgba(2, 8, 20, 0.12)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const nodes = neural.nodes;
    const maxD  = 160;

    nodes.forEach(n => {
      n.x += n.vx;
      n.y += n.vy;
      if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
      if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

      const pulse = n.r + Math.sin(frame * 0.03 + n.phase) * 1.2;

      // Glow halo
      const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pulse * 6);
      g.addColorStop(0, `rgba(99, 102, 241, ${alpha * 0.4})`);
      g.addColorStop(1, `rgba(99, 102, 241, 0)`);
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulse * 6, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();

      // Node dot
      ctx.beginPath();
      ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(165, 180, 252, ${alpha * 0.9})`;
      ctx.fill();
    });

    // Draw edges
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const d  = Math.sqrt(dx * dx + dy * dy);
        if (d < maxD) {
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - d / maxD) * alpha * 0.35})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }

  /* ─── DEEP SPACE STARS ───────────────────────────────── */
  _initStars() {
    const count = 250;
    this.stars = {
      list: Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.8 + 0.2,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.005,
      })),
      // Nebula colour blob
      nebula: {
        x: window.innerWidth  * 0.6,
        y: window.innerHeight * 0.4,
      },
    };
  }

  _drawStars(alpha) {
    const { ctx, canvas, stars, frame } = this;

    ctx.fillStyle = `rgba(2, 8, 20, 0.18)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Nebula glow
    const nb = ctx.createRadialGradient(stars.nebula.x, stars.nebula.y, 0, stars.nebula.x, stars.nebula.y, canvas.width * 0.55);
    nb.addColorStop(0, `rgba(88, 28, 135, ${alpha * 0.12})`);
    nb.addColorStop(0.5, `rgba(49, 46, 129, ${alpha * 0.06})`);
    nb.addColorStop(1,  'rgba(0,0,0,0)');
    ctx.fillStyle = nb;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.list.forEach(s => {
      const twinkle = 0.4 + 0.6 * Math.sin(frame * s.speed + s.phase);
      const grd = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3);
      grd.addColorStop(0, `rgba(255, 255, 255, ${alpha * twinkle})`);
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
      ctx.fillStyle = grd;
      ctx.fill();
    });
  }

  /* ─── MAIN TICK ─────────────────────────────────────── */
  _tick() {
    const { canvas, ctx } = this;

    if (this.transitioning) {
      this.blend += 0.018; // Speed of crossfade
      if (this.blend >= 1) {
        this.blend = 1;
        this.mode = this.nextMode;
        this.transitioning = false;
      }

      // Render outgoing mode fading out
      const oldAlpha = 1 - this.blend;
      const newAlpha = this.blend;

      // Draw old mode with fading alpha on offscreen canvas
      this._renderMode(this.mode, oldAlpha);
      this._renderMode(this.nextMode, newAlpha);
    } else {
      this._renderMode(this.mode, 1);
    }
  }

  _renderMode(mode, alpha) {
    if (alpha <= 0) return;
    switch (mode) {
      case 0: this._drawMatrix(alpha);  break;
      case 1: this._drawNeural(alpha);  break;
      case 2: this._drawStars(alpha);   break;
    }
  }
}