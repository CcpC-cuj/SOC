import mongoose from "mongoose";

import {
  DOMAIN_OPTIONS,
  EXPERIENCE_LEVELS,
  REGISTRATION_STATUSES,
  ROLE_OPTIONS,
} from "../constants/registration.js";

const assignmentHistorySchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: [
        "registered",
        "status-updated",
        "assigned",
        "reassigned",
        "unassigned",
      ],
      required: true,
    },

    status: {
      type: String,
      enum: REGISTRATION_STATUSES,
    },

    note: {
      type: String,
      trim: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    roles: {
      type: [String],
      default: [],
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    changedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    authority: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    experienceLevel: {
      type: String,
      enum: EXPERIENCE_LEVELS,
      default: "beginner",
    },

    department: {
      type: String,
      trim: true,
    },

    roll: {
      type: String,
      trim: true,
    },

    program: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    preferredDomains: {
      type: [
        {
          type: String,
          enum: DOMAIN_OPTIONS,
        },
      ],
      default: [],
    },

    preferredRoles: {
      type: [
        {
          type: String,
          enum: ROLE_OPTIONS,
        },
      ],
      default: [],
    },

    availability: {
      type: String,
      trim: true,
    },

    priorExperience: {
      type: String,
      trim: true,
    },

    whyJoin: {
      type: String,
      trim: true,
    },

    github: {
      type: String,
      trim: true,
    },

    linkedin: {
      type: String,
      trim: true,
    },

    portfolio: {
      type: String,
      trim: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerificationToken: {
      type: String,
      select: false,
    },

    emailVerificationExpires: {
      type: Date,
      select: false,
    },

    passwordResetToken: {
      type: String,
      select: false,
    },

    passwordResetExpires: {
      type: Date,
      select: false,
    },

    registrationStatus: {
      type: String,
      enum: REGISTRATION_STATUSES,
      default: "pending_review",
    },

    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },

    assignmentHistory: {
      type: [assignmentHistorySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
