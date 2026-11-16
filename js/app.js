/**
 * ==========================================================================
 * xDiciTech - Lógica de Aplicación, Simulador IoT & Cotizador WhatsApp
 * Archivo: js/app.js
 * 
 * Módulos incluidos:
 * 1. Configuración de Contacto y Datos del Portafolio
 * 2. Consola Interactiva del Hero (Selector de Pilares)
 * 3. Lógica del Simulador IoT en Tiempo Real
 * 4. Filtrado Dinámico y Modal de Fichas Técnicas del Portafolio
 * 5. Cotizador Interactivo en 3 Pasos y Generador de Brief para WhatsApp
 * 6. Modo Bio IG (Alternativa ultrarrápida a Linktree)
 * 7. Inicialización de la Aplicación
 * ==========================================================================
 */

// ==========================================================================
// 1. CONFIGURACIÓN Y BASE DE DATOS DEL PORTAFOLIO
// ==========================================================================
// Configuración centralizada de contacto (ingresar número de WhatsApp de Ecuador con código de país, ej: "593987654321")
const WHATSAPP_PHONE = "593998985649"; // Si está vacío abre el selector de chat con el mensaje preformateado

const portfolioProjects = [
    {
        id: 'p_veo',
        category: 'design',
        badge: 'GOOGLE VEO 3.1 & IA',
        title: 'Comercial Cinematográfico "Videos Imposibles"',
        subtitle: 'Video publicitario generado con Google Veo 3.1 y After Effects.',
        description: 'Producción audiovisual de alto impacto para marketing digital. Escena en convertible acelerando a través del desierto con física e iluminación hiperrealista. Demostración práctica de cómo la IA generativa permite a marcas y emprendedores crear comerciales que antes costaban miles de dólares en rodaje.',
        tech: ['Google Veo 3.1', 'After Effects', 'AI Video Marketing', 'Color Grading'],
        accent: 'energy',
        icon: 'ph-video-camera',
        video: 'videos/veo_videos_imposibles.mp4',
        poster: 'videos/veo_videos_imposibles.jpg',
        reelUrl: 'https://www.instagram.com/xdicitech/reel/DQwlkVujSMD/'
    },
    {
        id: 'p2',
        category: 'design',
        badge: 'VFX / IA GENERATIVA',
        title: 'Intervención Visual "Machala Upside Down"',
        subtitle: 'Stranger Things en Machala: Dirección creativa y composición con IA.',
        description: 'Pieza audiovisual de alto impacto viral inspirada en Stranger Things ambientada en el redondel icónico de Machala con banderas de Ecuador y El Oro. Recreación de atmósfera oscura, tormenta de rayos rojos y la criatura Vecna dominando la ciudad.',
        tech: ['Motion Graphics', 'IA Generativa', 'Composición VFX', 'Reels 9:16'],
        accent: 'energy',
        icon: 'ph-film-strip',
        video: 'videos/stranger_things_machala.mp4',
        poster: 'videos/stranger_things_machala.jpg',
        reelUrl: 'https://www.instagram.com/xdicitech/reel/DRh56HCjPyJ/'
    },
    {
        id: 'p_spartan',
        category: 'design',
        badge: 'CGI & RENDER 3D',
        title: 'Cinemática 3D "Spartan Resting"',
        subtitle: 'Render fotorrealista de Master Chief y diseño sonoro inmersivo.',
        description: 'Modelado y render cinemático 3D de armadura supersoldado Spartan descansando en un prado de margaritas con reflejos de visor dorado bajo iluminación solar natural y atmósfera sonora inmersiva.',
        tech: ['Render 3D', 'VFX', 'Composición', 'Sound Design'],
        accent: 'energy',
        icon: 'ph-cube',
        video: 'videos/spartan_halo_render.mp4',
        poster: 'videos/spartan_halo_render.jpg',
        reelUrl: 'https://www.instagram.com/xdicitech/reel/DbHoou8OMe9/'
    },
    {
        id: 'p1',
        category: 'web',
        badge: 'PWA & FULL-STACK',
        title: 'Sistema de Fidelización & Tarjetas Digitales QR',
        subtitle: 'Aplicación web progresiva para comercios locales en Machala.',
        description: 'Plataforma sin descargas donde los clientes acumulan sellos o puntos escaneando un código QR en el local, con panel administrativo en tiempo real y recordatorios por WhatsApp.',
        tech: ['HTML5 / JS', 'Firebase Cloud', 'Escáner QR', 'PWA Mobile'],
        accent: 'electric',
        icon: 'ph-qr-code'
    },
    {
        id: 'p3',
        category: 'iot',
        badge: 'HARDWARE + WEB IOT',
        title: 'Automatización & Telemetría WiFi con ESP32',
        subtitle: 'Control remoto de iluminación comercial y sensores ambientales.',
        description: 'Diseño de circuito electrónico con microcontrolador ESP32 vinculado a un panel web móvil. Permite encender letreros luminosos, programar horarios y recibir alertas térmicas en el celular.',
        tech: ['ESP32 / C++', 'Sensores IoT', 'Relés de Potencia', 'Dashboard Web'],
        accent: 'emerald',
        icon: 'ph-cpu'
    },
    {
        id: 'p4',
        category: 'web',
        badge: 'E-COMMERCE & CATÁLOGO',
        title: 'Catálogo Interactivo con Carrito a WhatsApp',
        subtitle: 'Ventas rápidas sin comisiones bancarias para tiendas y restaurantes.',
        description: 'Web autogestionable donde el cliente filtra productos, arma su pedido con precios exactos y envía la orden estructurada directo al WhatsApp del negocio en un solo clic.',
        tech: ['Tailwind CSS', 'JavaScript', 'WhatsApp API', 'SEO Local'],
        accent: 'electric',
        icon: 'ph-shopping-bag-open'
    },
    {
        id: 'p5',
        category: 'design',
        badge: 'BRANDING & ESTRATEGIA',
        title: 'Identidad y Metodología: "Fórmula x-Di-Ci-Tech"',
        subtitle: 'Estrategia integral: Innovación + Diseño + Ciencia + Tecnología.',
        description: 'Desarrollo de logotipo vectorial, manual de identidad y arquitectura de marca basada en 4 pilares: Innovación aeroespacial (x), Diseño enfocado en ventas (Di), Ciencia y psicología visual (Ci) y Tecnología de desarrollo (Tech).',
        tech: ['Branding Pro', 'Identidad de Marca', 'Estrategia B2B', 'After Effects'],
        accent: 'energy',
        icon: 'ph-bezier-curve',
        reelUrl: 'https://www.instagram.com/xdicitech/p/DP5Pr4bjf8Y/'
    },
    {
        id: 'p6',
        category: 'iot',
        badge: 'PROTOTIPADO ELECTRÓNICO',
        title: 'Sistema de Alerta Inteligente & Control de Acceso',
        subtitle: 'Seguridad y automatización a medida para negocios y oficinas.',
        description: 'Integración de sensores de apertura, alarma sonora local y notificación instantánea en la nube cada vez que se registra actividad fuera de horario laboral.',
        tech: ['Electrónica Digital', 'Microcontroladores', 'Sensores', 'Automatización'],
        accent: 'emerald',
        icon: 'ph-shield-check'
    }
];

