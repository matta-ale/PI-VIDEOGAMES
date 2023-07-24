const { Router } = require('express');
const router = Router();
const getVideogames = require('../controllers/getVideogames')
const getVideogamesByName = require('../controllers/getVideogamesByName')
const getVideogameById = require('../controllers/getVideogameById');
const getGenres = require('../controllers/getGenres');
const postVideogame = require('../controllers/postVideogame');

router.get('/hc',(req,res) => {  //healthcheck
    res.status(200).send('Server up')
})

router.get('/videogames',getVideogames)
router.get('/videogames/name',getVideogamesByName)
router.get('/videogames/:id',getVideogameById)
router.get('/genres',getGenres)
router.post('/videogames',postVideogame)



module.exports = router;
