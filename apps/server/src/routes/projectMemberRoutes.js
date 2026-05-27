import express from "express";

import {
  assignLeader,
  assignMemberToProject,
  getProjectMembers,
  joinProject,
} from "../controllers/projectMemberController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/join",
  protect,
  joinProject
);

router.post(
  "/assign",
  protect,
  adminOnly,
  assignMemberToProject
);

router.get(
  "/:projectId",
  protect,
  getProjectMembers
);

router.post(
  "/assign-leader",
  protect,
  adminOnly,
  assignLeader
);

export default router;
