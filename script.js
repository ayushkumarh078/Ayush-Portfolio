document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initAnimations();
  initNavigation();
  initGlitchEffects();
  initCustomCursor();
});

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');

  function updateProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateProgress();
        ticking = false;
      });
      ticking = true;
    }
  });
}

function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinksContainer = document.querySelector('.nav-links');

  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navLinksContainer.style.display = isExpanded ? 'none' : 'flex';
      navLinksContainer.style.position = !isExpanded ? 'absolute' : 'static';
      navLinksContainer.style.top = !isExpanded ? '60px' : 'auto';
      navLinksContainer.style.left = !isExpanded ? '0' : 'auto';
      navLinksContainer.style.right = !isExpanded ? '0' : 'auto';
      navLinksContainer.style.background = !isExpanded ? 'var(--void-2)' : 'transparent';
      navLinksContainer.style.padding = !isExpanded ? '1rem' : '0';
      navLinksContainer.style.flexDirection = !isExpanded ? 'column' : 'row';
      navLinksContainer.style.gap = !isExpanded ? '1rem' : '2rem';
    });
  }

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateActiveLink();
        ticking = false;
      });
      ticking = true;
    }
  });

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      if (window.innerWidth <= 768 && navLinksContainer) {
        navLinksContainer.style.display = 'none';
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });
}

function initGlitchEffects() {
  const glitchName = document.querySelector('.glitch-name');

  if (!glitchName || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let glitchTimeout;

  glitchName.addEventListener('mousemove', (e) => {
    const rect = glitchName.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    glitchName.style.transform = `perspective(1000px) rotateX(${y * 6}deg) rotateY(${x * 6}deg)`;
  });

  glitchName.addEventListener('mouseleave', () => {
    glitchName.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

  function randomGlitch() {
    if (Math.random() > 0.7) {
      glitchName.style.setProperty('--glitch-duration', '150ms');
      glitchName.classList.add('glitching');
      setTimeout(() => {
        glitchName.classList.remove('glitching');
      }, 150);
    }
    glitchTimeout = setTimeout(randomGlitch, Math.random() * 8000 + 4000);
  }

  glitchTimeout = setTimeout(randomGlitch, 6000);
}

function initCustomCursor() {
  if (window.matchMedia('(hover: none)').matches) return;

  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);

  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(ring);

  let mouseX = 0;
  let mouseY = 0;
  let ringX = 0;
  let ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  const hoverables = document.querySelectorAll('a, button, .project-card');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
      ring.classList.remove('hover');
    });
  });
}