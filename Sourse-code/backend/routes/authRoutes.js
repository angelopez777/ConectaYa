const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Verifica que 'authController.registrarUsuario' exista antes de asignarlo
router.post('/registro', authController.registrarUsuario);
router.post('/generar-codigo', authController.generarCodigo);

module.exports = router;