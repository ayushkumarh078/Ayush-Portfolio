document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initAnimations();
  initNavigation();
  initGlitchEffects();
  initCustomCursor();
  initTextScrambler();
  initCountUp();
});

function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');

  function updateProgress() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
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
  updateProgress(); // Initial check
}

function initAnimations() {
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
      }
    });
  }, { threshold: 0.1 });

  animatedElements.forEach(el => observer.observe(el));
}

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('.section');
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('nav-open');
      document.body.classList.toggle('menu-active');
    });
  }

  function updateActiveLink() {
    let current = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    // Fallback to top section if at the very top
    if (window.scrollY < 100) {
      current = 'hero';
    }

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
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('nav-open')) {
        mainNav.classList.remove('nav-open');
        document.body.classList.remove('menu-active');
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

    glitchName.style.transform = `perspective(1000px) rotateX(${y * 10}deg) rotateY(${x * 10}deg)`;
  });

  glitchName.addEventListener('mouseleave', () => {
    glitchName.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
  });

  function randomGlitch() {
    if (Math.random() > 0.65) {
      glitchName.classList.add('glitching');
      setTimeout(() => {
        glitchName.classList.remove('glitching');
      }, 200);
    }
    glitchTimeout = setTimeout(randomGlitch, Math.random() * 6000 + 3000);
  }

  glitchTimeout = setTimeout(randomGlitch, 4000);
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
  let isHovering = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    // Spring physics approximation
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  // Detect hover on interactive elements
  const updateHoverables = () => {
    const hoverables = document.querySelectorAll('a, button, .project-card, .skill-chip, .chip, .timeline-content');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => {
        ring.classList.add('hover');
        cursor.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hover');
        cursor.classList.remove('hover');
      });
    });
  };

  updateHoverables();
  
  // Re-run whenever mutations occur (e.g. dynamic elements, though not applicable here, good practice)
  const observer = new MutationObserver(updateHoverables);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Matrix Text Scrambler Effect
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________10X';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 15);
      const end = start + Math.floor(Math.random() * 15);
      this.queue.push({ from, to, start, end, char: '' });
    }
    
    cancelAnimationFrame(this.frameId);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="scramble-char" style="color: var(--signal-cyan);">${char}</span>`;
      } else {
        output += from;
      }
    }
    
    this.el.innerHTML = output;
    
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameId = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

function initTextScrambler() {
  const scrambleElements = document.querySelectorAll('.nav-links a, .section-title, .plate-row span.plate-value, .contact-email');
  
  scrambleElements.forEach(el => {
    // If there's nested elements or HTML content, we only grab raw text
    const originalText = el.getAttribute('data-scramble-text') || el.innerText;
    
    // Save original text as attribute in case we need it
    if (!el.getAttribute('data-scramble-text')) {
      el.setAttribute('data-scramble-text', originalText);
    }
    
    const scrambler = new TextScrambler(el);
    let isScrambling = false;
    
    el.addEventListener('mouseenter', () => {
      if (isScrambling) return;
      isScrambling = true;
      scrambler.setText(originalText).then(() => {
        isScrambling = false;
      });
    });
  });
}

// Count-Up Statistics
function initCountUp() {
  const countElements = document.querySelectorAll('[data-count]');
  
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (el.classList.contains('counted')) return;
        el.classList.add('counted');
        
        const targetVal = parseInt(el.getAttribute('data-count'), 10);
        const minVal = parseInt(el.getAttribute('data-min'), 10) || 0;
        const duration = 1500; // 1.5 seconds
        let startTime = null;
        
        function animateValue(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
          // Easing: easeOutExpo
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const current = Math.floor(easeProgress * (targetVal - minVal) + minVal);
          
          el.innerText = current;
          
          if (progress < 1) {
            requestAnimationFrame(animateValue);
          } else {
            el.innerText = targetVal;
          }
        }
        requestAnimationFrame(animateValue);
      }
    });
  }, { threshold: 0.1 });
  
  countElements.forEach(el => countObserver.observe(el));
}