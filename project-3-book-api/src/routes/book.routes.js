const { Router } = require("express");
const { getAllBooks } = require("../controllers/book.controller");

class BookRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.route("/").get(getAllBooks);
  }
}

module.exports = new BookRoutes().router;
