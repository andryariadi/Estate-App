import express from "express";
import Controller from "../controllers/post.controller.js";

const router = express.Router();

router.get("/test", Controller.test);

export default router;
