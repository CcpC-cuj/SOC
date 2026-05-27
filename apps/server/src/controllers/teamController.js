import ProjectMember from "../models/ProjectMember.js";
import Team from "../models/Team.js";

export const getTeams = async (
  req,
  res
) => {
  try {
    const query = {};

    if (req.params.projectId) {
      query.project =
        req.params.projectId;
    }

    const teams = await Team.find(query)
      .populate(
        "project",
        "title domain session status"
      )
      .populate(
        "leader",
        "name email"
      )
      .populate(
        "members",
        "name email"
      )
      .sort({
        createdAt: 1,
      });

    return res.json(teams);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const createTeam = async (
  req,
  res
) => {
  try {
    const {
      name,
      focus,
      capacity,
      projectId,
    } = req.body;

    if (!name || !projectId) {
      return res.status(400).json({
        message:
          "name and projectId are required.",
      });
    }

    const team = await Team.create({
      name: String(name).trim(),
      focus:
        String(focus || "").trim(),
      capacity:
        Number(capacity) || 8,
      project: projectId,
    });

    return res.status(201).json(team);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateTeam = async (
  req,
  res
) => {
  try {
    const {
      name,
      focus,
      capacity,
    } = req.body;

    const team =
      await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    team.name =
      String(name || team.name).trim();
    team.focus =
      String(focus || team.focus).trim();
    team.capacity =
      Number(capacity) ||
      team.capacity;

    await team.save();

    return res.json(team);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const assignLeader = async (
  req,
  res
) => {
  try {
    const {
      teamId,
      leaderId,
    } = req.body;

    if (!teamId || !leaderId) {
      return res.status(400).json({
        message:
          "teamId and leaderId are required.",
      });
    }

    const team =
      await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({
        message: "Team not found",
      });
    }

    if (team.leader) {
      await ProjectMember.updateMany(
        {
          project: team.project,
          user: team.leader,
        },
        {
          isLeader: false,
        }
      );
    }

    const membership =
      await ProjectMember.findOne({
        project: team.project,
        user: leaderId,
        status: "active",
      });

    if (!membership) {
      return res.status(400).json({
        message:
          "Leader must already be assigned to this project.",
      });
    }

    team.leader = leaderId;

    if (
      !team.members.some(
        (memberId) =>
          memberId.toString() ===
          leaderId
      )
    ) {
      team.members.push(leaderId);
    }

    membership.team = team._id;
    membership.isLeader = true;

    await Promise.all([
      team.save(),
      membership.save(),
    ]);

    const updatedTeam =
      await Team.findById(teamId)
        .populate(
          "leader",
          "name email"
        )
        .populate(
          "members",
          "name email"
        );

    return res.json(updatedTeam);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
