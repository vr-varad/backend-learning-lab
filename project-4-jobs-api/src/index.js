const express = require("express");
require("express-async-errors");
const cluster = require("cluster");
const os = require("os");
const App = require("./providers/App");

const nCPUs = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Master process is running with PID: ${process.pid}`);
  for (let i = 0; i < nCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Restarting...`);
    cluster.fork();
  });
} else {
  App.loadDatabase();
  App.loadServer();
}
