const express = require("express");
const {
  createTask,
  deleteTask,
  updateTask,
  getAllTasksForUser,
  deleteTasks,
  searchTaskByName,
} = require("../controllers/taskcontrollers");
const authenticateToken = require("../middlewares/authmiddleware");

const router = express.Router();

router.get("/gettasks/:userId", authenticateToken, getAllTasksForUser);
router.post("/create", authenticateToken, createTask);
router.delete("/delete",authenticateToken, deleteTasks);
router.post("/update/:action/:taskId",authenticateToken, updateTask);
router.get("/search/:userId/:taskName", searchTaskByName);

module.exports = router;
