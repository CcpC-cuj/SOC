import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
} from "../constants/registration.js";
import User from "../models/User.js";
import {
  sendTransactionalEmail,
} from "../utils/emailService.js";
import {
  getOrCreateSiteSettings,
  isRegistrationClosed,
} from "../utils/siteSettings.js";
import {
  createTimedToken,
  hashToken,
} from "../utils/tokenUtils.js";

const EMAIL_VERIFICATION_TTL_MS =
  48 * 60 * 60 * 1000;

const PASSWORD_RESET_TTL_MS =
  30 * 60 * 1000;

const generateToken = (id) =>
  jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRE || "7d",
    }
  );

const sanitizeArray = (
  values = [],
  allowedValues = null
) => {
  const normalized =
    Array.isArray(values)
      ? values
          .map((value) =>
            String(value).trim()
          )
          .filter(Boolean)
      : [];

  if (!allowedValues) {
    return normalized;
  }

  return normalized.filter((value) =>
    allowedValues.includes(value)
  );
};

const sanitizeUserResponse = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  authority: user.authority,
  registrationStatus:
    user.registrationStatus,
  experienceLevel:
    user.experienceLevel,
  emailVerified:
    user.emailVerified,
});

const buildClientBaseUrl = () =>
  process.env.PUBLIC_CLIENT_URL ||
  process.env.USER_CLIENT_URL ||
  "http://localhost:5173";

const buildPreviewPayload = (
  url,
  delivery
) => {
  if (
    process.env.NODE_ENV ===
      "production" ||
    delivery.delivered
  ) {
    return undefined;
  }

  return {
    url,
    reason:
      delivery.reason ||
      "email-not-configured",
  };
};

const deliverEmail = async (
  message
) => {
  try {
    return await sendTransactionalEmail(
      message
    );
  } catch (error) {
    console.error(
      "[email] Delivery failed:",
      error.message
    );

    return {
      delivered: false,
      reason: "email-send-failed",
    };
  }
};

const sendVerificationEmail = async (
  user,
  plainToken
) => {
  const verificationUrl =
    `${buildClientBaseUrl()}/verify-email?token=${plainToken}`;

  const delivery = await deliverEmail({
    to: user.email,
    subject:
      "Verify your Seasons of Code registration",
    text:
      `Hi ${user.name}, verify your email to complete your SOC profile: ${verificationUrl}`,
    html:
      `<p>Hi ${user.name},</p><p>Thanks for registering for Seasons of Code.</p><p>Please verify your email address to keep receiving updates from the organizers.</p><p><a href="${verificationUrl}">Verify email</a></p><p>If you did not create this account, you can ignore this email.</p>`,
  });

  return {
    delivery,
    verificationUrl,
  };
};

const sendPasswordResetEmail = async (
  user,
  plainToken
) => {
  const resetUrl =
    `${buildClientBaseUrl()}/reset-password?token=${plainToken}`;

  const delivery = await deliverEmail({
    to: user.email,
    subject:
      "Reset your Seasons of Code password",
    text:
      `Hi ${user.name}, reset your password here: ${resetUrl}`,
    html:
      `<p>Hi ${user.name},</p><p>We received a request to reset your Seasons of Code password.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in 30 minutes. If you did not request it, you can ignore this email.</p>`,
  });

  return {
    delivery,
    resetUrl,
  };
};

export const registerUser = async (
  req,
  res
) => {
  try {
    const settings =
      await getOrCreateSiteSettings();

    if (
      isRegistrationClosed(settings)
    ) {
      return res.status(403).json({
        success: false,
        message:
          "Registrations are currently closed.",
      });
    }

    const {
      name,
      email,
      password,
      department,
      skills,
      experienceLevel,
      roll,
      program,
      phone,
      github,
      linkedin,
      portfolio,
      bio,
      availability,
      priorExperience,
      whyJoin,
      preferredDomains,
      preferredRoles,
    } = req.body;

    if (
      !name ||
      !email ||
      !password ||
      !department ||
      !roll ||
      !program
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please complete all required registration fields.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters long.",
      });
    }

    if (
      experienceLevel &&
      !EXPERIENCE_LEVELS.includes(
        experienceLevel
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid experience level.",
      });
    }

    const normalizedEmail =
      String(email).trim().toLowerCase();

    const existingUser =
      await User.findOne({
        email: normalizedEmail,
      });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "A user with this email already exists.",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const verificationState =
      createTimedToken(
        EMAIL_VERIFICATION_TTL_MS
      );

    const user = await User.create({
      name: String(name).trim(),
      email: normalizedEmail,
      password: hashedPassword,
      department:
        String(department).trim(),
      roll: String(roll).trim(),
      program:
        String(program).trim(),
      phone:
        String(phone || "").trim(),
      github:
        String(github || "").trim(),
      linkedin:
        String(linkedin || "").trim(),
      portfolio:
        String(portfolio || "").trim(),
      bio: String(bio || "").trim(),
      availability:
        String(
          availability || ""
        ).trim(),
      priorExperience:
        String(
          priorExperience || ""
        ).trim(),
      whyJoin:
        String(whyJoin || "").trim(),
      skills: sanitizeArray(skills),
      preferredDomains:
        sanitizeArray(
          preferredDomains,
          DOMAIN_OPTIONS
        ),
      preferredRoles:
        sanitizeArray(
          preferredRoles,
          ROLE_OPTIONS
        ),
      experienceLevel:
        experienceLevel ||
        "beginner",
      emailVerificationToken:
        verificationState.hashedToken,
      emailVerificationExpires:
        verificationState.expiresAt,
      assignmentHistory: [
        {
          action: "registered",
          status: "pending_review",
          note:
            "Submitted registration form.",
        },
      ],
    });

    const {
      delivery,
      verificationUrl,
    } = await sendVerificationEmail(
      user,
      verificationState.plainToken
    );

    const token = generateToken(
      user._id
    );

    return res.status(201).json({
      success: true,
      message:
        "Registration submitted successfully. The organizers will review your profile and assign you later.",
      token,
      user: sanitizeUserResponse(user),
      preview:
        buildPreviewPayload(
          verificationUrl,
          delivery
        ),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const loginUser = async (
  req,
  res
) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password are required.",
      });
    }

    const user =
      await User.findOne({
        email:
          String(email)
            .trim()
            .toLowerCase(),
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials.",
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials.",
      });
    }

    const token =
      generateToken(user._id);

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
      user: sanitizeUserResponse(user),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const verifyToken = async (
  req,
  res
) =>
  res.status(200).json({
    success: true,
    valid: true,
    user: sanitizeUserResponse(
      req.user
    ),
  });

