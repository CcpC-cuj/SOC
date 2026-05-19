// import User from "../models/User.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// // GENERATE TOKEN
// const generateToken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn:
//         process.env.JWT_EXPIRE,
//     }
//   );
// };

// // REGISTER
// export const registerUser = async (
//   req,
//   res
// ) => {
//   try {

//     const {
//       name,
//       email,
//       password,
//       department,
//       skills,
//       experienceLevel,
//     } = req.body;

//     const existingUser =
//       await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message:
//           "User already exists",
//       });
//     }

//     const hashedPassword =
//       await bcrypt.hash(password, 10);

//     const user = await User.create({
//       name,
//       email,
//       password: hashedPassword,
//       department,
//       skills,
//       experienceLevel,
//     });

//     user.password = undefined;

//     res.status(201).json({
//       token: generateToken(
//         user._id
//       ),
//       user,
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// };

// // LOGIN
// export const loginUser = async (
//   req,
//   res
// ) => {
//   try {

//     const { email, password } =
//       req.body;

//     const user =
//       await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({
//         message:
//           "Invalid credentials",
//       });
//     }

//     const isMatch =
//       await bcrypt.compare(
//         password,
//         user.password
//       );

//     if (!isMatch) {
//       return res.status(400).json({
//         message:
//           "Invalid credentials",
//       });
//     }

//     user.password = undefined;

//     res.json({
//       token: generateToken(
//         user._id
//       ),
//       user,
//     });

//   } catch (error) {

//     res.status(500).json({
//       message: error.message,
//     });

//   }
// };


// // VERIFY TOKEN
// export const verifyToken =
//   async (req, res) => {

//     try {

//       const user =
//         await User.findById(
//           req.user._id
//         ).select("-password");

//       if (!user) {

//         return res.status(401)
//           .json({
//             message:
//               "Invalid user",
//           });
//       }

//       res.json({
//         valid: true,
//         user,
//       });

//     } catch (error) {

//       res.status(401)
//         .json({
//           message:
//             "Unauthorized",
//         });

//     }
// };

// src/controllers/authController.js

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// GENERATE TOKEN
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn:
        process.env.JWT_EXPIRE || "7d",
    }
  );
};

// REGISTER
export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password,
      department,
      skills,
      experienceLevel,
      roll,
    } = req.body;

    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Please fill all required fields",
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      skills,
      experienceLevel,
      roll,
    });

    const token = generateToken(
      user._id
    );

    res.status(201).json({
      success: true,
      message:
        "User registered successfully",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        authority:
          user.authority,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Server error",
    });

  }
};

// LOGIN
export const loginUser = async (
  req,
  res
) => {

  try {

    const { email, password } =
      req.body;

    if (
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Email and password required",
      });
    }

    const user =
      await User.findOne({
        email,
      }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid credentials",
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
          "Invalid credentials",
      });
    }

    const token =
      generateToken(user._id);

    res.status(200).json({
      success: true,
      message:
        "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        authority:
          user.authority,
      },
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Server error",
    });

  }
};

// VERIFY TOKEN
export const verifyToken =
  async (req, res) => {

    res.status(200).json({
      success: true,
      valid: true,
      user: req.user,
    });

  };