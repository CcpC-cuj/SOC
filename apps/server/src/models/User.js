// // src/models/User.js

// import mongoose from "mongoose";

// const userSchema =
//   new mongoose.Schema(
//     {
//       name: {
//         type: String,
//         required: true,
//       },

//       email: {
//         type: String,
//         required: true,
//         unique: true,
//       },

//       password: {
//         type: String,
//         required: true,
//       },

//       authority: {
//         type: String,

//         enum: [
//           "admin",
//           "user",
//         ],

//         default: "user",
//       },

//       experienceLevel: {
//         type: String,

//         enum: [
//           "beginner",
//           "intermediate",
//           "advanced",
//           "open-source",
//         ],

//         default:
//           "beginner",
//       },

//       department: String,

//       roll: String,

//       skills: [String],

//       github: String,

//       linkedin: String,

//       bio: String,

//       avatar: String,
//     },
//     {
//       timestamps: true,
//     }
//   );

// export default mongoose.model(
//   "User",
//   userSchema
// );

// src/models/User.js

import mongoose from "mongoose";

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
      enum: [
        "beginner",
        "intermediate",
        "advanced",
        "open-source",
      ],
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

    skills: {
      type: [String],
      default: [],
    },

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