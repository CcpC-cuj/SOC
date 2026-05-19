// src/routes/dashboardRoutes.js

import express from "express";

import {
  getDashboard,
  getAdminDashboard,
} from "../controllers/dashboardController.js";

import {
  protect,
  adminOnly,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  getDashboard
);



// ADMIN DASHBOARD
router.get(
  "/admin",
  protect,
  adminOnly,
  getAdminDashboard
);


export default router;