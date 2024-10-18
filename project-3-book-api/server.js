const express = require("express");
require("express-async-errors");
const Server = require("./src");

const port = process.env.PORT || 8080;

const app = express();
const server = new Server(app);

app.listen(port, "localhost", () => {
  console.log(`Server is running on port ${port}`);
});
