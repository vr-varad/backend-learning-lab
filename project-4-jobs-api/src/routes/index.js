const jobsRouter = require("./jobs.router");

class Routes {
  constructor(app) {
    app.use("/api/v1/jobs", jobsRouter);
  }
}

module.exports = Routes;
