// Se importan los módulos y archivos necesarios
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config');
const Usuario = require('./model');
const Vehiculo = require('./vehiculoModel');

// Se crea la aplicación
const app = express();

// Puerto utilizado por la API
const port = 3000;

// Permite que la API reciba información en formato JSON
app.use(express.json());
app.use(cors());

// Se realiza la conexión con MongoDB
dbConnect();

// Ruta principal para comprobar el funcionamiento de la API
app.get('/', (req, res) => {
    res.json({
        mensaje: 'API del proyecto SmartPark funcionando'
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

// Servicio para registrar un vehículo
app.post('/vehiculos', async (req, res) => {
    try {
        const { placa, tipo, propietario } = req.body;

        // Comprueba que se enviaron todos los datos
        if (!placa || !tipo || !propietario) {
            return res.status(400).json({
                mensaje: 'La placa, el tipo y el propietario son obligatorios'
            });
        }

        // Comprueba que la placa no esté registrada
        const vehiculoExistente = await Vehiculo.findOne({
            placa: placa.toUpperCase()
        });

        if (vehiculoExistente) {
            return res.status(400).json({
                mensaje: 'El vehículo ya se encuentra registrado'
            });
        }

        // Crea y guarda el nuevo vehículo
        const nuevoVehiculo = new Vehiculo({
            placa: placa.toUpperCase(),
            tipo,
            propietario
        });

        await nuevoVehiculo.save();

        res.status(201).json({
            mensaje: 'Vehículo registrado correctamente',
            vehiculo: nuevoVehiculo
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al registrar el vehículo',
            error: error.message
        });
    }
});
// Servicio para consultar todos los vehículos
app.get('/vehiculos', async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find();

        res.status(200).json(vehiculos);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar los vehículos',
            error: error.message
        });
    }
});
// Servicio para consultar un vehículo por su identificador
app.get('/vehiculos/:id', async (req, res) => {
    try {
        const vehiculo = await Vehiculo.findById(req.params.id);

        if (!vehiculo) {
            return res.status(404).json({
                mensaje: 'Vehículo no encontrado'
            });
        }

        res.status(200).json(vehiculo);

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al consultar el vehículo',
            error: error.message
        });
    }
});
// Servicio para actualizar un vehículo
app.put('/vehiculos/:id', async (req, res) => {
    try {
        const { placa, tipo, propietario } = req.body;

        // Comprueba que se enviaron todos los datos
        if (!placa || !tipo || !propietario) {
            return res.status(400).json({
                mensaje: 'La placa, el tipo y el propietario son obligatorios'
            });
        }

        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(
            req.params.id,
            {
                placa: placa.toUpperCase(),
                tipo,
                propietario
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!vehiculoActualizado) {
            return res.status(404).json({
                mensaje: 'Vehículo no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Vehículo actualizado correctamente',
            vehiculo: vehiculoActualizado
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al actualizar el vehículo',
            error: error.message
        });
    }
});
// Servicio para eliminar un vehículo
app.delete('/vehiculos/:id', async (req, res) => {
    try {
        const vehiculoEliminado = await Vehiculo.findByIdAndDelete(
            req.params.id
        );

        if (!vehiculoEliminado) {
            return res.status(404).json({
                mensaje: 'Vehículo no encontrado'
            });
        }

        res.status(200).json({
            mensaje: 'Vehículo eliminado correctamente'
        });

    } catch (error) {
        res.status(500).json({
            mensaje: 'Error al eliminar el vehículo',
            error: error.message
        });
    }
});
// Se inicia el servidor
app.listen(port, () => {
    console.log('Servidor ejecutándose en http://localhost:3000');
});