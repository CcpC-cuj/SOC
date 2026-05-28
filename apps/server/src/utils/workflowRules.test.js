import test from "node:test";
import assert from "node:assert/strict";

import {
  canEditSubmission,
  canAssignToCapacity,
  canReviewSubmission,
  canTransitionTask,
  getAllowedSubmissionModes,
  getAllowedTaskTransitions,
  getProjectDeleteBlockers,
  isProjectWorkspaceReadOnly,
  isProjectWorkspaceWritable,
  isPublicProject,
  normalizeTaskStatus,
} from "./workflowRules.js";

test(
  "normalizeTaskStatus maps legacy pending to todo",
  () => {
    assert.equal(
      normalizeTaskStatus(
        "pending"
      ),
      "todo"
    );
    assert.equal(
      normalizeTaskStatus(
        "blocked"
      ),
      "blocked"
    );
  }
);

test(
  "member task transitions allow forward progress but not approval",
  () => {
    assert.deepEqual(
      getAllowedTaskTransitions(
        "todo",
        "member"
      ),
      [
        "in_progress",
        "blocked",
        "submitted",
      ]
    );

    assert.equal(
      canTransitionTask({
        currentStatus: "todo",
        nextStatus: "submitted",
        actor: "member",
      }),
      true
    );

    assert.equal(
      canTransitionTask({
        currentStatus: "submitted",
        nextStatus: "approved",
        actor: "member",
      }),
      false
    );
  }
);

test(
  "admin task transitions only review submitted or rejected work",
  () => {
    assert.equal(
      canTransitionTask({
        currentStatus: "submitted",
        nextStatus: "approved",
        actor: "admin",
      }),
      true
    );

    assert.equal(
      canTransitionTask({
        currentStatus: "rejected",
        nextStatus: "in_progress",
        actor: "admin",
      }),
      true
    );

    assert.equal(
      canTransitionTask({
        currentStatus: "todo",
        nextStatus: "approved",
        actor: "admin",
      }),
      false
    );
  }
);

test(
  "project visibility and capacity helpers stay explicit",
  () => {
    assert.equal(
      isPublicProject({
        isShowcase: true,
      }),
      true
    );
    assert.equal(
      isPublicProject({
        isShowcase: false,
      }),
      false
    );
    assert.equal(
      canAssignToCapacity({
        currentCount: 3,
        capacity: 4,
      }),
      true
    );
    assert.equal(
      canAssignToCapacity({
        currentCount: 4,
        capacity: 4,
      }),
      false
    );
    assert.equal(
      isProjectWorkspaceWritable({
        status: "active",
      }),
      true
    );
    assert.equal(
      isProjectWorkspaceReadOnly({
        status: "closed",
      }),
      true
    );
  }
);

test(
  "project delete blockers describe remaining dependencies",
  () => {
    assert.deepEqual(
      getProjectDeleteBlockers({
        activeMembers: 2,
        teams: 1,
        tasks: 0,
        submissions: 3,
      }),
      [
        "2 active members",
        "1 team",
        "3 submissions",
      ]
    );
  }
);

test(
  "submission review requires a submitted milestone",
  () => {
    assert.equal(
      canReviewSubmission({
        currentStatus: "submitted",
        nextStatus: "approved",
      }),
      true
    );
    assert.equal(
      canReviewSubmission({
        currentStatus: "draft",
        nextStatus: "approved",
      }),
      false
    );
  }
);

test(
  "submission editing stays open only for drafts and rejected revisions",
  () => {
    assert.deepEqual(
      getAllowedSubmissionModes(
        "rejected"
      ),
      [
        "draft",
        "submitted",
      ]
    );

    assert.equal(
      canEditSubmission({
        currentStatus: "submitted",
        nextStatus: "draft",
      }),
      false
    );

    assert.equal(
      canEditSubmission({
        currentStatus: "rejected",
        nextStatus: "submitted",
      }),
      true
    );
  }
);
