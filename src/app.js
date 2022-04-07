const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { cors } = require("./kernel/cors");
const dotenv = require("dotenv");
const path = require("path");
const fs = require("fs");
dotenv.config();

const app = express();
//cors
app.use(cors);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve("./public")));  
app.use(helmet());

//database
require("./kernel/database");


const dirComponnent = path.join(__dirname + "/components/");
const components = fs.readdirSync(dirComponnent);
for (var i = 0; i < components.length; i++) {
    var routesPath = path.join(dirComponnent + components[i] + "/");
    var routes = fs.readdirSync(routesPath);
    for (var j = 0; j < routes.length; j++) {
        if (routes[j].indexOf("routes.js") != -1) {
            app.use("/"+components[i],require(routesPath + routes[j].slice(0, 6)));
        }
    }
}

app.all('*', (req, res) => {
    throw new Error("Route invalide !!!");
})

app.use((err, req, res, next) => {
    if (err.message === "Route invalide !!!") {
        res.status(404).json({ error: { message: err.message } });
    }
});


module.exports = app;