import express from "express";
import { createEvent, getEvents, joinEvent } from "../controllers/eventController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getEvents);
router.post("/", protect, authorize("admin"), createEvent);
router.post("/:id/join", protect, joinEvent);

export default router;
