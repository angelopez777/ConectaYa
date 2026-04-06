/**
 * mensajes-trabajador.js
 * Control de flujos de mensajería desde la perspectiva del Trabajador.
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarChatTrabajador();
});

function inicializarChatTrabajador() {
    console.log("Cargando sistema de mensajería profesional...");
    cargarContactosClientes();

    const form = document.getElementById('form-mensaje');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        enviarRespuestaTrabajador();
    });

    // Listener para adjuntar fotos de evidencia/trabajo
    document.getElementById('btn-foto').addEventListener('click', () => {
        document.getElementById('input-foto').click();
    });
}

/**
 * Obtiene los clientes que han contactado a este trabajador
 */
async function cargarContactosClientes() {
    try {
        const response = await fetch('../../../backend/controladores/listar_chats_trabajador.php');
        const data = await response.json();

        const contenedor = document.getElementById('lista-chats');
        contenedor.innerHTML = '';

        if (data.success && data.chats.length > 0) {
            data.chats.forEach(chat => {
                const item = document.createElement('div');
                item.className = 'contact-item';
                item.innerHTML = `
                    <div class="contact-avatar">
                        <img src="../../../img/perfiles/${chat.foto_cliente}" alt="Avatar">
                    </div>
                    <div class="contact-details">
                        <span class="contact-name">${chat.nombre_cliente}</span>
                        <span class="service-tag">${chat.titulo_servicio}</span>
                    </div>
                `;
                item.onclick = () => seleccionarConversacion(chat.id_solicitud, chat.nombre_cliente);
                contenedor.appendChild(item);
            });
        } else {
            contenedor.innerHTML = '<div class="status-msg">No hay solicitudes de clientes aún.</div>';
        }
    } catch (error) {
        console.error("Error al cargar chats:", error);
    }
}

async function seleccionarConversacion(idSolicitud, nombreCliente) {
    document.getElementById('id_solicitud_actual').value = idSolicitud;
    document.getElementById('chat-receptor-nombre').textContent = nombreCliente;
    document.getElementById('input-contenido').disabled = false;
    document.getElementById('btn-enviar').disabled = false;
    
    cargarMensajes(idSolicitud);
}

// Nota: La función cargarMensajes y enviarRespuestaTrabajador deben 
// consumir los endpoints de mensajes.php enviando el id_solicitud correspondiente.
