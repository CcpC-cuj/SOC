// src/routes/projectRoutes.js

import express
from "express";

import {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  updateProject,
} from "../controllers/projectController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// GET ALL PROJECTS
router.get(
  "/",
  getProjects
);

// GET SINGLE PROJECT
router.get(
  "/:id",
  getProject
);

// CREATE PROJECT
router.post(
  "/",
  protect,
  adminOnly,
  createProject
);

// DELETE PROJECT
router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteProject
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateProject
);

export default router;