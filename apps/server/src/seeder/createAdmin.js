import mongoose from "mongoose";

import dotenv from "dotenv";

import bcrypt from "bcryptjs";

import User from "../models/User.js";

dotenv.config();

// CONNECT DB
mongoose.connect(
  process.env.MONGO_URI
);

const createAdmin =
  async () => {

    try {
      const adminEmail =
        process.env.ADMIN_EMAIL
        || "admin@soc.com";

      const adminPassword =
        process.env.ADMIN_PASSWORD
        || "admin123";

      // CHECK EXISTING
      const existingAdmin =
        await User.findOne({
          email: adminEmail,
        });

      if (existingAdmin) {

        console.log(
          "Admin already exists"
        );

        process.exit();
      }

      // HASH PASSWORD
      const hashedPassword =
        await bcrypt.hash(
          adminPassword,
          10
        );

      // CREATE ADMIN
      const admin =
        await User.create({
          name: "Admin",

          email: adminEmail,

          password:
            hashedPassword,

          authority:
            "admin",

          department:
            "Administration",

          roll:
            "ADMIN001",

          skills: [
            "Management",
          ],
        });

      console.log(
        "Admin Created"
      );

      console.log(admin);

      process.exit();

    } catch (error) {

      console.log(error);

      process.exit(1);

    }
};

createAdmin();
