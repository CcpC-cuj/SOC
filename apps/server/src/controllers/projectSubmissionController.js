import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import ProjectSubmission from "../models/ProjectSubmission.js";

const assertProjectAccess = async (
  req,
  projectId
) => {
  if (req.user.authority === "admin") {
    return true;
  }

  const membership =
    await ProjectMember.findOne({
      user: req.user._id,
      project: projectId,
      status: "active",
    });

  return Boolean(membership);
};

export const submitProject = async (
  req,
  res
) => {
  try {
    const {
      projectId,
      githubRepo,
      deploymentLink,
      pptLink,
      demoVideo,
      documentation,
    } = req.body;

    const isLeader =
      await ProjectMember.findOne({
        user: req.user._id,
        project: projectId,
        isLeader: true,
        status: "active",
      });

    if (!isLeader) {
      return res.status(403).json({
        message: "Leader only",
      });
    }

    const project =
      await Project.findById(
        projectId
      );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    if (project.status === "completed") {
      return res.status(400).json({
        message:
          "Project already completed",
      });
    }

    let submission =
      await ProjectSubmission.findOne({
        project: projectId,
      });

    if (submission) {
      submission.githubRepo =
        githubRepo;
      submission.deploymentLink =
        deploymentLink;
      submission.pptLink = pptLink;
      submission.demoVideo =
        demoVideo;
      submission.documentation =
        documentation;
      submission.status =
        "submitted";

      await submission.save();
    } else {
      submission =
        await ProjectSubmission.create({
          project: projectId,
          submittedBy: req.user._id,
          githubRepo,
          deploymentLink,
          pptLink,
          demoVideo,
          documentation,
          status: "submitted",
        });
    }

    return res.json(submission);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getProjectSubmission =
  async (req, res) => {
    try {
      const {
        projectId,
      } = req.params;

      const allowed =
        await assertProjectAccess(
          req,
          projectId
        );

      if (!allowed) {
        return res.status(403).json({
          message: "Access denied",
        });
      }

      const submission =
        await ProjectSubmission.findOne({
          project: projectId,
        }).populate(
          "submittedBy",
          "name email"
        );

      return res.json(submission);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const reviewSubmission =
  async (req, res) => {
    try {
      const {
        status,
        remarks,
      } = req.body;

      const submission =
        await ProjectSubmission.findById(
          req.params.id
        );

      if (!submission) {
        return res.status(404).json({
          message:
            "Submission not found",
        });
      }

      submission.status = status;
      submission.remarks = remarks;

      await submission.save();

      const project =
        await Project.findById(
          submission.project
        );

      if (status === "approved") {
        project.status =
          "completed";
      } else if (
        status === "rejected"
      ) {
        project.status = "active";
      }

      await project.save();

      return res.json({
        submission,
        project,
      });
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };

export const getAllSubmissions =
  async (req, res) => {
    try {
      const submissions =
        await ProjectSubmission.find()
          .populate(
            "project",
            "title"
          )
          .populate(
            "submittedBy",
            "name email"
          )
          .sort({
            createdAt: -1,
          });

      return res.json(submissions);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
