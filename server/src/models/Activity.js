const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficult: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        season: {
            type: DataTypes.ENUM('Invierno', 'Otoño', 'Primavera', 'Verano'),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('Recreativo', 'Religioso', 'Deportivo', 'Medicinal', 'Cultural', 'Gastronomico', 'Ecologico', 'Artistico', 'Ocio'),
            allowNull: false,
        },
    }, {
        timestamps: false
    });
};