import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import ProjectSubmission from "../models/ProjectSubmission.js";
import Task from "../models/Task.js";
import Team from "../models/Team.js";
import {
  getProjectDeleteBlockers,
  isPublicProject,
} from "../utils/workflowRules.js";

const sanitizeStringArray = (
  values = []
) =>
  Array.isArray(values)
    ? values
        .map((value) =>
          String(value).trim()
        )
        .filter(Boolean)
    : [];

const parsePaginationValue = ({
  value,
  fallback,
  max = 100,
}) => {
  const parsed = Number.parseInt(
    value,
    10
  );

  if (
    Number.isNaN(parsed) ||
    parsed < 1
  ) {
    return fallback;
  }

  return Math.min(parsed, max);
};

const buildProjectQuery = ({
  q,
  type,
  status,
  domain,
}) => {
  const query = {};

  if (type === "showcase") {
    query.isShowcase = true;
  } else if (type === "delivery") {
    query.isShowcase = false;
  }

  if (status) {
    query.status = status;
  }

  if (domain) {
    query.domain = domain;
  }

  if (q) {
    query.$or = [
      {
        title: {
          $regex: q,
          $options: "i",
        },
      },
      {
        description: {
          $regex: q,
          $options: "i",
        },
      },
      {
        session: {
          $regex: q,
          $options: "i",
        },
      },
    ];
  }

  return query;
};

const buildPaginationMeta = ({
  page,
  limit,
  totalItems,
}) => {
  const totalPages = Math.max(
    1,
    Math.ceil(totalItems / limit)
  );

  return {
    page,
    limit,
    totalItems,
    totalPages,
    hasNextPage:
      page < totalPages,
    hasPreviousPage: page > 1,
  };
};

export const getProjects = async (
  req,
  res
) => {
  try {
    if (req.user.authority !== "admin") {
      return res.status(403).json({
        message:
          "Admin access only.",
      });
    }

    const {
      q,
      type = "all",
      status,
      domain,
      paginated,
    } = req.query;
    const query = buildProjectQuery({
      q,
      type,
      status,
      domain,
    });

    if (paginated === "true") {
      const limit =
        parsePaginationValue({
          value: req.query.limit,
          fallback: 8,
          max: 100,
        });
      const requestedPage =
        parsePaginationValue({
          value: req.query.page,
          fallback: 1,
          max: 10000,
        });
      const totalItems =
        await Project.countDocuments(
          query
        );
      const totalPages =
        Math.max(
          1,
          Math.ceil(totalItems / limit)
        );
      const page =
        totalItems === 0
          ? 1
          : Math.min(
              requestedPage,
              totalPages
            );
      const skip =
        (page - 1) * limit;

      const projects =
        await Project.find(query)
          .populate(
            "createdBy",
            "name email"
          )
          .sort({
            isShowcase: -1,
            createdAt: -1,
          })
          .skip(skip)
          .limit(limit)
          .lean();

      const projectIds =
        projects.map(
          (project) => project._id
        );
      const activeMembershipCounts =
        projectIds.length > 0
          ? await ProjectMember.aggregate(
              [
                {
                  $match: {
                    project: {
                      $in: projectIds,
                    },
                    status: "active",
                  },
                },
                {
                  $group: {
                    _id: "$project",
                    count: {
                      $sum: 1,
                    },
                  },
                },
              ]
            )
          : [];
      const memberCountMap =
        new Map(
          activeMembershipCounts.map(
            (item) => [
              String(item._id),
              item.count,
            ]
          )
        );

      return res.json({
        items: projects.map(
          (project) => ({
            ...project,
            activeMembers:
              memberCountMap.get(
                String(project._id)
              ) || 0,
          })
        ),
        pagination:
          buildPaginationMeta({
            page,
            limit,
            totalItems,
          }),
      });
    }

    const projects =
      await Project.find(query)
        .populate(
          "createdBy",
          "name email"
        )
        .sort({
          isShowcase: -1,
          createdAt: -1,
        });

    const projectsWithCounts =
      await Promise.all(
        projects.map(async (project) => {
          const activeMembers =
            await ProjectMember.countDocuments(
              {
                project: project._id,
                status: "active",
              }
            );

          return {
            ...project.toObject(),
            activeMembers,
          };
        })
      );

    return res.json(
      projectsWithCounts
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPublicProjects =
  async (req, res) => {
    try {
      const projects =
        await Project.find({
          isShowcase: true,
        })
          .populate(
            "createdBy",
            "name"
          )
          .sort({
            createdAt: -1,
          });

      return res.json(projects);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const getProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      ).populate(
        "createdBy",
        "name email"
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (req.user.authority !== "admin") {
      const isMember =
        await ProjectMember.findOne({
          user: req.user._id,
          project: project._id,
          status: "active",
        });

      if (
        !isPublicProject(project) &&
        !isMember
      ) {
        return res.status(403).json({
          message:
            "You do not have access to this project.",
        });
      }
    }

    const activeMembers =
      await ProjectMember.countDocuments({
        project: project._id,
        status: "active",
      });

    return res.json({
      ...project.toObject(),
      activeMembers,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getPublicProject =
  async (req, res) => {
    try {
      const project =
        await Project.findOne({
          _id: req.params.id,
          isShowcase: true,
        }).populate(
          "createdBy",
          "name"
        );

      if (!project) {
        return res.status(404).json({
          message:
            "Showcase project not found",
        });
      }

      return res.json(project);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const createProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.create({
        ...req.body,
        techStack: sanitizeStringArray(
          req.body.techStack
        ),
        highlights: sanitizeStringArray(
          req.body.highlights
        ),
        createdBy: req.user._id,
      });

    return res.status(201).json(
      project
    );
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const [
      activeMembers,
      teams,
      tasks,
      submissions,
    ] = await Promise.all([
      ProjectMember.countDocuments({
        project: req.params.id,
        status: "active",
      }),
      Team.countDocuments({
        project: req.params.id,
      }),
      Task.countDocuments({
        project: req.params.id,
      }),
      ProjectSubmission.countDocuments({
        project: req.params.id,
      }),
    ]);

    const blockers =
      getProjectDeleteBlockers({
        activeMembers,
        teams,
        tasks,
        submissions,
      });

    if (blockers.length > 0) {
      return res.status(409).json({
        message:
          `This project cannot be deleted yet because it still has ${blockers.join(", ")}.`,
      });
    }

    await Project.findByIdAndDelete(
      req.params.id
    );

    return res.json({
      message: "Project deleted",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const updateProject = async (
  req,
  res
) => {
  try {
    const project =
      await Project.findById(
        req.params.id
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          techStack:
            sanitizeStringArray(
              req.body.techStack
            ),
          highlights:
            sanitizeStringArray(
              req.body.highlights
            ),
        },
        {
          new: true,
        }
      );

    return res.json(updatedProject);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
