const User = require("../models/user.model");
const Article = require("../models/article.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      $or: [{ _id: id }, { username: id }]
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: "ID tidak valid" });
  }
};

exports.getUserArticles = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ _id: req.params.id }, { username: req.params.id }]
    });

    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    const articles = await Article.find({ author: user._id })
      .sort({ createdAt: -1 });

    res.json({
      user: {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt
      },
      articles
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateUsername = async (req, res) => {
  try {
    const { username } = req.body;

    if (!username || username.trim() === '') {
      return res.status(400).json({ message: "Username tidak boleh kosong" });
    }

    const trimmedUsername = username.trim();


    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser && existingUser._id.toString() !== req.user.id) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const user = await User.findById(req.user.id);
    user.username = trimmedUsername;
    await user.save();

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};