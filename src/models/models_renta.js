const mongoose = require("mongoose");

const rentaSchema = new mongoose.Schema({
    FechaPago: { type: String, required: true },
    montoPago: { type: Number, required: true }
});

const Renta = mongoose.model('Renta', rentaSchema);

module.exports = Renta;
