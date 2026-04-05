/**
 * PROYECTO: ConectaYa
 * RUTA: /frontend/js/dashboard-cliente.js
 * OBJETIVO: Cargar datos reales desde obtener-datos-dashboard.php
 */

document.addEventListener('DOMContentLoaded', () => {
    
    const cargarDatosUsuario = async () => {
        try {
            // Llamada al backend (usando la ruta corregida de 3 niveles)
            const response = await fetch('../../../backend/obtener-datos-dashboard.php');
            
            if (!response.ok) {
                console.error("Error 404: No se encontró el archivo PHP de datos");
                return;
            }

            const data = await response.json();

            // 1. Inyectar el nombre dinámico en el saludo
            const nameDisplay = document.getElementById('user-name');
            if (data.nombre && nameDisplay) {
                // Tomamos el primer nombre para un estilo más amigable
                const primerNombre = data.nombre.split(' ')[0];
                nameDisplay.textContent = primerNombre;
            }

            // 2. Actualizar contadores de estadísticas
            const solElem = document.getElementById('solicitudes-val');
            const rateElem = document.getElementById('rating-val');
            
            if (solElem) solElem.textContent = data.solicitudes || 0;
            if (rateElem) rateElem.textContent = data.calificacion || "0.0";

            // 3. Actualizar badge de mensajes en el sidebar
            const msgBadge = document.getElementById('msg-badge');
            if (msgBadge) {
                msgBadge.textContent = data.mensajes_nuevos || 0;
                msgBadge.style.display = (data.mensajes_nuevos > 0) ? 'block' : 'none';
            }

        } catch (error) {
            console.error("Fallo crítico en la carga del Dashboard:", error);
            const nameDisplay = document.getElementById('user-name');
            if (nameDisplay) nameDisplay.textContent = "Usuario";
        }
    };

    // Ejecutar la carga al iniciar
    cargarDatosUsuario();
});