// ==========================================================================
// 2. CONSOLA INTERACTIVA DEL HERO (PESTAÑAS DE PILARES)
// ==========================================================================
function switchHeroTab(tab) {
    const tabs = ['web', 'design', 'iot'];
    tabs.forEach(t => {
        const btn = document.getElementById(`hero-tab-${t}`);
        const panel = document.getElementById(`hero-panel-${t}`);
        if (!btn || !panel) return;

        if (t === tab) {
            const activeColor = t === 'design' 
                ? 'bg-energy-500 text-white shadow-lg shadow-energy-500/25' 
                : (t === 'iot' ? 'bg-emerald-500 text-space-950 font-bold shadow-lg shadow-emerald-500/25' : 'bg-electric-500 text-white shadow-lg shadow-electric-500/25');
            btn.className = `py-2 px-2 rounded-lg font-mono text-xs font-semibold transition-all ${activeColor} flex items-center justify-center gap-1.5`;
            panel.classList.remove('hidden');
        } else {
            btn.className = "py-2 px-2 rounded-lg font-mono text-xs font-semibold transition-all text-slate-400 hover:text-white flex items-center justify-center gap-1.5";
            panel.classList.add('hidden');
        }
    });
}

// ==========================================================================
// 3. SIMULADOR IOT EN TIEMPO REAL
// ==========================================================================
let isSignOn = true;
let visitorCount = 48;

