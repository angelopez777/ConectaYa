/**
 * PROYECTO: ConectaYa | ARCHIVO: dashboard-cliente.js
 * OBJETIVO: Cargar datos reales y mantener la UI sincronizada.
 * REGLA DE ORO: Reescribir desde cero.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Función principal para obtener datos desde el backend
     */
    const fetchUserData = async () => {
        // Sincronizado con la estructura del proyecto y cache preventivo
        const url = `../../../backend/perfil/obtener-perfil.php?v=${Date.now()}`;
        
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error("Error en la petición al servidor");

            const data = await response.json();

            if (data.success) {
                // 1. Inyectar Nombre en el saludo (Solo el primer nombre)
                const nameSpan = document.getElementById('user-name');
                if (nameSpan && data.nombre) {
                    nameSpan.textContent = data.nombre.split(' ')[0];
                }

                // 2. Actualizar Contadores de Estadísticas
                const solicitudesVal = document.getElementById('solicitudes-val');
                const ratingVal = document.getElementById('rating-val');

                if (solicitudesVal) {
                    solicitudesVal.textContent = data.total_solicitudes || 0;
                }
                if (ratingVal) {
                    ratingVal.textContent = data.calificacion_promedio || "0.0";
                }

                // 3. Actualizar Badge de Mensajes
                const msgBadge = document.getElementById('msg-badge');
                if (msgBadge) {
                    const nuevosMsgs = data.mensajes_nuevos || 0;
                    msgBadge.textContent = nuevosMsgs;
                    // Solo mostrar el badge si hay mensajes reales
                    msgBadge.style.display = (nuevosMsgs > 0) ? 'block' : 'none';
                }

                // 4. Lógica de Avisos: Si no hay dirección, mostrar la alerta
                const avisoDireccion = document.querySelector('.info-alert');
                if (avisoDireccion) {
                    if (data.direccion && data.direccion !== "") {
                        // Si ya tiene dirección, ocultamos el contenedor del aviso
                        avisoDireccion.parentElement.style.display = 'none';
                    }
                }
            }

        } catch (error) {
            console.error("Error crítico al cargar el dashboard:", error);
            // Fallback para mantener consistencia visual
            const nameSpan = document.getElementById('user-name');
            if (nameSpan) nameSpan.textContent = "Usuario";
        }
    };

    // Ejecutar la carga inicial
    fetchUserData();

    // Listener opcional para el botón de "Cambiar a Trabajador"
    const btnRole = document.querySelector('.btn-role');
    if (btnRole) {
        btnRole.addEventListener('click', () => {
            alert("Cambiando modo de vista... (Función en desarrollo)");
        });
    }
});