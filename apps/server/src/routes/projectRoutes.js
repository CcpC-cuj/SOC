// src/routes/projectRoutes.js

import express
from "express";

import {
  createProject,
  getProject,
  getProjects,
  getPublicProject,
  getPublicProjects,
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
  "/public",
  getPublicProjects
);

router.get(
  "/public/:id",
  getPublicProject
);

// GET ALL INTERNAL PROJECTS
router.get(
  "/",
  protect,
  getProjects
);

// GET SINGLE INTERNAL PROJECT
router.get(
  "/:id",
  protect,
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
