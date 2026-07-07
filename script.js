/* ============================================================
   COMPLETE PORTFOLIO SCRIPT
   - Canvas-rendered photorealistic sky (sunrise → noon → violet sunset → night)
   - 3D tilt with real perspective, specular highlight, translateZ children
   - Scroll parallax, reveal, nav, count-up, cursor
   ============================================================ */

// ─── GLOBAL STATE ───────────────────────────────────────────
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ringX = mouseX, ringY = mouseY;

window.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
}, { passive: true });

// ─── INIT ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initSkyCanvas();
  initCursor();
  initNav();
  initTilt();
  initReveal();
  initCountUp();
  tickCursor();
});

/* ============================================================
   1. PHOTOREALISTIC CANVAS SKY
   ============================================================ */
function initSkyCanvas() {
  const canvas = document.getElementById('sky-canvas');
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Sky phases — NO RED, using purple/violet sunset */
  const PHASES = [
    // [scrollPercent start, topHex, bottomHex, sunHex, sunGlowRGBA, sunSize]
    { t: 0.00, sky0:'#060d20', sky1:'#1a2a50', sun:'#fde68a', glow:'252,211,138', r:80 }, // dawn
    { t: 0.20, sky0:'#0369a1', sky1:'#7dd3fc', sun:'#ffffff', glow:'255,255,255', r:55 }, // noon
    { t: 0.55, sky0:'#1e1b4b', sky1:'#6d28d9', sun:'#e879f9', glow:'232,121,249', r:90 }, // violet dusk
    { t: 0.80, sky0:'#050510', sky1:'#0f172a', sun:'#c4b5fd', glow:'196,181,253', r:60 }, // night
    { t: 1.00, sky0:'#020208', sky1:'#050818', sun:'#a5b4fc', glow:'165,180,252', r:50 }, // deep night
  ];

  function hexToRgb(hex) {
    const r = parseInt(hex.slice(1,3),16);
    const g = parseInt(hex.slice(3,5),16);
    const b = parseInt(hex.slice(5,7),16);
    return [r,g,b];
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function lerpColor(h1, h2, t) {
    const c1 = hexToRgb(h1), c2 = hexToRgb(h2);
    return `rgb(${Math.round(lerp(c1[0],c2[0],t))},${Math.round(lerp(c1[1],c2[1],t))},${Math.round(lerp(c1[2],c2[2],t))})`;
  }

  function getPhaseData(pct) {
    let from = PHASES[0], to = PHASES[1];
    for (let i = 0; i < PHASES.length - 1; i++) {
      if (pct >= PHASES[i].t && pct <= PHASES[i+1].t) {
        from = PHASES[i]; to = PHASES[i+1]; break;
      }
    }
    const span = to.t - from.t;
    const f = span === 0 ? 0 : (pct - from.t) / span;
    return {
      sky0: lerpColor(from.sky0, to.sky0, f),
      sky1: lerpColor(from.sky1, to.sky1, f),
      sunHex: lerpColor(from.sun, to.sun, f),
      glow: from.glow, // not lerped, use from's glow color
      r: lerp(from.r, to.r, f)
    };
  }

  function drawMountainLayer(ctx, w, h, points, color, yOffset) {
    ctx.beginPath();
    ctx.moveTo(-10, h);
    points.forEach(([px, py]) => ctx.lineTo(px * w, (py + yOffset) * h));
    ctx.lineTo(w + 10, h);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  }

  function drawStars(ctx, w, h, opacity) {
    if (opacity <= 0) return;
    // Deterministic pseudo-random star positions
    const STARS = [
      [0.05,0.05],[0.12,0.12],[0.2,0.08],[0.28,0.18],[0.35,0.04],
      [0.42,0.14],[0.5,0.06],[0.58,0.2],[0.65,0.1],[0.72,0.03],
      [0.8,0.15],[0.88,0.08],[0.95,0.18],[0.15,0.22],[0.45,0.25],
      [0.75,0.24],[0.92,0.28],[0.03,0.3],[0.3,0.3],[0.6,0.28],
    ];
    STARS.forEach(([sx, sy]) => {
      ctx.beginPath();
      ctx.arc(sx * w, sy * h, 1.5, 0, Math.PI*2);
      ctx.fillStyle = `rgba(255,255,255,${opacity * 0.9})`;
      ctx.fill();
    });
  }

  function drawAtmosphericRays(ctx, sunX, sunY, w, h, opacity) {
    if (opacity <= 0) return;
    const numRays = 8;
    for (let i = 0; i < numRays; i++) {
      const angle = (i / numRays) * Math.PI * 2 + performance.now() * 0.0001;
      const rayLen = Math.max(w, h) * 2;
      const spread = 0.08;
      const aL = angle - spread, aR = angle + spread;
      const grad = ctx.createLinearGradient(sunX, sunY, sunX + Math.cos(angle)*rayLen, sunY + Math.sin(angle)*rayLen);
      grad.addColorStop(0,   `rgba(255,240,200,${opacity * 0.08})`);
      grad.addColorStop(0.3, `rgba(255,240,200,${opacity * 0.03})`);
      grad.addColorStop(1,   'rgba(255,240,200,0)');
      ctx.beginPath();
      ctx.moveTo(sunX, sunY);
      ctx.lineTo(sunX + Math.cos(aL)*rayLen, sunY + Math.sin(aL)*rayLen);
      ctx.lineTo(sunX + Math.cos(aR)*rayLen, sunY + Math.sin(aR)*rayLen);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();
    }
  }

  /* Mountain shapes: [xFraction, yFraction] */
  const MTN_BACK = [
    [0,1],[0,0.72],[0.08,0.58],[0.18,0.7],[0.28,0.52],[0.38,0.66],
    [0.48,0.48],[0.56,0.62],[0.65,0.50],[0.74,0.64],[0.83,0.53],
    [0.92,0.68],[1,0.60],[1,1]
  ];
  const MTN_FRONT = [
    [0,1],[0,0.82],[0.1,0.74],[0.22,0.80],[0.32,0.68],[0.44,0.76],
    [0.54,0.64],[0.62,0.74],[0.72,0.65],[0.82,0.75],[0.9,0.70],
    [1,0.76],[1,1]
  ];

  let lastPct = -1;

  function draw() {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const pct = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
    const w = canvas.width, h = canvas.height;

    // Only full redraw if scroll changed or on first frame
    const pd = getPhaseData(pct);

    // ── Sky gradient ──────────────────────────────────────────
    const skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    skyGrad.addColorStop(0, pd.sky0);
    skyGrad.addColorStop(1, pd.sky1);
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // ── Stars (appear when dark) ──────────────────────────────
    const starOpacity = pct > 0.7 ? (pct - 0.7) / 0.3 : 0;
    drawStars(ctx, w, h, starOpacity);

    // ── Sun position (parabolic arc across sky) ───────────────
    // Horizontal: starts left (dawn), crosses center (noon), goes right (dusk)
    const sunXpct = pct;                         // 0=left 1=right
    const sunArcY  = Math.sin(pct * Math.PI);    // peaks at 0.5
    const sunX = w * (0.1 + sunXpct * 0.8);
    const sunY = h * (0.88 - sunArcY * 0.75);    // bottom→top→bottom
    const sunR = pd.r;

    // ── Atmospheric light haze around sun ────────────────────
    const hazeR = ctx.createRadialGradient(sunX, sunY, sunR * 0.5, sunX, sunY, sunR * 8);
    hazeR.addColorStop(0,   `rgba(${pd.glow},0.35)`);
    hazeR.addColorStop(0.3, `rgba(${pd.glow},0.12)`);
    hazeR.addColorStop(0.7, `rgba(${pd.glow},0.04)`);
    hazeR.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = hazeR;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 8, 0, Math.PI * 2);
    ctx.fill();

    // ── Sun corona ────────────────────────────────────────────
    const coronaR = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 2.5);
    coronaR.addColorStop(0,   `rgba(${pd.glow},0.9)`);
    coronaR.addColorStop(0.4, `rgba(${pd.glow},0.5)`);
    coronaR.addColorStop(1,   'rgba(0,0,0,0)');
    ctx.fillStyle = coronaR;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR * 2.5, 0, Math.PI * 2);
    ctx.fill();

    // ── Atmospheric rays (god rays) ───────────────────────────
    // Only visible during golden hours (dawn/dusk)
    const rayOpacity = (pct < 0.15 || (pct > 0.5 && pct < 0.75)) ? 0.6 : 0;
    drawAtmosphericRays(ctx, sunX, sunY, w, h, rayOpacity);

    // ── Sun disc ──────────────────────────────────────────────
    const sunGrad = ctx.createRadialGradient(sunX - sunR*0.3, sunY - sunR*0.3, 0, sunX, sunY, sunR);
    sunGrad.addColorStop(0, '#fff');
    sunGrad.addColorStop(0.4, pd.sunHex);
    sunGrad.addColorStop(1, `rgba(${pd.glow},0.7)`);
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, sunR, 0, Math.PI * 2);
    ctx.fill();

    // ── Horizon glow ──────────────────────────────────────────
    const horizonGlow = ctx.createLinearGradient(0, h * 0.55, 0, h * 0.85);
    horizonGlow.addColorStop(0, `rgba(${pd.glow},0.15)`);
    horizonGlow.addColorStop(1, 'rgba(0,0,0,0.4)');
    ctx.fillStyle = horizonGlow;
    ctx.fillRect(0, h * 0.55, w, h * 0.3);

    // ── Mountains (back layer, lighter) ──────────────────────
    drawMountainLayer(ctx, w, h, MTN_BACK, 'rgba(10,10,30,0.65)', 0);

    // ── Mountains (front layer, dark, adds depth) ─────────────
    drawMountainLayer(ctx, w, h, MTN_FRONT, 'rgba(5,5,15,0.9)', 0);

    // ── Foreground ground (very dark gradient) ─────────────────
    const fgGrad = ctx.createLinearGradient(0, h * 0.78, 0, h);
    fgGrad.addColorStop(0, 'rgba(0,0,0,0)');
    fgGrad.addColorStop(1, 'rgba(0,0,0,0.97)');
    ctx.fillStyle = fgGrad;
    ctx.fillRect(0, h * 0.78, w, h * 0.22);

    requestAnimationFrame(draw);
  }

  requestAnimationFrame(draw);
}

