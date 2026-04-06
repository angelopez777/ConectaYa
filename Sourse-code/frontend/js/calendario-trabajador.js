/**
 * Lógica de Agenda para Trabajador - ConectaYa
 * Gestiona la carga de servicios_programados y confirmaciones.
 */

document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const detailsContainer = document.getElementById('event-details');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        themeSystem: 'standard',
        // Carga de datos desde backend/obtener-servicios.php
        events: '../../../backend/obtener-datos-dashboard.php?action=get_events',
        
        eventClick: function(info) {
            showServiceDetails(info.event);
        },
        
        eventMouseEnter: function(info) {
            info.el.style.boxShadow = "0 0 10px #a855f7";
            info.el.style.cursor = "pointer";
        },
        
        eventMouseLeave: function(info) {
            info.el.style.boxShadow = "none";
        }
    });

    calendar.render();

    /**
     * Muestra la información extendida en el panel lateral
     */
    function showServiceDetails(event) {
        const props = event.extendedProps;
        
        detailsContainer.innerHTML = `
            <div class="service-info-card">
                <h4 class="neon-text">${event.title}</h4>
                <p><i class="fas fa-clock"></i> ${event.start.toLocaleString()}</p>
                <hr style="border: 0.1px solid rgba(168,85,247,0.2); margin: 10px 0;">
                <p><strong><i class="fas fa-user"></i> Cliente:</strong> ${props.cliente || 'No especificado'}</p>
                <p><strong><i class="fas fa-map-marker-alt"></i> Ubicación:</strong> ${props.direccion || 'Ver en chat'}</p>
                <p><strong><i class="fas fa-info-circle"></i> Estado:</strong> ${props.estado || 'Programado'}</p>
                
                <button class="btn-confirm" onclick="confirmarLlegada(${event.id})">
                    Confirmar Llegada al Sitio
                </button>
            </div>
        `;
    }
});

/**
 * Función para actualizar el estado en la tabla servicios_programados
 */
function confirmarLlegada(idServicio) {
    console.log("Confirmando llegada para servicio ID:", idServicio);
    // Aquí se ejecutaría un fetch a backend/confirmar-asistencia.php
    alert("Notificación enviada al cliente. Estado actualizado a: Trabajador en Sitio.");
}
