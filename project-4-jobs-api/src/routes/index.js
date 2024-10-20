const authRouter = require("./auth.router");
const jobsRouter = require("./jobs.router");

class Routes {
  constructor(app) {
    app.use("/api/v1/jobs", jobsRouter);
    app.use("/api/v1/auth", authRouter);
  }
}

module.exports = Routes;
