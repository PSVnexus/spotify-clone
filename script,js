
// 1. Single Source of Truth for Data Population
const wrappedData = {
  minutes: 5875,
  topArtist: "Talwiinder",
  topGenre: "Desi",
  topSong: "Nuestra Canción",
  peakDay: {
    date: "February 6, 2025",
    minutes: 236,
    tracks: 81,
    artists: 116
  },
  songs: [
    { id: "gallan4", title: "Gallan 4", artist: "Talwiinder", duration: "3:15", note: "On repeat during late-night debugging and deployment stretches." },
    { id: "dhundhala", title: "Dhundhala", artist: "Talwiinder", duration: "3:26", note: "The moody, high-energy rhythm that powered morning workflows." },
    { id: "haseen", title: "Haseen", artist: "Talwiinder", duration: "2:54", note: "The perfect low-key background track for focus intervals." },
    { id: "swim", title: "Swim", artist: "Chase Atlantic", duration: "3:48", note: "A structural bassline that reset ears between massive code reviews." },
    { id: "nuestra_cancion", title: "Nuestra Canción", artist: "Monsieur Periné ft. Vicente García", duration: "4:20", note: "An absolute unexpected genre collision that defined the peak listening days." }
  ],
  artists: ["Talwiinder", "Pritam", "OneRepublic", "Chase Atlantic", "Aditya Rikhari"],
  discord: [
    { label: "Messages Sent", value: 1057, context: "Active server participant", isNumeric: true },
    { label: "Voice Hours", value: 139, context: "Late-night calls & soundboards", isNumeric: true },
    { label: "Emojis Dropped", value: 181, context: "High frequency expressions", isNumeric: true },
    { label: "Favorite Emoji", value: "😭", context: "Used across all channels", isNumeric: false },
    { label: "Top Game", value: "Where Winds Meet", context: "Most immersive session hours", isNumeric: false },
    { label: "Top Server", value: "Gangs of Instapur", context: "Home base hub", isNumeric: false }
  ]
};

// Global audio element shared across all playlist cards
const nativeAudioPlayer = new Audio();
let currentlyPlayingCard = null;

