require('dotenv').config();
const path = require('path');

const express = require('express');
const cors = require('cors')


const { dbConnection } = require('./database/config');

//crear el servidor express
const app = express();

//configurar cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

dbConnection();
//mean_user
//7aviNU0XbQaPFkqD
//138.59.11.239





//Directorio publico
app.use( express.static('public'));

//rutas

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));

//luego de desplegar agregar esta redireccion de las rutas
app.use('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto # ' + process.env.PORT);
})