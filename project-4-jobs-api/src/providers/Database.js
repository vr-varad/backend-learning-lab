const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URL || "mongodb://localhost:27017/";

class Database {
  static init() {
    mongoose
      .connect(url, {
        dbName: "jobs-api",
      })
      .then(() => {
        console.log("Database Connnected");
      });
  }
}

module.exports = Database;
