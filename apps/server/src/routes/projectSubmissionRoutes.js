import express from "express";

import {
  getAllSubmissions,
  getProjectSubmission,
  reviewSubmission,
  submitProject,
} from "../controllers/projectSubmissionController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/",
  protect,
  submitProject
);

router.get(
  "/:projectId",
  protect,
  getProjectSubmission
);

router.get(
  "/",
  protect,
  adminOnly,
  getAllSubmissions
);

router.put(
  "/:id/review",
  protect,
  adminOnly,
  reviewSubmission
);

export default router;
