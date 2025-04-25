const express = require("express");
const router = express.Router();
const CommentController = require('../controllers/comentsControler');
const authenticateToken = require("../middleware/authenticateToken");


router.get('/', CommentController.getComments);
router.post('/:postId/comments/:commentId/replies', authenticateToken, CommentController.newComment);
router.delete('/:id', CommentController.deleteComment);
router.get('/:postId', authenticateToken, CommentController.getCommentsById);

module.exports = router;
