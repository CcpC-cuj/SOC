import ProjectSubmission from "../models/ProjectSubmission.js";
import ProjectMember from "../models/ProjectMember.js";
import Project from "../models/Project.js";

// CREATE / UPDATE SUBMISSION
export const submitProject =
  async (req, res) => {

    try {

      const {
        projectId,
        githubRepo,
        deploymentLink,
        pptLink,
        demoVideo,
        documentation,
      } = req.body;

      // LEADER CHECK
      const isLeader =
        await ProjectMember.findOne({
          user: req.user._id,

          project: projectId,

          isLeader: true,
        });

      if (!isLeader) {

        return res.status(403)
          .json({
            message:
              "Leader only",
          });
      }

      // CHECK PROJECT
            const project =
            await Project.findById(
                projectId
            );

            // PROJECT COMPLETED
            if (
            project.status
            === "completed"
            ) {

            return res.status(400)
                .json({
                message:
                    "Project already completed",
                });
            }

      // CHECK EXISTING
      let submission =
        await ProjectSubmission.findOne({
          project: projectId,
        });

      // UPDATE
      if (submission) {

        submission.githubRepo =
          githubRepo;

        submission.deploymentLink =
          deploymentLink;

        submission.pptLink =
          pptLink;

        submission.demoVideo =
          demoVideo;

        submission.documentation =
          documentation;

        submission.status =
          "submitted";

        await submission.save();
      }

      // CREATE
      else {

        submission =
          await ProjectSubmission.create({
            project:
              projectId,

            submittedBy:
              req.user._id,

            githubRepo,

            deploymentLink,

            pptLink,

            demoVideo,

            documentation,

            status:
              "submitted",
          });
      }

      res.json(submission);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};

// GET PROJECT SUBMISSION
export const getProjectSubmission =
  async (req, res) => {

    try {

      const submission =
        await ProjectSubmission.findOne({
          project:
            req.params.projectId,
        })
        .populate(
          "submittedBy",
          "name email"
        );

      res.json(submission);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};


// REVIEW SUBMISSION
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

        return res.status(404)
          .json({
            message:
              "Submission not found",
          });
      }

      // UPDATE SUBMISSION
      submission.status =
        status;

      submission.remarks =
        remarks;

      await submission.save();

      // UPDATE PROJECT
      const project =
        await Project.findById(
          submission.project
        );

      // APPROVED
      if (
        status === "approved"
      ) {

        project.status =
          "completed";
      }

      // REJECTED
      else if (
        status === "rejected"
      ) {

        project.status =
          "active";
      }

      await project.save();

      res.json({
        submission,
        project,
      });

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};

// GET ALL SUBMISSIONS
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
        );

      res.json(submissions);

    } catch (error) {

      res.status(500)
        .json({
          message:
            error.message,
        });

    }
};
