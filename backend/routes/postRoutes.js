const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage });

// GET all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new post (without image upload)
router.post("/", auth, async (req, res) => {
  try {
    const newPost = new Post({
      ...req.body,
      user: req.user.id,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST create new post with image upload
router.post("/upload", [auth, upload.single("image")], async (req, res) => {
  try {
    const newPost = new Post({
      title: req.body.title,
      description: req.body.description,
      source: req.body.source,
      category: req.body.category,
      imageUrl: `/uploads/${req.file.filename}`,
      user: req.user.id,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH update post
router.patch("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   PUT api/posts/:id/save
// @desc    Save a post
// @access  Private
router.put("/:id/save", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.savedPosts.includes(req.params.id)) {
      return res.status(400).json({ msg: "Post already saved" });
    }
    user.savedPosts.push(req.params.id);
    await user.save();
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id/save
// @desc    Unsave a post
// @access  Private
router.delete("/:id/save", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    user.savedPosts = user.savedPosts.filter(
      (postId) => postId.toString() !== req.params.id
    );
    await user.save();
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/myposts
// @desc    Get all posts by user
// @access  Private
router.get("/myposts", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/saved/posts
// @desc    Get all saved posts
// @access  Private
router.get("/saved/posts", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("savedPosts");
    res.json(user.savedPosts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
