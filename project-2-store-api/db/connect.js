const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    dbName: "store-api",
  });
};

module.exports = connectDB
