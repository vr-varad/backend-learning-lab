const getAllJobs = (req, res) => {
  res.send("get All Jobs");
};

const createJobs = (req, res) => {
  res.send("create Jobs");
};

const updateJobs = (req, res) => {
  res.send("update Jobs");
};

const getJobsById = (req, res) => {
  res.send("get Jobs by id");
};

const deleteJob = (req, res) => {
  res.send("delete Jobs");
};

module.exports = {
  getAllJobs,
  createJobs,
  updateJobs,
  getJobsById,
  deleteJob,
};
