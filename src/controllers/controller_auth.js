const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuarios = require('../models/models_usuarios');
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const signin = async (req, res) => {
    const { numCuarto, contraseña } = req.body;

    try {
        console.log('Datos de inicio de sesión recibidos:', { numCuarto, contraseña });

        if (!numCuarto || !contraseña) {
            return res.status(400).json({ message: 'Se requiere el número de cuarto y la contraseña.' });
        }

        const usuario = await Usuarios.findOne({ numCuarto });

        if (!usuario) {
            console.log('Usuario no encontrado en la base de datos.');
            return res.status(404).json({ message: 'Usuario no encontrado. Verifica los datos proporcionados.' });
        }

        const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!passwordMatch) {
            console.log('La contraseña proporcionada es incorrecta.');
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const token = jwt.sign({ usuarioId: usuario._id }, jwtSecret, { expiresIn: '5h' });
        const message = usuario.numCuarto === 255 ? 'Inicio de sesión exitoso como administrador.' : 'Inicio de sesión exitoso.';
        
        res.status(200).json({ message, token });
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { signin };