function toggleIotSign() {
    isSignOn = !isSignOn;
    const btn = document.getElementById('btn-iot-sign');
    const sign = document.getElementById('visual-iot-sign');
    const log = document.getElementById('iot-console-log');
    if (!btn || !sign || !log) return;

    if (isSignOn) {
        btn.textContent = "ENCENDIDO";
        btn.className = "px-3 py-1 rounded-lg bg-electric-500 text-white font-mono text-xs font-semibold transition-all";
        sign.classList.add('neon-sign-active');
        sign.classList.remove('text-slate-600', 'border-slate-800');
        sign.textContent = "TU NEGOCIO ABIERTO";
        log.textContent = "> [GPIO_RELAY_01: ON] Letrero luminoso activado vía Web.";
    } else {
        btn.textContent = "APAGADO";
        btn.className = "px-3 py-1 rounded-lg bg-slate-800 text-slate-400 font-mono text-xs font-semibold transition-all";
        sign.classList.remove('neon-sign-active');
        sign.classList.add('text-slate-600', 'border-slate-800');
        sign.textContent = "LETRERO EN REPOSO";
        log.textContent = "> [GPIO_RELAY_01: OFF] Modo ahorro de energía activado.";
    }
}

function simulateTempAlert() {
    const tempVal = document.getElementById('val-iot-temp');
    const badge = document.getElementById('badge-iot-temp');
    const log = document.getElementById('iot-console-log');
    if (!tempVal || !badge || !log) return;

    tempVal.textContent = "29.8°C";
    tempVal.classList.replace('text-white', 'text-energy-400');
    badge.textContent = "ALERTA ENVIADA";
    badge.className = "px-2.5 py-0.5 rounded-full bg-energy-500/20 text-energy-400 font-mono text-[11px]";
    log.textContent = "> [ALERTA IOT] Temperatura elevada (29.8°C). Notificación enviada a WhatsApp.";

    setTimeout(() => {
        tempVal.textContent = "21.4°C";
        tempVal.classList.replace('text-energy-400', 'text-white');
        badge.textContent = "ÓPTIMO";
        badge.className = "px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[11px]";
    }, 3500);
}

function simulateVisitorPulse() {
    visitorCount++;
    const counterEl = document.getElementById('val-iot-counter');
    const log = document.getElementById('iot-console-log');
    if (counterEl) counterEl.textContent = visitorCount;
    if (log) log.textContent = `> [SENSOR_IR] Cliente #${visitorCount} detectado en entrada principal.`;
}

// ==========================================================================
// 4. RENDERIZADO, FILTRADO Y MODAL DEL PORTAFOLIO
// ==========================================================================
function renderPortfolio(filter = 'all') {
    const grid = document.getElementById('portfolio-grid');
    if (!grid) return;

    const filtered = filter === 'all' 
        ? portfolioProjects 
        : portfolioProjects.filter(p => p.category === filter);

    grid.innerHTML = filtered.map((p, idx) => {
        const colorMap = {
            electric: 'text-electric-400 bg-electric-500/15 border-electric-500/30',
            energy: 'text-energy-400 bg-energy-500/15 border-energy-500/30',
            emerald: 'text-emerald-400 bg-emerald-500/15 border-emerald-500/30'
        };
        const badgeStyle = colorMap[p.accent] || colorMap.electric;
        const delayMs = idx * 90;

        const videoBlock = p.video ? `
            <div class="relative rounded-2xl overflow-hidden aspect-video bg-space-950 border border-slate-800 mb-4 group/vid">
                <video src="${p.video}" poster="${p.poster}" loop muted playsinline onmouseover="this.play()" onmouseout="this.pause()" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"></video>
                <div class="absolute inset-0 bg-gradient-to-t from-space-950/80 via-transparent to-transparent pointer-events-none"></div>
                <div class="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span class="px-2 py-0.5 rounded-full bg-space-950/80 backdrop-blur-md border border-energy-500/40 text-[10px] font-mono text-energy-400 flex items-center gap-1">
                        <i class="ph-fill ph-play-circle text-xs"></i>
                        <span>Hover para reproducir</span>
                    </span>
                    <span class="w-6 h-6 rounded-full bg-energy-500 text-white flex items-center justify-center text-xs shadow-lg">
                        <i class="ph-fill ph-play"></i>
                    </span>
                </div>
            </div>
        ` : '';

        const igPill = p.reelUrl ? `
            <span class="px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/30 text-[10px] font-mono flex items-center gap-1">
                <i class="ph-fill ph-instagram-logo"></i> IG Reel
            </span>
        ` : '';

        return `
            <div class="glass-card tilt-card rounded-3xl p-6 flex flex-col justify-between group cursor-pointer" data-reveal="up" style="--delay: ${delayMs}ms;" onclick="openProjectModal('${p.id}')">
                <div>
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center gap-2">
                            <span class="px-3 py-1 rounded-full font-mono text-[11px] border ${badgeStyle}">
                                ${p.badge}
                            </span>
                            ${igPill}
                        </div>
                        <div class="w-10 h-10 rounded-xl bg-space-800 border border-slate-700 flex items-center justify-center text-white group-hover:bg-energy-500 transition-colors">
                            <i class="ph-duotone ${p.icon} text-xl"></i>
                        </div>
                    </div>

                    ${videoBlock}

                    <h3 class="font-display font-bold text-xl text-white group-hover:text-energy-400 transition-colors mb-2">
                        ${p.title}
                    </h3>
                    <p class="text-xs text-slate-300 leading-relaxed mb-5">
                        ${p.subtitle}
                    </p>
                </div>
                <div>
                    <div class="flex flex-wrap gap-1.5 mb-4">
                        ${p.tech.map(t => `<span class="px-2.5 py-0.5 rounded-md bg-space-950 text-slate-400 font-mono text-[11px] border border-slate-800">${t}</span>`).join('')}
                    </div>
                    <div class="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-semibold text-energy-400">
                        <span>Ver proyecto & video</span>
                        <i class="ph-bold ph-arrow-right group-hover:translate-x-1 transition-transform"></i>
                    </div>
                </div>
            </div>
        `;
    }).join('');

    // Re-observar nuevos elementos e inicializar spotlight/tilt
    if (typeof window.observeRevealElements === 'function') {
        window.observeRevealElements();
    }
    if (typeof window.initSpotlightAndTilt === 'function') {
        window.initSpotlightAndTilt();
    }
}

