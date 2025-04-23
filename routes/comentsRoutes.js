const express = require("express");
const router = express.Router();
const CommentController = require('../controllers/commentController.js');

router.get('/', async (req, res) => CommentController.getComments(req, res));
router.post('/:commentId/replies', (req, res) => CommentController.newComment(req, res)); 
router.delete('/:id', (req, res) => CommentController.deleteComment(req, res));

module.exports = router;