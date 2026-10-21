/* ============================================================
   PALESTINE DRINKS – ADVANCED 3D CAN ENGINE & SCRIPT
   Pure Vanilla JavaScript · Pure White Mode · Zero Frameworks
   ============================================================ */

'use strict';

/* ── MOTION PREFERENCE ── */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── DOM READY ── */
document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initRevealAnimations();
  initHeroAnimatedCanEngine();
  initHeroCycler();
  initProductShowcase();
  initWordCycler();
  initFAQ();
  initForms();
  initMagneticButtons();
  initProductFilters();
});

/* ══════════════════════════════════
   PRELOADER
══════════════════════════════════ */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;
  setTimeout(() => {
    preloader.classList.add('hidden');
    preloader.addEventListener('transitionend', () => preloader.remove(), { once: true });
  }, 1400);
}

/* ══════════════════════════════════
   NAVBAR (WHITE MODE SCROLL EFFECT)
══════════════════════════════════ */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Active page indicator
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

/* ══════════════════════════════════
   MOBILE MENU
══════════════════════════════════ */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.classList.toggle('open', isOpen);
    mobileMenu.hidden = !isOpen;
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => { if (isOpen) toggleMenu(); });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && isOpen) toggleMenu();
  });
}

/* ══════════════════════════════════
   SCROLL PROGRESS & BACK TO TOP
══════════════════════════════════ */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');

  // Inject comfortable Back-to-Top button with live scroll indicator if not present
  let btn = document.getElementById('scroll-top-btn');
  if (!btn) {
    btn = document.createElement('button');
    btn.id = 'scroll-top-btn';
    btn.className = 'scroll-top-btn';
    btn.setAttribute('aria-label', 'Scroll back to top');
    btn.innerHTML = `
      <svg class="scroll-top-ring" viewBox="0 0 36 36">
        <path class="scroll-top-ring-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="rgba(8,116,67,0.15)" stroke-width="2.5"/>
        <path id="scroll-top-ring-fill" class="scroll-top-ring-fill" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#087443" stroke-width="2.8" stroke-dasharray="100, 100" stroke-dashoffset="100"/>
      </svg>
      <span class="scroll-top-arrow">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
      </span>
      <span class="scroll-top-tooltip" id="scroll-top-pct">Top</span>
    `;
    document.body.appendChild(btn);

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const ringFill = document.getElementById('scroll-top-ring-fill');
  const pctTooltip = document.getElementById('scroll-top-pct');

  const onScroll = () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const pct = docH > 0 ? Math.min(100, Math.max(0, (scrollY / docH) * 100)) : 0;

    if (bar) bar.style.width = pct + '%';

    if (btn) {
      if (scrollY > 180) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }

    if (ringFill) {
      ringFill.style.strokeDashoffset = (100 - pct).toFixed(1);
    }
    if (pctTooltip && scrollY > 180) {
      pctTooltip.textContent = Math.round(pct) + '%';
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ══════════════════════════════════
   REVEAL OBSERVER
══════════════════════════════════ */
function initRevealAnimations() {
  if (prefersReducedMotion) return;

  const elements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!elements.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ══════════════════════════════════════════════════════════════
   ACCURATE & COMPLETE 3D CAN ANIMATION ENGINE (VANILLA JS)
   Features:
   - 360-degree interactive mouse/touch drag with fluid inertia
   - Smooth continuous 3D bobbing and perspective tilt
   - Dynamic specular light sweep across the aluminum surface
   - 3D orbiting satellite cans with genuine parallax depth
   - Effervescent soda fizz bubble canvas background
══════════════════════════════════════════════════════════════ */
let triggerRefreshmentBurst = null;

function initHeroAnimatedCanEngine() {
  const stage = document.getElementById('hero-can-stage');
  const wrapper = document.getElementById('hero-can-wrapper');
  const canImg = document.getElementById('hero-can-img');
  const shadow = document.getElementById('hero-can-shadow');
  const aura = document.getElementById('hero-flavor-aura');
  const sheen = document.getElementById('hero-can-sheen');
  const satLeft = document.getElementById('sat-left');
  const satRight = document.getElementById('sat-right');
  const fizzCanvas = document.getElementById('fizz-canvas');
  const rippleCanvas = document.getElementById('can-ripple-canvas');

  /* ── 1. DUAL-LAYER EFFERVESCENT FIZZ & SPARKLE CANVAS ── */
  if (fizzCanvas) {
    const ctx = fizzCanvas.getContext('2d');
    let width = 0;
    let height = 0;

    const resizeFizz = () => {
      width = fizzCanvas.width = fizzCanvas.parentElement ? fizzCanvas.parentElement.clientWidth : window.innerWidth;
      height = fizzCanvas.height = fizzCanvas.parentElement ? fizzCanvas.parentElement.clientHeight : 600;
    };
    resizeFizz();
    window.addEventListener('resize', resizeFizz);

    const bubbles = [];
    const BUBBLE_COUNT = 50;
    for (let i = 0; i < BUBBLE_COUNT; i++) {
      bubbles.push({
        x: Math.random() * (width || 500),
        y: Math.random() * (height || 600),
        r: Math.random() * 3.2 + 0.8,
        vy: Math.random() * 1.1 + 0.4,
        vx: 0,
        wobble: Math.random() * 0.04 + 0.015,
        wobbleAmp: Math.random() * 12 + 4,
        phase: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.35 + 0.15,
        sparkle: Math.random() > 0.65,
        hue: Math.random() > 0.5 ? '8, 116, 67' : '206, 17, 38'
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    window.addEventListener('mousemove', e => {
      const rect = fizzCanvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });

    let fTime = 0;
    function renderFizz() {
      fTime++;
      ctx.clearRect(0, 0, width, height);

      bubbles.forEach(b => {
        b.y -= b.vy;
        if (b.y < -10) {
          b.y = height + 10;
          b.x = Math.random() * width;
        }

        // Gentle mouse reaction
        const dx = b.x - mouseX;
        const dy = b.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110 && dist > 0) {
          const force = (110 - dist) / 110 * 1.6;
          b.vx += (dx / dist) * force;
        }
        b.vx *= 0.94;

        const wobbleX = Math.sin(fTime * b.wobble + b.phase) * b.wobbleAmp;
        const finalX = b.x + wobbleX + b.vx;

        ctx.fillStyle = `rgba(${b.hue}, ${b.alpha})`;
        ctx.beginPath();
        ctx.arc(finalX, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        // Twinkle core
        if (b.sparkle && Math.sin(fTime * 0.12 + b.phase) > 0.4) {
          ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 1.8})`;
          ctx.beginPath();
          ctx.arc(finalX, b.y, b.r * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      requestAnimationFrame(renderFizz);
    }
    requestAnimationFrame(renderFizz);
  }

  /* ── 2. DYNAMIC LIQUID REFRESHMENT BURST CANVAS ── */
  let ripples = [];
  if (rippleCanvas) {
    const rCtx = rippleCanvas.getContext('2d');
    rippleCanvas.width = 460;
    rippleCanvas.height = 540;

    function addRippleBurst(accentColor = '#087443') {
      const cx = rippleCanvas.width / 2;
      const cy = rippleCanvas.height / 2;
      for (let i = 0; i < 3; i++) {
        ripples.push({
          x: cx, y: cy,
          r: 10 + i * 15,
          maxR: 200 + i * 40,
          speed: 4.5 + i * 1.2,
          alpha: 0.85,
          color: accentColor,
          type: 'ring'
        });
      }
      for (let j = 0; j < 24; j++) {
        const angle = (Math.PI * 2 / 24) * j + Math.random() * 0.2;
        const spd = Math.random() * 6 + 3;
        ripples.push({
          x: cx, y: cy,
          vx: Math.cos(angle) * spd,
          vy: Math.sin(angle) * spd - 1,
          r: Math.random() * 3 + 1.5,
          alpha: 0.9,
          color: accentColor,
          type: 'drop'
        });
      }
    }

    triggerRefreshmentBurst = addRippleBurst;

    function renderRipples() {
      rCtx.clearRect(0, 0, rippleCanvas.width, rippleCanvas.height);
      ripples = ripples.filter(r => r.alpha > 0.02);

      ripples.forEach(r => {
        if (r.type === 'ring') {
          r.r += r.speed;
          r.alpha *= 0.94;
          rCtx.save();
          rCtx.strokeStyle = r.color;
          rCtx.globalAlpha = r.alpha;
          rCtx.lineWidth = 2.5;
          rCtx.beginPath();
          rCtx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          rCtx.stroke();
          rCtx.restore();
        } else if (r.type === 'drop') {
          r.x += r.vx;
          r.y += r.vy;
          r.vy += 0.15;
          r.alpha *= 0.96;
          rCtx.save();
          rCtx.fillStyle = r.color;
          rCtx.globalAlpha = r.alpha;
          rCtx.beginPath();
          rCtx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
          rCtx.fill();
          rCtx.restore();
        }
      });

      requestAnimationFrame(renderRipples);
    }
    requestAnimationFrame(renderRipples);

    if (stage) {
      stage.addEventListener('click', () => {
        const activeColor = window.currentHeroAccentColor || '#CE1126';
        addRippleBurst(activeColor);
        if (wrapper) {
          wrapper.classList.remove('can-bounce-active');
          void wrapper.offsetWidth;
          wrapper.classList.add('can-bounce-active');
        }
      });
    }
  }

  /* ── 3. HARMONIC LEVITATION & PARALLAX PHYSICS LOOP ── */
  if (!wrapper) return;

  let mouseNormX = 0;
  let mouseNormY = 0;
  let curTiltX = 0;
  let curTiltY = 0;
  let curShiftX = 0;
  let curShiftY = 0;
  let time = 0;

  window.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    mouseNormX = (e.clientX - cx) / cx;
    mouseNormY = (e.clientY - cy) / cy;
  });

  window.addEventListener('touchmove', e => {
    if (e.touches.length > 0) {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseNormX = (e.touches[0].clientX - cx) / cx;
      mouseNormY = (e.touches[0].clientY - cy) / cy;
    }
  }, { passive: true });

  function levitationLoop() {
    time++;

    // Harmonic multi-wave levitation
    const bobY = Math.sin(time * 0.042) * 14 + Math.cos(time * 0.018) * 4;
    const rotZ = Math.sin(time * 0.032) * 2.2;

    const targetTiltX = mouseNormY * -10;
    const targetTiltY = mouseNormX * 16;
    const targetShiftX = mouseNormX * 22;
    const targetShiftY = mouseNormY * 14;

    curTiltX += (targetTiltX - curTiltX) * 0.07;
    curTiltY += (targetTiltY - curTiltY) * 0.07;
    curShiftX += (targetShiftX - curShiftX) * 0.07;
    curShiftY += (targetShiftY - curShiftY) * 0.07;

    wrapper.style.transform = `translate3d(${curShiftX}px, ${bobY + curShiftY}px, 0) rotateX(${curTiltX}deg) rotateY(${curTiltY}deg) rotateZ(${rotZ}deg)`;

    if (shadow) {
      const shadowScale = 1 - (bobY / 32);
      const shadowShiftX = curShiftX * 0.5;
      shadow.style.transform = `translateX(${shadowShiftX}px) scale(${Math.max(0.65, shadowScale)})`;
      shadow.style.opacity = Math.max(0.3, 0.65 - (bobY / 40));
    }

    if (sheen) {
      const sheenX = ((Math.sin(time * 0.02) + 1) / 2) * 180 - 40;
      sheen.style.transform = `translateX(${sheenX}%) skewX(-25deg)`;
    }

    if (satLeft) {
      const satBob = Math.sin(time * 0.038 + 1.2) * 12;
      const satShiftX = -curShiftX * 0.65;
      const satShiftY = -curShiftY * 0.45;
      satLeft.style.transform = `translateY(calc(-50% + ${satBob + satShiftY}px)) translateX(${satShiftX}px) rotate(${-rotZ * 1.5 - 5}deg)`;
    }

    if (satRight) {
      const satBob = Math.cos(time * 0.035 + 0.8) * 12;
      const satShiftX = -curShiftX * 0.65;
      const satShiftY = -curShiftY * 0.45;
      satRight.style.transform = `translateY(calc(-50% + ${satBob + satShiftY}px)) translateX(${satShiftX}px) rotate(${rotZ * 1.5 + 5}deg)`;
    }

    requestAnimationFrame(levitationLoop);
  }

  requestAnimationFrame(levitationLoop);
}

/* ══════════════════════════════════
   HERO CAN CYCLER — ALL 5 PRODUCTS
   Every product gets the full 360° interactive 3D view
══════════════════════════════════ */
function initHeroCycler() {
  // Hero cycler shares the PRODUCTS array (defined below)
  // We need to defer until PRODUCTS is available, so we wrap in a short delay
  // or use the same data inline. Using the inline approach for instant execution:

  const heroCans = [
    {
      name: 'Palestine Cola',
      vol: '330 mL · Original Recipe',
      img: 'assets/products/palestine-cola.png',
      alt: 'Palestine Cola 330ml can',
      satLeft:  'assets/products/palestine-cola-sugarfree.png',
      satRight: 'assets/products/palestine-energy.png',
      accentColor: '#CE1126',
      auraGradient: 'radial-gradient(circle, rgba(206, 17, 38, 0.28) 0%, rgba(206, 17, 38, 0.08) 45%, transparent 70%)',
    },
    {
      name: 'Palestine Cola Sugarfree',
      vol: '330 mL · Zero Sugar Edition',
      img: 'assets/products/palestine-cola-sugarfree.png',
      alt: 'Palestine Cola Sugarfree 330ml can',
      satLeft:  'assets/products/palestine-cola.png',
      satRight: 'assets/products/palestine-energy.png',
      accentColor: '#2B2B2B',
      auraGradient: 'radial-gradient(circle, rgba(60, 60, 60, 0.24) 0%, rgba(40, 40, 40, 0.06) 45%, transparent 70%)',
    },
    {
      name: 'Palestine Energy',
      vol: '330 mL · B-Vitamins Enriched',
      img: 'assets/products/palestine-energy.png',
      alt: 'Palestine Energy Drink can',
      satLeft:  'assets/products/palestine-cola.png',
      satRight: 'assets/products/palestine-orange.png',
      accentColor: '#087443',
      auraGradient: 'radial-gradient(circle, rgba(8, 116, 67, 0.30) 0%, rgba(8, 116, 67, 0.08) 45%, transparent 70%)',
    },
    {
      name: 'Palestine Orange',
      vol: '330 mL · Coming Soon',
      img: 'assets/products/palestine-orange.png',
      alt: 'Palestine Orange sparkling drink can',
      satLeft:  'assets/products/palestine-energy.png',
      satRight: 'assets/products/palestine-lemon-lime.png',
      accentColor: '#D96500',
      auraGradient: 'radial-gradient(circle, rgba(217, 101, 0, 0.28) 0%, rgba(217, 101, 0, 0.08) 45%, transparent 70%)',
    },
    {
      name: 'Palestine Lemon Lime',
      vol: '330 mL · Coming Soon',
      img: 'assets/products/palestine-lemon-lime.png',
      alt: 'Palestine Lemon Lime sparkling drink can',
      satLeft:  'assets/products/palestine-orange.png',
      satRight: 'assets/products/palestine-cola.png',
      accentColor: '#789B1A',
      auraGradient: 'radial-gradient(circle, rgba(120, 155, 26, 0.28) 0%, rgba(120, 155, 26, 0.08) 45%, transparent 70%)',
    },
  ];

  let heroCurrent = 0;
  window.currentHeroAccentColor = heroCans[0].accentColor;

  const heroCanImg   = document.getElementById('hero-can-img');
  const heroWrapper  = document.getElementById('hero-can-wrapper');
  const heroAura     = document.getElementById('hero-flavor-aura');
  const satLeftEl    = document.getElementById('sat-left');
  const satRightEl   = document.getElementById('sat-right');
  const dotsWrap     = document.getElementById('hero-cycler-dots');
  const prevBtn      = document.getElementById('hero-prev');
  const nextBtn      = document.getElementById('hero-next');
  const labelName    = document.getElementById('hero-can-label-name');
  const labelVol     = document.getElementById('hero-can-label-vol');

  if (heroAura) {
    heroAura.style.background = heroCans[0].auraGradient;
  }

  // Create dots
  if (dotsWrap) {
    dotsWrap.innerHTML = '';
    heroCans.forEach((can, i) => {
      const dot = document.createElement('button');
      dot.className = 'hero-cycler-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `View ${can.name}`);
      dot.setAttribute('title', can.name);
      dot.addEventListener('click', () => switchHeroCan(i));
      dotsWrap.appendChild(dot);
    });
  }

  function switchHeroCan(newIndex) {
    if (newIndex === heroCurrent) return;
    heroCurrent = ((newIndex % heroCans.length) + heroCans.length) % heroCans.length;
    const can = heroCans[heroCurrent];
    window.currentHeroAccentColor = can.accentColor;

    if (typeof triggerRefreshmentBurst === 'function') {
      triggerRefreshmentBurst(can.accentColor);
    }

    if (heroCanImg) {
      heroCanImg.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
      heroCanImg.style.opacity = '0';
      heroCanImg.style.transform = 'scale(0.85) translateY(18px)';

      setTimeout(() => {
        heroCanImg.src = can.img;
        heroCanImg.alt = can.alt;
        heroCanImg.style.opacity = '1';
        heroCanImg.style.transform = 'scale(1) translateY(0)';
      }, 250);
    }

    if (heroAura) {
      heroAura.style.transition = 'background 0.6s ease';
      heroAura.style.background = can.auraGradient;
    }

    if (satLeftEl) {
      const slImg = satLeftEl.querySelector('img');
      if (slImg) {
        slImg.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        slImg.style.opacity = '0';
        slImg.style.transform = 'scale(0.85)';
        setTimeout(() => {
          slImg.src = can.satLeft;
          slImg.style.opacity = '';
          slImg.style.transform = '';
        }, 220);
      }
    }
    if (satRightEl) {
      const srImg = satRightEl.querySelector('img');
      if (srImg) {
        srImg.style.transition = 'opacity 0.22s ease, transform 0.22s ease';
        srImg.style.opacity = '0';
        srImg.style.transform = 'scale(0.85)';
        setTimeout(() => {
          srImg.src = can.satRight;
          srImg.style.opacity = '';
          srImg.style.transform = '';
        }, 220);
      }
    }

    if (labelName) {
      labelName.style.opacity = '0';
      labelName.style.transform = 'translateY(6px)';
      setTimeout(() => {
        labelName.textContent = can.name;
        labelName.style.color = can.accentColor;
        labelName.style.opacity = '1';
        labelName.style.transform = 'translateY(0)';
      }, 180);
    }
    if (labelVol) {
      labelVol.style.opacity = '0';
      labelVol.style.transform = 'translateY(6px)';
      setTimeout(() => {
        labelVol.textContent = can.vol;
        labelVol.style.opacity = '1';
        labelVol.style.transform = 'translateY(0)';
      }, 220);
    }

    document.querySelectorAll('.hero-cycler-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === heroCurrent);
      if (i === heroCurrent) {
        dot.style.background = can.accentColor;
        dot.style.borderColor = can.accentColor;
      } else {
        dot.style.background = '';
        dot.style.borderColor = '';
      }
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => switchHeroCan(heroCurrent - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => switchHeroCan(heroCurrent + 1));
}

/* ══════════════════════════════════
   MAGNETIC INTERACTIVE BUTTONS
══════════════════════════════════ */
function initMagneticButtons() {
  if (prefersReducedMotion) return;
  const btns = document.querySelectorAll('.btn-primary, .btn-secondary, .hero-cycler-btn, .btn-foundation-hero, .btn-foundation-nav');

  btns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });
}


const PRODUCTS = [
  {
    id: 'cola',
    name: 'Palestine Cola',
    tagline: 'The Taste of Freedom',
    desc: 'A refreshing cola that perfectly balances sparkling effervescence and balanced sweetness. Every sip brings a burst of freshness, offering an authentic taste of freedom and community.',
    vol: '330 mL · Signature Recipe',
    status: 'available',
    statusText: 'Original Recipe · 330mL',
    story: 'Palestine Cola is the flagship beverage of Safad Food AB — a family-owned enterprise based in Malmö, Sweden. Every can carries our enduring message: Never stop talking about Palestine.',
    img: 'assets/products/palestine-cola.png',
    front3d: 'assets/products/palestine-cola.png',
    back3d: 'assets/3d/can-back.png',
    left3d: 'assets/3d/can-side-left.png',
    right3d: 'assets/3d/can-side-right.png',
    alt: 'Palestine Cola 330ml can',
    bgClass: 'cola-bg',
    accentColor: '#CE1126',
    giantText: 'FREEDOM',
    vitamins: false,
  },
  {
    id: 'sf',
    name: 'Palestine Cola Sugarfree',
    tagline: 'Zero Sugar. Pure Character.',
    desc: 'The iconic taste of Palestine Cola in a refined sugar-free formulation, with the same crisp effervescence and balanced fizz. Clean, refreshing, and uncompromising.',
    vol: '330 mL · Zero Sugar',
    status: 'available',
    statusText: 'Zero Sugar Edition · 330mL',
    story: 'Enjoy full character without sugar. Crafted for everyone who demands refreshing taste with purposeful principles.',
    img: 'assets/products/palestine-cola-sugarfree.png',
    front3d: 'assets/products/palestine-cola-sugarfree.png',
    back3d: 'assets/3d/sf-back.png',
    left3d: 'assets/3d/sf-side-left.png',
    right3d: 'assets/3d/sf-side-right.png',
    alt: 'Palestine Cola Sugarfree 330ml can',
    bgClass: 'sf-bg',
    accentColor: '#2B2B2B',
    giantText: 'LIBERTY',
    vitamins: false,
  },
  {
    id: 'energy',
    name: 'Palestine Energy',
    tagline: 'The Power of Freedom',
    desc: 'A sparkling energy drink formulated with essential B-Vitamins (B3, B6, B12) and natural crisp flavors to keep you sharp, focused, and energized throughout your day.',
    vol: '330 mL · Energy Blend',
    status: 'available',
    statusText: 'Enriched B-Vitamins · 330mL',
    story: 'Formulated with Vitamins B3, B6, and B12, Palestine Energy delivers natural vitality for active minds and community leaders.',
    img: 'assets/products/palestine-energy.png',
    front3d: 'assets/products/palestine-energy.png',
    back3d: 'assets/3d/energy-back.png',
    left3d: 'assets/3d/energy-side-left.png',
    right3d: 'assets/3d/energy-side-right.png',
    alt: 'Palestine Energy Drink can',
    bgClass: 'energy-bg',
    accentColor: '#087443',
    giantText: 'ENERGY',
    vitamins: true,
  },
  {
    id: 'orange',
    name: 'Palestine Orange',
    tagline: 'Sun-Drenched Citrus',
    desc: 'A sparkling orange soda inspired by the legendary citrus groves of Jaffa and Palestine. Packed with bright citrus sweetness and crisp natural bubbles.',
    vol: '330 mL · Coming Soon',
    status: 'coming',
    statusText: 'In Final Bottling · Coming Soon',
    story: 'Celebrating Palestine\'s rich agricultural legacy, Palestine Orange pays homage to the historic citrus farms that fed generations.',
    img: 'assets/products/palestine-orange.png',
    front3d: 'assets/products/palestine-orange.png',
    back3d: 'assets/3d/orange-back.png',
    left3d: 'assets/3d/orange-side-left.png',
    right3d: 'assets/3d/orange-side-right.png',
    alt: 'Palestine Orange sparkling drink can',
    bgClass: 'orange-bg',
    accentColor: '#D96500',
    giantText: 'CITRUS',
    vitamins: false,
  },
  {
    id: 'lemon',
    name: 'Palestine Lemon Lime',
    tagline: 'Mediterranean Freshness',
    desc: 'A vibrant sparkling beverage combining sun-ripened Mediterranean lemons and zesty limes with a crisp, clean finish.',
    vol: '330 mL · Coming Soon',
    status: 'coming',
    statusText: 'In Final Bottling · Coming Soon',
    story: 'Inspired by the fresh lemon harvests of Palestine, this crisp soda offers immediate refreshment on sunlit afternoons.',
    img: 'assets/products/palestine-lemon-lime.png',
    front3d: 'assets/products/palestine-lemon-lime.png',
    back3d: 'assets/3d/lemon-back.png',
    left3d: 'assets/3d/lemon-side-left.png',
    right3d: 'assets/3d/lemon-side-right.png',
    alt: 'Palestine Lemon Lime sparkling drink can',
    bgClass: 'lemon-bg',
    accentColor: '#789B1A',
    giantText: 'CRISP',
    vitamins: false,
  },
];

/* ══════════════════════════════════
   INTERACTIVE 3D PRODUCT SHOWCASE
══════════════════════════════════ */
let showcaseIndex = 0;
let showcaseAnimating = false;

function initProductShowcase() {
  const track = document.getElementById('showcase-can-track');
  const dotsWrap = document.getElementById('showcase-dots');
  const prevBtn = document.getElementById('showcase-prev');
  const nextBtn = document.getElementById('showcase-next');
  const showcaseArea = document.getElementById('showcase-can-area');
  if (!track) return;

  track.innerHTML = '';
  if (dotsWrap) dotsWrap.innerHTML = '';

  PRODUCTS.forEach((p, i) => {
    const item = document.createElement('div');
    item.className = 'showcase-can-item' + (i === 0 ? ' active' : '');
    item.dataset.index = i;

    item.innerHTML = `
      <div class="showcase-can-stage">
        <div class="showcase-glow-ring" style="background: radial-gradient(circle, ${p.accentColor}33 0%, transparent 70%);"></div>
        <img class="showcase-can-img" src="${p.img}" alt="${p.alt}" draggable="false" />
        <div class="showcase-floor-shadow"></div>
      </div>
    `;

    track.appendChild(item);
  });

  // Interactive Parallax on Showcase Area
  if (showcaseArea && !prefersReducedMotion) {
    showcaseArea.addEventListener('mousemove', e => {
      const activeStage = showcaseArea.querySelector('.showcase-can-item.active .showcase-can-stage');
      const activeImg = showcaseArea.querySelector('.showcase-can-item.active .showcase-can-img');
      const activeShadow = showcaseArea.querySelector('.showcase-can-item.active .showcase-floor-shadow');

      const rect = showcaseArea.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const tiltY = ((e.clientX - cx) / (rect.width / 2)) * 14;
      const tiltX = ((e.clientY - cy) / (rect.height / 2)) * -8;

      if (activeImg) {
        activeImg.style.transform = `scale(1.06) rotateY(${tiltY}deg) rotateX(${tiltX}deg)`;
      }
      if (activeShadow) {
        activeShadow.style.transform = `translateX(${tiltY * 0.8}px) scale(1.08)`;
      }
    });

    showcaseArea.addEventListener('mouseleave', () => {
      const activeImg = showcaseArea.querySelector('.showcase-can-item.active .showcase-can-img');
      const activeShadow = showcaseArea.querySelector('.showcase-can-item.active .showcase-floor-shadow');
      if (activeImg) activeImg.style.transform = '';
      if (activeShadow) activeShadow.style.transform = '';
    });
  }

  if (dotsWrap) {
    PRODUCTS.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'showcase-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', `View product ${i + 1}`);
      dot.addEventListener('click', () => goToProduct(i, i > showcaseIndex ? 'next' : 'prev'));
      dotsWrap.appendChild(dot);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToProduct((showcaseIndex - 1 + PRODUCTS.length) % PRODUCTS.length, 'prev'));
  if (nextBtn) nextBtn.addEventListener('click', () => goToProduct((showcaseIndex + 1) % PRODUCTS.length, 'next'));

  updateShowcaseInfo(0);

  // Auto rotation interval (can be paused on hover)
  let autoTimer = null;
  const startAuto = () => {
    if (!prefersReducedMotion && !autoTimer) {
      autoTimer = setInterval(() => {
        if (!document.hidden) goToProduct((showcaseIndex + 1) % PRODUCTS.length, 'next');
      }, 7000);
    }
  };
  const stopAuto = () => { clearInterval(autoTimer); autoTimer = null; };

  track.parentElement.addEventListener('mouseenter', stopAuto);
  track.parentElement.addEventListener('mouseleave', startAuto);
  startAuto();
}

function goToProduct(newIndex, direction = 'next') {
  if (showcaseAnimating || newIndex === showcaseIndex) return;
  showcaseAnimating = true;

  const items = document.querySelectorAll('.showcase-can-item');
  const dots  = document.querySelectorAll('.showcase-dot');
  const old   = showcaseIndex;
  showcaseIndex = newIndex;

  const outClass = direction === 'next' ? 'spin-out-next' : 'spin-out-prev';
  const inClass  = direction === 'next' ? 'spin-in-next'  : 'spin-in-prev';

  if (items[old]) {
    items[old].classList.remove('active', 'spin-in-next', 'spin-in-prev', 'spin-out-next', 'spin-out-prev');
    items[old].classList.add(outClass);
  }

  setTimeout(() => {
    if (items[newIndex]) {
      items[newIndex].classList.remove('spin-in-next', 'spin-in-prev', 'spin-out-next', 'spin-out-prev');
      items[newIndex].classList.add(inClass);
      items[newIndex].classList.add('active');
    }
  }, 50);

  dots.forEach((dot, i) => dot.classList.toggle('active', i === newIndex));
  updateShowcaseInfo(newIndex);

  setTimeout(() => {
    if (items[old]) {
      items[old].classList.remove('active', 'spin-in-next', 'spin-in-prev', 'spin-out-next', 'spin-out-prev');
    }
    showcaseAnimating = false;
  }, 750);
}

function updateShowcaseInfo(index) {
  const p = PRODUCTS[index];
  const numEl    = document.getElementById('showcase-num');
  const nameEl   = document.getElementById('showcase-name');
  const tagEl    = document.getElementById('showcase-tagline');
  const descEl   = document.getElementById('showcase-desc');
  const volEl    = document.getElementById('showcase-vol');
  const statusEl = document.getElementById('showcase-status');
  const bgEl     = document.getElementById('showcase-bg');
  const giantEl  = document.getElementById('showcase-giant-text');

  if (numEl)    numEl.textContent    = `0${index + 1} / 0${PRODUCTS.length}`;
  if (nameEl)   nameEl.textContent   = p.name;
  if (tagEl)  { tagEl.textContent    = p.tagline; tagEl.style.color = p.accentColor; }
  if (descEl)   descEl.textContent   = p.desc;
  if (volEl)    volEl.textContent    = p.vol;
  if (statusEl) {
    statusEl.textContent = p.statusText;
    statusEl.className   = 'showcase-status ' + (p.status === 'available' ? 'available' : 'coming');
  }
  if (bgEl) {
    bgEl.className = 'showcase-bg ' + p.bgClass;
  }
  if (giantEl) {
    giantEl.textContent = p.giantText;
    giantEl.classList.remove('pulse-text');
    void giantEl.offsetWidth; // trigger reflow for pop animation
    giantEl.classList.add('pulse-text');

    // Transparent watermark outline: remove the color, make it transparent but visible
    giantEl.style.color = 'transparent';
    giantEl.style.webkitTextStroke = '2.2px rgba(0, 0, 0, 0.24)';
    giantEl.style.textShadow = 'none';
  }
}

/* ══════════════════════════════════
   WORD CYCLER
══════════════════════════════════ */
function initWordCycler() {
  const cycler = document.getElementById('word-cycler');
  if (!cycler || prefersReducedMotion) return;

  const words  = cycler.querySelectorAll('.word-item');
  const arrows = cycler.querySelectorAll('.word-arrow');
  let currentIdx = 0;
  let wordTimer = null;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!wordTimer) wordTimer = setInterval(advance, 1400);
      } else {
        clearInterval(wordTimer);
        wordTimer = null;
      }
    });
  }, { threshold: 0.3 });

  observer.observe(cycler);

  function advance() {
    const prev = currentIdx;
    currentIdx = (currentIdx + 1) % words.length;

    words.forEach((w, i) => {
      w.classList.remove('active', 'prev');
      if (i === currentIdx) w.classList.add('active');
      else if (i === prev)  w.classList.add('prev');
    });

    arrows.forEach((a, i) => {
      a.classList.toggle('active', i < currentIdx);
    });
  }
}

/* ══════════════════════════════════
   PRODUCT MODAL
══════════════════════════════════ */
function openModal(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modal        = document.getElementById('product-modal');
  const nameEl       = document.getElementById('modal-name');
  const taglineEl    = document.getElementById('modal-tagline');
  const descEl       = document.getElementById('modal-desc');
  const volEl        = document.getElementById('modal-vol');
  const statusEl     = document.getElementById('modal-status');
  const storyEl      = document.getElementById('modal-story');
  const vitEl        = document.getElementById('modal-vitamins');
  const imgSide      = document.getElementById('modal-img-side');

  const mImg = document.getElementById('modal-can-img');
  const mAura = document.getElementById('modal-flavor-aura');

  if (!modal) return;

  if (mImg) {
    mImg.src = product.img;
    mImg.alt = product.alt;
  }
  if (mAura) {
    mAura.style.background = `radial-gradient(circle, ${product.accentColor}40 0%, ${product.accentColor}10 45%, transparent 70%)`;
  }

  nameEl.textContent    = product.name;
  taglineEl.textContent = product.tagline;
  taglineEl.style.color = product.accentColor;
  descEl.textContent    = product.desc;
  volEl.textContent     = product.vol;
  storyEl.textContent   = product.story;

  statusEl.textContent  = product.statusText;
  statusEl.className    = 'badge ' + (product.status === 'available' ? 'badge-available' : 'badge-coming');

  vitEl.style.display   = product.vitamins ? 'block' : 'none';

  if (imgSide) {
    imgSide.style.background = `radial-gradient(ellipse at center, ${product.accentColor}12 0%, var(--bg-subtle) 100%)`;
  }

  modal.classList.add('open');
  modal.removeAttribute('aria-hidden');
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ══════════════════════════════════
   FAQ ACCORDION
══════════════════════════════════ */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn    = item.querySelector('.faq-q');
    const answer = item.querySelector('.faq-a');
    if (!btn || !answer) return;

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        const a = i.querySelector('.faq-a');
        if (a) {
          a.style.maxHeight = '0px';
          setTimeout(() => { if (!i.classList.contains('open')) a.hidden = true; }, 300);
        }
        const b = i.querySelector('.faq-q');
        if (b) b.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.hidden = false;
        answer.style.maxHeight = (answer.scrollHeight + 40) + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ══════════════════════════════════
   FORMS & MULTI-STEP PARTNER APPLICATION
══════════════════════════════════ */
function initForms() {
  // Contact Form
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;
      contactForm.querySelectorAll('[required]').forEach(input => {
        input.classList.remove('error');
        if (!input.value.trim()) { input.classList.add('error'); valid = false; }
      });
      if (valid) {
        showFormSuccess(contactForm, 'Thank you for reaching out. A representative from Safad Food AB will respond within 24 business hours.');
      }
    });
  }

  // Partner Multi-Step Form
  const regForm = document.getElementById('register-form');
  if (regForm) {
    let currentStep = 1;
    const totalSteps = 3;
    const nextBtn = document.getElementById('register-next');
    const backBtn = document.getElementById('register-back');

    function updateStepUI() {
      for (let i = 1; i <= totalSteps; i++) {
        const p = document.getElementById('step-panel-' + i);
        if (p) p.classList.toggle('active', i === currentStep);
        const c = document.getElementById('step-circle-' + i);
        const l = document.getElementById('step-label-' + i);
        const k = document.getElementById('step-conn-' + i);
        if (c) {
          c.classList.toggle('active', i === currentStep);
          c.classList.toggle('done', i < currentStep);
          c.innerHTML = i < currentStep ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : i;
        }
        if (l) l.classList.toggle('active', i === currentStep);
        if (k) k.classList.toggle('done', i < currentStep);
      }
      if (backBtn) backBtn.style.visibility = currentStep > 1 ? 'visible' : 'hidden';
      if (nextBtn) nextBtn.textContent = currentStep === totalSteps ? 'Submit Application' : 'Next →';
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const curPanel = document.getElementById('step-panel-' + currentStep);
        let valid = true;
        if (curPanel) {
          curPanel.querySelectorAll('[required]').forEach(input => {
            input.classList.remove('error');
            if (input.type === 'checkbox' && !input.checked) {
              input.classList.add('error');
              valid = false;
            } else if (!input.value.trim()) {
              input.classList.add('error');
              valid = false;
            }
          });
        }
        if (!valid) return;

        if (currentStep < totalSteps) {
          currentStep++;
          updateStepUI();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          showFormSuccess(regForm, 'Your reseller application has been submitted to Safad Food AB. Our wholesale team will verify your business details and provide batch pricing.');
          nextBtn.style.display = 'none';
          if (backBtn) backBtn.style.display = 'none';
        }
      });
    }

    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          updateStepUI();
        }
      });
    }
  }

  // Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      showFormSuccess(loginForm, 'Partner authentication is connected to your European distributor account.');
    });
  }
}

function showFormSuccess(form, message) {
  let succ = form.querySelector('.form-success');
  if (!succ) {
    succ = document.createElement('div');
    succ.className = 'form-success';
    form.appendChild(succ);
  }
  succ.textContent = message;
  succ.classList.add('show');
}

/* ══════════════════════════════════
   PRODUCTS PAGE INTERACTIVE FILTER
══════════════════════════════════ */
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const rows = document.querySelectorAll('.product-row');
  if (!filterBtns.length || !rows.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;
      rows.forEach(row => {
        const cat = row.dataset.category;
        if (filter === 'all' || cat === filter) {
          row.style.display = 'grid';
          row.style.animation = 'pageHeroFadeIn 0.4s var(--ease-smooth) both';
        } else {
          row.style.display = 'none';
        }
      });
    });
  });
}

// Global Modal handlers
window.openModal  = openModal;
window.closeModal = closeModal;


// Premium Inner Pages Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const ipObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('ip-revealed');
                ipObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.ip-fade-up, .ip-fade-left, .ip-fade-right, .ip-scale-in').forEach(el => {
        ipObserver.observe(el);
    });
});
