/**
 * LÓGICA: perfil-cliente.js
 * Función: Previsualización de imagen de perfil en tiempo real.
 */

document.addEventListener('DOMContentLoaded', () => {
    const inputFoto = document.getElementById('foto-input');
    const vistaPrevia = document.getElementById('img-preview');
    const iconoGris = document.getElementById('icon-placeholder');

    inputFoto.addEventListener('change', function() {
        const archivo = this.files[0];

        if (archivo) {
            const lector = new FileReader();

            lector.onload = function(e) {
                // Actualiza la imagen y cambia la visibilidad
                vistaPrevia.src = e.target.result;
                vistaPrevia.style.display = 'block';
                iconoGris.style.display = 'none';
            }

            lector.readAsDataURL(archivo);
        }
    });
});