/**
 * Control de Registro Paso 1 - ConectaYa
 * Maneja: Redirección, Fetch y Visibilidad de Contraseña.
 */
document.addEventListener('DOMContentLoaded', () => {
    const formRegistro = document.getElementById('form-registro');
    const toggleEyes = document.querySelectorAll('.toggle-eye');

    /* --- LÓGICA DE VISIBILIDAD (EL OJO) --- */
    toggleEyes.forEach(eye => {
        eye.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            
            if (input.type === "password") {
                input.type = "text";
                this.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = "password";
                this.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });

    /* --- LÓGICA DE ENVÍO Y REDIRECCIÓN --- */
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault(); 

            const formData = new FormData(formRegistro);

            // Validación de contraseñas
            if (formData.get('password') !== formData.get('confirm_password')) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            try {
                const response = await fetch(formRegistro.action, {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) throw new Error("Error en el servidor");

                const data = await response.json();

                if (data.success) {
                    // Manda directo al archivo registro-paso2.html
                    window.location.href = 'registro-paso2.html';
                } else {
                    alert("Atención: " + data.message);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudo conectar con el servidor.");
            }
        });
    }
});