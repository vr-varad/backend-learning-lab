const express = require("express");

class JobRoutes {
  router = express.Router();

  constructor() {
    this.intitializeRoutes()
  }

  intitializeRoutes() {
    this.router.route("/").get((req, res) => {
      res.send("hi this is varad");
    });
  }
}

module.exports = new JobRoutes().router;
