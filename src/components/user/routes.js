const express = require("express");
const Router = express.Router();
const Usercontroller = require("./controller");
const utilitaire = require("../../utilitaire/checkAuthUser");

Router.get("/", Usercontroller.allUser);
Router.patch("/admin/all", utilitaire.checkAuthResponsable, Usercontroller.userAll);
Router.post("/create", Usercontroller.create);
Router.post("/login", Usercontroller.login);
Router.get("/resto", Usercontroller.allResto);
Router.patch("/livreur", utilitaire.checkAuthResponsable, Usercontroller.allLivreur);
Router.get("/:iduser", Usercontroller.userById);
Router.post("/contact/mail", Usercontroller.sendMail);

module.exports = Router;