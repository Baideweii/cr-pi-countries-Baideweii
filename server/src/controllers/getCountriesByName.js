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

    if (!countries || countries.length === 0) {
      return res.status(404).send("No se ha encontrado ningún país con ese nombre.");
    }

    return res.status(200).send(countries);
  } catch (error) {
    console.error("Error al obtener países por nombre:", error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getCountryByName,
};
