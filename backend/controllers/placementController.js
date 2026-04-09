import Placement from "../models/Placement.js";

export const getPlacements = async (_req, res) => {
  const placements = await Placement.find().sort({ createdAt: -1 });
  res.json(placements);
};

export const createPlacement = async (req, res) => {
  const placement = await Placement.create({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    postedBy: req.user._id
  });
  res.status(201).json(placement);
};

export const applyPlacement = async (req, res) => {
  const placement = await Placement.findById(req.params.id);
  if (!placement) return res.status(404).json({ message: "Placement not found" });
  const alreadyApplied = placement.applications.some(
    (app) => app.applicant.toString() === req.user._id.toString()
  );
  if (alreadyApplied) return res.status(400).json({ message: "Already applied" });
  placement.applications.push({ applicant: req.user._id, resumeUrl: req.body.resumeUrl });
  await placement.save();
  res.json(placement);
};
