const { asyncXhr } = require("../../api/xhr")

class TMDB{
    /**
     * Provide TMDB api connector
     * @param {*} lang 
     */
    constructor(lang) {
        this.host = "https://api.themoviedb.org";
        this.api_key = process.env.API_KEY;
        this.token = process.env.TOKEN;
        this.lang = lang;

    }
    
    /**
     * Generate connexion options
     * @returns 
     */
    _getAuthOptions() {
        const defaultParams = {
            api_key: process.env.API_KEY,
            language: this.lang
        };
        const params = this.buildParams(defaultParams, true);
        const options = {
            headers: {
                "Autorization": "Bearer " + process.env.TOKEN
            }
        }
        return {
            params,
            options
        }
    }
    /**
     * Transform object attributes to querystring params, head=true for first or only querystring
     * @param {Boolean} head 
     */
    buildParams(params, head=false) {
        const startChr = head ? "?":"&";
        params = new URLSearchParams(params);
        const queryString = startChr + params.toString();
        return encodeURI(queryString);
    }
    /**
     * Prepare request url and options
     * @param {String} path 
     * @param {Array(String)} params 
     * @returns {Object(url: String, options: Object(params: String, options: Object(headers: Object(Autorization: Token))))}
     */
    _buildRequest(path, params={}) {
        const authOptions = this._getAuthOptions()
        const options = authOptions.options;
        const requestParams = authOptions.params + this.buildParams(params);
        const url = `${this.host}${path}${requestParams}`;
        return {
            url,
            options

        }
    }
    /**
     * GET route with minimal options
     * @param {*} path 
     * @returns 
     */
    get(path) {
        const request = this._buildRequest(path);
        return asyncXhr(request);
    }
    /**
     * GET trending movie of the week
     * @returns 
     */
    getTrending() {
        const request = this._buildRequest("/3/trending/movie/week");
        return asyncXhr(request);
    }
    /**
     * GET movies categories list
     * @returns 
     */
    async getCategoriesList() {
        const request = this._buildRequest("/3/genre/movie/list");
        const list =  await asyncXhr(request);
        const categoryPromises = list.body.genres.map(categoryDigest => {
            return this.getCategory(categoryDigest);
        });
        return Promise.all(categoryPromises);
    }
    /**
     * Discover route
     * TODO: Dynamic domain filter
     * @returns Promise asyncXhr
     */
    discoverMovie(params=null) {
        if(params === null) {
            params = {
                sort_by: "popularity",
                include_adult: "false",
                include_video: "false",
                page: "1"
            };
        }
        const request = this._buildRequest("/3/discover/movie", params);
        return asyncXhr(request);
    }

    async getCategory(genre) {
        const params = {
            sort_by: "popularity",
            include_adult: "false",
            include_video: "false",
            page: "1",
            with_genres: genre.id
        };
        return Promise.resolve({name: genre.name, data: await this.discoverMovie(params)});
    }
    /**
     * GET movie by id
     * @param {int} id 
     * @returns Promise asyncXhr()
     */
    getMovie(id) {
        const request = this._buildRequest(`/3/movie/${id}`);
        return asyncXhr(request);
    }

}
module.exports = TMDB
