const express = require("express");
const router = express.Router();
const PostController = require("../controllers/postControler.js");
const authMiddleware = require("../middleware/authMiddleware.js");
const authenticateToken = require("../middleware/authenticateToken");


router.get("/", async (req, res) => PostController.getPosts(req, res));
router.post("/", authMiddleware, (req, res) => PostController.newPost(req, res));  
router.get("/:id", (req, res) => PostController.getPost(req, res));
router.put("/:id", authMiddleware, (req, res) => PostController.updatePost(req, res));  
router.delete("/:id", authMiddleware, (req, res) => PostController.deletePost(req, res));  
router.delete("/", authMiddleware, (req, res) => PostController.deleteAllPosts(req, res));  

router.post("/:postId/comments", authMiddleware, (req, res) => PostController.newComment(req, res));  
router.get("/:postId/comments", authMiddleware, (req, res) => PostController.getComments(req, res)); 



module.exports = router;