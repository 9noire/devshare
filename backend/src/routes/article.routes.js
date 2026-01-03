const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const articleController = require("../controllers/article.controller");

router.post("/", auth, articleController.createArticle);
router.get("/", articleController.getAllArticles);
router.get("/:id", articleController.getArticleById);
router.put("/:id", auth, articleController.updateArticle);
router.delete("/:id", auth, articleController.deleteArticle);
router.post("/:id/like", auth, articleController.toggleLike);
router.post("/:id/comments", auth, articleController.addComment);

module.exports = router;