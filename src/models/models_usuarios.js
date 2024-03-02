const mongoose = require("mongoose");
const Renta = require('../models/models_renta'); 

const usuarioSchema = new mongoose.Schema({
    Nombre: { type: String, required: true },
    contraseña: { type: String, required: true, unique: true },
    correo: { type: String, required: true, unique: true },
    numCelular: { type: Number, required: true, unique: true },
    nombreEmergencia: { type: String, required: true },
    numEmergencia: { type: Number, required: true, unique: true },
    numCuarto: { type: Number, required: true, unique: true },
    rol: {type:String, unique:true, require:true},
    rentas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Renta' }]
});

const Usuarios = mongoose.model('Usuarios', usuarioSchema);

module.exports = Usuarios;
