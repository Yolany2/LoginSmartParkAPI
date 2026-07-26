# Documentación de la API del proyecto SmartPark

## Descripción

Esta API fue desarrollada para el proyecto SmartPark. Permite registrar usuarios, iniciar sesión y administrar la información de los vehículos mediante servicios para registrar, consultar, actualizar y eliminar.

## Dirección principal

http://localhost:3000

## Servicios de usuarios

### 1. Comprobar el funcionamiento de la API

Método: GET  
Dirección: http://localhost:3000

Respuesta esperada:

{
    "mensaje": "API del proyecto SmartPark funcionando"
}

### 2. Registrar un usuario

Método: POST  
Dirección: http://localhost:3000/registro

Datos enviados:

{
    "usuario": "yolany",
    "contrasena": "12345"
}

Respuesta satisfactoria:

{
    "mensaje": "Usuario registrado correctamente"
}

### 3. Iniciar sesión

Método: POST  
Dirección: http://localhost:3000/login

Datos enviados:

{
    "usuario": "yolany",
    "contrasena": "12345"
}

Respuesta satisfactoria:

{
    "mensaje": "Autenticación satisfactoria"
}

## Servicios de vehículos

### 4. Registrar un vehículo

Método: POST  
Dirección: http://localhost:3000/vehiculos

Datos enviados:

{
    "placa": "ABC123",
    "tipo": "Carro",
    "propietario": "Yolany Ramírez"
}

Respuesta esperada:

{
    "mensaje": "Vehículo registrado correctamente"
}

### 5. Consultar todos los vehículos

Método: GET  
Dirección: http://localhost:3000/vehiculos

Este servicio muestra la lista de vehículos registrados.

### 6. Consultar un vehículo por su identificador

Método: GET  
Dirección: http://localhost:3000/vehiculos/:id

En la dirección se debe reemplazar :id por el identificador del vehículo.

### 7. Actualizar un vehículo

Método: PUT  
Dirección: http://localhost:3000/vehiculos/:id

Datos enviados:

{
    "placa": "ABC123",
    "tipo": "Moto",
    "propietario": "Yolany Ramírez"
}

Este servicio modifica la información de un vehículo registrado.

### 8. Eliminar un vehículo

Método: DELETE  
Dirección: http://localhost:3000/vehiculos/:id

Este servicio elimina el vehículo correspondiente al identificador enviado.

## Herramientas utilizadas

- Visual Studio Code para escribir el código.
- Node.js para ejecutar la API.
- Express para crear los servicios web.
- MongoDB para almacenar la información.
- Mongoose para conectar la API con MongoDB.
- Postman para comprobar el funcionamiento de los servicios.
- Git y GitHub para controlar y guardar las versiones del proyecto.

## Ejecución del proyecto

Para iniciar la API se debe abrir una terminal en la carpeta del proyecto y ejecutar:

npm run dev

Cuando aparezcan los mensajes del servidor y de conexión exitosa, la API estará disponible en http://localhost:3000.