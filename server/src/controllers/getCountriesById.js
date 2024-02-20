const { Country, Activity } = require("../db");

async function getCountryById(req, res) {
  const { countryId } = req.params;

  try{
      const country = await Country.findOne({
          where:{
              id: countryId.toUpperCase()
          },
          include: [Activity]
      });

    if (!country) {
      return res.status(404).json({message: "No se ha encontrado ningún país con ese ID."});
    }

    return res.status(200).json(country);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  getCountryById,
};
