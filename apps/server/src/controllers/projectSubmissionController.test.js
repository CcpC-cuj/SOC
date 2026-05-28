import test from "node:test";
import assert from "node:assert/strict";

import Project from "../models/Project.js";
import ProjectSubmission from "../models/ProjectSubmission.js";
import {
  reviewSubmission,
} from "./projectSubmissionController.js";

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

function createQueryResult(value) {
  return {
    populate() {
      return this;
    },
    then(resolve, reject) {
      return Promise.resolve(value).then(
        resolve,
        reject
      );
    },
  };
}

test(
  "reviewSubmission keeps project status stable when a milestone is rejected",
  async () => {
    const originalSubmissionFindById =
      ProjectSubmission.findById;
    const originalProjectFindById =
      Project.findById;

    const submission = {
      _id: "submission-1",
      project: "project-1",
      status: "submitted",
      remarks: "",
      statusHistory: [],
      async save() {},
    };

    const project = {
      _id: "project-1",
      status: "upcoming",
      async save() {
        throw new Error(
          "Project.save should not run on rejection."
        );
      },
    };

    let submissionLookupCount = 0;

    ProjectSubmission.findById = (
      id
    ) => {
      submissionLookupCount += 1;

      if (
        submissionLookupCount === 1
      ) {
        assert.equal(
          id,
          "submission-1"
        );
        return submission;
      }

      return createQueryResult({
        ...submission,
        status: "rejected",
      });
    };

    Project.findById = async (id) => {
      assert.equal(id, "project-1");
      return project;
    };

    try {
      const req = {
        params: {
          id: "submission-1",
        },
        body: {
          status: "rejected",
          remarks:
            "Please rework this milestone.",
        },
        user: {
          _id: "admin-1",
        },
      };
      const res = createMockRes();

      await reviewSubmission(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        200
      );
      assert.equal(
        submission.status,
        "rejected"
      );
      assert.equal(
        submission.remarks,
        "Please rework this milestone."
      );
      assert.equal(
        submission.statusHistory.at(-1)
          ?.status,
        "rejected"
      );
      assert.equal(
        res.body.project.status,
        "upcoming"
      );
    } finally {
      ProjectSubmission.findById =
        originalSubmissionFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);

test(
  "reviewSubmission marks the project completed when a milestone is approved",
  async () => {
    const originalSubmissionFindById =
      ProjectSubmission.findById;
    const originalProjectFindById =
      Project.findById;

    const submission = {
      _id: "submission-2",
      project: "project-2",
      status: "submitted",
      remarks: "",
      statusHistory: [],
      async save() {},
    };

    let savedProjectStatus = "";
    const project = {
      _id: "project-2",
      status: "active",
      async save() {
        savedProjectStatus =
          this.status;
      },
    };

    let submissionLookupCount = 0;

    ProjectSubmission.findById = () => {
      submissionLookupCount += 1;

      if (
        submissionLookupCount === 1
      ) {
        return submission;
      }

      return createQueryResult({
        ...submission,
        status: "approved",
      });
    };

    Project.findById = async () =>
      project;

    try {
      const req = {
        params: {
          id: "submission-2",
        },
        body: {
          status: "approved",
          remarks:
            "Delivery accepted.",
        },
        user: {
          _id: "admin-2",
        },
      };
      const res = createMockRes();

      await reviewSubmission(
        req,
        res
      );

      assert.equal(
        res.statusCode,
        200
      );
      assert.equal(
        savedProjectStatus,
        "completed"
      );
      assert.equal(
        res.body.project.status,
        "completed"
      );
    } finally {
      ProjectSubmission.findById =
        originalSubmissionFindById;
      Project.findById =
        originalProjectFindById;
    }
  }
);
