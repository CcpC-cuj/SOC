// src/routes/taskRoutes.js

import express from "express";

import {
  getTasks,
  approveTask,
} from "../controllers/taskController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET ALL TASKS
router.get(
  "/",
  protect,
  adminOnly,
  getTasks
);

// APPROVE TASK
router.put(
  "/:id/approve",
  protect,
  adminOnly,
  approveTask
);

export default router;