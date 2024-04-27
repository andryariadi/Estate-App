import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import Controller from "../controllers/message.controller.js";

const router = express.Router();

router.post("/:chatId", verifyToken, Controller.addMessage);

export default router;
