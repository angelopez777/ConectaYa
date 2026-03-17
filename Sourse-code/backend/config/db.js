// 📦 IMPORTACIÓN DE LIBRERÍAS
const mysql = require('mysql2/promise');
require('dotenv').config();

// 🔌 CONFIGURACIÓN DE LA CONEXIÓN
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'conectaya',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// ✅ EXPORTACIÓN PARA USAR EN CONTROLADORES
module.exports = pool;