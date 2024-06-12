const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const sequelize = require('./config/database');
const productoRoutes = require('./routes/producto.routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/productos', productoRoutes);

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexion a la base de datos establecida correctamente.');

        await sequelize.sync();
        console.log('Modelos sincronizados correctamente con la base de datos.');
    } catch (error) {
        console.error('Error al conectar o sincronizar la base de datos:', error);
    }
})();

module.exports = app;