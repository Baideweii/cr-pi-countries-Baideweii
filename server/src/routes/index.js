const { Router } = require("express");
const { getAllCountries } = require("../controllers/getAllCountries");
const { getCountryById } = require("../controllers/getCountriesById");
const { getCountryByName } = require("../controllers/getCountriesByName");
const { postActivity } = require("../controllers/postActivity");
const { getAllActivities } = require("../controllers/getAllActivities");
const { getActivityByType } = require("../controllers/getActivityByType");
const { deleteActivity } = require("../controllers/deleteActivity");

const router = Router();

router.get('/countries', getAllCountries);
router.get("/countries/name", getCountryByName);
router.get("/countries/:countryId", getCountryById);
router.get("/activities", getAllActivities);
router.get("/activities/:type", getActivityByType);
router.delete("/activities/:name", deleteActivity);
router.post("/activities", postActivity);

module.exports = router;
