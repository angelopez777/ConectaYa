/* LÓGICA DE NAVEGACIÓN DINÁMICA - MÉTODO DE PAGO */

document.addEventListener('DOMContentLoaded', () => {
    const linkRegresar = document.getElementById('link-regresar');
    
    // Obtener la URL de la página anterior
    const paginaAnterior = document.referrer;

    if (paginaAnterior.includes('perfil-trabajador.html')) {
        linkRegresar.href = 'perfil-trabajador.html';
    } else if (paginaAnterior.includes('perfil-empresa.html')) {
        linkRegresar.href = 'perfil-empresa.html';
    } else {
        // Si entra directo, lo mandamos al paso 2 de registro por seguridad
        linkRegresar.href = 'registro-paso2.html';
    }

    console.log("Sistema de retorno configurado hacia: " + linkRegresar.href);
});