/**
 * Control de Dashboard Trabajador - ConectaYa
 * Desarrollado por Angel Lopez
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar componentes de UI
    initDashboard();
    
    // 2. Cargar datos desde el backend
    fetchDashboardData();
});

/**
 * Realiza la petición al backend para obtener datos de la tabla 'trabajador' y 'resenas'
 */
async function fetchDashboardData() {
    try {
        // Nota: El archivo obtener-datos-dashboard.php debe existir en /backend/
        const response = await fetch('../../../backend/obtener-datos-dashboard.php');
        const data = await response.json();

        if (data.success) {
            updateUI(data);
        }
    } catch (error) {
        console.error("Error al sincronizar con ConectaYa DB:", error);
    }
}

/**
 * Actualiza los elementos del DOM con datos reales
 * @param {Object} data - Información proveniente de la base de datos
 */
function updateUI(data) {
    const userName = document.getElementById('user-name');
    const servicesCount = document.getElementById('services-count');
    const ratingAvg = document.getElementById('rating-avg');

    if (userName) userName.innerText = data.nombre;
    if (servicesCount) servicesCount.innerText = data.total_servicios || 0;
    if (ratingAvg) ratingAvg.innerText = parseFloat(data.calificacion).toFixed(1) || "0.0";
}

/**
 * Manejo de eventos de navegación y cambio de rol
 */
function initDashboard() {
    const btnSwitch = document.querySelector('.btn-role-toggle');
    
    if (btnSwitch) {
        btnSwitch.addEventListener('click', () => {
            // Animación de transición antes del redirect
            document.body.style.opacity = '0.5';
            window.location.href = 'inicio-cliente.html';
        });
    }
}
