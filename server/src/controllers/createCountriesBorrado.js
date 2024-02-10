const axios = require("axios");
const { Country } = require("../db");

const URL = "http://localhost:5000/countries";

async function createCountries(req, res) {
  try {
    const DEFAULT_CAPITAL = "No tiene capital";
    const response = await axios.get(URL);

    if (response.data.error) {
      return res.status(404).send("Not found");
    } else {
      const countriesData = response.data;

      let createdCountries = 0;

      for (let countryData of countriesData) {
        const {
          cca3: id,
          name: { common },
          flags: { png: image },
          capital,
          subregion,
          area,
          population: poblation,
        } = countryData;

        try {
          const countryContinent = countryData.continents[0];
          const countryName = common || countryData.name.official;
          const countryCapital = Array.isArray(capital) ? capital[0] : capital || DEFAULT_CAPITAL;

          await Country.create({
            id,
            name: countryName,
            image,
            continent: countryContinent,
            capital: countryCapital,
            subregion,
            area,
            poblation,
          });
          createdCountries++;
        } catch (error) {
          console.error("Error creating country:", error);
        }
      }

      return res
        .status(200)
        .send(`Se crearon ${createdCountries} países correctamente`);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

module.exports = {
  createCountries,
};
