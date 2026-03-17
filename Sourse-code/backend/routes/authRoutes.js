const express = require('express');
const router = express.Router();

// 📥 IMPORTACIÓN: Traemos las funciones del controlador
const { login, registrar, obtenerPerfil } = require('../controllers/authController');
    
// 🚩 DEFINICIÓN DE RUTAS
router.post('/login', login);      // Ruta para iniciar sesión
router.post('/registrar', registrar); // Ruta para crear cuenta
router.get('/perfil/:id', obtenerPerfil); // Ruta para obtener perfil de usuario

module.exports = router;