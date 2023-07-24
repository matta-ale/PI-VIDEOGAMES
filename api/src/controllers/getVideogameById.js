const axios = require('axios');
const apiDataFormater = require('./apiDataFormater');
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;
const { Videogame, Genre } = require('../db.js');
const regexUUID =
  /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

  const getVideogameById = async (req, res) => {
    try {
      const { id } = req.params;
      let videogame = null;
  
      if (regexUUID.test(id)) {
        videogame = await Videogame.findByPk(id, { include: [Genre], attributes: { exclude: ['createdAt','updatedAt'] }, });
      }
  
      if (!videogame) {
        const { data } = await axios.get(`${URL}/games/${id}?${API_KEY_URL}`);
        const array = apiDataFormater([data]);
        res.status(200).json(array);
      } else {
        res.status(200).json(videogame);
      }
    } catch (error) {
      res.status(500).json(error.message);
      // res.status(error.response.status).json(error.message);
    }
  };

module.exports = getVideogameById;
