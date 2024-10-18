const express = require("express");
require("express-async-errors");

const cluster = require("cluster");
const os = require("os");
const Server = require("./src");

const port = process.env.PORT || 8080;
const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process is running with PID: ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  const app = express();
  const server = new Server(app);

  app.listen(port, "localhost", () => {
    console.log(`Worker ${process.pid} running server on port ${port}`);
  });
}
