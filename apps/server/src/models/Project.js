// src/models/Project.js

import mongoose from "mongoose";

const projectSchema =
  new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      session: {
        type: String,
        required: true,
      },

      season: {
        type: String,

        enum: [
          "Summer",
          "Winter",
        ],
      },

      domain: {
        type: String,

        enum: [
          "Frontend",
          "Backend",
          "AI/ML",
          "UI/UX",
          "Cyber Security",
        ],
      },

      techStack: [String],

      createdBy: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",
      },

      maxMembers: {
        type: Number,
        default: 10,
      },

      status: {
        type: String,

        enum: [
          "upcoming",
          "active",
          "completed",
          "closed",
        ],

        default: "upcoming",
      },

      startDate: Date,

      endDate: Date,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "Project",
  projectSchema
);