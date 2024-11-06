import express from "express";
import https from "https";
import fs from "fs";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", (req, res) => {
  res.send("POST request to the homepage");
});

https
  .createServer(
    {
      key: fs.readFileSync("server.key"),
      cert: fs.readFileSync("server.cert"),
    },
    app
  )
  .listen(3000, () => {
    console.log("Listening on port 3000");
  });
