const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Image = sequelize.define('Image', {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.BLOB('long'),
    allowNull: false
  },
  filename: {
    type: DataTypes.STRING
  },
  mimetype: {
    type: DataTypes.STRING
  },
  upload_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'images'
});

Image.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Image;
