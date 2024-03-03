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

        const passwordMatch = await bcrypt.compare(contraseña.trim(), usuario.contraseña.trim());
        if (!passwordMatch) {
            console.log('La contraseña proporcionada es incorrecta.');
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        console.log('Inicio de sesión exitoso.');

        const tokenPayload = {
            usuarioId: usuario._id,
            usuarioRol: usuario.rol 
        };

        const token = jwt.sign(tokenPayload, jwtSecret, { expiresIn: '5h' });
        return res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
        
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = { signin };
