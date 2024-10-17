const getAllTasks = (req, res) => {
  res.send("get all tasks");
};

const createTasks = (req, res) => {
  res.send("post tasks");
};

const getTaskById = (req, res) => {
  res.send(`get task by Id ${req.params.id}`);
};

const updateTasks = (req, res) => {
  res.send("update tasks");
};

const deleteTasks = (req, res) => {
  res.send("delete tasks");
};

module.exports = {
  getAllTasks,
  createTasks,
  getTaskById,
  updateTasks,
  deleteTasks,
};
