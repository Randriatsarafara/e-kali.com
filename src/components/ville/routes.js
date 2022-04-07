const express = require("express");
const Router = express.Router();
const Villecontroller = require("./controller");

Router.get("/", Villecontroller.allVille);

module.exports = Router;