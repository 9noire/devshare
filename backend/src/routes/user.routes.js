const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const auth = require("../middleware/auth.middleware");

router.get("/", userController.getAllUsers);
router.get("/:id/articles", userController.getUserArticles);
router.get("/:id", userController.getUserProfile);
router.patch("/me/username", auth, userController.updateUsername);

module.exports = router;
