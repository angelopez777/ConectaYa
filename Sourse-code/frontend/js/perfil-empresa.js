/**
 * Lógica Perfil Trabajador - ConectaYa
 */
document.addEventListener("DOMContentLoaded", () => {
    const fotoInput = document.getElementById("foto-upload");
    const preview = document.getElementById("img-preview");
    const form = document.getElementById("formPerfilTrabajador");

    // Previsualizar imagen seleccionada
    fotoInput.addEventListener("change", function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => preview.src = e.target.result;
            reader.readAsDataURL(file);
        }
    });

    // Envío de formulario
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        // Aquí capturamos los datos para el PHP
        const datos = new FormData();
        datos.append("direccion", document.getElementById("direccion").value);
        datos.append("profesion", document.getElementById("profesion").value);
        datos.append("experiencia", document.getElementById("experiencia").value);
        
        console.log("Datos capturados para el modelo de trabajador...");
        // Redirección simulada tras éxito
        alert("¡Perfil actualizado con éxito!");
    });
});