import express from "express";
import { register,login, logout, me } from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", checkAuth, logout)
router.get("/me", me);


export default router;
