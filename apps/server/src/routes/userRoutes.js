import express
from "express";

import {
  getUsers,
  deleteUser,
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

export default router;