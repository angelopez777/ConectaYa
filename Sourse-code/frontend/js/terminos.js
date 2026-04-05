/**
 * PROYECTO: ConectaYa
 * MODULO: Gestión de Documentos Legales (Términos y Privacidad)
 * ESTILO: Dark Premium - Interactividad Dinámica
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Captura de elementos del DOM para el Modal
    const modalContainer = document.getElementById('modal-container');
    const modalTitle = document.getElementById('modal-title-text');
    const modalBody = document.getElementById('modal-body-content');
    const closeX = document.querySelector('.close-x-btn');
    const closeBtn = document.querySelector('.btn-close-view');
    const btnTerms = document.getElementById('open-terms');
    const btnPrivacy = document.getElementById('open-privacy');

    // Elementos de acción final (Sincronizados con el HTML anterior)
    const btnAceptarTodo = document.getElementById('btn-aceptar-terminos');
    const checkLegal = document.getElementById('check-legal');

    /**
     * OBJETO DE CONTENIDO LEGAL EXTENDIDO (Tus textos originales íntegros)
     */
    const legalContent = {
        terms: {
            title: 'Términos y Condiciones de Uso - ConectaYa',
            body: `
                <h4>1. OBJETO DE LA PLATAFORMA</h4>
                <p>ConectaYa es una solución tecnológica diseñada para la intermediación laboral y profesional. Al aceptar estos términos, el usuario reconoce que la plataforma facilita el contacto pero no garantiza resultados laborales específicos.</p>
                
                <h4>2. RESPONSABILIDAD DEL USUARIO</h4>
                <p>El usuario es el único responsable de la veracidad de los datos suministrados, incluyendo certificaciones, fotos de perfil y métodos de pago registrados. Cualquier falsedad resultará en la eliminación inmediata de la cuenta.</p>
                
                <h4>3. PROPIEDAD INTELECTUAL</h4>
                <p>Todo el código fuente, arquitectura MySQL, diseño visual con acentos neón (#a855f7) y logotipos son propiedad exclusiva del desarrollador Angel Lopez. Queda prohibida su reproducción o ingeniería inversa.</p>
                
                <h4>4. USO DEL SISTEMA DE PAGOS</h4>
                <p>Al registrar una cuenta bancaria, Nequi o Daviplata, el usuario autoriza el procesamiento de transacciones seguras. ConectaYa no almacena claves de tarjetas, delegando esto a protocolos de seguridad bancaria.</p>
                
                <h4>5. TERMINACIÓN Y BLOQUEO</h4>
                <p>Nos reservamos el derecho de restringir el acceso a usuarios que violen las normas de convivencia o intenten realizar ataques de inyección SQL o vulnerar la seguridad del backend.</p>
                
                <h4>6. ACUERDOS ENTRE PARTES</h4>
                <p>Los contratos realizados entre clientes y trabajadores son responsabilidad de los involucrados. ConectaYa no es patrono ni representante legal de los usuarios registrados.</p>
            `
        },
        privacy: {
            title: 'Política de Privacidad y Protección de Datos',
            body: `
                <h4>1. RECOLECCIÓN DE DATOS (LEY 1581)</h4>
                <p>De acuerdo con la normativa vigente, ConectaYa recolecta nombres, correos, teléfonos y datos profesionales con el fin único de crear un ecosistema laboral eficiente.</p>
                
                <h4>2. SEGURIDAD DE LA INFORMACIÓN</h4>
                <p>Implementamos cifrado SSL en todo el frontend y backend. Sus datos de contacto solo serán visibles para usuarios verificados con los que usted acepte conectar.</p>
                
                <h4>3. DERECHOS ARCO</h4>
                <p>Usted tiene derecho a Acceder, Rectificar, Cancelar u Oponerse al uso de sus datos. Puede solicitar la eliminación de su perfil desde el dashboard correspondiente en cualquier momento.</p>
                
                <h4>4. USO DE COOKIES</h4>
                <p>Utilizamos cookies técnicas para mantener la sesión activa y recordar sus preferencias de diseño oscuro. No rastreamos actividad fuera de la plataforma.</p>
                
                <h4>5. NOTIFICACIONES</h4>
                <p>Al registrarse, acepta recibir correos electrónicos relacionados con su cuenta, actualizaciones de seguridad y nuevas oportunidades de conexión profesional.</p>
                
                <h4>6. TRANSFERENCIA DE DATOS</h4>
                <p>ConectaYa no vende bases de datos a terceros. La información profesional solo se comparte con el fin de facilitar la contratación dentro del flujo normal de la app.</p>
            `
        }
    };

    /**
     * FUNCIÓN: Abrir/Cerrar Modal
     */
    const handleModal = (type = null) => {
        if (type && legalContent[type]) {
            modalTitle.innerText = legalContent[type].title;
            modalBody.innerHTML = legalContent[type].body;
            modalContainer.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        } else {
            modalContainer.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };

    // Listeners para Modales
    btnTerms.addEventListener('click', () => handleModal('terms'));
    btnPrivacy.addEventListener('click', () => handleModal('privacy'));
    [closeX, closeBtn].forEach(el => el.addEventListener('click', () => handleModal()));

    window.addEventListener('click', (e) => {
        if (e.target === modalContainer) handleModal();
    });

    /**
     * LÓGICA DE FINALIZACIÓN Y REDIRECCIÓN AL DASHBOARD
     */
    if (btnAceptarTodo) {
        btnAceptarTodo.addEventListener('click', async () => {
            
            // Validar que el checkbox esté marcado
            if (!checkLegal || !checkLegal.checked) {
                alert("Debes aceptar los términos y condiciones para finalizar tu registro.");
                return;
            }

            try {
                // Llamada al backend corregida
                const response = await fetch('../../backend/registro/aceptar-terminos.php', {
                    method: 'POST'
                });

                const data = await response.json();

                if (data.success) {
                    // REDIRECCIÓN FINAL: Usa la ruta que manda el PHP
                    window.location.href = data.redirect;
                } else {
                    alert("Atención: " + data.message);
                }
            } catch (error) {
                console.error("Error en la petición:", error);
                alert("Error de comunicación con el servidor.");
            }
        });
    }

    // Funcionalidad Volver
    const btnBack = document.querySelector('.back-navigation');
    if(btnBack) {
        btnBack.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'metodo-pago.html';
        });
    }
});