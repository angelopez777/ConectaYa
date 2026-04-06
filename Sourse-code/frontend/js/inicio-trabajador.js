/**
 * inicio-trabajador.js
 * Lógica principal para el dashboard del trabajador profesional.
 */

document.addEventListener('DOMContentLoaded', () => {
    inicializarDashboard();
});

function inicializarDashboard() {
    mostrarFecha();
    cargarDatosResumen();
}

/**
 * Muestra la fecha actual en el encabezado
 */
function mostrarFecha() {
    const fechaContainer = document.getElementById('current-date');
    const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const hoy = new Date().toLocaleDateString('es-ES', opciones);
    fechaContainer.innerHTML = `<i class="far fa-calendar-alt"></i> ${hoy}`;
}

/**
 * Carga los KPIs y la lista de servicios pendientes
 */
async function cargarDatosResumen() {
    const listado = document.getElementById('pending-services-list');
    
    try {
        // En un entorno real, aquí se hace fetch al backend
        // const response = await fetch('../../../backend/api/trabajador-stats.php');
        
        // Simulación de carga para visualización de la estructura V.3
        setTimeout(() => {
            renderizarServiciosVacios(listado);
        }, 1500);

    } catch (error) {
        listado.innerHTML = `<p class="error-text">Error al conectar con la base de datos.</p>`;
    }
}

function renderizarServiciosVacios(contenedor) {
    contenedor.innerHTML = `
        <div class="empty-state-premium">
            <i class="fas fa-tasks empty-icon"></i>
            <p>No tienes servicios programados para hoy.</p>
            <button class="btn-role-toggle" style="width: auto; padding: 10px 20px; margin-top: 15px;">
                Explorar Solicitudes
            </button>
        </div>
    `;
}
