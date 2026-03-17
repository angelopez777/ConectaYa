const db = require('../config/db');

/** 📝 FUNCIÓN: CREAR SERVICIO */
const crearServicio = async (req, res) => {
    const { id_usuario, id_categoria, descripcion, precio } = req.body;
    try {
        const query = `INSERT INTO serviciosofrecidos (id_trabajador, id_categoria, descripcion, precio_base, disponible) 
                       VALUES (?, ?, ?, ?, 1)`;
        await db.query(query, [id_usuario, id_categoria, descripcion, precio]);
        res.status(201).json({ mensaje: "¡Servicio creado con éxito!" });
    } catch (err) {
        res.status(500).json({ error: "Error al crear", detalle: err.message });
    }
};

/** 👁️ FUNCIÓN: OBTENER TODOS LOS SERVICIOS */
const obtenerServicios = async (req, res) => {
    try {
        const query = `SELECT s.id_servicio, u.nombre AS trabajador, c.nombre_categoria AS categoria, s.descripcion, s.precio_base 
                       FROM serviciosofrecidos s
                       JOIN trabajador t ON s.id_trabajador = t.id_trabajador
                       JOIN usuario u ON t.id_usuario = u.id_usuario
                       JOIN categoriaservicio c ON s.id_categoria = c.id_categoria`;
        const [servicios] = await db.query(query);
        res.status(200).json(servicios);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener", detalle: err.message });
    }
};

/** ✏️ FUNCIÓN: ACTUALIZAR SERVICIO (La que te faltaba definir) */
const actualizarServicio = async (req, res) => {
    const { id } = req.params;
    const { descripcion, precio } = req.body;
    try {
        const query = `UPDATE serviciosofrecidos SET descripcion = ?, precio_base = ? WHERE id_servicio = ?`;
        const [resultado] = await db.query(query, [descripcion, precio, id]);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: "Servicio no encontrado" });
        res.json({ mensaje: "¡Servicio actualizado!" });
    } catch (err) {
        res.status(500).json({ error: "Error al actualizar", detalle: err.message });
    }
};

/** 🗑️ FUNCIÓN: ELIMINAR SERVICIO */
const eliminarServicio = async (req, res) => {
    const { id } = req.params;
    try {
        const query = 'DELETE FROM serviciosofrecidos WHERE id_servicio = ?';
        const [resultado] = await db.query(query, [id]);
        if (resultado.affectedRows === 0) return res.status(404).json({ mensaje: "No encontrado" });
        res.json({ mensaje: "Servicio eliminado" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar", detalle: err.message });
    }
};

// ✅ EXPORTACIÓN: Ahora todas estas funciones existen arriba 👆
module.exports = { crearServicio, obtenerServicios, actualizarServicio, eliminarServicio };