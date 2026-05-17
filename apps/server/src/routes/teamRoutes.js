import express from "express";

import {
  getTeams,
  assignLeader,
} from "../controllers/teamController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  adminOnly,
} from "../middleware/roleMiddleware.js";

const router =
  express.Router();

// GET ALL TEAMS
router.get(
  "/",
  getTeams
);

// ASSIGN LEADER
router.put(
  "/assign-leader",
  protect,
  adminOnly,
  assignLeader
);

export default router;