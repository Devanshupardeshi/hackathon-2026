import express from "express";
import {
  applyPlacement,
  createPlacement,
  getPlacements
} from "../controllers/placementController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPlacements);
router.post("/", protect, authorize("admin", "recruiter"), createPlacement);
router.post("/:id/apply", protect, authorize("student"), applyPlacement);

export default router;
