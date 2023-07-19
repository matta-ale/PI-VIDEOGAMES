const axios = require('axios');
const apiDataFormater = require('./apiDataFormater');
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;

const getVideogameById = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(`${URL}/games/${id}${API_KEY_URL}`);
    let rawArray = [data]
    const array = apiDataFormater(rawArray);
    res.status(200).json(array);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getVideogameById;
