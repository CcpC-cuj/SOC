// src/models/ProjectMember.js

import mongoose from "mongoose";

const projectMemberSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      project: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "Project",

        required: true,
      },

      roles: [
        {
          type: String,

          enum: [
            // USER SELECTABLE
            "frontend-developer",
            "backend-developer",
            "ai-ml-engineer",
            "ui-ux-designer",
          ],
        },
      ],

      isLeader: {
        type: Boolean,
        default: false,
      },

      status: {
        type: String,

        enum: [
          "active",
          "removed",
        ],

        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "ProjectMember",
  projectMemberSchema
);