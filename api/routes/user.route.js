import express from "express";
import Controller from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", Controller.getUsers);
router.get("/:id", verifyToken, Controller);
router.put("/:id", verifyToken, Controller);
router.delete("/:id", verifyToken, Controller);

export default router;
