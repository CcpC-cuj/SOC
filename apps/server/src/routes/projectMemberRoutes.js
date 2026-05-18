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

const router =
  express.Router();

// JOIN PROJECT
router.post(
  "/join",
  protect,
  joinProject
);

// GET MEMBERS
router.get(
  "/:projectId",
  protect,
  getProjectMembers
);

// ASSIGN LEADER
router.post(
  "/assign-leader",
  protect,
  adminOnly,
  assignLeader
);

export default router;