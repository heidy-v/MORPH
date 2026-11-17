// Inicializar íconos Lucide
lucide.createIcons();

const themeToggleBtn = document.getElementById('theme-toggle');
const menuToggleBtn = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');
const body = document.body;

// 1. MODO OSCURO / CLARO
function updateThemeIcon() {
    const isDark = body.classList.contains('dark-mode');
    themeToggleBtn.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';
    lucide.createIcons();
}

const savedTheme = localStorage.getItem('morph-theme');
if (savedTheme === 'light') {
    body.classList.remove('dark-mode');
}
updateThemeIcon();

themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('morph-theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

// 2. MENÚ MÓVIL
menuToggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// 3. CAMBIO DE SECCIONES (Oculta las demás y muestra solo la elegida)
const triggers = document.querySelectorAll('.nav-trigger');
const sections = document.querySelectorAll('.tab-section');
const menuItems = document.querySelectorAll('.nav-links a');

triggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = trigger.getAttribute('data-target');

        // Ocultar todas las secciones
        sections.forEach(sec => sec.classList.remove('active'));

        // Mostrar solo la sección seleccionada
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Actualizar enlace activo en el menú
        menuItems.forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active-link');
            }
        });

        // Cerrar menú móvil si estaba abierto
        navLinks.classList.remove('open');
    });
});

// 4. CARRUSEL DE 4 PROYECTOS
const track = document.getElementById('carousel-track');
const prevBtn = document.getElementById('prev-project');
const nextBtn = document.getElementById('next-project');
let currentIndex = 0;

function updateCarousel() {
    const cards = document.querySelectorAll('.project-card');
    const isMobile = window.innerWidth <= 900;
    const visibleCards = isMobile ? 1 : 2;
    const maxIndex = cards.length - visibleCards;

    if (currentIndex < 0) currentIndex = maxIndex;
    if (currentIndex > maxIndex) currentIndex = 0;

    const cardWidth = cards[0].offsetWidth + 24; // ancho + gap
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex++;
    updateCarousel();
});

prevBtn.addEventListener('click', () => {
    currentIndex--;
    updateCarousel();
});

window.addEventListener('resize', updateCarousel);