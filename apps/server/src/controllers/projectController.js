// src/controllers/projectController.js
import Project
from "../models/Project.js";



// GET ALL PROJECTS
export const getProjects =
  async (req, res) => {

    try {

      const projects =
        await Project.find()
          .populate(
            "createdBy",
            "name email"
          );

      res.json(projects);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// GET SINGLE PROJECT
export const getProject =
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        ).populate(
          "createdBy",
          "name email"
        );

      if (!project) {

        return res.status(404)
          .json({
            message:
              "Project not found",
          });
      }

      res.json(project);

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// CREATE PROJECT
export const createProject =
  async (req, res) => {

    try {

      const project =
        await Project.create({
          ...req.body,

          createdBy:
            req.user._id,
        });

      res.status(201).json(
        project
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};

// DELETE PROJECT
export const deleteProject =
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404)
          .json({
            message:
              "Project not found",
          });
      }

      await Project.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Project deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};



// UPDATE PROJECT
export const updateProject =
  async (req, res) => {

    try {

      const project =
        await Project.findById(
          req.params.id
        );

      if (!project) {

        return res.status(404)
          .json({
            message:
              "Project not found",
          });
      }

      const updatedProject =
        await Project.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );

      res.json(
        updatedProject
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }
};