const express = require("express");
const errorHandler = require("./middlewares/errorHandler");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 6000;

app.use(express.json())

app.use(errorHandler    )

const start = () => {
  try {
    app.listen(port, () => {
      console.log("Server Started At Port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
