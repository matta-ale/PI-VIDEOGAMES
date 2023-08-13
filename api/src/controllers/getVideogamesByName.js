const axios = require('axios');
const apiDataFormater = require('./apiDataFormater');
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;
const { Videogame, Genre } = require('../db.js');
const { Op } = require('sequelize');

const getVideogamesByName = async (req, res) => {
  try {
    const { name } = req.query;
    const dbArray = await Videogame.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: [Genre], attributes: { exclude: ['createdAt','updatedAt'] }
    });
    const { data } = await axios.get(
      `${URL}/games?search=${name}&${API_KEY_URL}`
    );

    const apiArray = apiDataFormater(data.results);
    const outputArray = [...dbArray, ...apiArray].slice(0, 15);
    if (outputArray.length > 0) {
      res.status(200).json(outputArray);
    } else {
      res.status(404).send('No videogames match that criteria');
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getVideogamesByName;
