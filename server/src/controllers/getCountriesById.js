const { Country } = require("../db");

async function getCountryById(req, res) {
  const { idPais } = req.params;

  try {
    const country = await Country.findOne({
      where: {
        id: idPais.toUpperCase() 
      },
    });

    if (!country) {
      return res.status(404).send("No se ha encontrado ningún país con ese ID.");
    }

    return res.status(200).send(country);
  } catch (error) {
    console.error("Error al obtener país por ID:", error);
    return res.status(500).send(error.message);
  }
};

module.exports = {
  getCountryById,
};
