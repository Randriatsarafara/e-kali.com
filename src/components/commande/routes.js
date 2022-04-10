const express = require("express");
const Router = express.Router();
const Commandecontroller = require("./controller");
const utilitaire = require("../../utilitaire/checkAuthUser");

Router.get("/", Commandecontroller.allCommande);
Router.get("/detail/:idcommande", Commandecontroller.detail);
Router.post("/create", Commandecontroller.create);
Router.patch("/encours",utilitaire.checkAuthRestaurant ,Commandecontroller.commandeEnCours);
Router.patch("/all",utilitaire.checkAuthResponsable ,Commandecontroller.commandeAll);

Router.post("/listeDetail", Commandecontroller.listeDetailCommande);
module.exports = Router;