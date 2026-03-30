/* =========================================
   LÓGICA DE REGISTRO - OJITOS
   ========================================= */

function togglePass(id, icon) {
    const input = document.getElementById(id);
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}