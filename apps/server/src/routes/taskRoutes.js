import express from "express";

import {
  approveTask,
  createTask,
  getAllTasks,
  getMyTasks,
  getProjectTasks,
  updateTaskStatus,
} from "../controllers/taskController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getAllTasks
);

router.post(
  "/",
  protect,
  createTask
);

router.get(
  "/project/:projectId",
  protect,
  getProjectTasks
);

router.put(
  "/:id/status",
  protect,
  updateTaskStatus
);

router.put(
  "/:id/approve",
  protect,
  adminOnly,
  approveTask
);

router.get(
  "/my-tasks",
  protect,
  getMyTasks
);

export default router;
