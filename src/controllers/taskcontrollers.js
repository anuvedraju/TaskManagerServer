const { default: mongoose } = require("mongoose");
const Tasks = require("../models/tasks");
const User = require("../models/users");

exports.getAllTasksForUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const tasks = await Tasks.find({ creatorId: userId });

    if (tasks.length === 0) {
      return res
        .status(404)
        .json({ message: "No task items found for the user" });
    }

    res
      .status(200)
      .json({ message: "Tasks groups retrieved successfully", tasks });
  } catch (error) {
    console.error("Error fetching task groups:", error);
    res.status(500).json({ message: "Error fetching chat groups", error });
  }
};

exports.createTask = async (req, res) => {
  const { title, description, creatorId, type } = req.body;
  console.log("taskrequest", req.body);

  try {
    const task = new Tasks({ title, description, creatorId, type });
    await task.save();
    res.status(201).json({ message: "Task group created", task });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating chat group", error });
  }
};

exports.deleteTasks = async (req, res) => {
  const { taskIds } = req.body; // Expecting an array of task IDs

  if (!Array.isArray(taskIds) || taskIds.length === 0) {
    return res
      .status(400)
      .json({ message: "Invalid request. Provide an array of task IDs." });
  }

  try {
    const result = await Tasks.deleteMany({ taskId: { $in: taskIds } });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No matching tasks found for deletion." });
    }

    res.status(200).json({
      message: "Tasks deleted successfully",
      deletedCount: result.deletedCount,
      deletedTaskIds: taskIds,
    });
  } catch (error) {
    console.error("Error deleting tasks:", error);
    res.status(500).json({ message: "Error deleting task groups", error });
  }
};

exports.updateTask = async (req, res) => {
  const { action, taskId } = req.params;
  const { title, description } = req.body;

  try {
    const task = await Tasks.findOne({ taskId });
    if (!task) {
      return res.status(404).json({ message: "Task group not found" });
    }

    if (action === "complete") {
      task.type = "completed";
    } else {
      task.title = title;
      task.description = description;
    }
    await task.save();
    res.status(200).json({ message: "Title changed from task group", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error changing title from task group", error });
  }
};
exports.searchTaskByName = async (req, res) => {
  const { userId, taskName } = req.params;

  try {
    const tasks = await Tasks.find({
      creatorId: userId,
      title: { $regex: new RegExp(taskName, "i") }, // Case-insensitive search
    });

    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found with that name" });
    }

    res.status(200).json({ message: "Tasks found", tasks });
  } catch (error) {
    console.error("Error searching for tasks:", error);
    res.status(500).json({ message: "Error searching for tasks", error });
  }
};
