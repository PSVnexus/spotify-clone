/* ==========================================================================
   MY 2025 WRAPPED — PERSONAL EXPERIENCE ENGINE (script.js)
   ========================================================================== */

/* --------------------------------------------------------------------------
   SINGLE SOURCE OF TRUTH FOR ALL PERSONAL CONTENT
   Update this object and the whole site updates with it — stats dashboard,
   playlist cards, Discord Wrapped grid, and the story slideshow counters.
   -------------------------------------------------------------------------- */
const wrappedData = {
  name: "PSV",
  year: "2025",
  github: "PSVnexus",

  minutes: 5875,
  topGenre: "Desi",
  topArtist: "Talwiinder",
  topArtists: ["Talwiinder", "Pritam", "OneRepublic", "Aditya Rikhari", "Vishal-Shekhar"],

  peakDay: {
    dateLabel: "Feb 6, 2025",
    minutes: 236,
    tracks: 81,
    artists: 116
  },

  // Real Top 5 songs from my 2025 Spotify Wrapped.
  // Drop matching mp3 files into assets/music/ to enable in-browser previews.
  topSongs: [
    {
      rank: 1,
      title: "Nuestra Canción",
      artist: "Monsieur Periné, Vicente García",
      duration: "4:20",
      file: "Nuestra-Cancion-Brunog-Spanish-Song.mp3",
      art: "album-art-2",
      glow: "#7C6CFF",
      note: "Not even close to what the rest of my playlist sounds like, but it's the song I came back to more than any other this year."
    },
    {
      rank: 2,
      title: "Haseen",
      artist: "Talwiinder, NDS, Rippy Grewal",
      duration: "2:54",
      file: "haseen_talwiinder.mp3",
      art: "album-art-3",
      glow: "#00f2fe",
      note: "So close to the top spot. My default pick whenever I couldn't decide what to play next."
    },
    {
      rank: 3,
      title: "Gallan 4",
      artist: "Talwiinder",
      duration: "3:15",
      file: "assets/music/gallan-4.mp3",
      art: "album-art-1",
      glow: "#bb86fc",
      note: "The song that got me properly into Talwiinder's discography. Once it hit my playlist, it never really left."
    },
    {
      rank: 4,
      title: "Dhundhala",
      artist: "Yashraj, Dropped Out, Talwiinder",
      duration: "3:02",
      file: "assets/music/dhundhala.mp3",
      art: "album-art-4",
      glow: "#ff007f",
      note: "My go-to whenever I needed a push — commutes, gym sessions, long to-do lists."
    },
    {
      rank: 5,
      title: "Paro",
      artist: "Aditya Rikhari",
      duration: "2:33",
      file: "assets/music/paro.mp3",
      art: "album-art-5",
      glow: "#39ff14",
      note: "Started as background noise and ended up as one of those songs I'd replay just for the chorus."
    }
  ],

  // My 2025 Discord Checkpoint
  discord: {
    messagesSent: 1057,
    hoursInVoice: 139,
    emojiUsed: 181,
    favoriteEmoji: "😭 :sob:",
    mostPlayedGame: "Where Winds Meet",
    topServer: "Gangs of Instapur",
    checkpointLevel: 13692,
    checkpointRank: "#1082 of the year (top 8/10)"
  }
};

/* --------------------------------------------------------------------------
   Resolve a dot-path like "peakDay.tracks" against wrappedData.
   -------------------------------------------------------------------------- */
function resolveWrappedPath(path) {
  return path.split('.').reduce((acc, key) => (acc == null ? acc : acc[key]), wrappedData);
}

/* --------------------------------------------------------------------------
   Fill every element tagged with data-wrapped-text / data-wrapped-target
   straight from wrappedData. Keeps markup and data in sync automatically.
   -------------------------------------------------------------------------- */
function applyWrappedDataHooks() {
  document.querySelectorAll('[data-wrapped-text]').forEach((el) => {
    const value = resolveWrappedPath(el.getAttribute('data-wrapped-text'));
    if (value !== undefined && value !== null) el.textContent = value;
  });

  document.querySelectorAll('[data-wrapped-target]').forEach((el) => {
    const value = resolveWrappedPath(el.getAttribute('data-wrapped-target'));
    if (value !== undefined && value !== null) el.setAttribute('data-target', value);
  });
}

/* --------------------------------------------------------------------------
   Build the "PSV's Top Tracks" playlist grid from wrappedData.topSongs.
   -------------------------------------------------------------------------- */
