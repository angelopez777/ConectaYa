/**
 * Lógica de frontend para Editar Perfil
 * Mantiene compatibilidad total con actualizar-perfil.php
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('form-editar-usuario');
    const inputFoto = document.getElementById('foto-input');
    const imgPreview = document.getElementById('img-preview');
    const paymentRadios = document.querySelectorAll('input[name="tipo_metodo"]');

    // Cambiar visibilidad de campos de pago
    const togglePaymentFields = (metodo) => {
        const divTarjeta = document.getElementById('fields-tarjeta');
        const divTransfe = document.getElementById('fields-transferencia');

        divTarjeta.classList.remove('active');
        divTransfe.classList.remove('active');

        if (metodo === 'Tarjeta') divTarjeta.classList.add('active');
        if (metodo === 'Transferencia') divTransfe.classList.add('active');
    };

    paymentRadios.forEach(radio => {
        radio.addEventListener('change', (e) => togglePaymentFields(e.target.value));
    });

    // Vista previa de imagen
    inputFoto.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => imgPreview.src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    // Envío de datos
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        
        // Mapeo manual para compatibilidad con el backend (actualizar-perfil.php)
        const metodo = document.querySelector('input[name="tipo_metodo"]:checked')?.value;
        if (metodo === 'Transferencia') {
            fd.set('proveedor', document.getElementsByName('banco_nombre')[0].value);
            fd.set('numero_cuenta', document.getElementsByName('numero_transferencia')[0].value);
        }

        try {
            const res = await fetch('../../../backend/perfil/actualizar-perfil.php', {
                method: 'POST',
                body: fd
            });
            const data = await res.json();

            if (data.success) {
                window.location.href = 'dashboard-perfil-cliente.html';
            } else {
                alert("Error al actualizar: " + data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error crítico en la comunicación con el servidor.");
        }
    });
});