/* ============================================================
   2. DUAL-RING CURSOR
   ============================================================ */
function initCursor() {
  if (window.matchMedia('(hover:none)').matches) return;
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (!dot || !ring) return;

  const interactable = 'a, button, [data-tilt], .btn-primary, .btn-outline, .proj-link';
  document.querySelectorAll(interactable).forEach(el => {
    el.addEventListener('mouseenter', () => { dot.classList.add('big'); ring.classList.add('big'); });
    el.addEventListener('mouseleave', () => { dot.classList.remove('big'); ring.classList.remove('big'); });
  });
}

function tickCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const prog = document.getElementById('progress');

  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;

  if (dot)  { dot.style.left  = mouseX + 'px'; dot.style.top  = mouseY + 'px'; }
  if (ring) { ring.style.left = ringX  + 'px'; ring.style.top = ringY  + 'px'; }

  // Scroll progress
  if (prog) {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    prog.style.width = Math.min(pct * 100, 100) + '%';
  }

  requestAnimationFrame(tickCursor);
}

/* ============================================================
   3. NAVIGATION
   ============================================================ */
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links  = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  burger?.addEventListener('click', () => nav.classList.toggle('open'));
  links.forEach(l => l.addEventListener('click', () => nav.classList.remove('open')));

  // Active section tracking
  const sections = document.querySelectorAll('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      document.querySelector(`.nav-menu a[href="#${e.target.id}"]`)?.classList.add('active');
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
}

