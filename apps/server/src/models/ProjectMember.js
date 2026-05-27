import mongoose from "mongoose";

import { ROLE_OPTIONS } from "../constants/registration.js";

const projectMemberSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },

    roles: [
      {
        type: String,
        enum: ROLE_OPTIONS,
      },
    ],

    isLeader: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["active", "removed"],
      default: "active",
    },

    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    assignedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

projectMemberSchema.index(
  {
    user: 1,
    project: 1,
  },
  {
    unique: true,
  }
);

export default mongoose.model("ProjectMember", projectMemberSchema);
