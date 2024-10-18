const express = require("express");
const Routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

class Server {
  constructor(app) {
    app.use(express.json());
    new Routes(app);
    app.use(errorHandler);
  }
}

module.exports = Server;
