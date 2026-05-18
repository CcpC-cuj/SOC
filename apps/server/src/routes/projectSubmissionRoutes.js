import express
from "express";

import {
  submitProject,
  getProjectSubmission,
  reviewSubmission,
getAllSubmissions,
} from "../controllers/projectSubmissionController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// SUBMIT PROJECT
router.post(
  "/",
  protect,
  submitProject
);

// GET SUBMISSION
router.get(
  "/:projectId",
  protect,
  getProjectSubmission
);


// ADMIN
router.get(
  "/",
  protect,
  getAllSubmissions
);

router.put(
  "/:id/review",
  protect,
  reviewSubmission
);

export default router;