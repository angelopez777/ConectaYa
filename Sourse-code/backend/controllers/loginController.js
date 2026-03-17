const db = require('../config/db');
const bcrypt = require('bcryptjs');

// 1. REGISTRAR USUARIO
const registrarUsuario = async (req, res) => {
    const { nombre, correo, contrasena, tipo_usuario } = req.body;
    
    // ESTO ES PARA DEPURAR: Ver qué está llegando al servidor
    console.log("Datos recibidos en el servidor:", req.body); 

    try {
        const salt = await bcrypt.genSalt(10);
        const contrasenaHash = await bcrypt.hash(contrasena.toString(), salt); // Forzamos a String aquí

        const [resultado] = await db.query(
            'INSERT INTO usuario (nombre, correo, contrasena, tipo_usuario) VALUES (?, ?, ?, ?)',
            [nombre, correo, contrasenaHash, tipo_usuario]
        );
        
        console.log("Resultado de MySQL:", resultado);
        res.status(201).json({ mensaje: '¡Usuario registrado exitosamente!' });

    } catch (err) {
        console.error("ERROR REAL DE MYSQL:", err); // Esto saldrá en tu terminal de VS Code
        res.status(500).json({ 
            error: 'Error al registrar usuario', 
            mensaje_error: err.sqlMessage || err.message 
        });
    }
};

// 2. LOGIN DE USUARIO
const loginUsuario = async (req, res) => {
    const { correo, contrasena } = req.body;
    try {
        const [rows] = await db.query('SELECT * FROM usuario WHERE correo = ?', [correo]);
        if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

        const usuario = rows[0];
        const esValida = await bcrypt.compare(contrasena, usuario.contrasena);

        if (!esValida) return res.status(401).json({ mensaje: 'Contraseña incorrecta' });

        res.json({ mensaje: '¡Bienvenido a ConectaYa!', usuario: { id: usuario.id_usuario, nombre: usuario.nombre } });
    } catch (err) {
        console.error("Error en login:", err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
}; // <-- Llave de cierre de la función

// 3. VER PERFIL
const getPerfilUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query(
            'SELECT id_usuario, nombre, correo, tipo_usuario FROM usuario WHERE id_usuario = ?', 
            [id]
        );

        if (rows.length === 0) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        res.json(rows[0]);
    } catch (err) {
        console.error("Error en perfil:", err);
        res.status(500).json({ error: 'Error al obtener datos' });
    }
}; // <-- Llave de cierre de la función

module.exports = { registrarUsuario, loginUsuario, getPerfilUsuario };