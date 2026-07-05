document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initAnimations();
  initNavigation();
  initCustomCursor();
  initCardShine();
  initCountUp();
  initLetterFade();
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
  updateProgress();
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
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;

    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
    
    ring.style.left = `${ringX}px`;
    ring.style.top = `${ringY}px`;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

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
  
  const observer = new MutationObserver(updateHoverables);
  observer.observe(document.body, { childList: true, subtree: true });
}

// Spotlight glass reflection coordinates updater
function initCardShine() {
  const cards = document.querySelectorAll('.project-card, .timeline-content');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

// Statistical numbers count up
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
        const duration = 1500;
        let startTime = null;
        
        function animateValue(timestamp) {
          if (!startTime) startTime = timestamp;
          const progress = Math.min((timestamp - startTime) / duration, 1);
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

// Letter-by-letter fade-in animation
function initLetterFade() {
  const titles = document.querySelectorAll('.section-title');
  titles.forEach(title => {
    const text = title.innerText;
    title.innerHTML = '';
    
    const textNode = document.createElement('span');
    textNode.className = 'title-text-node';
    
    [...text].forEach((char, index) => {
      const span = document.createElement('span');
      span.className = 'letter-fade';
      span.innerText = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${index * 30}ms`;
      textNode.appendChild(span);
    });
    
    title.appendChild(textNode);
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const letters = entry.target.querySelectorAll('.letter-fade');
          letters.forEach(letter => letter.classList.add('active'));
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(title);
  });
}