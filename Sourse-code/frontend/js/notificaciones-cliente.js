/**
 * PROYECTO: ConectaYa
 * LÓGICA: Renderizado automático de notificaciones estilo Píldora
 */

document.addEventListener('DOMContentLoaded', () => {
    // Llamamos a la función de carga inmediatamente al entrar
    obtenerNotificaciones();
});

async function obtenerNotificaciones() {
    const contenedor = document.getElementById('lista-notificaciones');
    if(!contenedor) return;

    try {
        // Ruta corregida para subir desde dashboards hasta backend
        const response = await fetch('../../../backend/notificaciones/obtener-notificaciones.php');
        const data = await response.json();

        if (data.success && data.notificaciones.length > 0) {
            contenedor.innerHTML = '';
            data.notificaciones.forEach(noti => {
                const pill = document.createElement('div');
                pill.className = `notif-pill-premium ${noti.leido == 0 ? 'active-neon' : ''}`;
                
                pill.innerHTML = `
                    <div class="pill-left">
                        <div class="icon-circle">
                            <i class="fas fa-bell"></i>
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
            contenedor.innerHTML = '<div class="empty-state-pill">No hay avisos nuevos.</div>';
        }
    } catch (error) {
        console.error("Error de sincronización:", error);
    }
}