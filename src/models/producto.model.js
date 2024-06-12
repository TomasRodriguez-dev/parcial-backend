const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.DECIMAL
    },
    cantidad: {
        type: DataTypes.INTEGER
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }

});

module.exports = Producto;