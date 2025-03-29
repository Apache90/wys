const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  nombre: { type: DataTypes.STRING, allowNull: false },
  apellido: { type: DataTypes.STRING, allowNull: false },
  dni: { type: DataTypes.STRING, allowNull: false, unique: true },
  telefono: { type: DataTypes.STRING },
  rol: { type: DataTypes.ENUM('admin', 'paciente'), defaultValue: 'paciente' }
}, {
  timestamps: false
});

module.exports = User;
