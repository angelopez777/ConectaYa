// js/verificacion.js

document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('.code-inputs input');

    inputs.forEach((input, index) => {
        // Escucha cuando el usuario escribe
        input.addEventListener('input', (e) => {
            const value = e.target.value;

            // Si se ingresó un número, pasar al siguiente
            if (value && index < inputs.length - 1) {
                inputs[index + 1].focus();
            }
        });

        // Escucha cuando se presiona una tecla (para borrar)
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace' && !input.value && index > 0) {
                // Si borra y el campo está vacío, vuelve al anterior
                inputs[index - 1].focus();
            }
        });
    });
});