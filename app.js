const express = require("express");
const app = express();

const path = require("path");

app.use(["/"], express.static(path.join(__dirname, "public")));
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