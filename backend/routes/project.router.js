import express from "express";
import { checkAuth, checkAdmin } from "../middlewares/auth.middleware.js";
import {getProjects, getProject, createProject, updateProject, deleteProject} from "../controllers/project.controller.js";

const router = express.Router();

router.get("/", getProjects);
router.get("/:id", getProject);
router.post("/", checkAuth, checkAdmin, createProject);
router.put("/:id", checkAuth, checkAdmin, updateProject);
router.delete("/:id", checkAuth, checkAdmin, deleteProject);

export default router;