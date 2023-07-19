const axios = require('axios');
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;
const { Genre } = require('../db.js')

const getGenres = async (req, res) => {
  try {
    const { data } = await axios.get(`${URL}/genres${API_KEY_URL}`);
    let genresArray = [];
    await data.results.forEach(async (genreObj) => {
      genresArray.push({ id: genreObj.id, name: genreObj.name });
    });
    Genre.bulkCreate(genresArray,{ignoreDuplicates: true})
    res.status(200).send(genresArray);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getGenres;
