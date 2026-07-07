document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initScrollAnimations();
  initNavigation();
  initCountUp();
  initParallax();
  initTilt();
});

/* ──────────────────────────────────────
   1. CUSTOM CURSOR
   ────────────────────────────────────── */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  }, { passive: true });

  const interactiveElements = document.querySelectorAll('a, button, .glass-card, .proj-card');
  interactiveElements.forEach((el) => {
    el.addEventListener('mouseenter', () => cursor.classList.add('big'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
  });
}

/* ──────────────────────────────────────
   2. 3D SCROLL & PARALLAX ANIMATIONS (Sunrise to Sunset)
   ────────────────────────────────────── */
function initScrollAnimations() {
  const root = document.documentElement;
  const nav = document.getElementById('nav');
  const progressBar = document.getElementById('progress');
  
  // Lighting breakpoints
  const sunrise = { top: '#0a1128', bot: '#f59e0b', sunColor: '#fcd34d', sunGlow: 'rgba(252, 211, 77, 0.6)' };
  const noon = { top: '#1eaaf1', bot: '#bae6fd', sunColor: '#ffffff', sunGlow: 'rgba(255, 255, 255, 0.8)' };
  const sunset = { top: '#2e1065', bot: '#d946ef', sunColor: '#f0abfc', sunGlow: 'rgba(240, 171, 252, 0.8)' };
  const twilight = { top: '#020617', bot: '#1e1b4b', sunColor: '#e2e8f0', sunGlow: 'rgba(226, 232, 240, 0.4)' };

  function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) { factor = 0.5; }
    var result = color1.slice(1).match(/.{2}/g).map((c, i) => {
      return Math.round(parseInt(c, 16) + factor * (parseInt(color2.slice(1).match(/.{2}/g)[i], 16) - parseInt(c, 16)));
    });
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  }

  function handleScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = Math.max(0, Math.min(1, scrollY / maxScroll));

    // Update Progress Bar
    if (progressBar) progressBar.style.width = `${scrollPercent * 100}%`;

    // Nav Background
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Determine Lighting Phase
    let phasePercent, currentPhase, nextPhase;
    
    if (scrollPercent < 0.33) {
      // Sunrise to Noon
      phasePercent = scrollPercent / 0.33;
      currentPhase = sunrise;
      nextPhase = noon;
    } else if (scrollPercent < 0.66) {
      // Noon to Sunset
      phasePercent = (scrollPercent - 0.33) / 0.33;
      currentPhase = noon;
      nextPhase = sunset;
    } else {
      // Sunset to Twilight
      phasePercent = (scrollPercent - 0.66) / 0.34;
      currentPhase = sunset;
      nextPhase = twilight;
    }

    // Interpolate Sky Colors
    const topColor = interpolateColor(currentPhase.top, nextPhase.top, phasePercent);
    const botColor = interpolateColor(currentPhase.bot, nextPhase.bot, phasePercent);
    const sunColor = interpolateColor(currentPhase.sunColor, nextPhase.sunColor, phasePercent);

    root.style.setProperty('--sky-top', topColor);
    root.style.setProperty('--sky-bot', botColor);
    root.style.setProperty('--sun-color', sunColor);
    
    // Sun position: rises from bottom, peaks at noon, sets at the end
    // Parabolic arc for Y
    const sunYRaw = Math.sin(scrollPercent * Math.PI); // 0 at ends, 1 in middle
    const mappedSunY = 80 - (sunYRaw * 60); // Starts at 80vh, peaks at 20vh
    root.style.setProperty('--sun-y', `${mappedSunY}vh`);
    
    // Scale sun to simulate distance
    const mappedSunScale = 1 - (sunYRaw * 0.4); // Smaller when higher up
    root.style.setProperty('--sun-scale', mappedSunScale);

    // Stars & Particles visibility
    if (scrollPercent > 0.8) {
      const starOpacity = (scrollPercent - 0.8) / 0.2;
      root.style.setProperty('--star-opacity', starOpacity);
      root.style.setProperty('--particle-opacity', 0.4 - (starOpacity * 0.4));
    } else {
      root.style.setProperty('--star-opacity', 0);
      root.style.setProperty('--particle-opacity', 0.4);
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Init
}

/* ──────────────────────────────────────
   3. CONTENT PARALLAX
   ────────────────────────────────────── */
function initParallax() {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax'));
      const yPos = -(scrollY * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('[data-reveal]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  revealElements.forEach((el) => observer.observe(el));
}

/* ──────────────────────────────────────
   4. NAVIGATION MENU
   ────────────────────────────────────── */
function initNavigation() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.querySelectorAll('.nav-menu a');

  burger?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}

/* ──────────────────────────────────────
   5. COUNT-UP STATS
   ────────────────────────────────────── */
function initCountUp() {
  const statContainers = document.querySelectorAll('.stats-grid, .proj-metrics');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('[data-count]').forEach(el => {
          const target = +el.getAttribute('data-count');
          const duration = 2000;
          let startTime = null;
          
          function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.floor(easeOutQuart * target);
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              el.textContent = target;
            }
          }
          window.requestAnimationFrame(step);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  statContainers.forEach(el => observer.observe(el));
}

/* ──────────────────────────────────────
   6. 3D TILT EFFECT
   ────────────────────────────────────── */
function initTilt() {
  const cards = document.querySelectorAll('[data-tilt]');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 10; // Increased rotation for more 4K 3D Pop!
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      card.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    }, { passive: true });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}