const axios = require('axios');
const apiDataFormater = require('./apiDataFormater')
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;
const {Videogame, Genre} = require('../db.js');

const getVideogames = async (req, res) => {
  let rawArray = [];
  let pageCount = 0;
  let next = `${URL}/games?${API_KEY_URL}`;
  try {
    
    const localArray = await Videogame.findAll({include:{model:Genre,attributes:['id','name']}})
    
    while (pageCount < 5) {
      pageCount += 1;
      const { data } = await axios.get(next);
      rawArray = [...rawArray, ...data.results];
      next = data.next;
    }
    let array = apiDataFormater(rawArray)
    
    array = [...localArray,...array]
    res.status(200).json(array);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = getVideogames;
