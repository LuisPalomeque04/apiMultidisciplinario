require('dotenv').config();
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const Usuarios = require('../models/models_usuarios');

const rentLar = "mongodb://0.0.0.0:27017/rentLar";

const connectDB = async () => {
    try {
        await mongoose.connect(rentLar, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conexión establecida con éxito a la base de datos");
        await crearUsuarioAdministrador();
    } catch (err) {
        console.error("Error al conectar a la base de datos:", err.message);
    }
};

const crearUsuarioAdministrador = async () => {
    try {
        const adminExistente = await Usuarios.findOne({ Nombre: 'Administrador' });
        if (adminExistente) {
            console.log('El usuario administrador ya existe en la base de datos.');
            return;
        }
        const numCelular = 1234567890;
        const celularExistente = await Usuarios.findOne({ numCelular });
        if (celularExistente) {
            console.log('El número de celular ya está en uso.');
            return;
        }

        const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash('palomeque', saltRounds);

        const nuevoAdmin = new Usuarios({
            Nombre: 'Nadia',
            contraseña: hashedPassword, 
            correo: 'nadia@example.com',
            numCelular: numCelular, 
            nombreEmergencia: 'Luis',
            numEmergencia: 1234567889,
            numCuarto: 255,
            rol: 'Administrador'
        });

        await nuevoAdmin.save();
        console.log('Usuario administrador creado exitosamente.');
    } catch (error) {
        console.error('Error al crear el usuario administrador:', error);
    }
};


module.exports = connectDB;
