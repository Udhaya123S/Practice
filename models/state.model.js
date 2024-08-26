const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const Country = require('./country.model');

const State = sequelize.define('state', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    default: true,
  },
  countryId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'countries',
      key: 'id',
    },
    onDelete: 'CASCADE',   
    onUpdate: 'CASCADE',    
  }
});

Country.hasMany(State, { foreignKey: 'countryId' });
 State.belongsTo(Country, { foreignKey: 'countryId' });

module.exports = State;
