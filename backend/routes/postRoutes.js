import express from "express";
import PostController from "../controllers/postControler.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", PostController.getPosts);
router.post("/", authMiddleware, PostController.newPost);  
router.get("/:id", PostController.getPost);
router.put("/:id", authMiddleware, PostController.updatePost);  
router.delete("/:id", authMiddleware, PostController.deletePost);  
router.delete("/", authMiddleware, PostController.deleteAllPosts);  

router.post("/:postId/comments", authMiddleware, PostController.newComment);  
router.get("/:postId/comments", authMiddleware, PostController.getComments); 



export default router;