const express = require("express");
const app = express();
const taskRouter = require("./routes/tasks.router");
const connectDB = require("./db/connect");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const port = 3000;

// middleware
app.use(express.json());

// routes
app.get("/hello", (req, res) => {
  res.send("hi from server");
});

app.use("/api/v1/tasks", taskRouter);

app.use(notFound);

app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URL);
    console.log("DB Connected");
    app.listen(port, () => {
      console.log("Server Starting At Port", port);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
