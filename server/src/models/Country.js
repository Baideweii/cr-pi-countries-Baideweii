const { DataTypes, STRING } = require('sequelize');

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
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    continent: {
      type: DataTypes.ENUM('Africa', 'Europe', 'Oceania', 'North America', 'South America', 'Asia', 'Antarctica'),
      allowNull: false,
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subregion: {
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
    maps: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
  });
};
