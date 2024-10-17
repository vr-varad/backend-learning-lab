const Tasks = require("../models/tasks.model");

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Tasks.find({});
    res.status(200).json({ tasks });
  } catch (error) {
    res.status(500).json({
      msg: error,
    });
  }
};

const createTasks = async (req, res) => {
  try {
    const task = await Tasks.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findOne({
      _id: taskId,
    });
    if (!task) {
      return res.status(404).json({ msg: `Task with Id ${taskId} Not Found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(200).json({ msg: error });
  }
};

const updateTasks = async (req, res) => {
  try {
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
      }
    );
    if (!task) {
      return res.status(404).json({ msg: `Task with Id ${taskId} Not Found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(200).json({ msg: error });
  }
};

const deleteTasks = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Tasks.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ msg: `Task with Id ${taskId} Not Found` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(200).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTasks,
  getTaskById,
  updateTasks,
  deleteTasks,
};
