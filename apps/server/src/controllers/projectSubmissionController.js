import Project from "../models/Project.js";
import ProjectMember from "../models/ProjectMember.js";
import ProjectSubmission from "../models/ProjectSubmission.js";
import {
  canEditSubmission,
  canReviewSubmission,
  isProjectWorkspaceWritable,
} from "../utils/workflowRules.js";

const getSubmissionUserFields = (
  isAdmin
) => (isAdmin ? "name email" : "name");

const getSubmissionActorFields = (
  isAdmin
) =>
  isAdmin
    ? "name email authority"
    : "name";

const populateSubmissionQuery = (
  query,
  {
    isAdmin = false,
  } = {}
) =>
  query
    .populate(
      "submittedBy",
      getSubmissionUserFields(
        isAdmin
      )
    )
    .populate(
      "revisions.savedBy",
      getSubmissionUserFields(
        isAdmin
      )
    )
    .populate(
      "statusHistory.changedBy",
      getSubmissionActorFields(
        isAdmin
      )
    );

const appendStatusHistory = (
  submission,
  entry
) => {
  submission.statusHistory.push({
    ...entry,
    changedAt: new Date(),
  });
};

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
      milestoneLabel,
      mode = "draft",
    } = req.body;

    const nextMode =
      mode === "submitted"
        ? "submitted"
        : "draft";

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

    if (
      !isProjectWorkspaceWritable(
        project
      )
    ) {
      return res.status(409).json({
        message:
          "This workspace is not currently open for submission changes.",
      });
    }

    const trimmedMilestone =
      String(
        milestoneLabel ||
          "Final delivery"
      ).trim() || "Final delivery";

    let submission =
      await ProjectSubmission.findOne({
        project: projectId,
      });

    if (!submission) {
      submission =
        new ProjectSubmission({
          project: projectId,
          submittedBy: req.user._id,
        });
    } else if (
      !canEditSubmission({
        currentStatus:
          submission.status,
        nextStatus: nextMode,
      })
    ) {
      return res.status(409).json({
        message:
          submission.status ===
          "submitted"
            ? "This milestone is already submitted and locked until an admin reviews it."
            : "This milestone is no longer editable from the workspace.",
      });
    }

    submission.submittedBy =
      req.user._id;
    submission.githubRepo =
      githubRepo;
    submission.deploymentLink =
      deploymentLink;
    submission.pptLink = pptLink;
    submission.demoVideo =
      demoVideo;
    submission.documentation =
      documentation;
    submission.milestoneLabel =
      trimmedMilestone;
    submission.status = nextMode;
    submission.remarks = "";

    submission.revisions.push({
      milestoneLabel:
        trimmedMilestone,
      githubRepo,
      deploymentLink,
      pptLink,
      demoVideo,
      documentation,
      mode: nextMode,
      savedBy: req.user._id,
      savedAt: new Date(),
    });

    appendStatusHistory(submission, {
      status: nextMode,
      remarks:
        nextMode === "submitted"
          ? `Submitted milestone "${trimmedMilestone}".`
          : `Saved draft "${trimmedMilestone}".`,
      changedBy: req.user._id,
    });

    await submission.save();

    const populatedSubmission =
      await populateSubmissionQuery(
        ProjectSubmission.findById(
          submission._id
        ),
        {
          isAdmin: false,
        }
      );

    return res.json({
      message:
        nextMode === "submitted"
          ? "Submission sent for review."
          : "Draft saved.",
      submission:
        populatedSubmission,
    });
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
        await populateSubmissionQuery(
          ProjectSubmission.findOne({
            project: projectId,
          }),
          {
            isAdmin:
              req.user.authority ===
              "admin",
          }
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

      if (
        !canReviewSubmission({
          currentStatus:
            submission.status,
          nextStatus: status,
        })
      ) {
        return res.status(400).json({
          message:
            "Only submitted milestones can be approved or rejected.",
        });
      }

      submission.status = status;
      submission.remarks = String(
        remarks || ""
      ).trim();

      appendStatusHistory(submission, {
        status,
        remarks:
          submission.remarks ||
          `Submission ${status}.`,
        changedBy: req.user._id,
      });

      await submission.save();

      const project =
        await Project.findById(
          submission.project
        );

      if (
        project &&
        status === "approved"
      ) {
        project.status =
          "completed";
        await project.save();
      }

      const populatedSubmission =
        await populateSubmissionQuery(
          ProjectSubmission.findById(
            submission._id
          ),
          {
            isAdmin: true,
          }
        );

      return res.json({
        submission:
          populatedSubmission,
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
        await populateSubmissionQuery(
          ProjectSubmission.find()
            .populate(
              "project",
              "title status"
            )
            .sort({
              createdAt: -1,
            }),
          {
            isAdmin: true,
          }
        );

      return res.json(submissions);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  };
