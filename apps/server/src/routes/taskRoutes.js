import express
from "express";

import {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  getMyTasks,
} from "../controllers/taskController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// CREATE TASK
router.post(
  "/",
  protect,
  createTask
);

// GET PROJECT TASKS
router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

// UPDATE TASK STATUS
router.put(
  "/:id/status",
  protect,
  updateTaskStatus
);

router.get(
  "/my-tasks",
  protect,
  getMyTasks
);

export default router;