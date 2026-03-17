const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (res.ok) {
                alert("¡Bienvenido a ConectaYa!");
                // Redirigir a la página de servicios
                window.location.href = "servicios.html";
            } else {
                document.getElementById('mensaje').innerHTML = `<p style="color:red;">${data.message}</p>`;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });
}