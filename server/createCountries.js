const axios = require("axios");
const { Country } = require("./src/db"); 

//API local
const URL = "http://localhost:5000/countries";

//API de pagina web
// const URL = "https://restcountries.com/v3.1/all";

async function createCountries() {
    try {
      const response = await axios.get(URL);
      
      if (response.data.error) {
        console.log("Error: No se pudo obtener datos de los países.");
        return;
      }
      
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
          maps: { googleMaps }
        } = countryData;
        
        try {
          const defaultCapital = "No tiene capital";
          const countryContinent = countryData.continents[0];
          const countryName = common || countryData.name.official;
          const countryMap = googleMaps || countryData.maps.openStreetMaps;
          const countryCapital = Array.isArray(capital) ? capital[0] : capital || defaultCapital;

  
          await Country.create({
            id,
            name: countryName,
            image,
            continent: countryContinent,
            capital: countryCapital,
            subregion,
            area,
            poblation,
            maps: countryMap,
          });
          createdCountries++;
        } catch (error) {
          console.error("Error creating country:", error);
        }
      }
  
      console.log(`Se han creado ${createdCountries} countries`);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
  
module.exports = createCountries;