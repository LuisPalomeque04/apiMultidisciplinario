const Usuario = require('../models/models_usuarios');

const obtenerUsuarios = async (req, res) => {
    try {
        if (req.usuario.Nombre !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para obtener usuarios' });
        }

        const usuarios = await Usuario.find();
        res.json({ usuarios });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const obtenerUsuarioPorNumCuarto = async (req, res) => {
    try {
        // Verificar si el usuario que realiza la solicitud es el Administrador
        if (req.usuario.Nombre !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para obtener usuarios' });
        }

        const usuario = await Usuario.findOne({ numCuarto: req.params.numCuarto });
        if (!usuario) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ usuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        // Verificar si el usuario que realiza la solicitud es el Administrador
        if (req.usuario.Nombre !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para actualizar usuarios' });
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate({ numCuarto: req.params.numCuarto }, req.body, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        // Verificar si el usuario que realiza la solicitud es el Administrador
        if (req.usuario.Nombre !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para eliminar usuarios' });
        }

        const usuarioEliminado = await Usuario.findOneAndDelete({ numCuarto: req.params.numCuarto });
        if (!usuarioEliminado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

const agregarUsuario = async (req, res) => {
    try {
        if (req.usuario.Nombre !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para agregar usuarios' });
        }

        const nuevoUsuario = new Usuario(req.body);
        await nuevoUsuario.save();
        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el usuario' });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorNumCuarto,
    actualizarUsuario,
    eliminarUsuario,
    agregarUsuario
};
