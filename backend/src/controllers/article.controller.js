const Article = require("../models/article.model");

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create({
      author: req.user.id,
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags,
      image: req.body.image
    });

    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "username")
      .sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
      .populate("author", "username");

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    Object.assign(article, req.body);
    await article.save();

    res.json(article);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    if (article.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await article.deleteOne();

    res.json({ message: "Artikel berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.toggleLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    const userId = req.user.id;
    const likedIndex = article.likes.findIndex(id => id.toString() === userId);

    if (likedIndex === -1) {
      article.likes.push(userId);
    } else {
      article.likes.splice(likedIndex, 1);
    }

    await article.save();
    await article.populate("likes", "username");

    res.json({
      likesCount: article.likes.length,
      isLiked: article.likes.some(id => id.toString() === userId)
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addComment = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Artikel tidak ditemukan" });
    }

    const newComment = {
      user: req.user.id,
      comment: req.body.comment.trim()
    };

    if (!newComment.comment) {
      return res.status(400).json({ message: "Komentar tidak boleh kosong" });
    }

    article.comments.push(newComment);
    await article.save();

    await article.populate("comments.user", "username");

    const latestComment = article.comments[article.comments.length - 1];

    res.status(201).json(latestComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};