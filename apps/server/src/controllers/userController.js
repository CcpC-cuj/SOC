import User
from "../models/User.js";
import ProjectMember
from "../models/ProjectMember.js";

// GET ALL USERS
export const getUsers =
  async (req, res) => {

    try {

      const users =
        await User.find()
          .select("-password");

      // ADD PROJECTS
      const usersWithProjects =
        await Promise.all(

          users.map(
            async (user) => {

              const memberships =
                await ProjectMember
                  .find({
                    user:
                      user._id,
                  })
                  .populate(
                    "project",
                    "title status"
                  );

              return {
                ...user.toObject(),

                memberships,
              };
            }
          )
        );

      res.json(
        usersWithProjects
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// DELETE USER
export const deleteUser =
  async (req, res) => {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "User deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};