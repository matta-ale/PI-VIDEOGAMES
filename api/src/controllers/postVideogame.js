const isValidReleaseDate = require('./dateFormatValidator')
const { Videogame, Genre } = require('../db.js');
require('dotenv').config();

const postVideogame = async (req, res) => {
  const { name, description, platforms, image, released, rating, genreIds } =
    req.body;
  if (
    !name ||
    !description ||
    platforms.length===0 ||
    !image ||
    !released ||
    !rating ||
    genreIds.length===0
  ) {
    res.status(400).send('Please complete all the data');
  } else if (!isValidReleaseDate(released)) {
    res.status(400).send('released must be a date with format "YYYY-MM-DD"'); 
  } else {
    try {
      const [videogame, created] = await Videogame.findOrCreate({
        where: { name },
        defaults: { description, platforms, image, released, rating },
        include: [
          {
            model: Genre,
            where: { id: genreIds },
          },
        ],
      });
      await videogame.addGenre(genreIds);
      if (!created) {
        res.status(409).send('Videogame already exists');
      } else {
        res.status(201).send(videogame);
      }
    } catch (error) {
      res.status(500).json(error.message);
    }
  }
};

module.exports = postVideogame;
