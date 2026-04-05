/**
 * PROYECTO: ConectaYa
 * MODULO: Gestión de Selección y Registro de Pago
 * REGLA: Escritura desde cero, navegación basada en historial.
 * ESTÉTICA: Dark Premium (#a855f7)
 */

document.addEventListener('DOMContentLoaded', () => {
    const methodBoxes = document.querySelectorAll('.method-box');
    const inputMetodo = document.getElementById('metodo_seleccionado');
    const formPago = document.getElementById('form-pago');
    const btnVolver = document.getElementById('btn-volver-dinamico');

    // 1. NAVEGACIÓN INTELIGENTE (Solución al problema de 'Volver')
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            // Esto regresa al usuario a la página exacta de donde vino
            // (Ya sea perfil-cliente o perfil-trabajador)
            window.history.back();
        });
    }

    // 2. SELECCIÓN VISUAL NEÓN
    methodBoxes.forEach(box => {
        box.addEventListener('click', () => {
            // Limpiar estados previos
            methodBoxes.forEach(b => {
                b.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                b.style.boxShadow = 'none';
                b.classList.remove('active');
            });
            
            // Aplicar estilo activo neón morado
            box.classList.add('active');
            box.style.borderColor = '#a855f7';
            box.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.4)';
            
            const valor = box.getAttribute('data-value');
            inputMetodo.value = valor;
        });
    });

    // 3. ENVÍO AJAX AL BACKEND
    if (formPago) {
        formPago.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!inputMetodo.value) {
                alert("Por favor, selecciona un método de pago (Transferencia o Tarjeta).");
                return;
            }

            const formData = new FormData(formPago);

            try {
                const response = await fetch('../../backend/registro/procesar-pago.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    window.location.href = data.redirect;
                } else {
                    alert("Atención: " + data.message);
                }

            } catch (error) {
                console.error("Error técnico:", error);
                alert("Hubo un problema al procesar el pago. Revisa la consola.");
            }
        });
    }

    // 4. EFECTO FOCO EN INPUTS (Estética Premium)
    const inputs = document.querySelectorAll('input[type="text"]');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.style.borderColor = '#a855f7';
            input.style.boxShadow = '0 0 8px rgba(168, 85, 247, 0.3)';
        });
        input.addEventListener('blur', () => {
            input.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            input.style.boxShadow = 'none';
        });
    });
});