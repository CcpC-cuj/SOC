import express from "express";

import {
  deleteUser,
  exportUsersCsv,
  getMyProfile,
  getProfileDashboard,
  getUsers,
  updateProfile,
  updateRegistrationReview,
} from "../controllers/userController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

router.get(
  "/export/csv",
  protect,
  adminOnly,
  exportUsersCsv
);

router.put(
  "/:id/review",
  protect,
  adminOnly,
  updateRegistrationReview
);

router.delete(
  "/:id",
  protect,
  adminOnly,
  deleteUser
);

router.get(
  "/profile",
  protect,
  getMyProfile
);

router.put(
  "/profile",
  protect,
  updateProfile
);

router.get(
  "/profile/dashboard",
  protect,
  getProfileDashboard
);

export default router;
