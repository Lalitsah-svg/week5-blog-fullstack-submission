const posts = require("../data/posts");

// GET all posts
const getPosts = (req, res) => {
  res.status(200).json({
    success: true,
    count: posts.length,
    data: posts
  });
};

// GET one post
const getPostById = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  res.status(200).json({
    success: true,
    data: post
  });
};

// CREATE post
const createPost = (req, res) => {
  const { title, content, author } = req.body;

  if (!title || title.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Title is required"
    });
  }

  if (!content || content.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Content is required"
    });
  }

  const newPost = {
    id: posts.length
      ? Math.max(...posts.map((post) => post.id)) + 1
      : 1,
    title: title.trim(),
    content: content.trim(),
    author: author ? author.trim() : "Anonymous",
    createdAt: new Date().toISOString().split("T")[0]
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: newPost
  });
};

// UPDATE post
const updatePost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((item) => item.id === id);

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  const { title, content, author } = req.body;

  if (title !== undefined) {
    if (title.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Title cannot be empty"
      });
    }

    post.title = title.trim();
  }

  if (content !== undefined) {
    if (content.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Content cannot be empty"
      });
    }

    post.content = content.trim();
  }

  if (author !== undefined) {
    post.author = author.trim();
  }

  res.status(200).json({
    success: true,
    message: "Post updated successfully",
    data: post
  });
};

// DELETE post
const deletePost = (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Post not found"
    });
  }

  const deletedPost = posts.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Post deleted successfully",
    data: deletedPost
  });
};

module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};