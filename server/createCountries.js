const axios = require("axios");
const { Country } = require("./src/db"); 

//API local
// const URL = "http://localhost:5000/countries";

//API de pagina web
const URL = "https://restcountries.com/v3.1/all";

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
        try {
          const defaultCapital = "No tiene capital";
  
          await Country.create({
            id: countryData.cca3,
            name: countryData.name.common,
            officialName: countryData.name.official,
            image: countryData.flags.png,
            coat: countryData.coatOfArms.png,
            capital: Array.isArray(countryData.capital) ? countryData.capital[0] : countryData.capital || defaultCapital,
            languages: countryData.languages ? Object.values(countryData.languages).join(', ') : null, // Convertir las claves del objeto languages en una cadena de texto separada por comas
            area: countryData.area,
            poblation: countryData.population,
            currencies: countryData.currencies ? Object.values(countryData.currencies)[0].name : null, // Extraer el nombre de la primera moneda si existe
            continent: countryData.continents[0],
            subregion: countryData.subregion,
            maps: countryData.maps.googleMaps,
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