export const resendVerificationEmail =
  async (req, res) => {
    try {
      const normalizedEmail =
        String(
          req.body.email || ""
        )
          .trim()
          .toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required.",
        });
      }

      const user =
        await User.findOne({
          email: normalizedEmail,
        });

      if (!user) {
        return res.status(200).json({
          success: true,
          message:
            "If the address exists, a verification link has been prepared.",
        });
      }

      if (user.emailVerified) {
        return res.status(200).json({
          success: true,
          message:
            "This email address is already verified.",
        });
      }

      const verificationState =
        createTimedToken(
          EMAIL_VERIFICATION_TTL_MS
        );

      user.emailVerificationToken =
        verificationState.hashedToken;
      user.emailVerificationExpires =
        verificationState.expiresAt;

      await user.save();

      const {
        delivery,
        verificationUrl,
      } = await sendVerificationEmail(
        user,
        verificationState.plainToken
      );

      return res.status(200).json({
        success: true,
        message:
          "A verification link has been sent if email delivery is configured.",
        preview:
          buildPreviewPayload(
            verificationUrl,
            delivery
          ),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

export const verifyEmailAddress =
  async (req, res) => {
    try {
      const token = String(
        req.body.token || ""
      ).trim();

      if (!token) {
        return res.status(400).json({
          success: false,
          message:
            "Verification token is required.",
        });
      }

      const user =
        await User.findOne({
          emailVerificationToken:
            hashToken(token),
          emailVerificationExpires: {
            $gt: new Date(),
          },
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "This verification link is invalid or has expired.",
        });
      }

      user.emailVerified = true;
      user.emailVerificationToken =
        undefined;
      user.emailVerificationExpires =
        undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "Email verified successfully.",
        user: sanitizeUserResponse(user),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

export const forgotPassword =
  async (req, res) => {
    try {
      const normalizedEmail =
        String(
          req.body.email || ""
        )
          .trim()
          .toLowerCase();

      if (!normalizedEmail) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required.",
        });
      }

      const user =
        await User.findOne({
          email: normalizedEmail,
        });

      if (!user) {
        return res.status(200).json({
          success: true,
          message:
            "If the address exists, a reset link has been prepared.",
        });
      }

      const resetState =
        createTimedToken(
          PASSWORD_RESET_TTL_MS
        );

      user.passwordResetToken =
        resetState.hashedToken;
      user.passwordResetExpires =
        resetState.expiresAt;

      await user.save();

      const {
        delivery,
        resetUrl,
      } = await sendPasswordResetEmail(
        user,
        resetState.plainToken
      );

      return res.status(200).json({
        success: true,
        message:
          "If the address exists, a reset link has been prepared.",
        preview:
          buildPreviewPayload(
            resetUrl,
            delivery
          ),
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };

export const resetPassword =
  async (req, res) => {
    try {
      const token = String(
        req.body.token || ""
      ).trim();
      const password = String(
        req.body.password || ""
      );

      if (!token || !password) {
        return res.status(400).json({
          success: false,
          message:
            "Token and new password are required.",
        });
      }

      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message:
            "Password must be at least 6 characters long.",
        });
      }

      const user =
        await User.findOne({
          passwordResetToken:
            hashToken(token),
          passwordResetExpires: {
            $gt: new Date(),
          },
        });

      if (!user) {
        return res.status(400).json({
          success: false,
          message:
            "This reset link is invalid or has expired.",
        });
      }

      user.password =
        await bcrypt.hash(
          password,
          12
        );
      user.passwordResetToken =
        undefined;
      user.passwordResetExpires =
        undefined;

      await user.save();

      return res.status(200).json({
        success: true,
        message:
          "Password reset successful. You can log in now.",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  };
