import express from "express";
import Controller from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/logout", Controller.logout);

export default router;
