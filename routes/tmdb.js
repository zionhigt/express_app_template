const express = require('express');
const router  = express.Router()
const tmdbCtrl = require('../controllers/tmdb.js');

router.get("/categories", tmdbCtrl.categories);
router.get("/movie/:id", tmdbCtrl.movie);
router.get("/trending", tmdbCtrl.trending);

module.exports = router;