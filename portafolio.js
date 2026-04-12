// Menú móvil
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// Funcionalidad de pop-ups y carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Obtener todos los elementos de tarjeta de proyecto
    const projectCards = document.querySelectorAll('.project-card');
    
    // Obtener todos los pop-ups
    const projectPopups = document.querySelectorAll('.project-popup');
    
    // Obtener todos los botones de cierre
    const closeButtons = document.querySelectorAll('.popup-close');
    
    // Añadir evento de clic a cada tarjeta de proyecto
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden';
                
                // Reiniciar carrusel al abrir pop-up
                const carousel = popup.querySelector('.carousel-track');
                const slides = carousel.querySelectorAll('.carousel-item');
                const dots = popup.querySelectorAll('.dot');
                
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                if (slides[0]) slides[0].classList.add('active');
                if (dots[0]) dots[0].classList.add('active');
            }
        });
    });
    
    // Añadir evento de clic a cada botón de cierre
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const popup = this.closest('.project-popup');
            if (popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Cerrar pop-up al hacer clic fuera del contenido
    projectPopups.forEach(popup => {
        popup.addEventListener('click', function(e) {
            if (e.target === this) {
                this.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Cerrar pop-up con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            projectPopups.forEach(popup => {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
    });
    
    // Funcionalidad del carrusel
    document.addEventListener('click', function(e) {
        // Botones anterior/siguiente
        if (e.target.classList.contains('prev-btn') || e.target.classList.contains('next-btn')) {
            const carousel = e.target.closest('.project-carousel');
            const direction = e.target.classList.contains('prev-btn') ? -1 : 1;
            changeProjectSlide(carousel, direction);
        }
        
        // Puntos del carrusel
        if (e.target.classList.contains('dot')) {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            const carousel = e.target.closest('.project-carousel');
            showProjectSlide(carousel, slideIndex);
        }
    });
});

function changeProjectSlide(carousel, direction) {
    const slides = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    let activeIndex = -1;
    
    // Encontrar slide activo actual
    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            activeIndex = index;
        }
    });
    
    if (activeIndex === -1) return;
    
    // Calcular nuevo índice
    let newIndex = activeIndex + direction;
    if (newIndex < 0) newIndex = slides.length - 1;
    if (newIndex >= slides.length) newIndex = 0;
    
    // Cambiar slide
    slides[activeIndex].classList.remove('active');
    dots[activeIndex].classList.remove('active');
    
    slides[newIndex].classList.add('active');
    dots[newIndex].classList.add('active');
}

function showProjectSlide(carousel, slideIndex) {
    const slides = carousel.querySelectorAll('.carousel-item');
    const dots = carousel.querySelectorAll('.dot');
    
    // Remover clase active de todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Agregar clase active al slide y punto seleccionado
    if (slides[slideIndex]) slides[slideIndex].classList.add('active');
    if (dots[slideIndex]) dots[slideIndex].classList.add('active');
}