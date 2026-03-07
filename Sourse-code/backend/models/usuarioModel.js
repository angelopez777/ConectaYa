const db = require('../config/db');

class Usuario {
    // Buscar usuario por correo
    static async buscarPorCorreo(correo) {
        const sql = "SELECT * FROM usuario WHERE correo = ?";
        const [rows] = await db.query(sql, [correo]);
        return rows[0];
    }

    // Crear un nuevo usuario
    static async crear(datos) {
        const { nombre, correo, telefono, contrasena, tipo_usuario } = datos;
        const sql = "INSERT INTO usuario (nombre, correo, telefono, contrasena, tipo_usuario) VALUES (?, ?, ?, ?, ?)";
        const [result] = await db.query(sql, [nombre, correo, telefono, contrasena, tipo_usuario]);
        return result;
    }

    // Guardar el código de 4 dígitos
    static async guardarCodigoVerificacion(id_usuario, codigo) {
        const sql = "UPDATE usuario SET codigo_verificacion = ? WHERE id_usuario = ?";
        const [result] = await db.query(sql, [codigo, id_usuario]);
        return result;
    }
}

module.exports = Usuario;