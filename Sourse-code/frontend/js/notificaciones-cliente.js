/**
 * PROYECTO: ConectaYa
 * LÓGICA: Fetch optimizado para hosting (Evita Error 404)
 */

document.addEventListener('DOMContentLoaded', () => {
    obtenerNotificaciones();
});

async function obtenerNotificaciones() {
    const contenedor = document.getElementById('lista-notificaciones');
    if(!contenedor) return;

    try {
        // Usamos ruta desde la raíz para que funcione en cualquier dashboard
        const response = await fetch('/backend/notificaciones/obtener-notificaciones.php');
        
        if (!response.ok) {
            throw new Error(`Error en el servidor: ${response.status}`);
        }

        const data = await response.json();
        contenedor.innerHTML = '';

        if (data.success && data.notificaciones.length > 0) {
            data.notificaciones.forEach(noti => {
                const pill = document.createElement('div');
                // Aplicamos tu clase active-neon si no ha sido leída
                pill.className = `notif-pill-premium ${noti.leido == 0 ? 'active-neon' : ''}`;
                
                pill.innerHTML = `
                    <div class="pill-left">
                        <div class="icon-circle">
                            <i class="fas fa-bolt"></i>
                        </div>
                        <div class="pill-info">
                            <h4>${noti.titulo}</h4>
                            <p>${noti.mensaje}</p>
                        </div>
                    </div>
                    <span class="pill-date">${new Date(noti.fecha_creacion).toLocaleDateString()}</span>
                `;
                contenedor.appendChild(pill);
            });
        } else {
            contenedor.innerHTML = '<div class="empty-state-pill">No hay avisos nuevos por ahora.</div>';
        }
    } catch (error) {
        console.error("Error de sincronización:", error);
        contenedor.innerHTML = '<div class="error-neon-msg">Error de conexión con el centro de alertas.</div>';
    }
}