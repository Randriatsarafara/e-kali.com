const express = require("express");
const Router = express.Router();
const Typecontroller = require("./controller");

Router.get("/", Typecontroller.allType);

module.exports = Router;