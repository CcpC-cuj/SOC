import express from "express";

import {
  addTaskComment,
  approveTask,
  createTask,
  getAllTasks,
  getMyTasks,
  getProjectTasks,
  reviewTask,
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

router.put(
  "/:id/review",
  protect,
  adminOnly,
  reviewTask
);

router.post(
  "/:id/comments",
  protect,
  addTaskComment
);

router.get(
  "/my-tasks",
  protect,
  getMyTasks
);

export default router;
