import dotenv from "dotenv";
import mongoose from "mongoose";

import Project from "../models/Project.js";
import User from "../models/User.js";

dotenv.config();

const showcaseProjects = [
  {
    title:
      "Campus Creator Hub",
    description:
      "A polished student platform for managing club campaigns, event media, and community spotlights across campus.",
    session: "2026-27",
    season: "Summer",
    domain: "Frontend",
    techStack: [
      "React",
      "Tailwind CSS",
      "Animation Systems",
      "Design Systems",
    ],
    highlights: [
      "High-visibility public experience",
      "Real product storytelling",
      "Strong UI ownership",
    ],
    maxMembers: 8,
    status: "active",
    isShowcase: true,
    acceptingAssignments: false,
  },
  {
    title:
      "Smart Community API",
    description:
      "A backend-heavy coordination platform for registrations, announcements, task orchestration, and reviewer workflows.",
    session: "2026-27",
    season: "Summer",
    domain: "Backend",
    techStack: [
      "Node.js",
      "Express",
      "MongoDB",
      "REST APIs",
    ],
    highlights: [
      "Operational backend design",
      "Secure admin workflows",
      "Real data modeling",
    ],
    maxMembers: 10,
    status: "active",
    isShowcase: true,
    acceptingAssignments: false,
  },
  {
    title:
      "Mentor Match Engine",
    description:
      "An intelligent recommendation layer that pairs student skill profiles with project needs, mentors, and growth tracks.",
    session: "2026-27",
    season: "Winter",
    domain: "AI/ML",
    techStack: [
      "Python",
      "Recommendation Systems",
      "Data Pipelines",
      "Analytics",
    ],
    highlights: [
      "Capability matching",
      "Data-first thinking",
      "Experimental feature design",
    ],
    maxMembers: 6,
    status: "upcoming",
    isShowcase: true,
    acceptingAssignments: false,
  },
  {
    title:
      "Design Sprint Studio",
    description:
      "A product design track focused on onboarding flows, interaction polish, and end-to-end UX systems for student platforms.",
    session: "2026-27",
    season: "Winter",
    domain: "UI/UX",
    techStack: [
      "Figma",
      "Design Tokens",
      "UX Research",
      "Prototyping",
    ],
    highlights: [
      "Strong portfolio output",
      "Research-backed decisions",
      "Interface quality focus",
    ],
    maxMembers: 6,
    status: "upcoming",
    isShowcase: true,
    acceptingAssignments: false,
  },
];

const seedShowcaseProjects =
  async () => {
    try {
      await mongoose.connect(
        process.env.MONGO_URI
      );

      const admin =
        await User.findOne({
          authority: "admin",
        });

      if (!admin) {
        throw new Error(
          "Create an admin user before seeding showcase projects."
        );
      }

      for (const project of showcaseProjects) {
        const existing =
          await Project.findOne({
            title: project.title,
          });

        if (!existing) {
          await Project.create({
            ...project,
            createdBy: admin._id,
          });
        }
      }

      console.log(
        "Showcase projects seeded."
      );
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };

seedShowcaseProjects();
