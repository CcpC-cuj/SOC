import express from "express";

import {
  deleteUser,
  exportUsersCsv,
  getMyProfile,
  getProfileDashboard,
  getUserById,
  getUsers,
  sendAnnouncement,
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

router.post(
  "/announce",
  protect,
  adminOnly,
  sendAnnouncement
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

router.get("/profile", protect, getMyProfile);

router.put("/profile", protect, updateProfile);

router.get(
  "/profile/dashboard",
  protect,
  getProfileDashboard
);

router.get(
  "/:id",
  protect,
  adminOnly,
  getUserById
);

export default router;
