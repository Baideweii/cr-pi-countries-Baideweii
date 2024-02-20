const { Country } = require("../db");
const { Op } = require("sequelize");

async function getCountryByName(req, res) {
  const { name } = req.query;

  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });

    if (!countries) {
      return res.status(404).json({ message: "No se ha encontrado ningún país con ese nombre."});
    }

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getCountryByName,
};
