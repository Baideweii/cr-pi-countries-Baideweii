const { Router } = require("express");
const { getAllCountries } = require("../controllers/getAllCountries");
const { getCountryById } = require("../controllers/getCountriesById");
const { getCountryByName } = require("../controllers/getCountriesByName");

const router = Router();

router.get("/countries/name", getCountryByName); 
router.get('/countries', getAllCountries);
router.get("/countries/:idPais", getCountryById);

module.exports = router;
