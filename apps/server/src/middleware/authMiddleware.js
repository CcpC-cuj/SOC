// import jwt from "jsonwebtoken";

// import User from "../models/User.js";

// export const protect = async (
//   req,
//   res,
//   next
// ) => {
//   try {

//     const token =
//       req.headers.authorization?.split(
//         " "
//       )[1];

//     if (!token) {
//       return res.status(401).json({
//         message: "No token",
//       });
//     }

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.user = await User.findById(
//       decoded.id
//     ).select("-password");

//     next();

//   } catch (error) {

//     return res.status(401).json({
//       message: "Unauthorized",
//     });

//   }
// };









import jwt
from "jsonwebtoken";

import User
from "../models/User.js";

// PROTECT
export const protect =
  async (
    req,
    res,
    next
  ) => {

    try {

      const token =
        req.headers.authorization
          ?.split(" ")[1];

      if (!token) {

        return res.status(401)
          .json({
            message:
              "No token",
          });
      }

      const decoded =
        jwt.verify(
          token,
          process.env.JWT_SECRET
        );

      req.user =
        await User.findById(
          decoded.id
        ).select("-password");

      next();

    } catch (error) {

      return res.status(401)
        .json({
          message:
            "Unauthorized",
        });

    }
};

// ADMIN ONLY
export const adminOnly =
  (
    req,
    res,
    next
  ) => {

    if (
      req.user.authority
      !== "admin"
    ) {

      return res.status(403)
        .json({
          message:
            "Admin only",
        });
    }

    next();
};