/**
 * notificaciones-trabajador.js
 * Gestión de alertas para el flujo de trabajo profesional
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchNotificaciones();
    
    // Listener para marcar todas como leídas
    document.getElementById('marcar-leidas').addEventListener('click', marcarTodoLeido);
});

/**
 * Consulta las notificaciones desde el backend filtradas por id_usuario (Trabajador)
 */
async function fetchNotificaciones() {
    try {
        const response = await fetch('../../../backend/controladores/notificaciones.php?accion=listar');
        const data = await response.json();

        const contenedor = document.getElementById('lista-notificaciones');
        
        if (data.success && data.notificaciones.length > 0) {
            contenedor.innerHTML = ''; // Limpiar estado vacío
            
            data.notificaciones.forEach(notif => {
                const card = document.createElement('div');
                card.className = `notification-card ${notif.leida == 0 ? 'unread' : ''}`;
                
                // Determinar icono según tipo de notificación
                let iconClass = 'fa-bell';
                if(notif.tipo === 'pago') iconClass = 'fa-wallet';
                if(notif.tipo === 'solicitud') iconClass = 'fa-file-signature';
                if(notif.tipo === 'mensaje') iconClass = 'fa-comment-dots';

                card.innerHTML = `
                    <div class="notif-icon">
                        <i class="fas ${iconClass}"></i>
                    </div>
                    <div class="notif-content">
                        <strong class="notif-title">${notif.titulo}</strong>
                        <p class="notif-desc">${notif.mensaje}</p>
                    </div>
                    <span class="notif-time">${notif.hace_cuanto}</span>
                `;
                
                card.onclick = () => verDetalleNotificacion(notif.id_notificacion, notif.enlace);
                contenedor.appendChild(card);
            });
        }
    } catch (error) {
        console.error("Error al obtener notificaciones:", error);
    }
}

/**
 * Marca una notificación como leída y redirige si tiene un enlace
 */
async function verDetalleNotificacion(id, url) {
    await fetch('../../../backend/controladores/notificaciones.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'marcar_una', id: id })
    });
    
    if(url) window.location.href = url;
    else fetchNotificaciones(); // Refrescar lista
}

async function marcarTodoLeido() {
    const res = await fetch('../../../backend/controladores/notificaciones.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ accion: 'marcar_todo' })
    });
    
    const data = await res.json();
    if(data.success) fetchNotificaciones();
}
