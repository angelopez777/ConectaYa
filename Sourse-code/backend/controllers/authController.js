const Usuario = require('../models/usuarioModel');

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
    try {
        const { correo } = req.body;
        const usuarioExistente = await Usuario.buscarPorCorreo(correo);
        
        if (usuarioExistente) {
            return res.status(400).json({ error: "Este correo ya está registrado" });
        }

        const resultado = await Usuario.crear(req.body);
        res.status(201).json({ mensaje: "¡Usuario guardado!", id: resultado.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error en el servidor al registrar" });
    }
};

// Generar código de 4 dígitos
exports.generarCodigo = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const codigo = Math.floor(1000 + Math.random() * 9000).toString();
        await Usuario.guardarCodigoVerificacion(id_usuario, codigo);
        res.status(200).json({ mensaje: "Código generado", codigo: codigo });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al generar código" });
    }
};