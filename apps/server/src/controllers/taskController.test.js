import test from "node:test";
import assert from "node:assert/strict";

import Project from "../models/Project.js";
import Task from "../models/Task.js";
import {
  updateTaskStatus,
} from "./taskController.js";

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
  "updateTaskStatus blocks task progress changes in read-only workspaces",
  async () => {
    const originalTaskFindById =
      Task.findById;
    const originalProjectFindById =
      Project.findById;

    Task.findById = async () => ({
      _id: "task-1",
      project: "project-1",
      assignedTo: {
        toString: () => "user-1",
      },
    });
    Project.findById = async () => ({
      _id: "project-1",
      status: "completed",
    });

    try {
      const req = {
        params: {
          id: "task-1",
        },
        body: {
          status: "submitted",
        },
        user: {
          _id: "user-1",
        },
      };
      const res = createMockRes();

      await updateTaskStatus(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        409
      );
      assert.match(
        res.body.message,
        /read-only/i
      );
    } finally {
      Task.findById =
        originalTaskFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);

test(
  "updateTaskStatus only allows the assigned member to move task progress",
  async () => {
    const originalTaskFindById =
      Task.findById;
    const originalProjectFindById =
      Project.findById;

    Task.findById = async () => ({
      _id: "task-2",
      project: "project-2",
      assignedTo: {
        toString: () => "assignee-1",
      },
    });
    Project.findById = async () => ({
      _id: "project-2",
      status: "active",
    });

    try {
      const req = {
        params: {
          id: "task-2",
        },
        body: {
          status: "in_progress",
        },
        user: {
          _id: "leader-1",
        },
      };
      const res = createMockRes();

      await updateTaskStatus(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        403
      );
      assert.match(
        res.body.message,
        /Only the assigned member/i
      );
    } finally {
      Task.findById =
        originalTaskFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);