function buildPlaylistGrid() {
  const grid = document.getElementById('playlist-grid');
  if (!grid) return;

  grid.innerHTML = wrappedData.topSongs.map((song, index) => `
    <div class="playlist-card-wrapper">
      <div class="playlist-card-inner glass-card hover-tilt" data-glow-color="${song.glow}" data-track-index="${index}">
        <div class="card-face card-front">
          <div class="album-art-wrapper">
            <div class="album-art ${song.art}"></div>
            <button class="play-btn-overlay" aria-label="Play ${song.title}">
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path class="play-icon" d="M8 5v14l11-7z"/>
                <path class="stop-icon hidden" d="M6 19h12V5H6z"/>
              </svg>
            </button>
          </div>
          <div class="playlist-info">
            <h3 class="track-title">${song.title}</h3>
            <p class="track-artist">${song.artist}</p>
            <span class="track-duration">${song.duration}</span>
          </div>
        </div>
        <div class="card-face card-back">
          <h4 class="back-title">Why It Made the Cut</h4>
          <div class="back-stats">
            <div class="back-stat-row"><span>Rank</span><strong>#${song.rank} of 5</strong></div>
            <div class="back-stat-row"><span>Artist</span><strong>${song.artist}</strong></div>
            <div class="back-stat-row"><span>Length</span><strong>${song.duration}</strong></div>
          </div>
          <p class="back-description">${song.note}</p>
        </div>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   Build the Discord Wrapped grid from wrappedData.discord.
   -------------------------------------------------------------------------- */
function buildDiscordGrid() {
  const grid = document.getElementById('discord-grid');
  if (!grid) return;
  const d = wrappedData.discord;

  grid.innerHTML = `
    <div class="glass-card stat-card hover-tilt" data-glow-color="#7C6CFF">
      <div class="stat-icon-wrapper spotify-green-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <div class="stat-info">
        <h3 class="stat-label">Messages Sent</h3>
        <p class="stat-number" data-target="${d.messagesSent}">0</p>
        <p class="stat-context">Across every server I'm in</p>
      </div>
    </div>
    <div class="glass-card stat-card hover-tilt" data-glow-color="#00f2fe">
      <div class="stat-icon-wrapper cyan-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
        </svg>
      </div>
      <div class="stat-info">
        <h3 class="stat-label">Hours in Voice</h3>
        <p class="stat-number" data-target="${d.hoursInVoice}">0</p>
        <p class="stat-context">That's a lot of "can you hear me?"</p>
      </div>
    </div>
    <div class="glass-card stat-card hover-tilt" data-glow-color="#bb86fc">
      <div class="stat-icon-wrapper purple-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
          <line x1="9" y1="9" x2="9.01" y2="9"></line>
          <line x1="15" y1="9" x2="15.01" y2="9"></line>
        </svg>
      </div>
      <div class="stat-info">
        <h3 class="stat-label">Emoji Used</h3>
        <p class="stat-number" data-target="${d.emojiUsed}">0</p>
        <p class="stat-context">Favorite: ${d.favoriteEmoji}</p>
      </div>
    </div>
    <div class="glass-card stat-card hover-tilt" data-glow-color="#ff007f">
      <div class="stat-icon-wrapper hot-pink-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <line x1="6" y1="12" x2="10" y2="12"></line>
          <line x1="8" y1="10" x2="8" y2="14"></line>
          <circle cx="16" cy="10" r="1"></circle>
          <circle cx="18" cy="13" r="1"></circle>
        </svg>
      </div>
      <div class="stat-info">
        <h3 class="stat-label">Most Played Game</h3>
        <p class="stat-text">${d.mostPlayedGame}</p>
        <p class="stat-context">Top server: ${d.topServer}</p>
      </div>
    </div>
    <div class="glass-card stat-card hover-tilt" data-glow-color="#39ff14">
      <div class="stat-icon-wrapper neon-green-bg">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="24" height="24">
          <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
          <line x1="4" y1="22" x2="4" y2="15"></line>
        </svg>
      </div>
      <div class="stat-info">
        <h3 class="stat-label">Checkpoint Level</h3>
        <p class="stat-number" data-target="${d.checkpointLevel}">0</p>
        <p class="stat-context">${d.checkpointRank}</p>
      </div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  // Build all dynamic, data-driven markup FIRST so the init functions
  // below (tilt effect, ripple, playlist controls, counters) can find
  // and bind to the elements that just got created.
  applyWrappedDataHooks();
  buildPlaylistGrid();
  buildDiscordGrid();

  // Global Application State instances
  let audioEngineInstance = null;
  let backgroundCanvasInstance = null;
  let slideshowInstance = null;

  // Initialize modular UI systems
  initCursorGlow();
  initLoadingScreen();
  initMobileNavigation();
  initScrollIntersectionObserver();
  initTiltEffect();
  initTimelineProgress();
  initButtonRipple();
  initPlaylistCardControls();
  initPlaylistAudioPlayback();
  initHeroParallax();

  /* ==========================================================================
     GLOBAL CURSOR GLOW EFFECT (Desktop)
     ========================================================================== */
  function initCursorGlow() {
    const glowEl = document.getElementById('cursor-glow');
    if (!glowEl) return;
    
    document.addEventListener('mousemove', (e) => {
      // Use requestAnimationFrame style hardware-acceleration
      glowEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });
  }

  /* ==========================================================================
     BUTTON CLICK RIPPLE HELPER
     ========================================================================== */
  function initButtonRipple() {
    const rippleButtons = document.querySelectorAll('.ripple-btn');
    
    rippleButtons.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        
        // Compute local coordinates
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        // Append and clean up
        this.appendChild(ripple);
        
        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });
  }

  /* ==========================================================================
     HERO MOUSE PARALLAX
     ========================================================================== */
  function initHeroParallax() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    const elementsToShift = [
      { selector: '.hero-title', speed: -15 },
      { selector: '.hero-subtitle', speed: 8 },
      { selector: '.cyber-badge', speed: -25 },
      { selector: '.hero-actions', speed: 12 }
    ];
    
    document.addEventListener('mousemove', (e) => {
      // Calculate coordinates relative to screen center
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      const offsetX = (e.clientX - centerX) / centerX;
      const offsetY = (e.clientY - centerY) / centerY;
      
      elementsToShift.forEach(item => {
        const el = heroSection.querySelector(item.selector);
        if (el) {
          const tx = offsetX * item.speed;
          const ty = offsetY * item.speed;
          el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
          el.style.transition = 'transform 0.15s cubic-bezier(0.25, 0.8, 0.25, 1)';
        }
      });
    }, { passive: true });
  }

  /* ==========================================================================
     LOADING / ENTRY SCREEN
     ========================================================================== */
  function initLoadingScreen() {
    const loaderOverlay = document.getElementById('loading-screen');
    const progressBar = document.getElementById('loader-progress');
    const progressText = document.getElementById('loader-text');
    const enterBtn = document.getElementById('enter-button');
    
    if (!loaderOverlay) return;

    const stages = [
      { pct: 15, msg: "Digging through my listening history..." },
      { pct: 35, msg: "Counting up all those minutes..." },
      { pct: 60, msg: "Ranking the top 5, again..." },
      { pct: 85, msg: "Pulling my Discord stats too..." },
      { pct: 100, msg: "Done. Let's see it." }
    ];

    let currentStage = 0;
    
    function runLoad() {
      if (currentStage >= stages.length) {
        progressBar.style.width = '100%';
        progressText.classList.add('hidden');
        enterBtn.classList.remove('hidden');
        return;
      }
      
      const stage = stages[currentStage];
      progressBar.style.width = `${stage.pct}%`;
      progressText.textContent = stage.msg;
      
      currentStage++;
      
      const stepDelay = 350 + Math.random() * 450;
      setTimeout(runLoad, stepDelay);
    }

    // Begin progress sequence
    setTimeout(runLoad, 200);

    // Fade out load screen and initialize particles
    enterBtn.addEventListener('click', () => {
      loaderOverlay.classList.add('hidden');
      
      // Auto-start Particle background canvas
      backgroundCanvasInstance = new ParticleCanvasBackground('bg-canvas');
      backgroundCanvasInstance.start();

      // Trigger active layout animation in Hero Section
      const hero = document.getElementById('hero');
      if (hero) hero.classList.add('active-section');
    });
  }

  /* ==========================================================================
     MOBILE NAVIGATION BURGER
     ========================================================================== */
  function initMobileNavigation() {
    const toggleBtn = document.querySelector('.nav-toggle');
    const linkWrapper = document.querySelector('.nav-links-wrapper');
    const links = document.querySelectorAll('.nav-link');
    
    if (!toggleBtn || !linkWrapper) return;

    function toggleMenu() {
      const isOpen = toggleBtn.classList.contains('open');
      toggleBtn.classList.toggle('open');
      linkWrapper.classList.toggle('menu-open');
      toggleBtn.setAttribute('aria-expanded', !isOpen);
    }

    toggleBtn.addEventListener('click', toggleMenu);

    links.forEach(l => {
      l.addEventListener('click', () => {
        if (linkWrapper.classList.contains('menu-open')) {
          toggleMenu();
        }
      });
    });
  }

  /* ==========================================================================
     SCROLL INTERSECTION OBSERVERS (Scroll Reveal + Counters)
     ========================================================================== */
  function initScrollIntersectionObserver() {
    const sections = document.querySelectorAll('.fullscreen-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // 1. Reveal hidden sections and update nav indicator
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-section');
          
          const sectionId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('data-section') === sectionId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, {
      threshold: 0.3
    });

    sections.forEach(s => sectionObserver.observe(s));

    // 2. Count-up animation for analytics metric numbers
    const countNumbers = document.querySelectorAll('.stat-number');
    
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
          const targetEl = entry.target;
          const endValue = parseInt(targetEl.getAttribute('data-target'), 10);
          targetEl.classList.add('counted');
          animateMetricCounter(targetEl, endValue);
        }
      });
    }, {
      threshold: 0.6
    });

    countNumbers.forEach(n => countObserver.observe(n));

    // 3. Timeline seasonal reveal
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.2
    });

    timelineItems.forEach(item => timelineObserver.observe(item));
  }

  function animateMetricCounter(element, endVal) {
    const duration = 1800; // ms
    let startTime = null;
    
    const runStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // ease-out-quad curve
      const easedProgress = progress * (2 - progress);
      const val = Math.floor(easedProgress * endVal);
      
      element.textContent = val.toLocaleString();
      
      if (progress < 1) {
        window.requestAnimationFrame(runStep);
      } else {
        element.textContent = endVal.toLocaleString();
      }
    };
    
    window.requestAnimationFrame(runStep);
  }

  /* ==========================================================================
     3D CARD HOVER TILT AND LIGHTING
     ========================================================================== */
  function initTiltEffect() {
    const tiltCards = document.querySelectorAll('.hover-tilt');
    
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        // If the card is flipped (backside up), skip 3D tilt calculations to avoid visual glitches
        if (card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(180deg)';
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Tilt coefficient (Max 10deg rotation)
        const rotX = ((y - centerY) / centerY) * -10;
        const rotY = ((x - centerX) / centerX) * 10;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const accentGlow = card.getAttribute('data-glow-color');
        if (accentGlow) {
          card.style.borderColor = accentGlow;
          card.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.45), 0 0 15px 0 ${accentGlow}2d`;
        }
      });
      
      card.addEventListener('mouseleave', () => {
        if (card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(180deg)';
          return;
        }
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        card.style.borderColor = 'var(--glass-border)';
        card.style.boxShadow = 'var(--glass-shadow)';
      });
    });
  }

  /* ==========================================================================
     TIMELINE PROGRESS SCROLL MONITOR
     ========================================================================== */
  function initTimelineProgress() {
    const timelineSection = document.getElementById('timeline');
    const barFill = document.getElementById('timeline-progress-bar');
    
    if (!timelineSection || !barFill) return;
    
    window.addEventListener('scroll', () => {
      const rect = timelineSection.getBoundingClientRect();
      const height = timelineSection.offsetHeight;
      
      // Calculate scroll midpoint over section
      const screenOffset = window.innerHeight / 2;
      const progressScrolled = screenOffset - rect.top;
      
      let percentage = (progressScrolled / height) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      barFill.style.height = `${percentage}%`;
    }, { passive: true });
  }

  /* ==========================================================================
     CARD FLIPPING LOGIC IN PLAYLIST GRID
     ========================================================================== */
  function initPlaylistCardControls() {
    const playCards = document.querySelectorAll('.playlist-card-inner');
    
    playCards.forEach(card => {
      // Toggle card flip on clicking card face backgrounds
      card.addEventListener('click', (e) => {
        // Prevent flipping when clicking interactive buttons
        if (e.target.closest('.play-btn-overlay') || e.target.closest('.modulate-preset-btn')) {
          return;
        }
        
        card.classList.toggle('flipped');
        
        // Sync 3D transforms properly
        if (card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(180deg)';
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      });
    });
  }


  /* ==========================================================================
     PARTICLE CANVAS BACKGROUND (CLASS)
     ========================================================================== */
  class ParticleCanvasBackground {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.mouse = { x: null, y: null, active: false };
      this.animId = null;
      
      this.confettiActive = false;
      this.confettiParticles = [];

      this.initSize();
      this.spawn();
      this.events();
    }

    initSize() {
      // Retina scale support
      const dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }

    spawn() {
      this.particles = [];
      
      // Determine density based on screen sizing
      const ratio = this.width < 768 ? 38000 : 13000;
      const count = Math.min(130, Math.floor((this.width * this.height) / ratio));

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          vx: (Math.random() - 0.5) * 0.65,
          vy: (Math.random() - 0.5) * 0.65,
          radius: Math.random() * 2 + 1,
          color: this.getParticleColor()
        });
      }
    }

    getParticleColor() {
      const colors = [
        'rgba(29, 185, 84, 0.45)',  // Spotify Green
        'rgba(0, 242, 254, 0.45)',  // Cyan
        'rgba(187, 134, 252, 0.45)', // Purple
        'rgba(255, 0, 127, 0.45)'   // Pink
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    events() {
      // Resize with debounce
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          this.initSize();
          this.spawn();
        }, 150);
      });

      window.addEventListener('mousemove', (e) => {
        this.mouse.x = e.clientX;
        this.mouse.y = e.clientY;
        this.mouse.active = true;
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.active = false;
      });
    }

    enableConfetti() {
      this.confettiActive = true;
      this.confettiParticles = [];
      const palettes = ['#7C6CFF', '#00f2fe', '#bb86fc', '#ff007f', '#39ff14', '#ffff00'];
      
      for (let i = 0; i < 75; i++) {
        this.confettiParticles.push({
          x: Math.random() * this.width,
          y: Math.random() * -this.height, // Spawn offscreen top
          vx: (Math.random() - 0.5) * 4,
          vy: Math.random() * 2 + 3,
          rot: Math.random() * 360,
          rotSpeed: (Math.random() - 0.5) * 6,
          width: Math.random() * 6 + 4,
          height: Math.random() * 10 + 6,
          color: palettes[Math.floor(Math.random() * palettes.length)]
        });
      }
    }

    disableConfetti() {
      this.confettiActive = false;
      this.confettiParticles = [];
    }

    draw() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // 1. Confetti render
      if (this.confettiActive) {
        this.confettiParticles.forEach(c => {
          this.ctx.save();
          this.ctx.translate(c.x, c.y);
          this.ctx.rotate((c.rot * Math.PI) / 180);
          this.ctx.fillStyle = c.color;
          this.ctx.fillRect(-c.width / 2, -c.height / 2, c.width, c.height);
          this.ctx.restore();

          c.x += c.vx;
          c.y += c.vy;
          c.rot += c.rotSpeed;

          // Loop falling confetti
          if (c.y > this.height) {
            c.y = -20;
            c.x = Math.random() * this.width;
          }
        });
      }

      // 2. Connected Nodes render
      const maxConnectDistance = 120;
      
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        // Bounce on boundaries
        if (p1.x < 0 || p1.x > this.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > this.height) p1.vy *= -1;

        // Magnet attraction to mouse
        if (this.mouse.active) {
          const dx = this.mouse.x - p1.x;
          const dy = this.mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 260) {
            const pullForce = (260 - dist) / 4000;
            p1.vx += (dx / dist) * pullForce;
            p1.vy += (dy / dist) * pullForce;
            
            // Speed clamps
            p1.vx = Math.max(-1.6, Math.min(1.6, p1.vx));
            p1.vy = Math.max(-1.6, Math.min(1.6, p1.vy));
          } else {
            p1.vx *= 0.985;
            p1.vy *= 0.985;
          }
        }

        // Draw particle node
        this.ctx.beginPath();
        this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p1.color;
        this.ctx.fill();

        // Check close links
        for (let j = i + 1; j < this.particles.length; j++) {
          const p2 = this.particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDistance) {
            const alpha = (1 - dist / maxConnectDistance) * 0.16;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            this.ctx.lineWidth = 0.5;
            this.ctx.stroke();
          }
        }

        // Proximity glowing rays from mouse to particles
        if (this.mouse.active) {
          const dx = p1.x - this.mouse.x;
          const dy = p1.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.24;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`; // neon cyan beam
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      // 3. Render a subtle neon halo around the cursor on the canvas
      if (this.mouse.active) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 45, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(29, 185, 84, 0.12)';
        this.ctx.lineWidth = 4;
        this.ctx.stroke();
        this.ctx.restore();
      }

      this.animId = requestAnimationFrame(() => this.draw());
    }

    start() {
      if (!this.animId) {
        this.draw();
      }
    }

    stop() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
        this.animId = null;
      }
    }
  }


  /* ==========================================================================
     WEB AUDIO API: SYNTHESIZER SEQUENCER (CLASS)
     ========================================================================== */
  class SynthwaveSequencer {
    constructor() {
      this.ctx = null;
      this.playing = false;
      
      // Sequencer BPM & 16-step variables
      this.bpm = 120;
      this.stepIndex = 0;
      this.nextNoteTime = 0.0;
      this.timerId = null;
      
      // Node chains
      this.masterGain = null;
      this.filterNode = null;
      this.delayNode = null;
      this.delayFeedback = null;
      this.analyser = null;
      
      // Modulator states
      this.leadType = 'sawtooth';
      this.bassBoost = true;
      this.filterCutoff = 1200;
      this.delayVolume = 0.40;
    }

    init() {
      if (this.ctx) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();

      // Master gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.75;

      // Lowpass filter
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = this.filterCutoff;
      this.filterNode.Q.value = 1.0;

      // Dotted eighth note delay / feedback
      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.375; 
      
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.value = this.delayVolume;

      // Realtime Analyser
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;

      // Audio connections Routing:
      // Generators -> filterNode -> analyser -> masterGain -> destination
      // Delay routing: filterNode -> delayNode -> delayFeedback -> delayNode (feedback loop) & delayFeedback -> analyser
      this.filterNode.connect(this.analyser);
      this.filterNode.connect(this.delayNode);
      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode); // loop feedback
      this.delayFeedback.connect(this.analyser);

      this.analyser.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);
    }

    midiToFrequency(midi) {
      return 440 * Math.pow(2, (midi - 69) / 12);
    }

    triggerKick(time) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.filterNode);
      
      // Quick pitch drop
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.22);
      
      gain.gain.setValueAtTime(1.0, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);
      
      osc.start(time);
      osc.stop(time + 0.22);
    }

    triggerSnare(time) {
      // Create snare noise component
      const bufferSize = this.ctx.sampleRate * 0.16;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noiseSource = this.ctx.createBufferSource();
      noiseSource.buffer = buffer;
      
      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;
      
      const noiseGain = this.ctx.createGain();
      
      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.filterNode);
      
      noiseGain.gain.setValueAtTime(0.4, time);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.16);
      
      noiseSource.start(time);
      noiseSource.stop(time + 0.16);

      // Snare drum center pitch drop
      const centerOsc = this.ctx.createOscillator();
      const centerGain = this.ctx.createGain();
      
      centerOsc.type = 'triangle';
      centerOsc.frequency.setValueAtTime(180, time);
      
      centerOsc.connect(centerGain);
      centerGain.connect(this.filterNode);
      
      centerGain.gain.setValueAtTime(0.28, time);
      centerGain.gain.exponentialRampToValueAtTime(0.01, time + 0.08);
      
      centerOsc.start(time);
      centerOsc.stop(time + 0.08);
    }

    triggerHihat(time) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const hiFilter = this.ctx.createBiquadFilter();
      
      hiFilter.type = 'highpass';
      hiFilter.frequency.value = 8500;
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(10000, time);
      
      osc.connect(hiFilter);
      hiFilter.connect(gain);
      gain.connect(this.filterNode);
      
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);
      
      osc.start(time);
      osc.stop(time + 0.05);
    }

    triggerBass(time, stepIndex) {
      if (!this.bassBoost) return;

      // Outrun progression: Amin(33) -> Gmaj(31) -> Fmaj(29) -> Emin(28)
      const bassRoots = [
        33, 33, 33, 33, 33, 33, 33, 33,
        31, 31, 31, 31, 31, 31, 31, 31,
        29, 29, 29, 29, 29, 29, 29, 29,
        28, 28, 28, 28, 28, 28, 28, 28
      ];
      
      const midiNote = bassRoots[stepIndex % bassRoots.length];
      const freq = this.midiToFrequency(midiNote);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, time);
      
      osc.connect(gain);
      gain.connect(this.filterNode);
      
      // Tight punchy bass envelope
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
      
      osc.start(time);
      osc.stop(time + 0.18);
    }

    triggerLead(time, stepIndex) {
      // Arpeggio matching bass progression
      const leadMelodies = [
        57, 60, 64, 67, 69, 67, 64, 60,  // Amin arp
        55, 59, 62, 65, 67, 65, 62, 59,  // Gmaj arp
        53, 57, 60, 64, 65, 64, 60, 57,  // Fmaj arp
        52, 55, 59, 62, 64, 62, 59, 55   // Emin arp
      ];

      const midiNote = leadMelodies[stepIndex % leadMelodies.length];
      const freq = this.midiToFrequency(midiNote + 12); // Transpose 1 octave up

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = this.leadType;
      osc.frequency.setValueAtTime(freq, time);

      // Pitch glide slide effect on arpeggio step borders
      if (stepIndex % 8 === 7) {
        const nextMidi = leadMelodies[(stepIndex + 1) % leadMelodies.length];
        osc.frequency.exponentialRampToValueAtTime(this.midiToFrequency(nextMidi + 24), time + 0.22);
      }
      
      osc.connect(gain);
      gain.connect(this.filterNode);
      
      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);
      
      osc.start(time);
      osc.stop(time + 0.25);
    }

    scheduleNextNotes() {
      // Look ahead and queue notes
      while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.queueStep(this.stepIndex, this.nextNoteTime);
        this.advanceStepIndex();
      }
      
      this.timerId = setTimeout(() => this.scheduleNextNotes(), 25);
    }

    queueStep(step, time) {
      const beat16 = step % 16;

      // Bass trigger on 8th notes (even steps)
      if (step % 2 === 0) {
        this.triggerBass(time, Math.floor(step / 2));
      }

      // Lead trigger on 16th notes
      this.triggerLead(time, step);

      // Drum Grid:
      // Kick: Four-on-the-floor (beats 0, 4, 8, 12)
      if (beat16 === 0 || beat16 === 4 || beat16 === 8 || beat16 === 12) {
        this.triggerKick(time);
      }

      // Snare: beats 4, 12
      if (beat16 === 4 || beat16 === 12) {
        this.triggerSnare(time);
      }

      // Off-beat Hihats
      if (beat16 === 2 || beat16 === 6 || beat16 === 10 || beat16 === 14) {
        this.triggerHihat(time);
      }
    }

    advanceStepIndex() {
      const secondsPerBeat = 60.0 / this.bpm / 4.0; // 16th note step length
      this.nextNoteTime += secondsPerBeat;
      this.stepIndex++;
    }

    start() {
      this.init();
      
      if (this.playing) return;

      // Resume context (safeguard browser suspension rules)
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.playing = true;
      this.stepIndex = 0;
      this.nextNoteTime = this.ctx.currentTime + 0.05;
      
      this.scheduleNextNotes();
      syncAudioButtonsUI(true);
    }

    stop() {
      if (!this.playing) return;

      this.playing = false;
      clearTimeout(this.timerId);
      
      syncAudioButtonsUI(false);
    }

    toggle() {
      if (this.playing) {
        this.stop();
      } else {
        this.start();
      }
    }

    setBpmValue(val) {
      this.bpm = val;
    }

    setFilterCutoff(val) {
      this.filterCutoff = val;
      if (this.filterNode) {
        this.filterNode.frequency.value = val;
      }
    }

    setDelayMix(val) {
      this.delayVolume = val / 100.0;
      if (this.delayFeedback) {
        this.delayFeedback.gain.value = this.delayVolume;
      }
    }

    setLeadOscType(type) {
      this.leadType = type;
    }

    toggleSubBass(enabled) {
      this.bassBoost = enabled;
    }
  }

  // Synchronize playback controls and navigation icons
  function syncAudioButtonsUI(isPlaying) {
    const navAudioBtn = document.getElementById('nav-audio-toggle');
    const ctrlPlayBtn = document.getElementById('synth-play-toggle');
    
    if (navAudioBtn) {
      if (isPlaying) {
        navAudioBtn.classList.add('playing');
        navAudioBtn.querySelector('.indicator-text').textContent = "AUDIO ON";
      } else {
        navAudioBtn.classList.remove('playing');
        navAudioBtn.querySelector('.indicator-text').textContent = "AUDIO OFF";
      }
    }

    if (ctrlPlayBtn) {
      const playIcon = ctrlPlayBtn.querySelector('.play-svg');
      const pauseIcon = ctrlPlayBtn.querySelector('.pause-svg');
      const spanLabel = ctrlPlayBtn.querySelector('span');

      if (isPlaying) {
        playIcon.classList.add('hidden');
        pauseIcon.classList.remove('hidden');
        spanLabel.textContent = "Pause Synth Wave";
        ctrlPlayBtn.classList.add('btn-glow');
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        spanLabel.textContent = "Resume Synth Wave";
        ctrlPlayBtn.classList.remove('btn-glow');
      }
    }
  }

  // Audio Sequencer Lazy-Instantiator
  function getAudioEngine() {
    if (!audioEngineInstance) {
      audioEngineInstance = new SynthwaveSequencer();
      runVisualizerLoop(); // Connect visualizer logic instantly
    }
    return audioEngineInstance;
  }

  // Toggle events
  document.getElementById('nav-audio-toggle').addEventListener('click', () => {
    getAudioEngine().toggle();
  });

  document.getElementById('synth-play-toggle').addEventListener('click', () => {
    getAudioEngine().toggle();
  });


  /* ==========================================================================
     REAL-TIME INTERACTIVE CANVAS AUDIO VISUALIZER
     ========================================================================== */
  let visualizerFrameId = null;

  function runVisualizerLoop() {
    const canvas = document.getElementById('audio-visualizer-canvas');
    const ctx = canvas.getContext('2d');
    const eqBars = document.querySelectorAll('.eq-bar');
    
    function scaleCanvas() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    
    scaleCanvas();
    window.addEventListener('resize', scaleCanvas);

    const engine = getAudioEngine();
    
    function draw() {
      visualizerFrameId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const w = canvas.width;
      const h = canvas.height;

      // Draw vector scope grid backdrop
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (engine.playing && engine.analyser) {
        const binCount = engine.analyser.frequencyBinCount;
        const dataArr = new Uint8Array(binCount);
        engine.analyser.getByteFrequencyData(dataArr);

        // Calculate average amplitude for central circle pulsing logic
        let sum = 0;
        for (let i = 0; i < binCount; i++) {
          sum += dataArr[i];
        }
        const averageAmplitude = sum / binCount;
        const pulseScale = 1.0 + (averageAmplitude / 255.0) * 0.45;

        // 1. Draw central glowing pulsing circle
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 55 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(57, 255, 20, 0.7)'; // neon green outline
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20 + (averageAmplitude / 255.0) * 20;
        ctx.shadowColor = 'rgba(57, 255, 20, 0.8)';
        ctx.stroke();
        ctx.restore();

        // 2. Draw outer pulsing rings
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 85 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(187, 134, 252, 0.35)'; // purple accent ring
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        // 3. Draw neon oscilloscopic waveforms
        ctx.beginPath();
        ctx.lineWidth = 3.5;
        ctx.strokeStyle = 'var(--neon-cyan)';
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'var(--neon-cyan)';
        
        const sliceWidth = w / binCount;
        let drawX = 0;

        for (let i = 0; i < binCount; i++) {
          const rawVal = dataArr[i] / 255.0;
          const drawY = h / 2 - (rawVal * h * 0.42);

          if (i === 0) {
            ctx.moveTo(drawX, drawY);
          } else {
            ctx.lineTo(drawX, drawY);
          }

          drawX += sliceWidth;
        }

        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadows

        // 4. Drive physical equalizers
        eqBars.forEach((bar, idx) => {
          const sourceIdx = Math.floor((idx / eqBars.length) * binCount);
          const rawValue = dataArr[sourceIdx] || 0;
          const scale = rawValue / 255.0;
          bar.style.transform = `scaleY(${0.25 + scale * 1.55})`;
          bar.style.opacity = `${0.35 + scale * 0.65}`;
        });

      } else {
        // IDLE STATE: Draw slow sine wave animation
        ctx.beginPath();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = 'var(--neon-purple)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'var(--neon-purple)';
        
        const timestamp = Date.now() * 0.0035;
        ctx.moveTo(0, h / 2);
        
        for (let x = 0; x < w; x++) {
          const y = h / 2 + Math.sin(x * 0.012 + timestamp) * 15 * Math.cos(x * 0.0025 + timestamp * 0.4);
          ctx.lineTo(x, y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0;

        // Draw central static circle in idle mode
        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(187, 134, 252, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        // Reset EQ columns
        eqBars.forEach(bar => {
          bar.style.transform = 'scaleY(0.25)';
          bar.style.opacity = '0.15';
        });
      }
    }

    draw();
  }


  /* ==========================================================================
     SYNTH PANEL INPUT BINDINGS
     ========================================================================== */
  const selectOsc = document.getElementById('osc-type-select');
  const slideCutoff = document.getElementById('filter-cutoff-slider');
  const slideBpm = document.getElementById('synth-bpm-slider');
  const slideDelay = document.getElementById('synth-delay-slider');
  const checkBass = document.getElementById('synth-bass-boost');

  if (selectOsc) {
    selectOsc.addEventListener('change', (e) => {
      getAudioEngine().setLeadOscType(e.target.value);
    });
  }

  if (slideCutoff) {
    slideCutoff.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      document.getElementById('val-cutoff').textContent = `${val}Hz`;
      getAudioEngine().setFilterCutoff(val);
    });
  }

  if (slideBpm) {
    slideBpm.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      document.getElementById('val-bpm').textContent = `${val} BPM`;
      document.getElementById('display-bpm').textContent = `${val} BPM`;
      getAudioEngine().setBpmValue(val);
    });
  }

  if (slideDelay) {
    slideDelay.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      document.getElementById('val-delay').textContent = `${val}%`;
      getAudioEngine().setDelayMix(val);
    });
  }

  if (checkBass) {
    checkBass.addEventListener('change', (e) => {
      getAudioEngine().toggleSubBass(e.target.checked);
    });
  }


  /* ==========================================================================
     PLAYLIST REAL AUDIO PLAYBACK
     Plays actual mp3 clips from assets/music/ (see wrappedData.topSongs).
     Only one track plays at a time across the whole grid.
     ========================================================================== */
  function initPlaylistAudioPlayback() {
    let currentPlayingAudio = null;
    let currentPlayingBtn = null;

    function setPlayButtonPlaying(btn) {
      btn.classList.add('playing');
      btn.querySelector('.play-icon').classList.add('hidden');
      btn.querySelector('.stop-icon').classList.remove('hidden');
    }

    function resetPlayButton(btn) {
      btn.classList.remove('playing');
      btn.querySelector('.play-icon').classList.remove('hidden');
      btn.querySelector('.stop-icon').classList.add('hidden');
    }

    document.querySelectorAll('.play-btn-overlay').forEach((playBtn) => {
      const card = playBtn.closest('.playlist-card-inner');
      const index = parseInt(card.getAttribute('data-track-index'), 10);
      const song = wrappedData.topSongs[index];
      if (!song) return;

      const audio = new Audio(song.file);
      audio.preload = 'none';

      audio.addEventListener('ended', () => {
        resetPlayButton(playBtn);
        currentPlayingAudio = null;
        currentPlayingBtn = null;
      });

      playBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Stop click propagating to card flip

        // Clicking the button of the track that's already playing pauses it
        if (currentPlayingAudio === audio && !audio.paused) {
          audio.pause();
          resetPlayButton(playBtn);
          currentPlayingAudio = null;
          currentPlayingBtn = null;
          return;
        }

        // Only one track plays at a time — stop whatever else is going
        if (currentPlayingAudio) {
          currentPlayingAudio.pause();
          currentPlayingAudio.currentTime = 0;
          if (currentPlayingBtn) resetPlayButton(currentPlayingBtn);
        }

        audio.currentTime = 0;
        audio.play().then(() => {
          setPlayButtonPlaying(playBtn);
          currentPlayingAudio = audio;
          currentPlayingBtn = playBtn;
        }).catch(() => {
          // No mp3 in assets/music/ yet — fail quietly with a little shake
          resetPlayButton(playBtn);
          playBtn.classList.add('no-audio-shake');
          setTimeout(() => playBtn.classList.remove('no-audio-shake'), 400);
        });
      });
    });
  }


  /* ==========================================================================
     IMMERSIVE STORY CAROUSEL SLIDESHOW (CLASS)
     ========================================================================== */
  class ImmersiveStoryCarousel {
    constructor() {
      this.overlay = document.getElementById('story-overlay');
      this.slides = document.querySelectorAll('.story-slide');
      this.headersContainer = document.getElementById('story-progress-headers');
      
      this.currentSlideIndex = 0;
      this.slideMs = 6000; // 6s duration per slide
      this.startTime = null;
      this.tickTimerId = null;
      
      this.paused = false;
      this.elapsedBeforePause = 0;
      
      this.barFills = [];
      this.setupProgressHeaders();
      this.bindControls();
    }

    setupProgressHeaders() {
      this.headersContainer.innerHTML = '';
      this.barFills = [];

      this.slides.forEach(() => {
        const wrap = document.createElement('div');
        wrap.className = 'story-bar-wrapper';
        
        const fill = document.createElement('div');
        fill.className = 'story-bar-fill';
        
        wrap.appendChild(fill);
        this.headersContainer.appendChild(wrap);
        this.barFills.push(fill);
      });
    }

    bindControls() {
      // Tap controls
      document.getElementById('story-prev-tap').addEventListener('click', () => this.previous());
      document.getElementById('story-next-tap').addEventListener('click', () => this.next());
      
      // Close overlay
      document.querySelector('.story-close-btn').addEventListener('click', () => this.exit());

      // Summary Deck buttons
      const btnShare = document.getElementById('story-share-btn');
      if (btnShare) {
        btnShare.addEventListener('click', () => {
          navigator.clipboard.writeText(window.location.href).then(() => {
            const original = btnShare.textContent;
            btnShare.textContent = "Link Copied!";
            btnShare.classList.add('spotify-green-bg');
            setTimeout(() => {
              btnShare.textContent = original;
              btnShare.classList.remove('spotify-green-bg');
            }, 2000);
          }).catch(() => {
            alert("Share Link: " + window.location.href);
          });
        });
      }

      const btnReplay = document.getElementById('story-replay-btn');
      if (btnReplay) {
        btnReplay.addEventListener('click', () => this.restart());
      }

      // Tap-and-Hold to pause / release to resume
      const viewport = document.getElementById('story-slides-viewport');
      
      const handleHoldStart = (e) => {
        if (e.target.closest('.summary-footer-actions') || e.target.closest('.story-close-btn')) return;
        this.pause();
      };

      const handleHoldEnd = () => {
        this.resume();
      };

      // Mouse triggers
      viewport.addEventListener('mousedown', handleHoldStart);
      viewport.addEventListener('mouseup', handleHoldEnd);
      viewport.addEventListener('mouseleave', handleHoldEnd);

      // Touch triggers
      viewport.addEventListener('touchstart', handleHoldStart, { passive: true });
      viewport.addEventListener('touchend', handleHoldEnd, { passive: true });
    }

    open() {
      this.overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // Lock scrolling
      
      // Lower and hide the navigation dock during stories to maximize focus space
      const dock = document.getElementById('nav-dock');
      if (dock) dock.style.transform = 'translateX(-50%) translateY(150px)';

      // Auto-initialize background audio in a softer, ambient setting
      const engine = getAudioEngine();
      engine.setLeadOscType('sine'); 
      engine.setBpmValue(92);
      engine.start();

      this.currentSlideIndex = 0;
      this.showSlide(0);
    }

    exit() {
      this.overlay.classList.add('hidden');
      document.body.style.overflow = 'auto'; // Restore scroll
      this.clearAllTimers();

      if (audioEngineInstance) {
        audioEngineInstance.stop();
      }

      const dock = document.getElementById('nav-dock');
      if (dock) dock.style.transform = 'translateX(-50%) translateY(0)';
      
      if (backgroundCanvasInstance) {
        backgroundCanvasInstance.disableConfetti();
      }
    }

    clearAllTimers() {
      if (this.tickTimerId) {
        clearTimeout(this.tickTimerId);
        this.tickTimerId = null;
      }
      this.startTime = null;
      this.paused = false;
      this.elapsedBeforePause = 0;
    }

    showSlide(idx) {
      this.clearAllTimers();

      // Bounds clamping
      if (idx < 0) idx = 0;
      if (idx >= this.slides.length) {
        this.exit();
        return;
      }

      this.currentSlideIndex = idx;

      // Toggle display states
      this.slides.forEach((slide, sIdx) => {
        if (sIdx === idx) {
          slide.classList.add('active-slide');
        } else {
          slide.classList.remove('active-slide');
        }
      });

      // Synchronize slide progress headers
      this.barFills.forEach((fill, fIdx) => {
        const wrap = fill.parentElement;
        if (fIdx < idx) {
          wrap.className = 'story-bar-wrapper completed';
          fill.style.width = '100%';
        } else if (fIdx > idx) {
          wrap.className = 'story-bar-wrapper';
          fill.style.width = '0%';
        } else {
          wrap.className = 'story-bar-wrapper';
          fill.style.width = '0%';
        }
      });

      // Slide 4 specific action: count-up minutes stream
      if (idx === 3) {
        const numberSpan = document.getElementById('story-giant-minutes');
        if (numberSpan) animateMetricCounter(numberSpan, wrappedData.minutes);
      }

      // Slide 8 specific action: Enable falling confetti
      if (idx === this.slides.length - 1) {
        if (backgroundCanvasInstance) {
          backgroundCanvasInstance.enableConfetti();
        }
      } else {
        if (backgroundCanvasInstance) {
          backgroundCanvasInstance.disableConfetti();
        }
      }

      this.startTime = Date.now();
      this.tick();
    }

    tick() {
      if (this.paused) return;

      const elapsed = Date.now() - this.startTime + this.elapsedBeforePause;
      const pct = (elapsed / this.slideMs) * 100;

      if (this.barFills[this.currentSlideIndex]) {
        this.barFills[this.currentSlideIndex].style.width = `${Math.min(100, pct)}%`;
      }

      if (elapsed >= this.slideMs) {
        this.next();
      } else {
        this.tickTimerId = setTimeout(() => this.tick(), 16); // ~60fps monitoring
      }
    }

    pause() {
      if (this.paused) return;
      this.paused = true;
      clearTimeout(this.tickTimerId);
      this.elapsedBeforePause += Date.now() - this.startTime;
    }

    resume() {
      if (!this.paused) return;
      this.paused = false;
      this.startTime = Date.now();
      this.tick();
    }

    next() {
      this.showSlide(this.currentSlideIndex + 1);
    }

    previous() {
      if (this.currentSlideIndex === 0) {
        this.showSlide(0);
      } else {
        this.showSlide(this.currentSlideIndex - 1);
      }
    }

    restart() {
      this.showSlide(0);
    }
  }

  // Click handler to open Slideshow
  document.getElementById('start-story-btn').addEventListener('click', () => {
    if (!slideshowInstance) {
      slideshowInstance = new ImmersiveStoryCarousel();
    }
    slideshowInstance.open();
  });

  // Action scroll-trigger helper (Smooth scrolling anchor links)
  const anchorTriggers = document.querySelectorAll('.scroll-trigger');
  anchorTriggers.forEach(trig => {
    trig.addEventListener('click', (e) => {
      e.preventDefault();
      const selector = trig.getAttribute('href');
      const target = document.querySelector(selector);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
