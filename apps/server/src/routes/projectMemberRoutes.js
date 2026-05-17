// src/routes/projectMemberRoutes.js

import express from "express";

import {
  joinProject,
  getProjectMembers,
  assignLeader,
} from "../controllers/projectMemberController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= USER JOIN PROJECT =================

router.post(
  "/join",
  protect,
  joinProject
);

// ================= GET PROJECT MEMBERS =================

router.get(
  "/:projectId",
  protect,
  getProjectMembers
);

// ================= ADMIN ASSIGN LEADER =================

router.post(
  "/assign-leader",
  protect,
  adminOnly,
  assignLeader
);

export default router;