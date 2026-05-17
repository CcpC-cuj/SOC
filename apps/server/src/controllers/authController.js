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
        process.env.JWT_EXPIRE,
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
      roll,
      skills,
      program,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      department,
      roll,
      skills,
      program,
    });

    user.password = undefined;

    res.status(201).json({
      token: generateToken(
        user._id
      ),
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
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

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
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
      return res.status(400).json({
        message:
          "Invalid credentials",
      });
    }

    user.password = undefined;

    res.json({
      token: generateToken(
        user._id
      ),
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};