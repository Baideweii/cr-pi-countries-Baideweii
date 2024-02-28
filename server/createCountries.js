const axios = require("axios");
const { Country } = require("./src/db"); 

//API local
const URL = "http://localhost:5000/countries";

//API web
// const URL = "https://restcountries.com/v3.1/all";

async function createCountries() {
    try {
      const response = await axios.get(URL);
      
      if (response.data.error) {
        console.log(response.data.error);
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
            poblation: countryData.population,
            maps: countryData.latlng,
            continent: countryData.continents[0],
            coat: countryData.coatOfArms.png ? countryData.coatOfArms.png : null,
            area: countryData.area ? countryData.area : null,
            subregion: countryData.subregion ? countryData.subregion : null,
            capital: Array.isArray(countryData.capital) ? countryData.capital[0] : countryData.capital || defaultCapital,
            languages: countryData.languages ? Object.values(countryData.languages).join(', ') : null, 
            currencies: countryData.currencies ? Object.values(countryData.currencies)[0].name : null,
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