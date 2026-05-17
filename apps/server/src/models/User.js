// src/models/User.js

import mongoose from "mongoose";

const userSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      email: {
        type: String,
        required: true,
        unique: true,
      },

      password: {
        type: String,
        required: true,
      },

      authority: {
        type: String,

        enum: [
          "admin",
          "user",
        ],

        default: "user",
      },

      department: String,

      // roll: String,

      skills: [String],

      github: String,

      linkedin: String,

      bio: String,

      avatar: String,
    },
    {
      timestamps: true,
    }
  );

export default mongoose.model(
  "User",
  userSchema
);