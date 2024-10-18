const mongoose = require("mongoose");
require("dotenv").config();

class Database {
  static init() {
    mongoose
      .connect(process.env.MONGO_URL, {
        dbName: "book-store",
      })
      .then(() => {
        console.log("DB Connected");
      });
  }
}

module.exports = Database;
