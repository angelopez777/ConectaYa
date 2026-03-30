// /conectaya/frontend/js/script.js

/**
 * Lógica para el efecto de texto rotativo (typing effect)
 * en la página de inicio de ConectaYa.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const typingSpan = document.getElementById('typing');
    
    // Array de oficios que cambiarán dinámicamente
    const oficios = [
        "Técnicos...",
        "Limpiadores...",
        "Plomeros...",
        "Electricistas...",
        "Mecánicos...",
        "Expertos..."
    ];
    
    let oficioIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 150; // Velocidad de escritura

    /**
     * Función principal que maneja el efecto de escritura y borrado.
     */
    function typeEffect() {
        const currentOficio = oficios[oficioIndex];
        
        if (isDeleting) {
            // Borrando texto
            typingSpan.textContent = currentOficio.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 75; // Velocidad de borrado más rápida
        } else {
            // Escribiendo texto
            typingSpan.textContent = currentOficio.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Velocidad de escritura normal
        }

        if (!isDeleting && charIndex === currentOficio.length) {
            // Se ha terminado de escribir el oficio, pausar antes de borrar
            isDeleting = true;
            typeSpeed = 2000; // Pausa de 2 segundos al final
        } else if (isDeleting && charIndex === 0) {
            // Se ha terminado de borrar, pasar al siguiente oficio
            isDeleting = false;
            oficioIndex = (oficioIndex + 1) % oficios.length;
            typeSpeed = 500; // Pequeña pausa antes de empezar a escribir el siguiente
        }

        // Ejecutar la función recursivamente con el retraso calculado
        setTimeout(typeEffect, typeSpeed);
    }

    // Iniciar el efecto
    typeEffect();
});