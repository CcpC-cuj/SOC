import express from "express";

import {
  assignLeader,
  createTeam,
  getTeams,
  updateTeam,
} from "../controllers/teamController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getTeams
);

router.get(
  "/project/:projectId",
  protect,
  adminOnly,
  getTeams
);

router.post(
  "/",
  protect,
  adminOnly,
  createTeam
);

router.put(
  "/:id",
  protect,
  adminOnly,
  updateTeam
);

router.put(
  "/assign-leader",
  protect,
  adminOnly,
  assignLeader
);

export default router;
