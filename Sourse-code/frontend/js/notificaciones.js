/**
 * PROYECTO: ConectaYa
 * FUNCIONALIDAD: Gestión de Notificaciones (Cliente)
 */

document.addEventListener('DOMContentLoaded', () => {
    cargarNotificaciones();

    document.getElementById('marcar-leidas').addEventListener('click', () => {
        console.log("Marcando todas como leídas...");
        // Lógica futura para actualizar base de datos
    });
});

async function cargarNotificaciones() {
    const contenedor = document.getElementById('lista-notificaciones');
    const vacio = document.getElementById('empty-notifications');

    // Simulación de datos (Placeholder)
    const notificaciones = []; 

    if (notificaciones.length === 0) {
        vacio.style.display = 'flex';
    } else {
        vacio.style.display = 'none';
        // Lógica futura para renderizar items
    }
}