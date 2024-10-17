const asyncWrapper = require("../middleware/async");
const Tasks = require("../models/tasks.model");
const { NotFoundError } = require("../error/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find({});
  res.status(200).json({
    tasks,
    nTasks: tasks.length,
  });
});

const createTasks = asyncWrapper(async (req, res) => {
  const task = await Tasks.create(req.body);
  res.status(201).json({ task });
});

const getTaskById = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOne({
    _id: taskId,
  });
  if (!task) {
    return next(NotFoundError(`Task with Id ${taskId} Not Found`));
  }
  res.status(200).json({ task });
});

const updateTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findOneAndUpdate(
    {
      _id: taskId,
    },
    {
      $set: {
        name: req.body.name,
        completed: req.body.completed,
      },
    },
    {
      new: true,
      runValidators: true,
    }
  );
  if (!task) {
    return next(NotFoundError(`Task with Id ${taskId} Not Found`));
  }
  res.status(200).json({ task });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Tasks.findByIdAndDelete(taskId);
  if (!task) {
    return next(NotFoundError(`Task with Id ${taskId} Not Found`));
  }
  res.status(200).json({ task });
});

module.exports = {
  getAllTasks,
  createTasks,
  getTaskById,
  updateTasks,
  deleteTasks,
};
