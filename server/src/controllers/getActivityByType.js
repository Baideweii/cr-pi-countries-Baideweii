const { Country, Activity } = require("../db");

async function getActivityByType(req, res) {
  const { type } = req.params;

  try {
    const activities = await Activity.findAll({
      where: {
        type: type
      }
    });

    if (!activities || activities.length === 0) {
      return res.status(304).json({ message: "No se ha encontrado ninguna actividad con ese tipo." });
    }

    const activitiesIds = activities.map(activity => activity.id);

    const countries = await Country.findAll({
      include: [
        {
          model: Activity,
          where: {
            id: activitiesIds
          },
        }
      ]
    });

    if (!countries || countries.length === 0) {
      return res.status(304).json({ message: "No se ha encontrado ningún país con actividades de ese tipo." });
    }

    return res.status(200).json(countries);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getActivityByType,
};
