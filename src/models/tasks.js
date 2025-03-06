const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const TaskSchema = new mongoose.Schema({
  type: { type: String, required: true },
  taskId: { type: String, unique: true, default: uuidv4 },
  title: { type: String, required: true }, // Name of the chat group
  description: { type: String },
  creatorId: { type: Object, ref: "User" }, // Object of User references
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the group was created
});

const Task = mongoose.model("Task", TaskSchema);
module.exports = Task;
