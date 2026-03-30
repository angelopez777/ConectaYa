/**
 * ARCHIVO: dashboard-cliente.js
 * UBICACIÓN: /frontend/js/
 */
document.addEventListener('DOMContentLoaded', () => {
    const displayNombre = document.getElementById('user-name');

    // Preguntamos al PHP por los datos de la sesión
    fetch('../../../backend/obtener-sesion.php')
        .then(res => res.json())
        .then(data => {
            if (data.logged) {
                // Si el login guardó el nombre, aquí lo mostramos
                displayNombre.textContent = data.nombre;
                displayNombre.style.color = "#8b5cf6"; // Tu morado neón
            } else {
                // Si no hay nadie logueado, patitas a la calle
                window.location.href = "../login.html";
            }
        })
        .catch(err => {
            console.error("Error cargando sesión:", err);
            displayNombre.textContent = "Error de conexión";
        });
});