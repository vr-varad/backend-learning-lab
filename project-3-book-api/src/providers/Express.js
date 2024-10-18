const express = require("express");
const Routes = require("../routes");
const errorHandler = require("../middleware/errorHandler");
const port = process.env.PORT || 8080

class Express {
  static app = express();

  static init() {
    this.app.use(express.json());
    new Routes(this.app);
    this.app.use(errorHandler);
    this.app.listen(port, "localhost", () => {
      console.log(`Worker ${process.pid} running server on port ${port}`);
    });
  }
}

module.exports = Express;
