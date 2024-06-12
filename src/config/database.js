const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('parcial_backend', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