/* ============================================================
   4. REALISTIC 3D TILT — the key to pop-out effect
   Strategy:
   - perspective is set ON THE CARD (local perspective = more dramatic)
   - We set transform on .card-body (the actual glass surface)
   - .card-body has transform-style:preserve-3d
   - .card-body > * has translateZ(50px) from CSS
   - So when card tilts, content physically floats above glass
   ============================================================ */
function initTilt() {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    const body = card.querySelector('.card-body');
    const shine = card.querySelector('.card-shine');
    if (!body) return;

    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width  / 2;
      const cy = rect.height / 2;

      // Tilt angles — 12° max for dramatic but controlled rotation
      const rotX = ((y - cy) / cy) * -12;
      const rotY = ((x - cx) / cx) *  12;

      // Apply perspective on the BODY (preserve-3d), not the wrapper
      body.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.03)`;

      // Move the specular highlight to follow mouse
      if (shine) {
        shine.style.setProperty('--shine-x', x + 'px');
        shine.style.setProperty('--shine-y', y + 'px');
        shine.style.opacity = '1';
      }
    }, { passive: true });

    card.addEventListener('mouseleave', () => {
      body.style.transform = '';
      if (shine) shine.style.opacity = '0';
    });
  });
}

/* ============================================================
   5. SCROLL REVEAL
   ============================================================ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (!entry.isIntersecting) return;
      setTimeout(() => entry.target.classList.add('show'), i * 80);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('[data-reveal]').forEach(el => io.observe(el));
}

/* ============================================================
   6. COUNT-UP ANIMATION
   ============================================================ */
function initCountUp() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const end = +el.dataset.count;
        const duration = 2000;
        let start = null;
        const step = ts => {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);
          el.textContent = Math.floor(ease * end);
          if (progress < 1) requestAnimationFrame(step);
          else el.textContent = end;
        };
        requestAnimationFrame(step);
      });
      io.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.stats-col, .proj-metrics, .stat-card').forEach(el => io.observe(el));
}