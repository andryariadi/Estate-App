import express from "express";
import Controller from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", Controller.getPosts);
router.get("/:id", Controller.getPostById);
router.post("/", verifyToken, Controller.addPost);
router.put("/:id", verifyToken, Controller.updatePost);
router.delete("/:id", verifyToken, Controller.deletePost);

export default router;
