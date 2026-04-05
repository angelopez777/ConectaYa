/**
 * PROYECTO: ConectaYa
 * RUTA: /frontend/js/chat-servicio.js
 */

const enviarMensaje = async (idSolicitud, texto) => {
    const formData = new FormData();
    formData.append('id_solicitud', idSolicitud);
    formData.append('contenido', texto);

    try {
        const resp = await fetch('../../../backend/enviar-mensaje.php', {
            method: 'POST',
            body: formData
        });
        const data = await resp.json();
        
        if (data.status === 'success') {
            document.getElementById('input-chat').value = '';
            actualizarBurbujas(); // Función para refrescar el chat
        }
    } catch (error) {
        console.error("Error al enviar:", error);
    }
};

const programarCita = async (idSolicitud, idCliente, fecha) => {
    const formData = new FormData();
    formData.append('id_solicitud', idSolicitud);
    formData.append('id_cliente', idCliente);
    formData.append('fecha_encuentro', fecha);

    const resp = await fetch('../../../backend/agendar-servicio.php', {
        method: 'POST',
        body: formData
    });
    const data = await resp.json();

    if (data.status === 'success') {
        alert("¡Cita agendada y notificada!");
        window.location.reload();
    }
};