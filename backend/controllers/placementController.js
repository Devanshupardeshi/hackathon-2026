import Placement from "../models/Placement.js";

const populatePostedBy = (query) => query.populate("postedBy", "name role email");

export const getPlacements = async (_req, res) => {
  const placements = await populatePostedBy(Placement.find().sort({ createdAt: -1 }));
  res.json(placements);
};

export const createPlacement = async (req, res) => {
  const placement = await Placement.create({
    title: req.body.title,
    company: req.body.company,
    description: req.body.description,
    postedBy: req.user._id
  });
  const full = await populatePostedBy(Placement.findById(placement._id));
  res.status(201).json(full);
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
  const updated = await populatePostedBy(Placement.findById(placement._id));
  res.json(updated);
};
