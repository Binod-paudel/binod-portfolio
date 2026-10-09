import express from "express";
import { getProfile, updateProfile } from "../controllers/profile.controller.js";
import {checkAuth, checkAdmin} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getProfile);
router.put("/", checkAuth, checkAdmin, updateProfile);


export default router;