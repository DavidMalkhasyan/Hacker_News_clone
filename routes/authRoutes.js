const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const AuthController = require("../controllers/authControler");
const authMiddleware = require("../middleware/authMiddleware.js");


router.post("/register", (req, res) => AuthController.register(req, res));
router.post("/login", (req, res) => AuthController.login(req, res));
router.get("/profile", authMiddleware, (req, res) => AuthController.getProfile(req, res));

module.exports = router;