const express = require('express');
const app = express();
global.__basedir = __dirname;
app.use((req, res, next)=>{
	res.setHeader('Access-Control-Allow-Origin', process.env.AccessControlAllowOrigin); //https://zionhigt.github.io
	res.setHeader('Access-Control-Allow-Headers', 'x-www-urlencode, x-Content-Type,  Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	res.setHeader('Access-Control-Allow-Credentials', 'true');
	next();
});
app.use(express.json());

const messagesRoutes = require("./routes/messages.js");
app.use('/messages', messagesRoutes)

const tmdbRoutes = require("./routes/tmdb.js");
app.use("/TMDB", tmdbRoutes);

const path = require("path");
app.use(["/"], express.static(path.join(__dirname, "public")));
app.use(["/dist"], express.static(path.join(__dirname, "bower_components")));
app.use(function(req, res, next) {
    if (req.headers.referer) {
        console.log([
            "\x1b[35m" + new Date(),
            "\x1b[36m" + req.method,
            "\x1b[33m" + req.headers.referer
        ].join("  ")  + "\x1b[37m");
    }
    next();
})

module.exports = app;