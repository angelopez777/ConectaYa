document.addEventListener('DOMContentLoaded', () => {
    const formPaso2 = document.getElementById('form-paso2');

    if (formPaso2) {
        formPaso2.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(formPaso2);
            const rol = formData.get('tipo_usuario');

            try {
                const response = await fetch(formPaso2.action, {
                    method: 'POST',
                    body: formData
                });

                const data = await response.json();

                if (data.success) {
                    // Redirección limpia a perfil-cliente o perfil-trabajador
                    window.location.href = `perfil-${rol}.html`;
                } else {
                    alert(data.message || "Error al procesar el rol");
                }
            } catch (error) {
                console.error("Error:", error);
                alert("Hubo un problema de conexión.");
            }
        });
    }
});