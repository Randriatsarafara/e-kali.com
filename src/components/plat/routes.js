const express = require("express");
const Router = express.Router();
const Platcontroller = require("./controller");

Router.get("/", Platcontroller.allPlat);
Router.get("/actif", Platcontroller.platActif);

module.exports = Router;