document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-perfil-trabajador');
    const inputPhoto = document.getElementById('upload-photo');
    const imgPreview = document.getElementById('img-preview');

    // Vista previa de la foto
    if (inputPhoto) {
        inputPhoto.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imgPreview.src = e.target.result;
                    imgPreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // Envío del formulario
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);

            try {
                const response = await fetch('../../backend/registro/procesar-perfil-trabajador.php', {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (result.success) {
                    window.location.href = result.redirect;
                } else {
                    alert("Error: " + result.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }
});