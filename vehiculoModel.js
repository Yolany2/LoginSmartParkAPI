// Se importa Mongoose para crear el modelo
const mongoose = require('mongoose');

// Se define la estructura de los vehículos de SmartPark
const vehiculoSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        unique: true
    },
    tipo: {
        type: String,
        required: true
    },
    propietario: {
        type: String,
        required: true
    }
});

// El modelo utilizará la colección vehiculos de MongoDB
const Vehiculo = mongoose.model(
    'Vehiculo',
    vehiculoSchema,
    'vehiculos'
);

// Se exporta el modelo para utilizarlo en App.js
module.exports = Vehiculo;