/**
 * dashboard-editar-trabajador.js
 * Gestión de previsualización de imagen y envío de datos profesionales.
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-editar-trabajador');
    const fotoInput = document.getElementById('foto-input');
    const imgPreview = document.getElementById('img-preview');

    // 1. Previsualización de Imagen
    fotoInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => imgPreview.src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    // 2. Gestión de campos dinámicos de pago
    const radios = document.querySelectorAll('input[name="tipo_metodo"]');
    const transferFields = document.getElementById('fields-transferencia');

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.value === 'Transferencia') {
                transferFields.style.display = 'block';
            } else {
                transferFields.style.display = 'none';
            }
        });
    });

    // 3. Envío del Formulario (AJAX)
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        try {
            // Referencia al backend según estructura V.3
            const response = await fetch('../../../backend/controladores/actualizar_perfil_trabajador.php', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                alert("¡Perfil actualizado con éxito!");
                window.location.href = 'dashboard-perfil-trabajador.html';
            } else {
                alert("Error: " + result.message);
            }
        } catch (error) {
            console.error("Error en la petición:", error);
            alert("No se pudo conectar con el servidor.");
        }
    });
});
