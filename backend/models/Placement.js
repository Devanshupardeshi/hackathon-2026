import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    resumeUrl: { type: String, required: true }
  },
  { timestamps: true }
);

const placementSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, default: "" },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applications: [applicationSchema]
  },
  { timestamps: true }
);

export default mongoose.model("Placement", placementSchema);
