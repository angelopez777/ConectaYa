/**
 * PROYECTO: ConectaYa
 * MODULO: dashboard-editar-cliente.js
 * PROTOCOLO: Escritura desde cero - Elite
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-editar-usuario');
    const inputFoto = document.getElementById('foto-input');
    const imgPreview = document.getElementById('img-preview');
    const paymentRadios = document.querySelectorAll('input[name="tipo_metodo"]');

    // Control de paneles dinámicos
    const gestionarPaneles = (metodo) => {
        const pTarjeta = document.getElementById('fields-tarjeta');
        const pTransferencia = document.getElementById('fields-transferencia');
        
        pTarjeta.classList.remove('active');
        pTransferencia.classList.remove('active');

        if (metodo === 'Tarjeta') pTarjeta.classList.add('active');
        else if (metodo === 'Transferencia') pTransferencia.classList.add('active');
    };

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => gestionarPaneles(e.target.value));
    });

    // Envío de formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const fd = new FormData(form);
        const metodoActivo = document.querySelector('input[name="tipo_metodo"]:checked')?.value;

        // CRÍTICO: Unificar campos de Transferencia para el Backend
        if (metodoActivo === 'Transferencia') {
            const banco = document.getElementsByName('banco_nombre')[0].value;
            const cuenta = document.getElementsByName('numero_transferencia')[0].value;
            fd.set('proveedor', banco);
            fd.set('numero_cuenta', cuenta);
        }

        try {
            // Ruta corregida para 3 niveles de profundidad
            const res = await fetch('../../../backend/perfil/actualizar-perfil.php', { 
                method: 'POST', 
                body: fd 
            });

            const text = await res.text(); // Captura posible basura del servidor
            
            try {
                const result = JSON.parse(text);
                if (result.success) {
                    window.location.href = 'dashboard-perfil-cliente.html';
                } else {
                    alert("Error del servidor: " + result.message);
                }
            } catch (jsonErr) {
                console.error("Respuesta no es JSON:", text);
                alert("Error de formato: El servidor envió una respuesta inválida.");
            }

        } catch (err) {
            console.error("Error de conexión:", err);
            alert("No se pudo conectar con el servidor.");
        }
    });

    // Lógica de carga inicial (Mantén tu función cargarPerfil aquí abajo)
});