document.addEventListener('DOMContentLoaded', () => {
  // Global Application State instances
  let audioEngineInstance = null;
  let backgroundCanvasInstance = null;
  let slideshowInstance = null;

  // 2. Render Dynamic Content Blocks Before Observers Read Attributes
  renderWrappedData();

  // Initialize modular UI systems
  initCursorGlow();
  initLoadingScreen();
  initMobileNavigation();
  initScrollIntersectionObserver();
  initTiltEffect();
  initTimelineProgress();
  initButtonRipple();
  initPlaylistCardControls();
  initHeroParallax();

  /* ==========================================================================
     DYNAMIC DATA POPULATION ENGINE
     ========================================================================== */
  function renderWrappedData() {
    // Populate Playlist Grid
    const playlistGrid = document.querySelector('.playlist-grid');
    if (playlistGrid) {
      playlistGrid.innerHTML = wrappedData.songs.map((song, idx) => `
        <div class="playlist-card-wrapper">
          <div class="playlist-card-inner glass-card hover-tilt" data-glow-color="var(--accent-primary)">
            <!-- Front Side -->
            <div class="card-face card-front">
              <div class="album-art-wrapper">
                <div class="album-art album-art-${idx + 1}"></div>
                <button class="play-btn-overlay" aria-label="Play ${song.title}" data-audio-src="assets/music/${song.id}.mp3">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                    <path class="play-icon" d="M8 5v14l11-7z"/>
                    <path class="stop-icon hidden" d="M6 19h12V5H6z"/>
                  </svg>
                </button>
              </div>
              <div class="playlist-info">
                <span class="track-rank">#0${idx + 1}</span>
                <h3 class="track-title">${song.title}</h3>
                <p class="track-artist">${song.artist}</p>
                <span class="track-duration">${song.duration}</span>
              </div>
            </div>
            <!-- Back Side -->
            <div class="card-face card-back">
              <h4 class="back-title">Track Insight</h4>
              <div class="back-stats">
                <div class="back-stat-row"><span>Artist</span><strong>${song.artist}</strong></div>
                <div class="back-stat-row"><span>Duration</span><strong>${song.duration}</strong></div>
              </div>
              <p class="back-description">"${song.note}"</p>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Populate Discord Wrapped Grid
    const discordGrid = document.querySelector('.discord-grid');
    if (discordGrid) {
      discordGrid.innerHTML = wrappedData.discord.map(stat => `
        <div class="glass-card stat-card hover-tilt" data-glow-color="var(--accent-primary)">
          <div class="stat-info">
            <h3 class="stat-label">${stat.label}</h3>
            ${stat.isNumeric 
              ? `<p class="stat-number" data-target="${stat.value}">0</p>` 
              : `<p class="stat-text">${stat.value}</p>`
            }
            <p class="stat-context">${stat.context}</p>
          </div>
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     GLOBAL CURSOR GLOW EFFECT (Desktop)
     ========================================================================== */
  function initCursorGlow() {
    const glowEl = document.getElementById('cursor-glow');
    if (!glowEl) return;
    
    document.addEventListener('mousemove', (e) => {
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
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.className = 'btn-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
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
      { pct: 20, msg: "Compiling statistical audio records..." },
      { pct: 45, msg: "Parsing Discord interaction logs..." },
      { pct: 70, msg: "Synchronizing structural media wrappers..." },
      { pct: 100, msg: "Data ingestion complete. Elements ready." }
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
      
      const stepDelay = 250 + Math.random() * 350;
      setTimeout(runLoad, stepDelay);
    }

    setTimeout(runLoad, 200);

    enterBtn.addEventListener('click', () => {
      loaderOverlay.classList.add('hidden');
      
      backgroundCanvasInstance = new ParticleCanvasBackground('bg-canvas');
      backgroundCanvasInstance.start();

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
    const duration = 1800; 
    let startTime = null;
    
    const runStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
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
        if (card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(180deg)';
          return;
        }

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotX = ((y - centerY) / centerY) * -10;
        const rotY = ((x - centerX) / centerX) * 10;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;
        
        const accentGlow = card.getAttribute('data-glow-color') || 'var(--accent-primary)';
        card.style.borderColor = accentGlow;
        card.style.boxShadow = `0 12px 40px rgba(0, 0, 0, 0.45), 0 0 15px 0 ${accentGlow}2d`;
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
      const screenOffset = window.innerHeight / 2;
      const progressScrolled = screenOffset - rect.top;
      
      let percentage = (progressScrolled / height) * 100;
      percentage = Math.max(0, Math.min(100, percentage));
      
      barFill.style.height = `${percentage}%`;
    }, { passive: true });
  }

  /* ==========================================================================
     NATIVE AUDIO PLAYBACK & CARD CONTROLS
     ========================================================================== */
  function initPlaylistCardControls() {
    const playCards = document.querySelectorAll('.playlist-card-inner');
    
    playCards.forEach(card => {
      const playBtn = card.querySelector('.play-btn-overlay');

      card.addEventListener('click', (e) => {
        if (e.target.closest('.play-btn-overlay')) return;
        
        card.classList.toggle('flipped');
        if (card.classList.contains('flipped')) {
          card.style.transform = 'perspective(1000px) rotateY(180deg)';
        } else {
          card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        }
      });

      if (playBtn) {
        playBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const src = playBtn.getAttribute('data-audio-src');

          // If clicking the current playing song, toggle play/pause
          if (currentlyPlayingCard === card) {
            if (nativeAudioPlayer.paused) {
              nativeAudioPlayer.play().catch(err => console.log("Audio file placeholder missing, add to path later."));
              setCardPlayingState(card, true);
            } else {
              nativeAudioPlayer.pause();
              setCardPlayingState(card, false);
            }
            return;
          }

          // Reset old playing card UI
          if (currentlyPlayingCard) {
            setCardPlayingState(currentlyPlayingCard, false);
          }

          // Load and play new selection
          currentlyPlayingCard = card;
          nativeAudioPlayer.src = src;
          nativeAudioPlayer.play()
            .then(() => setCardPlayingState(card, true))
            .catch(err => {
              console.log("Audio file placeholder missing, path setup complete.");
              setCardPlayingState(card, true); // Visual toggle fallback for simulation
            });
        });
      }
    });

    nativeAudioPlayer.addEventListener('ended', () => {
      if (currentlyPlayingCard) {
        setCardPlayingState(currentlyPlayingCard, false);
        currentlyPlayingCard = null;
      }
    });
  }

  function setCardPlayingState(card, isPlaying) {
    const btn = card.querySelector('.play-btn-overlay');
    if (!btn) return;
    const playIcon = btn.querySelector('.play-icon');
    const stopIcon = btn.querySelector('.stop-icon');

    if (isPlaying) {
      btn.classList.add('playing');
      playIcon.classList.add('hidden');
      stopIcon.classList.remove('hidden');
    } else {
      btn.classList.remove('playing');
      playIcon.classList.remove('hidden');
      stopIcon.classList.add('hidden');
    }
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
      const dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      
      this.canvas.width = this.width * dpr;
      this.canvas.height = this.height * dpr;
      this.ctx.scale(dpr, dpr);
    }

    spawn() {
      this.particles = [];
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
        'rgba(124, 108, 255, 0.45)', // Periwinkle Violet Primary
        'rgba(0, 242, 254, 0.45)',   // Cyan Accent
        'rgba(187, 134, 252, 0.45)',  // Purple Accent
        'rgba(255, 0, 127, 0.45)'    // Pink Accent
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    events() {
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
          y: Math.random() * -this.height,
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

          if (c.y > this.height) {
            c.y = -20;
            c.x = Math.random() * this.width;
          }
        });
      }

      const maxConnectDistance = 120;
      
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        
        p1.x += p1.vx;
        p1.y += p1.vy;
        
        if (p1.x < 0 || p1.x > this.width) p1.vx *= -1;
        if (p1.y < 0 || p1.y > this.height) p1.vy *= -1;

        if (this.mouse.active) {
          const dx = this.mouse.x - p1.x;
          const dy = this.mouse.y - p1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 260) {
            const pullForce = (260 - dist) / 4000;
            p1.vx += (dx / dist) * pullForce;
            p1.vy += (dy / dist) * pullForce;
            
            p1.vx = Math.max(-1.6, Math.min(1.6, p1.vx));
            p1.vy = Math.max(-1.6, Math.min(1.6, p1.vy));
          } else {
            p1.vx *= 0.985;
            p1.vy *= 0.985;
          }
        }

        this.ctx.beginPath();
        this.ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = p1.color;
        this.ctx.fill();

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

        if (this.mouse.active) {
          const dx = p1.x - this.mouse.x;
          const dy = p1.y - this.mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 180) {
            const alpha = (1 - dist / 180) * 0.24;
            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(this.mouse.x, this.mouse.y);
            this.ctx.strokeStyle = `rgba(0, 242, 254, ${alpha})`;
            this.ctx.lineWidth = 0.8;
            this.ctx.stroke();
          }
        }
      }

      if (this.mouse.active) {
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.arc(this.mouse.x, this.mouse.y, 45, 0, Math.PI * 2);
        this.ctx.strokeStyle = 'rgba(124, 108, 255, 0.12)';
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
     WEB AUDIO API: STANDALONE SYNTHESIZER SOUND LAB
     ========================================================================== */
  class SynthwaveSequencer {
    constructor() {
      this.ctx = null;
      this.playing = false;
      this.bpm = 120;
      this.stepIndex = 0;
      this.nextNoteTime = 0.0;
      this.timerId = null;
      
      this.masterGain = null;
      this.filterNode = null;
      this.delayNode = null;
      this.delayFeedback = null;
      this.analyser = null;
      
      this.leadType = 'sawtooth';
      this.bassBoost = true;
      this.filterCutoff = 1200;
      this.delayVolume = 0.40;
    }

    init() {
      if (this.ctx) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.value = 0.75;

      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.value = this.filterCutoff;
      this.filterNode.Q.value = 1.0;

      this.delayNode = this.ctx.createDelay(1.0);
      this.delayNode.delayTime.value = 0.375; 
      
      this.delayFeedback = this.ctx.createGain();
      this.delayFeedback.gain.value = this.delayVolume;

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 256;

      this.filterNode.connect(this.analyser);
      this.filterNode.connect(this.delayNode);
      this.delayNode.connect(this.delayFeedback);
      this.delayFeedback.connect(this.delayNode); 
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
      
      osc.frequency.setValueAtTime(150, time);
      osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.22);
      gain.gain.setValueAtTime(1.0, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.22);
      
      osc.start(time);
      osc.stop(time + 0.22);
    }

    triggerSnare(time) {
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
      gain.gain.setValueAtTime(0.3, time);
      gain.gain.exponentialRampToValueAtTime(0.01, time + 0.18);
      
      osc.start(time);
      osc.stop(time + 0.18);
    }

    triggerLead(time, stepIndex) {
      const leadMelodies = [
        57, 60, 64, 67, 69, 67, 64, 60,
        55, 59, 62, 65, 67, 65, 62, 59,
        53, 57, 60, 64, 65, 64, 60, 57,
        52, 55, 59, 62, 64, 62, 59, 55
      ];

      const midiNote = leadMelodies[stepIndex % leadMelodies.length];
      const freq = this.midiToFrequency(midiNote + 12);

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = this.leadType;
      osc.frequency.setValueAtTime(freq, time);

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
      while (this.nextNoteTime < this.ctx.currentTime + 0.1) {
        this.queueStep(this.stepIndex, this.nextNoteTime);
        this.advanceStepIndex();
      }
      this.timerId = setTimeout(() => this.scheduleNextNotes(), 25);
    }

    queueStep(step, time) {
      const beat16 = step % 16;
      if (step % 2 === 0) {
        this.triggerBass(time, Math.floor(step / 2));
      }
      this.triggerLead(time, step);

      if (beat16 === 0 || beat16 === 4 || beat16 === 8 || beat16 === 12) {
        this.triggerKick(time);
      }
      if (beat16 === 4 || beat16 === 12) {
        this.triggerSnare(time);
      }
      if (beat16 === 2 || beat16 === 6 || beat16 === 10 || beat16 === 14) {
        this.triggerHihat(time);
      }
    }

    advanceStepIndex() {
      const secondsPerBeat = 60.0 / this.bpm / 4.0;
      this.nextNoteTime += secondsPerBeat;
      this.stepIndex++;
    }

    start() {
      this.init();
      if (this.playing) return;
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      // Pause native music playbacks if synth engine takes master track attention
      if (currentlyPlayingCard) {
        nativeAudioPlayer.pause();
        setCardPlayingState(currentlyPlayingCard, false);
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

    setBpmValue(val) { this.bpm = val; }
    setFilterCutoff(val) {
      this.filterCutoff = val;
      if (this.filterNode) this.filterNode.frequency.value = val;
    }
    setDelayMix(val) {
      this.delayVolume = val / 100.0;
      if (this.delayFeedback) this.delayFeedback.gain.value = this.delayVolume;
    }
    setLeadOscType(type) { this.leadType = type; }
    toggleSubBass(enabled) { this.bassBoost = enabled; }
  }

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
        spanLabel.textContent = "Pause Sound Lab";
        ctrlPlayBtn.classList.add('btn-glow');
      } else {
        playIcon.classList.remove('hidden');
        pauseIcon.classList.add('hidden');
        spanLabel.textContent = "Initialize Synth Engine";
        ctrlPlayBtn.classList.remove('btn-glow');
      }
    }
  }

  function getAudioEngine() {
    if (!audioEngineInstance) {
      audioEngineInstance = new SynthwaveSequencer();
      runVisualizerLoop();
    }
    return audioEngineInstance;
  }

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

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 40) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += 40) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      if (engine.playing && engine.analyser) {
        const binCount = engine.analyser.frequencyBinCount;
        const dataArr = new Uint8Array(binCount);
        engine.analyser.getByteFrequencyData(dataArr);

        let sum = 0;
        for (let i = 0; i < binCount; i++) { sum += dataArr[i]; }
        const averageAmplitude = sum / binCount;
        const pulseScale = 1.0 + (averageAmplitude / 255.0) * 0.45;

        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 55 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124, 108, 255, 0.7)'; 
        ctx.lineWidth = 4;
        ctx.shadowBlur = 20 + (averageAmplitude / 255.0) * 20;
        ctx.shadowColor = 'rgba(124, 108, 255, 0.8)';
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 85 * pulseScale, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(187, 134, 252, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

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
          if (i === 0) ctx.moveTo(drawX, drawY); else ctx.lineTo(drawX, drawY);
          drawX += sliceWidth;
        }
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.shadowBlur = 0;

        eqBars.forEach((bar, idx) => {
          const sourceIdx = Math.floor((idx / eqBars.length) * binCount);
          const rawValue = dataArr[sourceIdx] || 0;
          const scale = rawValue / 255.0;
          bar.style.transform = `scaleY(${0.25 + scale * 1.55})`;
          bar.style.opacity = `${0.35 + scale * 0.65}`;
        });

      } else {
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

        ctx.save();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, 50, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(187, 134, 252, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();

        eqBars.forEach(bar => {
          bar.style.transform = 'scaleY(0.25)';
          bar.style.opacity = '0.15';
        });
      }
    }
    draw();
  }


  /* ==========================================================================
     SYNTH SOUND LAB BINDINGS
     ========================================================================== */
  const selectOsc = document.getElementById('osc-type-select');
  const slideCutoff = document.getElementById('filter-cutoff-slider');
  const slideBpm = document.getElementById('synth-bpm-slider');
  const slideDelay = document.getElementById('synth-delay-slider');
  const checkBass = document.getElementById('synth-bass-boost');

  if (selectOsc) selectOsc.addEventListener('change', (e) => getAudioEngine().setLeadOscType(e.target.value));
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
  if (checkBass) checkBass.addEventListener('change', (e) => getAudioEngine().toggleSubBass(e.target.checked));


  /* ==========================================================================
     IMMERSIVE STORY CAROUSEL SLIDESHOW (CLASS)
     ========================================================================== */
  class ImmersiveStoryCarousel {
    constructor() {
      this.overlay = document.getElementById('story-overlay');
      this.slides = document.querySelectorAll('.story-slide');
      this.headersContainer = document.getElementById('story-progress-headers');
      
      this.currentSlideIndex = 0;
      this.slideMs = 6000; 
      this.progressIntervalId = null;
      this.startTimestamp = null;
      this.elapsedPaused = 0;
      this.isShowing = false;

      this.initProgressHeaders();
      this.bindEvents();
    }

    initProgressHeaders() {
      this.headersContainer.innerHTML = '';
      this.slides.forEach((_, idx) => {
        const wrapper = document.createElement('div');
        wrapper.className = 'story-progress-bar-wrapper';
        
        const innerFill = document.createElement('div');
        innerFill.className = 'story-progress-bar-fill';
        innerFill.id = `story-progress-fill-${idx}`;
        
        wrapper.appendChild(innerFill);
        this.headersContainer.appendChild(wrapper);
      });
    }

    bindEvents() {
      const closeBtn = this.overlay.querySelector('.story-close-btn');
      if (closeBtn) closeBtn.addEventListener('click', () => this.hide());

      const leftZone = document.getElementById('story-prev-tap');
      const rightZone = document.getElementById('story-next-tap');
      
      if (leftZone) leftZone.addEventListener('click', () => this.navigatePrev());
      if (rightZone) rightZone.addEventListener('click', () => this.navigateNext());

      const replayBtn = document.getElementById('story-replay-btn');
      if (replayBtn) replayBtn.addEventListener('click', () => this.jumpToSlide(0));

      const shareBtn = document.getElementById('story-share-btn');
      if (shareBtn) {
        shareBtn.addEventListener('click', () => {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            shareBtn.textContent = "Link Copied!";
            setTimeout(() => shareBtn.textContent = "Share Profile", 2000);
          }
        });
      }

      window.addEventListener('keydown', (e) => {
        if (!this.isShowing) return;
        if (e.key === 'Escape') this.hide();
        if (e.key === 'ArrowRight') this.navigateNext();
        if (e.key === 'ArrowLeft') this.navigatePrev();
      });
    }

    show() {
      this.isShowing = true;
      this.overlay.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; 
      
      if (backgroundCanvasInstance) {
        backgroundCanvasInstance.enableConfetti();
      }

      this.jumpToSlide(0);
    }

    hide() {
      this.isShowing = false;
      this.overlay.classList.add('hidden');
      document.body.style.overflow = ''; 
      
      this.clearProgressTracks();
      
      if (backgroundCanvasInstance) {
        backgroundCanvasInstance.disableConfetti();
      }
    }

    clearProgressTracks() {
      clearInterval(this.progressIntervalId);
      this.progressIntervalId = null;
    }

    jumpToSlide(idx) {
      this.clearProgressTracks();
      
      this.slides.forEach((slide, sIdx) => {
        const fill = document.getElementById(`story-progress-fill-${sIdx}`);
        if (sIdx < idx) {
          slide.classList.remove('active-slide');
          if (fill) fill.style.width = '100%';
        } else if (sIdx === idx) {
          slide.classList.add('active-slide');
          if (fill) fill.style.width = '0%';
        } else {
          slide.classList.remove('active-slide');
          if (fill) fill.style.width = '0%';
        }
      });

      this.currentSlideIndex = idx;
      this.startTimestamp = Date.now();
      this.elapsedPaused = 0;

      const currentFill = document.getElementById(`story-progress-fill-${idx}`);
      
      this.progressIntervalId = setInterval(() => {
        const delta = Date.now() - this.startTimestamp;
        const pct = Math.min((delta / this.slideMs) * 100, 100);
        
        if (currentFill) currentFill.style.width = `${pct}%`;

        if (delta >= this.slideMs) {
          this.navigateNext();
        }
      }, 16);
    }

    navigateNext() {
      if (this.currentSlideIndex < this.slides.length - 1) {
        this.jumpToSlide(this.currentSlideIndex + 1);
      } else {
        this.hide(); 
      }
    }

    navigatePrev() {
      if (this.currentSlideIndex > 0) {
        this.jumpToSlide(this.currentSlideIndex - 1);
      }
    }
  }

  slideshowInstance = new ImmersiveStoryCarousel();

  const startBtn = document.getElementById('start-story-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      slideshowInstance.show();
    });
  }
});
