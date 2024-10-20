const express = require("express");
const {
  getAllJobs,
  createJobs,
  updateJobs,
  getJobsById,
  deleteJob,
} = require("../controllers/jobs.controller");

class JobRoutes {
  router = express.Router();

  constructor() {
    this.intitializeRoutes();
  }

  intitializeRoutes() {
    this.router.route("/").get(getAllJobs).post(createJobs);
    this.router
      .route("/:id")
      .patch(updateJobs)
      .get(getJobsById)
      .delete(deleteJob);
  }
}

module.exports = new JobRoutes().router;
