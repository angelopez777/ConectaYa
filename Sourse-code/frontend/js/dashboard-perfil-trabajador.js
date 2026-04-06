/**
 * dashboard-perfil-trabajador.js
 * Carga de datos dinámicos desde el backend para la vista de trabajador.
 */

document.addEventListener('DOMContentLoaded', () => {
    cargarDatosPerfil();
});

async function cargarDatosPerfil() {
    try {
        // Petición al backend que debe retornar datos de usuario + trabajador
        const response = await fetch('../../../backend/controladores/obtener_perfil_trabajador.php');
        const data = await response.json();

        if (data.success) {
            const info = data.usuario;
            
            // Asignación de datos al DOM
            document.getElementById('perfil-nombre').textContent = info.nombre;
            document.getElementById('perfil-especialidad').textContent = info.especialidad || 'Sin Especialidad';
            document.getElementById('perfil-correo').textContent = info.correo;
            document.getElementById('perfil-telefono').textContent = info.telefono;
            document.getElementById('perfil-ubicacion').textContent = info.ubicacion || 'No definida';
            document.getElementById('perfil-precio').textContent = `$${info.precio_hora} COP / h`;
            document.getElementById('perfil-experiencia').textContent = info.experiencia || 'No has redactado tu experiencia aún.';
            document.getElementById('perfil-rating').textContent = info.rating || '0.0';
            
            if (info.foto) {
                document.getElementById('perfil-img').src = `../../../img/perfiles/${info.foto}`;
            }
        } else {
            console.error("Error al cargar perfil:", data.message);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
    }
}
