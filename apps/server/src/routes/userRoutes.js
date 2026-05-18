import express
from "express";

import {
  getUsers,
  deleteUser,
  getMyProfile,
  updateProfile,
  getProfileDashboard
} from "../controllers/userController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// GET USERS
router.get(
  "/",
  protect,
  adminOnly,
  getUsers
);

// DELETE USER
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