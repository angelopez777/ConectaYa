const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🛠️ CONFIGURACIÓN (Middlewares)
app.use(cors()); // Permite que el frontend se conecte
app.use(express.json()); // Permite leer JSON

// 🔗 VINCULAR RUTAS
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/servicios', require('./routes/servicioRoutes'));

// 🚀 ENCENDER SERVIDOR
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de ConectaYa en: http://localhost:${PORT}`);
});