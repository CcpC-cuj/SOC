import {
  screen,
} from "@testing-library/react";
import {
  expect,
  test,
  vi,
} from "vitest";

import { renderWithProviders } from "../../test/test-utils";
import Dashboard from "../Dashboard";
import API from "../../services/api";

vi.mock("../../services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock(
  "../../services/authService",
  () => ({
    resendVerificationEmail:
      vi.fn(),
  })
);

test(
  "participant dashboard renders the main action state from the API payload",
  async () => {
    API.get.mockResolvedValue({
      data: {
        user: {
          name: "Amina",
          email: "amina@soc.dev",
          registrationStatus:
            "assigned",
        },
        analytics: {
          inProgressTasks: 1,
        },
        currentAssignment: {
          project: {
            _id: "project-1",
            title: "Campus Hub",
            description:
              "A project workspace.",
          },
          team: {
            name: "Nova",
            leader: {
              name: "Lead A",
            },
          },
          roles: [
            "frontend-developer",
          ],
          assignedAt:
            "2026-05-20T10:00:00.000Z",
        },
        tasks: [
          {
            _id: "task-1",
            title:
              "Build dashboard shell",
            status: "in_progress",
          },
        ],
        notices: [
          {
            title:
              "Review this blocker",
            description:
              "A task needs attention.",
            tone: "warning",
          },
        ],
        timeline: [
          {
            label:
              "Assigned to",
            value:
              "2026-05-20T10:00:00.000Z",
            detail:
              "Campus Hub",
            type: "date",
          },
        ],
        nextAction: {
          eyebrow:
            "Current next step",
          title:
            "Open your workspace and move the active work forward.",
          description:
            "You currently have 1 active task that still needs attention.",
          actionLabel:
            "Open workspace",
          actionPath:
            "/workspace/project-1",
        },
      },
    });

    renderWithProviders(
      <Dashboard />
    );

    await screen.findByText(
      /Amina, your next move is clear/i
    );

    expect(
      screen.getAllByText(
        /Campus Hub/
      ).length
    ).toBeGreaterThan(0);
    expect(
      screen.getByText(
        /Open your workspace and move the active work forward/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Review this blocker/i
      )
    ).toBeInTheDocument();
  }
);
