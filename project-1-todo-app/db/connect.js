const mongoose = require("mongoose");

const connectDB = (url) => {
  mongoose.connect(url, {
    dbName: "task-manager",
  });
};

module.exports = connectDB;
