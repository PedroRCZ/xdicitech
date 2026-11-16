/**
 * ==========================================================================
 * xDiciTech - Motor de Animaciones de Scroll, Telemetría & Canvas Warp
 * Archivo: js/scroll-fx.js
 * 
 * Módulos incluidos:
 * 1. Motor de Partículas Warp en Canvas (Efecto Hiperespacio reactivo)
 * 2. Barra Láser de Telemetría, Indicadores Numéricos y Parallax
 * 3. Spotlight Radial 3D & Tilt en Tarjetas Bento
 * 4. Contadores Aeroespaciales y Observador Scroll Reveal
 * ==========================================================================
 */

// Variables globales del motor de scroll
let scrollVelocity = 0;
let lastScrollY = window.scrollY || 0;
let revealObserver = null;
let isTurboMode = true;
let warpInitialized = false;

// ==========================================================================
// 1. MOTOR DE PARTÍCULAS WARP EN CANVAS
// ==========================================================================
function initWarpStarfield() {
    if (warpInitialized) return;
    const canvas = document.getElementById('warp-canvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    warpInitialized = true;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    // Generar campo de estrellas con paleta temática xDiciTech
    const stars = Array.from({ length: 75 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.8 + 0.5,
        baseSpeed: Math.random() * 0.45 + 0.15,
        color: Math.random() > 0.82 ? '#FF6B00' : (Math.random() > 0.45 ? '#0066FF' : '#94A3B8')
    }));

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    function renderStars() {
        ctx.clearRect(0, 0, width, height);
        scrollVelocity *= 0.9; // Desaceleración suave del efecto warp

        stars.forEach(star => {
            const speed = star.baseSpeed + scrollVelocity * 0.45;
            star.y -= speed;
            if (star.y < -20) {
                star.y = height + 10;
                star.x = Math.random() * width;
            }

            ctx.beginPath();
            ctx.strokeStyle = star.color;
            ctx.lineWidth = star.size;
            ctx.lineCap = 'round';
            const tailLength = Math.max(star.size, scrollVelocity * 1.3);
            ctx.moveTo(star.x, star.y);
            ctx.lineTo(star.x, star.y + tailLength);
            ctx.stroke();
        });

        requestAnimationFrame(renderStars);
    }
    renderStars();
}

// ==========================================================================
// 2. BARRA LÁSER DE TELEMETRÍA, PROGRESO Y PARALLAX
// ==========================================================================
function handleScrollTelemetry() {
    const currentY = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const pct = Math.min(Math.max((currentY / maxScroll) * 100, 0), 100);
    const roundedPct = Math.round(pct);

    // Velocidad instantánea para el efecto Warp de las estrellas
    const delta = Math.abs(currentY - lastScrollY);
    scrollVelocity = Math.min(scrollVelocity + delta * 0.18, 35);
    lastScrollY = currentY;

    // Actualizar barra láser superior e indicadores
    const progressBar = document.getElementById('scroll-progress-bar');
    const navTelemetry = document.getElementById('nav-scroll-telemetry');
    const sideFill = document.getElementById('side-circuit-fill');
    const sidePct = document.getElementById('side-scroll-pct');

    if (progressBar) progressBar.style.width = `${pct}%`;
    if (navTelemetry) navTelemetry.textContent = `${roundedPct.toString().padStart(2, '0')}%`;
    if (sideFill) sideFill.style.height = `${pct}%`;
    if (sidePct) sidePct.textContent = `${roundedPct}%`;

    // Parallax sutil de la cuadrícula espacial y nebulosas
    document.body.style.setProperty('--grid-offset', `${-currentY * 0.22}px`);
    const nebulaTop = document.getElementById('nebula-top');
    const nebulaBottom = document.getElementById('nebula-bottom');
    if (nebulaTop) nebulaTop.style.transform = `translate3d(0, ${currentY * 0.12}px, 0)`;
    if (nebulaBottom) nebulaBottom.style.transform = `translate3d(0, ${-currentY * 0.1}px, 0)`;
}

