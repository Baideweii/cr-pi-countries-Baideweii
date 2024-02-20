const { Country } = require("../db");

async function getAllCountries(req, res) {
  try {
    const countries = await Country.findAll();

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  getAllCountries,
};
