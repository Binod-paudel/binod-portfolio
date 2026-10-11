
import express from "express";

import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill
} from "../controllers/skill.controller.js";

import {
  checkAuth,
  checkAdmin
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getSkills);

router.post("/", checkAuth, checkAdmin, createSkill);
router.put("/:id", checkAuth, checkAdmin, updateSkill);
router.delete("/:id", checkAuth, checkAdmin, deleteSkill);

export default router;