// ==========================================================================
// 3. EFECTO SPOTLIGHT RADIAL Y TILT 3D SUAVE (BENTO GRID)
// ==========================================================================
function initSpotlightAndTilt() {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        card.onmousemove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);

            if (card.classList.contains('tilt-card') && window.innerWidth >= 1024) {
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -3.5;
                const rotateY = ((x - centerX) / centerX) * 3.5;
                card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px)`;
            }
        };
        card.onmouseleave = () => {
            card.style.setProperty('--mouse-x', `-500px`);
            card.style.setProperty('--mouse-y', `-500px`);
            if (card.classList.contains('tilt-card')) {
                card.style.transform = '';
            }
        };
    });
}

// ==========================================================================
// 4. CONTADORES NUMÉRICOS & MOTOR SCROLL REVEAL
// ==========================================================================
function animateCounter(el) {
    if (el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const target = parseInt(el.getAttribute('data-counter'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1100;
    const startTime = performance.now();

    function step(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + suffix;
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target + suffix;
        }
    }
    requestAnimationFrame(step);
}

function observeRevealElements() {
    if (revealObserver) {
        revealObserver.disconnect();
    }

    revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');

                // Si contiene contadores numéricos, animarlos
                const counters = entry.target.querySelectorAll('[data-counter]');
                counters.forEach(counter => animateCounter(counter));
            } else {
                // Permite que al volver a subir y bajar se re-animen sutilmente
                if (entry.boundingClientRect.top > window.innerHeight * 0.95) {
                    entry.target.classList.remove('is-visible');
                }
            }
        });
    }, {
        threshold: 0.14,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('[data-reveal]').forEach(el => {
        revealObserver.observe(el);
    });

    // Observador especial para la línea de circuito del ADN xDiciTech
    const adnSection = document.getElementById('adn');
    const adnPath = document.getElementById('adn-svg-path');
    if (adnSection && adnPath) {
        const adnObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    adnPath.classList.add('drawn');
                } else {
                    adnPath.classList.remove('drawn');
                }
            });
        }, { threshold: 0.25 });
        adnObserver.observe(adnSection);
    }
}

// Botón para repetir las animaciones de scroll sin recargar la página
function replayScrollAnimations() {
    const elements = document.querySelectorAll('[data-reveal]');
    const adnPath = document.getElementById('adn-svg-path');
    if (adnPath) adnPath.classList.remove('drawn');

    elements.forEach(el => {
        el.classList.remove('is-visible');
        el.querySelectorAll('[data-counter]').forEach(c => c.dataset.animated = "false");
    });

    // Impulso visual en el canvas warp
    scrollVelocity = 28;

    setTimeout(() => {
        observeRevealElements();
    }, 180);
}

function toggleAnimationSpeed() {
    isTurboMode = !isTurboMode;
    const btn = document.getElementById('btn-fx-speed');
    if (isTurboMode) {
        document.documentElement.style.setProperty('--reveal-duration', '0.85s');
        if (btn) btn.textContent = 'Modo: Turbo ⚡';
    } else {
        document.documentElement.style.setProperty('--reveal-duration', '1.45s');
        if (btn) btn.textContent = 'Modo: Cinemático 🎬';
    }
    replayScrollAnimations();
}

// Vincular listener pasivo de scroll
window.addEventListener('scroll', handleScrollTelemetry, { passive: true });

// Exportar funciones a la ventana global para invocación desde HTML o app.js
window.initWarpStarfield = initWarpStarfield;
window.handleScrollTelemetry = handleScrollTelemetry;
window.initSpotlightAndTilt = initSpotlightAndTilt;
window.animateCounter = animateCounter;
window.observeRevealElements = observeRevealElements;
window.replayScrollAnimations = replayScrollAnimations;
window.toggleAnimationSpeed = toggleAnimationSpeed;
