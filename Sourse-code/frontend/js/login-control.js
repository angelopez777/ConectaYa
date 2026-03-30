/**
 * PROYECTO: CONECTAYA
 * ARCHIVO: login-control.js
 * UBICACIÓN: backend/js/
 * DESCRIPCIÓN: Controla la interfaz del login basándose en la respuesta del PHP.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Manejo de errores devueltos por PHP en la URL
    const urlParams = new URLSearchParams(window.location.search);
    const errorDiv = document.getElementById('mensaje-error');

    if (urlParams.has('error')) {
        const errorCode = urlParams.get('error');
        
        // Muestra el div y añade la clase active
        errorDiv.classList.add('active');

        if (errorCode === '1') {
            errorDiv.textContent = "⚠️ Correo o contraseña incorrectos.";
        } else if (errorCode === 'sesion') {
            errorDiv.textContent = "⚠️ Por favor, inicia sesión para continuar.";
        } else {
            errorDiv.textContent = "⚠️ Ocurrió un error inesperado.";
        }
    }

    // 2. Efecto visual de carga al enviar el formulario
    const loginForm = document.getElementById('form-login');
    const submitBtn = document.querySelector('.btn-principal');

    loginForm.addEventListener('submit', () => {
        // Añade la clase loading definida en el CSS
        submitBtn.classList.add('loading');
        submitBtn.disabled = true; // Previene doble envío
    });
});