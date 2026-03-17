document.querySelector('.login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Captura los valores de los inputs
    const correo = document.querySelector('input[type="email"]').value;
    const password = document.querySelector('input[type="password"]').value;

    try {
        const respuesta = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            // Guardamos el nombre para usarlo en la bienvenida
            localStorage.setItem('usuarioNombre', resultado.nombre);
            alert("¡Bienvenido, " + resultado.nombre + "!");
            window.location.href = 'inicio-cliente.html'; 
        } else {
            alert("Error: " + resultado.mensaje);
        }
    } catch (error) {
        console.error("Error de conexión:", error);
        alert("Asegúrate de que el servidor (app.py) esté encendido.");
    }
});