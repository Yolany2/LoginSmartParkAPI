// Se importa Mongoose para crear el modelo
const mongoose = require('mongoose');

// Se define la estructura de los usuarios
const usuarioSchema = new mongoose.Schema({
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    contrasena: {
        type: String,
        required: true
    }
});

// El modelo utilizará la colección usuarios de MongoDB
const Usuario = mongoose.model('Usuario', usuarioSchema, 'usuarios');

// Se exporta el modelo para utilizarlo en App.js
module.exports = Usuario;