    const mongoose = require("mongoose");
    const Renta = require('../models/models_renta'); 

    const usuarioSchema = new mongoose.Schema({
        Nombre: { type: String, required: true },
        contraseña: { type: String, required: true },
        correo: { type: String, required: true },
        numCelular: { type: Number, required: true, unique: true },
        nombreEmergencia: { type: String, required: true },
        numEmergencia: { type: Number, required: true, unique: true },
        numCuarto: { type: Number, required: true, unique: true },
        rol: { type: String, required: true },
        rentas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Renta' }]
    });
    

    const Usuarios = mongoose.model('Usuarios', usuarioSchema);

    module.exports = Usuarios;
