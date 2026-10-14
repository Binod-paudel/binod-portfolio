import express from "express";
import {checkAuth, checkAdmin} from "../middlewares/auth.middleware.js";
import {createMessage, getMessages, updateMessage, deleteMessage} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", checkAuth,checkAdmin, getMessages);
router.patch("/:id/read", checkAuth,checkAdmin, updateMessage);
router.delete("/:id", checkAuth,checkAdmin, deleteMessage);

export default router