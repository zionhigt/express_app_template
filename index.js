const http = require("http");
const app = require("./app.js");
const PORT = process.env.PORT;
const server = http.createServer(app);

server.on("error", function(err) {
    console.error(err);
});

server.on("listening", function() {
    console.log("server is listening on")
    console.table({
        host: process.env.HOST,
        port: PORT
    })
})
console.log(server)
server.listen(PORT)