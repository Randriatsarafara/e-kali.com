const express = require("express");
const Router = express.Router();
const Platcontroller = require("./controller");
const utilitaire = require("../../utilitaire/checkAuthUser");

Router.get("/", Platcontroller.allPlat);
Router.get("/actif", Platcontroller.platActif);
Router.post("/pannier/detail", Platcontroller.detailPannier);
Router.post("/create", Platcontroller.create);
Router.get("/all/:iduser", Platcontroller.platByUser);
Router.get("/detail/:id", Platcontroller.platById);
// Router.patch("/update",utilitaire.checkAuthRestaurant,Platcontroller.updateById);
Router.patch("/update",Platcontroller.updateById);

module.exports = Router;