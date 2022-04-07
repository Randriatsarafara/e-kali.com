const http = require("http");

const app = require("./src/app.js");

const server = http.createServer(app);

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log("Le serveur est en cours !!!");
});