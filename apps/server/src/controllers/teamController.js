import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import Team from "../models/Team.js";
import {
  canAssignToCapacity,
} from "../utils/workflowRules.js";

const syncTeamMembers = async (
  teamId
) => {
  if (!teamId) {
    return null;
  }

  const memberIds =
    await ProjectMember.find({
      team: teamId,
      status: "active",
    }).distinct("user");

  return Team.findByIdAndUpdate(
    teamId,
    {
      members: memberIds,
    },
    {
      new: true,
    }
  );
};

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

    const project =
      await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.isShowcase) {
      return res.status(400).json({
        message:
          "Teams can only be created for assignment-ready projects.",
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

    const nextCapacity =
      Number(capacity) ||
      team.capacity;

    const activeMembers =
      await ProjectMember.countDocuments({
        team: team._id,
        status: "active",
      });

    if (nextCapacity < activeMembers) {
      return res.status(400).json({
        message:
          `This team already has ${activeMembers} active member${activeMembers === 1 ? "" : "s"}. Increase capacity before saving.`,
      });
    }

    team.name =
      String(name || team.name).trim();
    team.focus =
      String(focus || team.focus).trim();
    team.capacity = nextCapacity;

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

    const currentTeamCount =
      await ProjectMember.countDocuments({
        project: team.project,
        team: team._id,
        status: "active",
        ...(membership.team
          ?.toString() ===
          team._id.toString()
          ? {}
          : {
              _id: {
                $ne: membership._id,
              },
            }),
      });

    if (
      membership.team?.toString() !==
        team._id.toString() &&
      !canAssignToCapacity({
        currentCount:
          currentTeamCount,
        capacity: team.capacity,
      })
    ) {
      return res.status(409).json({
        message:
          "This team is already at capacity. Increase its size or pick another leader.",
      });
    }

    await ProjectMember.updateMany(
      {
        project: team.project,
        team: team._id,
        status: "active",
        user: {
          $ne: leaderId,
        },
      },
      {
        isLeader: false,
      }
    );

    const previousTeamId =
      membership.team?.toString() || null;

    if (
      previousTeamId &&
      previousTeamId !==
        team._id.toString()
    ) {
      await Team.findByIdAndUpdate(
        previousTeamId,
        {
          $pull: {
            members: leaderId,
          },
        }
      );
    }

    await Team.updateMany(
      {
        project: team.project,
        leader: leaderId,
        _id: {
          $ne: team._id,
        },
      },
      {
        $unset: {
          leader: "",
        },
      }
    );

    team.leader = leaderId;

    membership.team = team._id;
    membership.isLeader = true;

    await Promise.all([
      team.save(),
      membership.save(),
    ]);

    await Promise.all([
      syncTeamMembers(previousTeamId),
      syncTeamMembers(team._id),
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
