const bookrouter = require("./book.routes");

class Routes {
  constructor(app) {
    app.use("/api/v1/books", bookrouter);
  }
}

module.exports = Routes
