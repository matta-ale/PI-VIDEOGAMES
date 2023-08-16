//acá conecto sequelize con el server
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const axios = require('axios');
const { Genre } = require('../api/src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async () => {
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
  try {
    const genres = await Genre.findAll();
    if (genres.length===0) {
      await axios.get('http://localhost:3001/genres');
      console.log('getGenres endpoint called');
    }
  } catch (error) {
    console.error(error.message);
  }
});

//sync es una promesa, en el then levanto el server
