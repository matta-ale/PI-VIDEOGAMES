const { Videogame, Genre } = require('../db.js');
require('dotenv').config();
const { API_KEY_URL, URL } = process.env;

const postVideogame = async (req, res) => {
  const { name, description, platforms, image, released, rating, genreIds } =
    req.body;
  try {
    //completar acá el posteo a la BBDD
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
    if(!created) {
        res.status(409).send('Videogame already exists');
    } else {
        res.status(201).send(videogame);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = postVideogame;
