import {
  screen,
} from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import {
  expect,
  test,
  vi,
} from "vitest";
import { render } from "@testing-library/react";

import { ToastProvider } from "../../components/ui/ToastProvider";
import Workspace from "../Workspace";
import API from "../../services/api";

vi.mock("../../services/api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

test(
  "workspace keeps leader coordination visible while locking member-only task updates and submitted milestones",
  async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        _id: "leader-1",
        name: "Team Lead",
      })
    );

    API.get.mockImplementation(
      async (url) => {
        if (
          url === "/projects/project-1"
        ) {
          return {
            data: {
              _id: "project-1",
              title:
                "Campus Hub",
              description:
                "Shared workspace",
              status: "active",
              domain:
                "Frontend",
            },
          };
        }

        if (
          url ===
          "/project-members/project-1"
        ) {
          return {
            data: [
              {
                _id: "member-1",
                user: {
                  _id: "leader-1",
                  name: "Team Lead",
                },
                isLeader: true,
                roles: [
                  "frontend-developer",
                ],
                team: {
                  name: "Nova",
                },
              },
              {
                _id: "member-2",
                user: {
                  _id: "member-2",
                  name: "Builder",
                },
                isLeader: false,
                roles: [
                  "backend-developer",
                ],
                team: {
                  name: "Nova",
                },
              },
            ],
          };
        }

        if (
          url === "/tasks/project/project-1"
        ) {
          return {
            data: [
              {
                _id: "task-1",
                title:
                  "Finish API wiring",
                description:
                  "Connect the dashboard to real data.",
                status: "in_progress",
                taskType: "feature",
                assignedTo: {
                  _id: "member-2",
                  name: "Builder",
                },
                comments: [],
                activity: [],
                submissionLinks: [],
              },
            ],
          };
        }

        if (
          url ===
          "/project-submissions/project-1"
        ) {
          return {
            data: {
              _id: "submission-1",
              status: "submitted",
              milestoneLabel:
                "Milestone one",
              revisions: [],
              statusHistory: [],
            },
          };
        }

        throw new Error(
          `Unhandled GET ${url}`
        );
      }
    );

    render(
      <ToastProvider>
        <MemoryRouter
          initialEntries={[
            "/workspace/project-1",
          ]}
        >
          <Routes>
            <Route
              path="/workspace/:id"
              element={<Workspace />}
            />
          </Routes>
        </MemoryRouter>
      </ToastProvider>
    );

    await screen.findByText(
      /Campus Hub/i
    );

    expect(
      screen.getByText(
        /Only the assigned member can update this task's progress/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /Save draft/i,
      })
    ).toBeDisabled();
    expect(
      screen.getByRole("button", {
        name:
          /Submit for review/i,
      })
    ).toBeDisabled();
  }
);
