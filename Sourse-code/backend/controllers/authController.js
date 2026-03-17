// 📦 IMPORTACIÓN: Conexión a la DB
const db = require('../config/db');

/** 🔐 FUNCIÓN: LOGIN */
const login = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const query = 'SELECT * FROM usuario WHERE correo = ? AND contrasena = ?';
        const [rows] = await db.query(query, [correo, contrasena]);
        if (rows.length > 0) {
            res.status(200).json({ mensaje: "¡Bienvenido!", usuario: rows[0] });
        } else {
            res.status(401).json({ mensaje: "Credenciales incorrectas" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error en login", detalle: err.message });
    }
};

/** 📝 FUNCIÓN: REGISTRAR */
const registrar = async (req, res) => {
    const { nombre, correo, contrasena, rol } = req.body;
    try {
        // Usamos los nombres de columnas más comunes: nombre, correo, contrasena
        const query = 'INSERT INTO usuario (nombre, correo, contrasena) VALUES (?, ?, ?)';
        const [resultado] = await db.query(query, [nombre, correo, contrasena]);
        res.status(201).json({ mensaje: "✅ Usuario registrado con éxito" });
    } catch (err) {
        // 🔍 Si falla por el nombre de las columnas, esto nos dirá cuáles son las reales
        const [columnas] = await db.query('DESCRIBE usuario');
        res.status(500).json({ 
            error: "Error al registrar", 
            columnas_reales: columnas.map(c => c.Field),
            detalle: err.message 
        });
    }
};

// ✅ ETIQUETA DE EXPORTACIÓN (¡Asegúrate que estén las dos!)
/** 👤 FUNCIÓN: OBTENER PERFIL 
 * Trae los datos de un usuario específico para mostrar en su perfil
 */
const obtenerPerfil = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT id_usuario, nombre, correo, rol FROM usuario WHERE id_usuario = ?', [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ mensaje: "Usuario no encontrado" });
        }
    } catch (err) {
        res.status(500).json({ error: "Error al obtener perfil", detalle: err.message });
    }
};

// 📢EXPORTS:
module.exports = { login, registrar, obtenerPerfil };