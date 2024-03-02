const Usuario = require('../models/models_usuarios');
const bcrypt = require('bcrypt');


const obtenerUsuarios = async (req, res) => {
    try {
        if (req.usuarioRol !== 'Administrador') { 
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
        if (req.usuarioRol !== 'Administrador') {
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
        if (req.usuarioRol !== 'Administrador') { 
            return res.status(403).json({ error: 'Permisos insuficientes para actualizar usuarios' });
        }

        const usuarioActualizado = await Usuario.findOneAndUpdate({ numCuarto: req.params.numCuarto }, req.body, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado', error });
        }
        res.json({ usuario: usuarioActualizado });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario', });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        if (req.usuarioRol !== 'Administrador') {
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
        if (req.usuarioRol !== 'Administrador') {
            return res.status(403).json({ error: 'Permisos insuficientes para agregar usuarios' });
        }

        const { contraseña, ...userData } = req.body;

        const usuarioExistente = await Usuario.findOne({
            $or: [
                { numCelular: userData.numCelular },
                { numEmergencia: userData.numEmergencia }
            ]
        });

        if (usuarioExistente) {
            return res.status(400).json({ error: 'Ya existe un usuario con el mismo número de celular o de emergencia.' });
        }

        const hashedPassword = await bcrypt.hash(contraseña, 10);

        const nuevoUsuario = new Usuario({
            ...userData,
            contraseña: hashedPassword,
            rol: 'Rentador'
        });

        await nuevoUsuario.save();

        res.status(201).json({ mensaje: 'Usuario creado correctamente', usuario: nuevoUsuario });
    } catch (error) {
        console.error('Error al agregar el usuario:', error);
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
