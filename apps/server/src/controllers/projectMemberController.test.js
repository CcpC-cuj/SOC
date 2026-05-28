import test from "node:test";
import assert from "node:assert/strict";

import Project from "../models/Project.js";
import User from "../models/User.js";
import {
  assignMemberToProject,
  joinProject,
} from "./projectMemberController.js";

function createMockRes() {
  return {
    statusCode: 200,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(payload) {
      this.body = payload;
      return this;
    },
  };
}

test(
  "joinProject stays disabled for self-service enrollment",
  async () => {
    const res = createMockRes();

    await joinProject(
      {
        user: {
          _id: "user-1",
        },
      },
      res
    );

    assert.equal(
      res.statusCode,
      403
    );
    assert.match(
      res.body.message,
      /Direct project joining is disabled/i
    );
  }
);

test(
  "assignMemberToProject blocks showcase projects from receiving real assignments",
  async () => {
    const originalUserFindById =
      User.findById;
    const originalProjectFindById =
      Project.findById;

    User.findById = async () => ({
      _id: "user-1",
      authority: "user",
    });
    Project.findById = async () => ({
      _id: "project-1",
      isShowcase: true,
      acceptingAssignments: true,
      status: "active",
    });

    try {
      const req = {
        body: {
          userId: "user-1",
          projectId: "project-1",
          roles: [
            "frontend-developer",
          ],
        },
        user: {
          _id: "admin-1",
        },
      };
      const res = createMockRes();

      await assignMemberToProject(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        400
      );
      assert.match(
        res.body.message,
        /Showcase projects are for attraction only/i
      );
    } finally {
      User.findById =
        originalUserFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);

test(
  "assignMemberToProject blocks completed or closed delivery projects",
  async () => {
    const originalUserFindById =
      User.findById;
    const originalProjectFindById =
      Project.findById;

    User.findById = async () => ({
      _id: "user-2",
      authority: "user",
    });
    Project.findById = async () => ({
      _id: "project-2",
      isShowcase: false,
      acceptingAssignments: true,
      status: "closed",
    });

    try {
      const req = {
        body: {
          userId: "user-2",
          projectId: "project-2",
          roles: [
            "backend-developer",
          ],
        },
        user: {
          _id: "admin-2",
        },
      };
      const res = createMockRes();

      await assignMemberToProject(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        400
      );
      assert.match(
        res.body.message,
        /completed or closed project/i
      );
    } finally {
      User.findById =
        originalUserFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);
