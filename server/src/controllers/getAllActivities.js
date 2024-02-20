const { Activity } = require("../db");

async function getAllActivities(req, res) {
  try {
    const activities = await Activity.findAll();

    return res.status(200).json(activities);
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
}

module.exports = {
  getAllActivities,
};
