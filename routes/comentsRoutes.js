const express = require("express");
const router = express.Router();
const CommentController = require('../controllers/comentsControler');
const authenticateToken = require("../middleware/authenticateToken");
const authMiddleware = require("../middleware/authMiddleware.js");

router.get('/:postId', authMiddleware, CommentController.getCommentsById);
router.post('/:postId/comments/:commentId/replies', authMiddleware, CommentController.newComment);
router.delete('/:id', CommentController.deleteComment);

module.exports = router;
