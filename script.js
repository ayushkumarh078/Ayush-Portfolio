/* ============================================================
   SCRIPT FOR REALISTIC VIDEO BACKGROUND THEME
   - Fast, immediate load
   - Smooth IntersectionObserver reveals
   - Custom trailing cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initNav();
  initCursor();
});

/* ============================================================
   SCROLL REVEAL (Fast & Snappy)
   ============================================================ */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Unobserve after showing so it only animates once
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.1, 
    rootMargin: "0px 0px -50px 0px" 
  });

  document.querySelectorAll('[data-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================================
   NAVIGATION
   ============================================================ */
function initNav() {
  const nav = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const links = document.querySelectorAll('.nav-menu a');

  // Background blur on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  burger?.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close mobile menu on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // Update active link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
      if(activeLink) activeLink.classList.add('active');
    });
  }, { threshold: 0.3 });
  
  sections.forEach(s => io.observe(s));
}

/* ============================================================
   CUSTOM CURSOR (Soft glow)
   ============================================================ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return;
  
  const cursor = document.getElementById('cursor');
  if (!cursor) return;

  // Setup cursor styles dynamically here or in CSS
  cursor.style.position = 'fixed';
  cursor.style.width = '300px';
  cursor.style.height = '300px';
  cursor.style.borderRadius = '50%';
  cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '9999';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'width 0.3s, height 0.3s';
  cursor.style.mixBlendMode = 'screen';

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Smooth lerp for the large glowing cursor
  function animate() {
    currentX += (mouseX - currentX) * 0.15;
    currentY += (mouseY - currentY) * 0.15;
    
    cursor.style.left = currentX + 'px';
    cursor.style.top = currentY + 'px';
    
    requestAnimationFrame(animate);
  }
  animate();

  // Make it pulse on interactive elements
  const interactables = document.querySelectorAll('a, button, .glass-card, .glass-panel');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '400px';
      cursor.style.height = '400px';
      cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 70%)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '300px';
      cursor.style.height = '300px';
      cursor.style.background = 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)';
    });
  });
}