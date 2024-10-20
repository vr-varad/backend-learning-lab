const express = require("express");
const errorHandlerMiddleware = require("../middlewares/errorHandler");
const Routes = require("../routes");
require("dotenv").config();

const port = process.env.PORT || 3000;

class Express {
  static app = express();

  static init() {
    this.app.use(express.json());
    this.app.use(errorHandlerMiddleware);
    this.app.get("/", (req, res) => {
      res.send("Jobs API");
    });
    new Routes(this.app);
    this.app.listen(port, () => {
      console.log(`Server Starting on PORT ${port}`);
    });
  }
}

module.exports = Express;
