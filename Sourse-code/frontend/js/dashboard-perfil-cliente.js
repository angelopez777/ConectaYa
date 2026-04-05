/**
 * PROYECTO: ConectaYa
 * MODULO: dashboard-perfil-cliente.js
 * PROTOCOLO: Escritura desde cero. Diseño Neón Morado (#a855f7).
 */

document.addEventListener('DOMContentLoaded', () => {

    const cargarPerfil = async () => {
        // Evitar caché para datos actualizados
        const apiPath = `../../../backend/perfil/obtener-perfil.php?v=${Date.now()}`;

        try {
            const res = await fetch(apiPath, { cache: "no-store" });
            const data = await res.json();

            if (data.success) {
                // Inserción de datos en el DOM
                document.getElementById('perfil-nombre').innerText = data.nombre || 'Usuario';
                document.getElementById('perfil-correo').innerText = data.correo || 'No definido';
                document.getElementById('perfil-telefono').innerText = data.telefono || 'Sin teléfono';
                document.getElementById('perfil-direccion').innerText = data.direccion || 'Sin dirección';
                document.getElementById('perfil-pago').innerText = data.tipo_metodo || 'No especificado';
                
                // Carga de imagen con fallback neón
                const imgElement = document.getElementById('perfil-img');
                if (imgElement) {
                    let foto = data.foto || 'default.png';
                    // Limpiar posibles rutas absolutas del servidor
                    if (foto.includes('/') || foto.includes('\\')) {
                        foto = foto.split(/[\\/]/).pop();
                    }
                    imgElement.src = `../../../img/perfiles/${foto}`;

                    imgElement.onerror = () => {
                        imgElement.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.nombre)}&background=a855f7&color=fff&size=128`;
                    };
                }
            } else {
                // Redirección si la sesión no es válida
                if (data.message === 'Sesión no iniciada') {
                    window.location.href = 'login.html';
                }
            }
        } catch (err) {
            console.error("Error al conectar con el backend:", err);
        }
    };

    cargarPerfil();
});