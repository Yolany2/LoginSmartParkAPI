// Se importa Mongoose para realizar la conexión con MongoDB
const mongoose = require('mongoose');

// Función encargada de conectar la API con la base de datos
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login_node');
        console.log('Conexión exitosa con MongoDB');
    } catch (error) {
        console.error('Error al conectar con MongoDB:', error.message);
    }
};

// Se exporta la función para utilizarla en App.js
module.exports = dbConnect;