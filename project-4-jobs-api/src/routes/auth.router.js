const express = require("express");
const { register, login } = require("../controllers/auth.controller");

class AuthRoutes {
  router = express.Router();

  constructor() {
    this.intitializeRoutes();
  }

  intitializeRoutes() {
    this.router.route("/register").post(register);
    this.router.route("/login").post(login);
  }
}

module.exports = new AuthRoutes().router;
