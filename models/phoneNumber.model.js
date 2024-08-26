const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const PhoneNumber = sequelize.define('PhoneNumber', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {  // Add the 'type' field
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  tableName: 'phone_numbers',
  timestamps: true,
});

module.exports = PhoneNumber;
