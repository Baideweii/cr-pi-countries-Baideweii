const { Activity, Country } = require("../db");

const postActivity = async (req, res) => {
  try {
    const { name, difficult, duration, season, type, countries } = req.body;

    if (![name, difficult, duration, season, type, countries].every(Boolean)) {
      return res.status(401).json({ message: 'Faltan datos' });
    }

    const [activity, created] = await Activity.findOrCreate({
        where: { name, difficult, duration, season, type },
      });

    if (!created) {
        return res.status(200).json({
          message: `La actividad "${name}" ya existe.`,
        });
    }

    const relatedCountries = await Country.findAll({
      where: { name: countries }
    });

    await activity.addCountries(relatedCountries);

    await Promise.all(relatedCountries.map(country => country.addActivity(activity)));

    return res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { postActivity };
