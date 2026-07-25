// Se importan los módulos y archivos necesarios
const express = require('express');
const dbConnect = require('./config');
const Usuario = require('./model');

// Se crea la aplicación
const app = express();

// Puerto utilizado por la API
const port = 3000;

// Permite que la API reciba información en formato JSON
app.use(express.json());

// Se realiza la conexión con MongoDB
dbConnect();

// Ruta principal para comprobar el funcionamiento de la API
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API de registro e inicio de sesión funcionando'
    });
});

// Servicio para registrar un usuario
app.post('/registro', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Comprueba que se enviaron todos los datos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Comprueba que el usuario no esté registrado
        const usuarioExistente = await Usuario.findOne({ usuario });

        if (usuarioExistente) {
            return res.status(400).json({
                mensaje: 'El usuario ya se encuentra registrado'
            });
        }

        // Crea y guarda el nuevo usuario
        const nuevoUsuario = new Usuario({
            usuario,
            contrasena
        });

        await nuevoUsuario.save();

        res.status(201).json({
            mensaje: 'Usuario registrado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar el usuario',
            error: error.message
        });
    }
});

// Servicio para iniciar sesión
app.post('/login', async (req, res) => {
    try {
        const { usuario, contrasena } = req.body;

        // Comprueba que se enviaron todos los datos
        if (!usuario || !contrasena) {
            return res.status(400).json({
                mensaje: 'El usuario y la contraseña son obligatorios'
            });
        }

        // Busca un usuario con los datos recibidos
        const usuarioEncontrado = await Usuario.findOne({
            usuario,
            contrasena
        });

        if (!usuarioEncontrado) {
            return res.status(401).json({
                mensaje: 'Error en la autenticación'
            });
        }

        res.status(200).json({
            mensaje: 'Autenticación satisfactoria'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al iniciar sesión',
            error: error.message
        });
    }
});

// Se inicia el servidor
app.listen(port, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});