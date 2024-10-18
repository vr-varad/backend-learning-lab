require("express-async-errors");
const express = require("express");
const { errorHandlerMiddleware } = require("./middlewares/errorHandler");
const notFoundMiddlware = require("./middlewares/notFound");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products.routes");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  return res.send("Store API");
});

app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddlware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    console.log("Connected To Database");
    app.listen(port, () => {
      console.log("Server Started At Port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
