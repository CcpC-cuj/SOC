// src/routes/authRoutes.js

import express from "express";

import {
  forgotPassword,
  registerUser,
  loginUser,
  resendVerificationEmail,
  resetPassword,
  verifyEmailAddress,
  verifyToken,
} from "../controllers/authController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/reset-password",
  resetPassword
);

router.post(
  "/resend-verification",
  resendVerificationEmail
);

router.post(
  "/verify-email",
  verifyEmailAddress
);

router.get(
  "/verify",
  protect,
  verifyToken
);

export default router;
