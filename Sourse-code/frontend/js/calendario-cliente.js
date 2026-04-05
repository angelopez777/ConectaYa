document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const infoPanel = document.getElementById('event-info-content');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        locale: 'es',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
        },
        buttonText: {
            today: 'Hoy',
            month: 'Mes',
            week: 'Semana'
        },
        // Carga de eventos desde el backend
        events: '../../../backend/calendario/obtener-eventos.php', 

        eventClick: function(info) {
            mostrarDetalles(info.event);
        },
        
        eventMouseEnter: function(info) {
            info.el.style.cursor = 'pointer';
        }
    });

    calendar.render();

    function mostrarDetalles(event) {
        const fecha = event.start.toLocaleString('es-ES', { 
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
        });

        infoPanel.innerHTML = `
            <div class="event-data-card">
                <h4>${event.title}</h4>
                <p><i class="fas fa-calendar-day"></i> ${fecha}</p>
                <p><i class="fas fa-user-tie"></i> Trabajador: ${event.extendedProps.trabajador || 'N/A'}</p>
                <p><i class="fas fa-tools"></i> Servicio: ${event.extendedProps.servicio || 'General'}</p>
                <div class="event-tag">${event.extendedProps.estado || 'Confirmado'}</div>
            </div>
            <div style="margin-top: 20px;">
                <a href="mensajes-cliente.html" class="btn-role-neon" style="justify-content: center;">
                    <i class="fas fa-comment-dots"></i> Hablar con el experto
                </a>
            </div>
        `;
    }
});