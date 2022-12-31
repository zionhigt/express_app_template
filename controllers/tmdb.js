const TMDB = require('../models/TMDB/model');
const tmdb = new TMDB("fr-FR");

exports.categories =  (req, res) => {
    tmdb.getCategoriesList()
    .then(function(response) {
        res.status(200).json(response.map(function(item) {
            return {
                name: item.name,
                moviesData: item.data.body.results.filter(function(movie) {
                    return movie.backdrop_path !== null || movie.poster_path !== null;
                }).map(function(movie) {
                    let backdrop = movie.backdrop_path;
                    if(backdrop == null) {
                        backdrop = movie.poster_path;
                    }
                    return {...movie, backdrop_path: backdrop}
                })
            }
        })
        .filter(function(category) {
            return category.moviesData.length >= 7;
        }));
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
};
exports.movie = (req, res) => {
    tmdb.getMovie(req.params.id)
    .then(function(response) {
        if(response.body.backdrop_path == null) {
            response.body.backdrop_path = response.body.poster_path;
        }
        res.status(200).json(response.body);
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
};
exports.trending = (req, res) => {
    tmdb.getTrending()
    .then(function(response) {
        res.status(200).json(response.body);
    })
    .catch(err => {
        console.log(err);
        const error = new Error(err);
        res.status(500).json({ error });
    });
}; 