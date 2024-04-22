import express from "express";
import Controller from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", Controller.getUsers);
router.get("/:id", verifyToken, Controller.getUserById);
router.put("/:id", verifyToken, Controller.updateUser);
router.delete("/:id", verifyToken, Controller.deleteUser);

export default router;
