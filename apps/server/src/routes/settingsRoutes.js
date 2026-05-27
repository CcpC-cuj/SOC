import express from "express";

import {
  getAdminSettings,
  getPublicSettings,
  updateAdminSettings,
} from "../controllers/settingsController.js";
import {
  adminOnly,
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/public",
  getPublicSettings
);

router.get(
  "/admin",
  protect,
  adminOnly,
  getAdminSettings
);

router.put(
  "/admin",
  protect,
  adminOnly,
  updateAdminSettings
);

export default router;
