console.log("✅ El archivo registro.js ha cargado correctamente.");

document.querySelector('.register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("🚀 Intento de registro detectado...");

    // Capturamos los datos
    const datos = {
        nombre: document.getElementById('reg-nombre').value,
        correo: document.getElementById('reg-correo').value,
        telefono: document.getElementById('reg-telefono').value,
        password: document.getElementById('reg-password').value
    };

    console.log("📦 Datos a enviar:", datos);

    try {
        const respuesta = await fetch('http://127.0.0.1:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            console.log("✨ Servidor respondió con éxito:", resultado);
            alert("¡Registro exitoso!");
            window.location.href = 'verificacion.html';
        } else {
            console.error("❌ El servidor rechazó el registro:", resultado.mensaje);
            alert("Error: " + resultado.mensaje);
        }
    } catch (error) {
        console.error("🚨 Error de conexión total:", error);
        alert("No se pudo conectar con el servidor. Revisa la terminal de Python.");
    }
});