const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wys_img', 'root', '4799', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
