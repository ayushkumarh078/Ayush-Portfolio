document.addEventListener('DOMContentLoaded', () => {
  initBootScreen();
  initScrollProgress();
  initAnimations();
  initNavigation();
  initCustomCursor();
  initCardShine();
  initCardTilt();
  initCountUp();
  initLetterFade();
  initCanvasBackground();
});

function initBootScreen() {
  const bootScreen = document.getElementById('boot-screen');
  if (bootScreen) {
    setTimeout(() => {
      bootScreen.classList.add('hidden');
    }, 2500);
  }
}

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
  // Futuristic crosshair lines inside the ring
  ring.innerHTML = '<div style="position:absolute;top:50%;left:-5px;right:-5px;height:1px;background:var(--signal-amber);"></div><div style="position:absolute;left:50%;top:-5px;bottom:-5px;width:1px;background:var(--signal-amber);"></div>';
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
    ringX += (mouseX - ringX) * 0.2; // faster tracking for HUD
    ringY += (mouseY - ringY) * 0.2;

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
        ring.style.transform = 'translate(-50%, -50%) rotate(45deg)';
      });
      el.addEventListener('mouseleave', () => {
        ring.classList.remove('hover');
        ring.style.transform = 'translate(-50%, -50%) rotate(0deg)';
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

function initCardTilt() {
  const cards = document.querySelectorAll('.project-card, .timeline-content');
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      if (window.innerWidth < 768) return; // Disable on mobile
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) translateY(0)`;
    });
  });
}

function initCanvasBackground() {
  const canvas = document.getElementById('starfield');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width, height;
  let stars = [];
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  class Star {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 1.5 + 0.5;
      this.baseAlpha = Math.random() * 0.5 + 0.1;
      this.phase = Math.random() * Math.PI * 2;
    }
    update() {
      this.y -= 0.15;
      if (this.y < 0) {
        this.y = height;
        this.x = Math.random() * width;
      }
      this.phase += 0.02;
    }
    draw() {
      const alpha = this.baseAlpha + Math.sin(this.phase) * 0.3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(0, alpha)})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 150; i++) {
    stars.push(new Star());
  }

  let mx = -1000, my = -1000;
  window.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
  });

  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < stars.length; i++) {
      stars[i].update();
      stars[i].draw();
      
      const dxMouse = stars[i].x - mx;
      const dyMouse = stars[i].y - my;
      const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
      
      if (distMouse < 120) {
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(mx, my);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - distMouse/120 * 0.12})`;
        ctx.stroke();
      }
    }
    requestAnimationFrame(animate);
  }
  animate();
}