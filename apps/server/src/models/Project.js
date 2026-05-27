import mongoose from "mongoose";

import { DOMAIN_OPTIONS } from "../constants/registration.js";

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    session: {
      type: String,
      required: true,
      trim: true,
    },

    season: {
      type: String,
      enum: ["Summer", "Winter"],
    },

    domain: {
      type: String,
      enum: DOMAIN_OPTIONS,
    },

    techStack: {
      type: [String],
      default: [],
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    maxMembers: {
      type: Number,
      default: 10,
      min: 1,
    },

    status: {
      type: String,
      enum: ["upcoming", "active", "completed", "closed"],
      default: "upcoming",
    },

    isShowcase: {
      type: Boolean,
      default: false,
    },

    acceptingAssignments: {
      type: Boolean,
      default: true,
    },

    highlights: {
      type: [String],
      default: [],
    },

    startDate: Date,

    endDate: Date,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Project", projectSchema);
