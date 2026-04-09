import Post from "../models/Post.js";

export const getPosts = async (_req, res) => {
  const posts = await Post.find()
    .populate("author", "name role")
    .populate("comments.user", "name")
    .sort({ createdAt: -1 });
  res.json(posts);
};

export const createPost = async (req, res) => {
  const { content, category } = req.body;
  const post = await Post.create({ author: req.user._id, content, category });
  res.status(201).json(post);
};

export const likePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const alreadyLiked = post.likes.some((id) => id.toString() === req.user._id.toString());
  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== req.user._id.toString());
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json(post);
};

export const addComment = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  post.comments.push({ user: req.user._id, text: req.body.text });
  await post.save();
  await post.populate("comments.user", "name");
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).json({ message: "Post not found" });
  const isOwner = post.author.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "Not allowed" });
  }
  await post.deleteOne();
  res.json({ message: "Post removed" });
};
