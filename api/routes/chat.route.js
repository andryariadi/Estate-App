import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Controller from "../controllers/chat.controller.js";

const router = express.Router();

router.get("/", verifyToken, Controller.getChats);
router.get("/:id", verifyToken, Controller.getChatById);
router.post("/", verifyToken, Controller.addChat);
router.put("/read/:id", verifyToken, Controller.readChat);

export default router;
