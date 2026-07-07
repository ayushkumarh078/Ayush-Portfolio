/* ============================================================
   CINEMATIC MOVIE INTRO SCRIPT
   - Intro Sequence Timeline (Fading text)
   - Scroll Observers (Ken Burns fade in)
   - Audio Toggle
   - Custom Cursor
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  runIntroSequence();
  initScrollReveal();
  initNav();
  initAudio();
  initCursor();
});

/* ============================================================
   1. INTRO SEQUENCE
   Play titles sequentially, then reveal the site.
   ============================================================ */
function runIntroSequence() {
  const introContainer = document.getElementById('intro-sequence');
  const texts = [
    document.getElementById('intro-1'),
    document.getElementById('intro-2'),
    document.getElementById('intro-3')
  ];

  let delay = 500; // Initial delay

  // Sequence: Show 1, Hide 1, Show 2, Hide 2, Show 3, Hide 3, Reveal Site
  texts.forEach((textEl, index) => {
    // Show text
    setTimeout(() => {
      textEl.classList.add('active');
    }, delay);

    // Keep it on screen for 2.5s, then hide it (unless it's the last one)
    delay += 2500;
    
    setTimeout(() => {
      textEl.style.opacity = '0';
    }, delay);

    delay += 1000; // Pause between texts
  });

  // Reveal the main site
  setTimeout(() => {
    introContainer.style.opacity = '0';
    document.body.classList.remove('loading');
    
    // Completely remove intro sequence from DOM after fade out
    setTimeout(() => {
      introContainer.style.display = 'none';
      // Trigger scroll reveal for hero elements that are now visible
      window.dispatchEvent(new Event('scroll'));
    }, 2000);
  }, delay);
}

/* ============================================================
   2. SCROLL REVEAL (Cinematic Ken Burns Fade)
   ============================================================ */
function initScrollReveal() {
  // Use IntersectionObserver to trigger animations when elements come into view
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Slight delay based on element index if multiple appear at once? Keep it simple for now.
        entry.target.classList.add('show');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, { 
    threshold: 0.15, // Trigger when 15% visible
    rootMargin: "0px 0px -100px 0px" // Trigger slightly before it hits bottom of screen
  });

  document.querySelectorAll('[data-cinematic-reveal]').forEach(el => {
    observer.observe(el);
  });
}

/* ============================================================
   3. NAVIGATION (Fade background on scroll)
   ============================================================ */
function initNav() {
  const nav = document.getElementById('nav');
  const links = document.querySelectorAll('.nav-menu a');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });

  // Update active link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      links.forEach(l => l.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-menu a[href="#${e.target.id}"]`);
      if(activeLink) activeLink.classList.add('active');
    });
  }, { threshold: 0.4 });
  sections.forEach(s => io.observe(s));
}

/* ============================================================
   4. AUDIO TOGGLE (Optional cinematic soundtrack)
   ============================================================ */
function initAudio() {
  const audioBtn = document.getElementById('audio-toggle');
  const audio = document.getElementById('bg-audio');
  
  if(!audioBtn || !audio) return;

  // Let's set a dark cinematic ambient track (royalty free source example)
  // For safety and actual implementation, we'll leave it empty unless the user wants a specific track,
  // but the logic is here.
  
  let isPlaying = false;
  audio.volume = 0.5;

  audioBtn.addEventListener('click', () => {
    if(!audio.src) {
      // You could add a real audio file here. For now it just simulates it.
      // audio.src = 'cinematic-ambient.mp3'; 
      console.log("Audio source not set. Add an MP3 to <audio> tag.");
    }

    if (isPlaying) {
      audio.pause();
      audioBtn.textContent = 'SOUND: OFF';
      isPlaying = false;
    } else {
      // Catch promise rejection if browser blocks autoplay (though user click usually allows it)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(_ => {
          audioBtn.textContent = 'SOUND: ON';
          isPlaying = true;
        })
        .catch(error => {
          console.log("Audio playback failed.", error);
        });
      }
    }
  });
}

/* ============================================================
   5. CUSTOM CURSOR
   ============================================================ */
function initCursor() {
  if (window.matchMedia('(hover: none)').matches) return; // Don't run on mobile
  
  const cursor = document.getElementById('cursor-dot');
  if (!cursor) return;

  // Cinematic cursor styling
  cursor.style.position = 'fixed';
  cursor.style.width = '6px';
  cursor.style.height = '6px';
  cursor.style.backgroundColor = '#fff';
  cursor.style.borderRadius = '50%';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '99999';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'width 0.2s, height 0.2s, background-color 0.2s';
  cursor.style.mixBlendMode = 'difference';

  window.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }, { passive: true });

  // Hover effects
  const interactables = document.querySelectorAll('a, button');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.backgroundColor = 'transparent';
      cursor.style.border = '1px solid #fff';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '6px';
      cursor.style.height = '6px';
      cursor.style.backgroundColor = '#fff';
      cursor.style.border = 'none';
    });
  });
}