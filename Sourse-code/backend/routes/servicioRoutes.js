const express = require('express');
const router = express.Router();
// ✅ IMPORTACIÓN LIMPIA (Cada función una sola vez)
const { crearServicio, obtenerServicios, eliminarServicio, actualizarServicio } = require('../controllers/servicioController');

// 🛠️ RUTAS: http://localhost:3000/api/servicios/...
router.post('/publicar', crearServicio);
router.get('/todos', obtenerServicios);
router.put('/actualizar/:id', actualizarServicio);
router.delete('/eliminar/:id', eliminarServicio);

module.exports = router;