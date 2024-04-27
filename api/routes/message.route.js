import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import Controller from "../controllers/message.controller";

const router = express.Router();

router.get("/", verifyToken, Controller.getMessages);
