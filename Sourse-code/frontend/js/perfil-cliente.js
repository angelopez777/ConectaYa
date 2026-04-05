/**
 * PROYECTO: ConectaYa
 * ARCHIVO: /frontend/js/perfil-cliente.js
 * ESTÉTICA: Dark Premium (#a855f7)
 */

document.addEventListener('DOMContentLoaded', () => {
    const formPerfil = document.getElementById('perfilForm');
    const inputFoto = document.getElementById('foto-input');
    const previewImg = document.getElementById('img-preview');
    const placeholder = document.getElementById('icon-placeholder');
    const btnVolver = document.getElementById('btn-volver-dinamico');

    // 1. VISTA PREVIA DE LA FOTO
    if (inputFoto) {
        inputFoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    previewImg.src = e.target.result;
                    previewImg.style.display = 'block';
                    if (placeholder) placeholder.style.display = 'none';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // 2. ENVÍO AJAX
    if (formPerfil) {
        formPerfil.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(formPerfil);

            try {
                const response = await fetch('../../backend/registro/procesar-perfil-cliente.php', {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Redirección al siguiente paso: Métodos de Pago
                    window.location.href = "metodo-pago.html";
                } else {
                    alert("Atención: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }

    // 3. VOLVER
    if (btnVolver) {
        btnVolver.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = "registro-paso2.html";
        });
    }

    // 4. ESTÉTICA NEÓN
    const inputs = document.querySelectorAll('.input-wrapper input');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.style.borderColor = '#a855f7';
            input.parentElement.style.boxShadow = '0 0 10px rgba(168, 85, 247, 0.3)';
        });
        input.addEventListener('blur', () => {
            input.parentElement.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            input.parentElement.style.boxShadow = 'none';
        });
    });
});