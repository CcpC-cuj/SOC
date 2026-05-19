// import jwt
// from "jsonwebtoken";

// import User
// from "../models/User.js";

// // PROTECT
// export const protect =
//   async (
//     req,
//     res,
//     next
//   ) => {

//     try {

//       const token =
//         req.headers.authorization
//           ?.split(" ")[1];

//       if (!token) {

//         return res.status(401)
//           .json({
//             message:
//               "No token",
//           });
//       }

//       const decoded =
//         jwt.verify(
//           token,
//           process.env.JWT_SECRET
//         );

//       req.user =
//         await User.findById(
//           decoded.id
//         ).select("-password");

//       next();

//     } catch (error) {

//       return res.status(401)
//         .json({
//           message:
//             "Unauthorized",
//         });

//     }
// };

// // ADMIN ONLY
// export const adminOnly =
//   (req, res, next) => {

//     if (
//       req.user.authority
//       !== "admin"
//     ) {

//       return res.status(403)
//         .json({
//           message:
//             "Admin only",
//         });
//     }

//     next();
// };



// src/middleware/authMiddleware.js

import jwt from "jsonwebtoken";
import User from "../models/User.js";

// PROTECT ROUTES
export const protect = async (
  req,
  res,
  next
) => {

  try {

    let token;

    // CHECK AUTH HEADER
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith(
        "Bearer"
      )
    ) {

      token =
        req.headers.authorization.split(
          " "
        )[1];
    }

    // NO TOKEN
    if (!token) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    // VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // FIND USER
    const user = await User.findById(
      decoded.id
    ).select("-password");

    // USER NOT FOUND
    if (!user) {

      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // ATTACH USER
    req.user = user;

    next();

  } catch (error) {

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });

  }
};

// ADMIN ONLY
export const adminOnly = (
  req,
  res,
  next
) => {

  if (
    req.user.authority !== "admin"
  ) {

    return res.status(403).json({
      success: false,
      message: "Admin access only",
    });
  }

  next();
};