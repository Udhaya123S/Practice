const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');

const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Number: {
        type: DataTypes.STRING,
        validate: {
            is: /^[0-9]{10}$/,
        },
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            isIn: [['Male', 'Female', 'Other']],
        },
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'active',
    },
    photo: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    document: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']],
        },
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = User;
