import Task from "../models/Task.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ owner: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = await Task.create({
    owner: req.user._id,
    title: req.body.title,
    description: req.body.description
  });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  task.title = req.body.title ?? task.title;
  task.description = req.body.description ?? task.description;
  if (typeof req.body.completed === "boolean") task.completed = req.body.completed;
  await task.save();
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });
  if (!task) return res.status(404).json({ message: "Task not found" });
  await task.deleteOne();
  res.json({ message: "Task removed" });
};
