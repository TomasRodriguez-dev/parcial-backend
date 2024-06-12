const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./config/database');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida correctamente.');
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    }
})();

module.exports = app;