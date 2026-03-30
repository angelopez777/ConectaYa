/* LÓGICA DE VISIBILIDAD DE CONTRASEÑA */
function verClave() {
    const input = document.getElementById('input_pass');
    const eye = document.getElementById('eye_toggle');

    if (input.type === "password") {
        input.type = "text";
        eye.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        eye.classList.replace("fa-eye-slash", "fa-eye");
    }
}