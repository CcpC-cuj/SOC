import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  ROLE_OPTIONS,
} from "../constants/registration.js";
import User from "../models/User.js";
import {
  getOrCreateSiteSettings,
  isRegistrationClosed,
} from "../utils/siteSettings.js";

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
});

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
      experienceLevel
      &&
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
      assignmentHistory: [
        {
          action: "registered",
          status: "pending_review",
          note:
            "Submitted registration form.",
        },
      ],
    });

    const token = generateToken(
      user._id
    );

    return res.status(201).json({
      success: true,
      message:
        "Registration submitted successfully. The organizers will review your profile and assign you later.",
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
