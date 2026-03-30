/**
 * Maneja la selección del rol y redirige al paso final
 * @param {string} rol - El rol elegido por el usuario
 */
function seleccionarRol(rol) {
    // 1. Guardamos la elección en el backend (opcional pero recomendado)
    // 2. Redirigimos al formulario de registro-cliente como solicitaste
    if (rol === 'Cliente') {
        window.location.href = 'perfil-cliente.html'; 
    } else {
        // Por ahora redirigimos al mismo sitio o a sus respectivos perfiles
        window.location.href = `perfil-${rol.toLowerCase()}.html`;
    }
}