// 1. Importamos las librerías necesarias
const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Esto permite que el servidor use el archivo .env

// 2. Importamos las RUTAS que creamos en la carpeta 'routes'
const authRoutes = require('./routes/authRoutes');

const app = express();

// 3. Middlewares: Configuración para que el servidor sea funcional
app.use(cors());           // Permite conexiones externas (como desde tu móvil)
app.use(express.json());   // Crucial: Permite que el servidor entienda los datos JSON que enviamos

// 4. Definición de Rutas: Aquí conectamos el prefijo '/api/auth' con tus rutas de registro
app.use('/api/auth', authRoutes);

// 5. Ruta de prueba básica para confirmar que todo está encendido
app.get('/', (req, res) => {
    res.send('Servidor de ConectaYa: ¡Estado Operativo!');
});

// 6. Encendido del servidor usando el puerto del archivo .env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Servidor de ConectaYa corriendo en http://localhost:${PORT}`);
    console.log(`🚀 Listo para recibir peticiones en http://localhost:${PORT}/api/auth/registro`);
});