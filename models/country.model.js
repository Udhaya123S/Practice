const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');  

const Country = sequelize.define(
  'country',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Country name cannot be empty',
        }
      },
    },
    code: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Country code cannot be empty',
        },
        len: {
          args: [2, 3],
          msg: 'Country code must be between 2 and 3 characters long',
        },
      },
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Status code must be an integer',
        },
      },
    },
  },
);

module.exports = Country;
