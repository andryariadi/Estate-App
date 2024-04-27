import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import Controller from "../controllers/chat.controller";

const router = express.Router();

router.get("/", verifyToken, Controller.getChats);
router.get("/:id", verifyToken, Controller);
router.post("/", verifyToken, Controller);
router.post("/read/:id", verifyToken, Controller);
