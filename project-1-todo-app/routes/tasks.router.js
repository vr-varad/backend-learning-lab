const express = require("express");
const {
  getAllTasks,
  createTasks,
  getTaskById,
  updateTasks,
  deleteTasks,
} = require("../controllers/tasks.controller");

const router = express.Router();

router.route("/").get(getAllTasks).post(createTasks);
router.route("/:id").get(getTaskById).patch(updateTasks).delete(deleteTasks);

module.exports = router;
