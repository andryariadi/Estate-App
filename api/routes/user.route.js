import express from "express";
import Controller from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", Controller.getUsers);
// router.get("/:id", verifyToken, Controller.getUserById);
router.put("/:id", verifyToken, Controller.updateUser);
router.delete("/:id", verifyToken, Controller.deleteUser);
router.post("/save", verifyToken, Controller.savePost);
router.get("/profilePosts", verifyToken, Controller.getProfilePosts);
router.get("/notification", verifyToken, Controller.getNotifications);

export default router;
