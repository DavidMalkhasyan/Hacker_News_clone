import express from "express";
import CommentController from "../controllers/comentsControler.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/my-comments", authMiddleware, CommentController.getMyComments);

router.get('/', authMiddleware, CommentController.getComments);
router.get('/all', CommentController.getAllComments);
router.get('/:postId', authMiddleware, CommentController.getCommentsById);
router.post('/:postId/comments/:commentId/replies', authMiddleware, CommentController.newComment);
router.delete('/:id', CommentController.deleteComment);



export default router;
