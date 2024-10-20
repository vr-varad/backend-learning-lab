const Database = require("./Database");
const Express = require("./Express");

class App {
  static loadDatabase() {
    Database.init();
  }

  static loadServer() {
    Express.init();
  }
}

module.exports = App;
