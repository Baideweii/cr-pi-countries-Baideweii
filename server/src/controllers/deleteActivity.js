const { Activity } = require("../db");
const { Op } = require("sequelize");

async function deleteActivity(req, res) {
  const { name } = req.params;

  try{
      const activity = await Activity.findOne({
        where: {
            name: {
              [Op.iLike]: `%${name}%`,
            },
      },
    })
    if (!activity) {
      return res.status(404).json({message: "No se ha encontrado ninguna actividad con ese nombre"});
    }

    await activity.destroy();

    return res.status(200).json({message: "Actividad borrada con exito"})
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

module.exports = {
  deleteActivity,
};
