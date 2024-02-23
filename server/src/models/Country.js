const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    officialName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    languages: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    area: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    poblation: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currencies: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    continent: {
      type: DataTypes.ENUM('Africa', 'Europe', 'Oceania', 'North America', 'South America', 'Asia', 'Antarctica'),
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    maps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
