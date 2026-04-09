import Event from "../models/Event.js";

export const getEvents = async (_req, res) => {
  const events = await Event.find().populate("createdBy", "name role").sort({ date: 1 });
  res.json(events);
};

export const createEvent = async (req, res) => {
  const event = await Event.create({
    title: req.body.title,
    description: req.body.description,
    date: req.body.date,
    createdBy: req.user._id
  });
  res.status(201).json(event);
};

export const joinEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) return res.status(404).json({ message: "Event not found" });
  const joined = event.attendees.some((id) => id.toString() === req.user._id.toString());
  if (!joined) {
    event.attendees.push(req.user._id);
    await event.save();
  }
  res.json(event);
};
