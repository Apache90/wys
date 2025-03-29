const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Image = sequelize.define('Image', {
  filename: { type: DataTypes.STRING, allowNull: false },
  upload_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  timestamps: false
});

Image.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Image;