function filterPortfolio(category) {
    const buttons = ['all', 'web', 'design', 'iot'];
    buttons.forEach(b => {
        const el = document.getElementById(`filter-${b}`);
        if (!el) return;
        if (b === category) {
            el.className = "px-4 py-2 rounded-xl font-mono text-xs font-semibold bg-electric-500 text-white transition-all";
        } else {
            el.className = "px-4 py-2 rounded-xl font-mono text-xs font-semibold bg-space-800 text-slate-300 hover:text-white border border-slate-700 transition-all";
        }
    });
    renderPortfolio(category);
}

function openProjectModal(projectId) {
    const project = portfolioProjects.find(p => p.id === projectId);
    if (!project) return;

    const content = document.getElementById('project-modal-content');
    if (!content) return;

    if (project.video) {
        // Layout de 2 columnas en Desktop para que el video vertical 9:16 y el contenido se vean impecables sin salirse de la pantalla
        content.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <!-- Columna Izquierda: Reproductor Vertical 9:16 + Botón IG -->
                <div class="md:col-span-5 flex flex-col items-center">
                    <div class="w-full max-w-[270px] sm:max-w-[300px] mx-auto rounded-2xl overflow-hidden aspect-[9/16] bg-black border border-energy-500/40 shadow-2xl relative">
                        <video src="${project.video}" poster="${project.poster}" controls autoplay loop playsinline class="w-full h-full object-cover bg-black"></video>
                    </div>
                    ${project.reelUrl ? `
                        <a href="${project.reelUrl}" target="_blank" rel="noopener noreferrer" class="mt-3.5 w-full max-w-[270px] sm:max-w-[300px] py-2.5 px-3 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md">
                            <i class="ph-fill ph-instagram-logo text-base"></i>
                            <span>Ver Reel en Instagram</span>
                            <i class="ph-bold ph-arrow-up-right text-xs"></i>
                        </a>
                    ` : ''}
                </div>

                <!-- Columna Derecha: Información del Proyecto & Acciones -->
                <div class="md:col-span-7 flex flex-col justify-between space-y-4">
                    <div>
                        <div class="flex items-center gap-2 mb-2">
                            <span class="px-3 py-1 rounded-full bg-energy-500/15 border border-energy-500/35 text-energy-400 font-mono text-xs">
                                ${project.badge}
                            </span>
                        </div>
                        <h3 class="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight">${project.title}</h3>
                        <p class="text-sm text-energy-400 font-medium mt-1">${project.subtitle}</p>

                        <div class="text-xs sm:text-sm text-slate-300 leading-relaxed mt-4 bg-space-950/80 p-4 rounded-2xl border border-slate-800">
                            ${project.description}
                        </div>

                        <div class="mt-4">
                            <span class="font-mono text-xs text-slate-400 block mb-2">TECNOLOGÍAS & HERRAMIENTAS:</span>
                            <div class="flex flex-wrap gap-2">
                                ${project.tech.map(t => `<span class="px-3 py-1 rounded-lg bg-space-800 text-white font-mono text-xs border border-slate-700">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-end gap-3">
                        <button onclick="closeProjectModal()" class="px-4 py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-300 text-xs font-mono transition-colors">Cerrar</button>
                        <button onclick="closeProjectModal(); selectServiceAndScroll('${project.title}');" class="px-5 py-2.5 rounded-xl bg-electric-500 hover:bg-electric-600 text-white font-display font-semibold text-xs flex items-center gap-2 shadow-lg shadow-electric-500/20 transition-all">
                            <span>Cotizar algo similar</span>
                            <i class="ph-bold ph-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        // Layout para proyectos sin video (Web / IoT)
        content.innerHTML = `
            <div class="space-y-4 max-w-2xl mx-auto">
                <div class="flex items-center gap-2">
                    <span class="px-3 py-1 rounded-full bg-electric-500/15 border border-electric-500/30 text-electric-400 font-mono text-xs">
                        ${project.badge}
                    </span>
                </div>
                <h3 class="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">${project.title}</h3>
                <p class="text-sm text-electric-400 font-medium">${project.subtitle}</p>

                ${project.reelUrl ? `
                    <div class="p-3 rounded-xl bg-space-950/90 border border-slate-800 flex items-center justify-between">
                        <span class="text-xs font-mono text-slate-300 flex items-center gap-2">
                            <i class="ph-fill ph-instagram-logo text-pink-400 text-lg"></i>
                            Publicado en @xdicitech
                        </span>
                        <a href="${project.reelUrl}" target="_blank" rel="noopener noreferrer" class="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-mono text-xs flex items-center gap-1.5">
                            <span>Ver Publicación</span>
                            <i class="ph-bold ph-arrow-up-right"></i>
                        </a>
                    </div>
                ` : ''}

                <div class="text-xs sm:text-sm text-slate-300 leading-relaxed bg-space-950/80 p-4 rounded-2xl border border-slate-800">
                    ${project.description}
                </div>

                <div>
                    <span class="font-mono text-xs text-slate-400 block mb-2">TECNOLOGÍAS & HERRAMIENTAS:</span>
                    <div class="flex flex-wrap gap-2">
                        ${project.tech.map(t => `<span class="px-3 py-1 rounded-lg bg-space-800 text-white font-mono text-xs border border-slate-700">${t}</span>`).join('')}
                    </div>
                </div>

                <div class="pt-4 border-t border-slate-800 flex justify-end gap-3">
                    <button onclick="closeProjectModal()" class="px-4 py-2.5 rounded-xl bg-space-800 hover:bg-space-700 text-slate-300 text-xs font-mono transition-colors">Cerrar</button>
                    <button onclick="closeProjectModal(); selectServiceAndScroll('${project.title}');" class="px-5 py-2.5 rounded-xl bg-electric-500 hover:bg-electric-600 text-white font-display font-semibold text-xs flex items-center gap-2 shadow-lg shadow-electric-500/20 transition-all">
                        <span>Cotizar algo similar</span>
                        <i class="ph-bold ph-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
    }

    const modal = document.getElementById('project-modal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (modal) {
        const video = modal.querySelector('video');
        if (video) video.pause();
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// ==========================================================================
// 5. COTIZADOR INTERACTIVO & BRIEF PARA WHATSAPP
// ==========================================================================
let selectedCategory = "Desarrollo Web & Sistemas";

function setQuoteCategory(categoryName) {
    selectedCategory = categoryName;
    const buttons = document.querySelectorAll('.quote-cat-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-cat') === categoryName) {
            btn.className = "quote-cat-btn p-4 rounded-2xl border border-electric-500 bg-electric-500/20 text-left transition-all";
        } else {
            btn.className = "quote-cat-btn p-4 rounded-2xl border border-slate-800 bg-space-950/70 hover:border-slate-600 text-left transition-all";
        }
    });
    updateWhatsAppPreview();
}

function selectServiceAndScroll(serviceName) {
    selectedCategory = serviceName;
    updateWhatsAppPreview();
    const cotizadorSection = document.getElementById('cotizador');
    if (cotizadorSection) {
        cotizadorSection.scrollIntoView({ behavior: 'smooth' });
    }
}

function buildBriefText() {
    const nameInput = document.getElementById('quote-name');
    const urgencySelect = document.getElementById('quote-urgency');
    const detailsInput = document.getElementById('quote-details');

    const name = (nameInput && nameInput.value.trim()) || "Cliente interesado";
    const urgency = (urgencySelect && urgencySelect.value) || "Lo antes posible";
    const details = (detailsInput && detailsInput.value.trim()) || "Me gustaría recibir asesoría y cotización.";

    return `Hola Pedro (xDiciTech) 👋, vengo desde tu página web oficial y quiero cotizar un proyecto:\n\n` +
           `• *Cliente / Negocio:* ${name}\n` +
           `• *Área de interés:* ${selectedCategory}\n` +
           `• *Prioridad:* ${urgency}\n` +
           `• *Detalles:* ${details}\n\n` +
           `¿Podemos agendar una breve llamada o conversar por aquí?`;
}

function updateWhatsAppPreview() {
    const previewBox = document.getElementById('whatsapp-preview-box');
    if (previewBox) {
        previewBox.textContent = buildBriefText();
    }
}

function sendQuoteViaWhatsApp() {
    const text = encodeURIComponent(buildBriefText());
    const url = WHATSAPP_PHONE 
        ? `https://wa.me/${WHATSAPP_PHONE}?text=${text}` 
        : `https://api.whatsapp.com/send?text=${text}`;

    RocketLoader.show({
        title: "ENVIANDO COTIZACIÓN A PEDRO CRUZ",
        subtitle: "Estructurando brief aeroespacial y enlazando con WhatsApp...",
        duration: 2400,
        onComplete: () => {
            window.open(url, '_blank');
        }
    });
}

function sendDirectWhatsApp() {
    const msg = encodeURIComponent("Hola Pedro, vi el perfil de xDiciTech y me interesa cotizar un servicio para mi negocio.");
    const url = WHATSAPP_PHONE 
        ? `https://wa.me/${WHATSAPP_PHONE}?text=${msg}` 
        : `https://api.whatsapp.com/send?text=${msg}`;

    RocketLoader.show({
        title: "ENLAZANDO CON PEDRO CRUZ",
        subtitle: "Abriendo canal seguro directo de WhatsApp...",
        duration: 2000,
        onComplete: () => {
            window.open(url, '_blank');
        }
    });
}

function copyBriefToClipboard() {
    const text = buildBriefText();
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    const copyBtnText = document.getElementById('copy-btn-text');
    if (copyBtnText) {
        copyBtnText.textContent = "¡Copiado!";
        setTimeout(() => {
            copyBtnText.textContent = "Copiar texto";
        }, 2000);
    }
}

// ==========================================================================
// 6. MODAL MODO BIO IG (REEMPLAZO DE LINKTREE)
// ==========================================================================
function toggleBioModal(show) {
    const modal = document.getElementById('bio-modal');
    if (!modal) return;
    if (show) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    } else {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// ==========================================================================
// 7. VENTANA DE ESPERA: MOTOR DE CARGA COHETE ESPACIAL (ROCKET LAUNCH LOADER)
// ==========================================================================
const RocketLoader = {
    intervalId: null,

    getOrCreateModal: function() {
        let modal = document.getElementById('rocket-loader-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'rocket-loader-modal';
            modal.className = 'fixed inset-0 z-50 hidden items-center justify-center p-4 bg-space-950/85 backdrop-blur-xl animate-fadeIn';
            modal.innerHTML = `
                <div class="glass-card w-full max-w-md rounded-3xl p-6 sm:p-8 border border-electric-500/40 shadow-2xl relative overflow-hidden text-center">
                    <!-- Botón de Cierre / Abortar -->
                    <button onclick="RocketLoader.hide()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-space-800 hover:bg-space-700 text-slate-300 flex items-center justify-center transition-colors" title="Cerrar ventana de espera">
                        <i class="ph-bold ph-x text-sm"></i>
                    </button>

                    <!-- Cabecera de Telemetría -->
                    <div class="flex items-center justify-center gap-2 mb-3">
                        <span class="w-2 h-2 rounded-full bg-energy-500 animate-ping"></span>
                        <span class="font-mono text-xs uppercase tracking-widest text-energy-400 font-semibold">XDICITECH TELEMETRY • CONTROL DE MISIÓN</span>
                    </div>

                    <!-- Escenario del Cohete Despegando -->
                    <div class="relative w-44 h-52 mx-auto my-2 flex flex-col items-center justify-center overflow-hidden">
                        <!-- Estelas de velocidad hiperespacial -->
                        <div class="speed-stream-line" style="left: 15%; height: 60px; --stream-speed: 0.65s; --stream-delay: 0.1s;"></div>
                        <div class="speed-stream-line" style="left: 30%; height: 90px; --stream-speed: 0.5s; --stream-delay: 0.3s;"></div>
                        <div class="speed-stream-line" style="left: 70%; height: 80px; --stream-speed: 0.55s; --stream-delay: 0s;"></div>
                        <div class="speed-stream-line" style="left: 85%; height: 65px; --stream-speed: 0.7s; --stream-delay: 0.25s;"></div>

                        <!-- Cohete con Vibración de Empuje -->
                        <div class="relative rocket-vibration z-10">
                            <!-- SVG Cohete Espacial Futurista -->
                            <svg viewBox="0 0 100 160" class="w-24 h-36 filter drop-shadow-[0_0_12px_rgba(0,102,255,0.45)]">
                                <!-- Aletas Laterales -->
                                <polygon points="22,118 6,138 24,136" fill="#0052CC" />
                                <polygon points="22,118 10,136 24,134" fill="#3B82F6" />
                                <polygon points="78,118 94,138 76,136" fill="#0052CC" />
                                <polygon points="78,118 90,136 76,134" fill="#3B82F6" />

                                <!-- Fuselaje Principal (Cuerpo SpaceX) -->
                                <path d="M50 12 C34 40, 24 72, 24 130 L76 130 C76 72, 66 40, 50 12 Z" fill="#060E1A" stroke="#0066FF" stroke-width="2.2" />
                                
                                <!-- Franja Aerodinámica Trasera -->
                                <path d="M26 112 L74 112 L76 128 L24 128 Z" fill="#0A1628" />

                                <!-- Franja Decorativa Central -->
                                <path d="M36 60 L64 60 L65 72 L35 72 Z" fill="#0066FF" fill-opacity="0.25" />

                                <!-- Ventana / Porthole con Brillo Neón -->
                                <circle cx="50" cy="52" r="10" fill="#060E1A" stroke="#0066FF" stroke-width="2.5" />
                                <circle cx="50" cy="52" r="6" fill="#00E5FF" opacity="0.85" />
                                <circle cx="48" cy="50" r="2" fill="#FFFFFF" />

                                <!-- Logo xDiciTech en el fuselaje -->
                                <circle cx="50" cy="85" r="4.5" fill="#FF6B00" />
                                <path d="M44 96 L56 96" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" />

                                <!-- Tobera del Motor Raptor -->
                                <polygon points="34,130 66,130 62,142 38,142" fill="#10223E" stroke="#3B82F6" stroke-width="1.5" />

                                <!-- Llamarada / Fuego del Propulsor -->
                                <g class="rocket-flame">
                                    <!-- Llama Exterior Naranja/Roja -->
                                    <path d="M38 142 Q50 190 50 196 Q50 190 62 142 Z" fill="url(#flameGrad)" />
                                </g>
                                <!-- Núcleo de Plasma Cian/Blanco -->
                                <g class="rocket-plasma">
                                    <path d="M43 142 Q50 174 50 178 Q50 174 57 142 Z" fill="url(#plasmaGrad)" />
                                </g>

                                <defs>
                                    <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#FF6B00" />
                                        <stop offset="60%" stop-color="#FF3300" />
                                        <stop offset="100%" stop-color="transparent" />
                                    </linearGradient>
                                    <linearGradient id="plasmaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stop-color="#FFFFFF" />
                                        <stop offset="50%" stop-color="#00E5FF" />
                                        <stop offset="100%" stop-color="#0066FF" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>

                        <!-- Humo de eyección en la base -->
                        <div class="absolute bottom-1 w-28 h-6 bg-gradient-to-t from-electric-500/20 to-transparent blur-md rounded-full smoke-cloud pointer-events-none"></div>
                    </div>

                    <!-- Mensajes de Estado Dinámicos -->
                    <h3 id="rocket-loader-title" class="font-display font-bold text-xl text-white mt-1">
                        INICIANDO SECUENCIA DE DESPEGUE
                    </h3>
                    <p id="rocket-loader-status" class="text-xs font-mono text-electric-400 mt-1 min-h-[34px] flex items-center justify-center">
                        T-00:03 // Calibrando coordenadas y sistemas IoT...
                    </p>

                    <!-- Barra Láser de Progreso de Carga -->
                    <div class="mt-4 space-y-1.5">
                        <div class="w-full h-2.5 bg-space-950 rounded-full border border-electric-500/30 overflow-hidden p-0.5">
                            <div id="rocket-loader-progress" class="h-full w-0 bg-gradient-to-r from-electric-500 via-cyan-400 to-energy-500 rounded-full transition-all duration-100 shadow-[0_0_10px_#0066FF]"></div>
                        </div>
                        <div class="flex items-center justify-between text-[11px] font-mono text-slate-400">
                            <span id="rocket-loader-substatus">PROPULSIÓN: ACTIVA</span>
                            <span id="rocket-loader-pct" class="text-white font-bold">0%</span>
                        </div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
        }
        return modal;
    },

    show: function(options = {}) {
        const title = options.title || "SECUENCIA DE DESPEGUE EN CURSO";
        const customSubtitle = options.subtitle || null;
        const duration = options.duration || 3000;
        const onComplete = options.onComplete || null;

        const modal = this.getOrCreateModal();
        const titleEl = document.getElementById('rocket-loader-title');
        const statusEl = document.getElementById('rocket-loader-status');
        const progressEl = document.getElementById('rocket-loader-progress');
        const pctEl = document.getElementById('rocket-loader-pct');
        const substatusEl = document.getElementById('rocket-loader-substatus');

        if (titleEl) titleEl.textContent = title;
        if (progressEl) progressEl.style.width = '0%';
        if (pctEl) pctEl.textContent = '0%';

        modal.classList.remove('hidden');
        modal.classList.add('flex');

        if (this.intervalId) clearInterval(this.intervalId);

        const startTime = performance.now();
        const stages = [
            { pct: 0, text: customSubtitle || "T-00:03 // Presurizando propulsores de plasma...", sub: "ESTADO: PREPARANDO" },
            { pct: 25, text: "T-00:02 // Ignición secuencial • Empuje al 100%...", sub: "VECTOR: BLOQUEADO" },
            { pct: 55, text: "T-00:01 // Liberando abrazaderas orbitales • Despegue!", sub: "VELOCIDAD: MACH 1.8" },
            { pct: 85, text: "ASCENSO // Rompiendo atmósfera • Telemetría estable...", sub: "VELOCIDAD: MACH 4.2" },
            { pct: 98, text: "ÓRBITA // Vector alcanzado • Conexión establecida!", sub: "MISIÓN: EXITOSA" }
        ];

        this.intervalId = setInterval(() => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPct = Math.round(progress * 100);

            if (progressEl) progressEl.style.width = `${currentPct}%`;
            if (pctEl) pctEl.textContent = `${currentPct}%`;

            for (let i = stages.length - 1; i >= 0; i--) {
                if (currentPct >= stages[i].pct) {
                    if (statusEl) statusEl.textContent = stages[i].text;
                    if (substatusEl) substatusEl.textContent = stages[i].sub;
                    break;
                }
            }

            if (progress >= 1) {
                clearInterval(this.intervalId);
                this.intervalId = null;

                setTimeout(() => {
                    this.hide();
                    if (typeof onComplete === 'function') {
                        onComplete();
                    }
                }, 350);
            }
        }, 50);
    },

    hide: function() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        const modal = document.getElementById('rocket-loader-modal');
        if (modal) {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }
    }
};

// ==========================================================================
// 8. INICIALIZACIÓN DE LA APLICACIÓN
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes interactivos si existen en el DOM actual
    renderPortfolio('all');
    updateWhatsAppPreview();

    // Inicializar efectos visuales y de scroll si el módulo scroll-fx está cargado
    if (typeof window.initWarpStarfield === 'function') {
        window.initWarpStarfield();
    }
    if (typeof window.handleScrollTelemetry === 'function') {
        window.handleScrollTelemetry();
    }
    if (typeof window.observeRevealElements === 'function') {
        window.observeRevealElements();
    }
    if (typeof window.initSpotlightAndTilt === 'function') {
        window.initSpotlightAndTilt();
    }
});

// Exportar funciones a la ventana global para los eventos inline HTML
window.switchHeroTab = switchHeroTab;
window.toggleIotSign = toggleIotSign;
window.simulateTempAlert = simulateTempAlert;
window.simulateVisitorPulse = simulateVisitorPulse;
window.renderPortfolio = renderPortfolio;
window.filterPortfolio = filterPortfolio;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.setQuoteCategory = setQuoteCategory;
window.selectServiceAndScroll = selectServiceAndScroll;
window.updateWhatsAppPreview = updateWhatsAppPreview;
window.sendQuoteViaWhatsApp = sendQuoteViaWhatsApp;
window.sendDirectWhatsApp = sendDirectWhatsApp;
window.copyBriefToClipboard = copyBriefToClipboard;
window.toggleBioModal = toggleBioModal;
window.RocketLoader = RocketLoader;
