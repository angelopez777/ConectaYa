/* LÓGICA DE VISIBILIDAD DE CONTRASEÑAS */
function verPassword(inputId, iconElement) {
    const campo = document.getElementById(inputId);

    if (campo.type === "password") {
        campo.type = "text";
        iconElement.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        campo.type = "password";
        iconElement.classList.replace("fa-eye-slash", "fa-eye");
    }
}