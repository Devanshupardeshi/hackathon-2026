import express from "express";
import {
  addComment,
  createPost,
  deletePost,
  getPosts,
  likePost
} from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPosts);
router.post("/", protect, createPost);
router.patch("/:id/like", protect, likePost);
router.post("/:id/comment", protect, addComment);
router.delete("/:id", protect, deletePost);

export default router;
