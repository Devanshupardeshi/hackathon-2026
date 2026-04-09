import Event from "../models/Event.js";
import Placement from "../models/Placement.js";
import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  const [upcomingEvents, tasks, placements] = await Promise.all([
    Event.find({ date: { $gte: new Date() } }).sort({ date: 1 }).limit(5),
    Task.find({ owner: req.user._id }).sort({ createdAt: -1 }).limit(5),
    Placement.find().populate("postedBy", "name role email").sort({ createdAt: -1 }).limit(5)
  ]);

  res.json({
    welcome: `Welcome back, ${req.user.name}!`,
    upcomingEvents,
    tasks,
    placements,
    aiSuggestions: [
      "Block 90 minutes daily for deep work.",
      "Convert placement JD requirements into weekly goals.",
      "Use sprint planning for project submissions."
    ]
  });
};
