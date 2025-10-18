const { DataTypes } = require('sequelize');
const sequelize = require('../../config/config.js');

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  passwordHash: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: 'Users',
  timestamps: true
});

module.exports = User;
