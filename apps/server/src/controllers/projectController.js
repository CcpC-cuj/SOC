import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";

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

export const getProjects = async (
  req,
  res
) => {
  try {
    const projects =
      await Project.find()
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
