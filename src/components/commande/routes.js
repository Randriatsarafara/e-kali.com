const express = require("express");
const Router = express.Router();
const Commandecontroller = require("./controller");

Router.get("/", Commandecontroller.allCommande);
Router.get("/commande/:idcommande", Commandecontroller.detail);

module.exports = Router;