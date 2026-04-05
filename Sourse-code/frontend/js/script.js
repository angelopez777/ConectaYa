/**
 * PROYECTO: ConectaYa
 * MODULO: Lógica de Interfaz Principal
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EFECTO DE ESCRITURA (TYPING EFFECT) ---
    const typingSpan = document.getElementById('typing');
    const oficios = ["Técnicos...", "Limpiadores...", "Plomeros...", "Electricistas...", "Expertos..."];
    
    let oficioIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150;

    function typeEffect() {
        const currentOficio = oficios[oficioIndex];
        
        if (isDeleting) {
            typingSpan.textContent = currentOficio.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 70;
        } else {
            typingSpan.textContent = currentOficio.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150;
        }

        if (!isDeleting && charIndex === currentOficio.length) {
            isDeleting = true;
            typeSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            oficioIndex = (oficioIndex + 1) % oficios.length;
            typeSpeed = 500;
        }
        setTimeout(typeEffect, typeSpeed);
    }
    typeEffect();

    // --- 2. LÓGICA DEL MODAL DE BÚSQUEDA ---
    const searchForm = document.getElementById('main-search-form');
    const modal = document.getElementById('modal-auth');
    const btnAceptar = document.getElementById('btn-aceptar-modal');

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene el envío real
            modal.style.display = 'flex'; // Muestra el modal premium
        });
    }

    if (btnAceptar) {
        btnAceptar.addEventListener('click', () => {
            // Redirección directa al login tras aceptar
            window.location.href = 'html/login.html';
        });
    }

    // Cerrar si hacen clic fuera del cuadro blanco
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});