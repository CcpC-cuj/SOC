// server/src/controllers/teamController.js

import Team from "../models/Team.js";

// GET ALL TEAMS
export const getTeams =
  async (req, res) => {

    try {

      const teams =
        await Team.find()
          .populate(
            "project",
            "title"
          )
          .populate(
            "leader",
            "name email"
          );

      res.json(teams);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

};

// ASSIGN LEADER
export const assignLeader =
  async (req, res) => {

    try {

      const {
        teamId,
        leaderId,
      } = req.body;

      if (
        !teamId ||
        !leaderId
      ) {

        return res
          .status(400)
          .json({
            message:
              "teamId and leaderId required",
          });

      }

      const updatedTeam =
        await Team.findByIdAndUpdate(

          teamId,

          {
            leader: leaderId,
          },

          {
            new: true,
          }

        )
        .populate(
          "leader",
          "name email"
        );

      res.json(
        updatedTeam
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

};