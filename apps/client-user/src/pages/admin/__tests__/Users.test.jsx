import {
  fireEvent,
  screen,
  waitFor,
} from "@testing-library/react";
import {
  expect,
  test,
  vi,
} from "vitest";

import { renderWithProviders } from "../../../test/test-utils";
import Users from "../Users";
import AdminAPI from "../../../services/adminApi";

vi.mock(
  "../../../services/adminApi",
  () => ({
    default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
    },
  })
);

test(
  "participant assignment flow loads detail on demand and posts the assignment",
  async () => {
    const userListResponse = {
      data: {
        items: [
          {
            _id: "user-1",
            name: "Nila",
            email: "nila@soc.dev",
            department: "CSE",
            program: "BTech",
            roll: "42",
            experienceLevel:
              "beginner",
            preferredDomains: [
              "Frontend",
            ],
            preferredRoles: [
              "frontend-developer",
            ],
            registrationStatus:
              "shortlisted",
            skills: [
              "React",
            ],
            whyJoin:
              "Build real products",
            memberships: [],
          },
        ],
        pagination: {
          page: 1,
          limit: 10,
          totalItems: 1,
          totalPages: 1,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      },
    };

    AdminAPI.get.mockImplementation(
      async (url) => {
        if (
          url === "/projects"
        ) {
          return {
            data: {
              items: [
                {
                  _id: "project-1",
                  title:
                    "Campus Hub",
                  isShowcase: false,
                },
              ],
            },
          };
        }

        if (url === "/users") {
          return userListResponse;
        }

        if (
          url === "/users/user-1"
        ) {
          return {
            data: {
              _id: "user-1",
              name: "Nila",
              email:
                "nila@soc.dev",
              department: "CSE",
              program: "BTech",
              availability:
                "10 hrs/week",
              priorExperience:
                "Built small React apps",
              registrationStatus:
                "shortlisted",
              adminNotes: "",
              memberships: [],
              assignmentHistory: [],
            },
          };
        }

        if (
          url ===
          "/teams/project/project-1"
        ) {
          return {
            data: [
              {
                _id: "team-1",
                name: "Nova",
                members: [],
                capacity: 5,
              },
            ],
          };
        }

        throw new Error(
          `Unhandled GET ${url}`
        );
      }
    );

    AdminAPI.post.mockResolvedValue({
      data: {
        success: true,
      },
    });

    renderWithProviders(<Users />);

    await screen.findByText(
      /Participant review/i
    );
    await screen.findByText(
      "Nila"
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Review \/ Assign/i,
      })
    );

    await screen.findByText(
      /Assign to project and team/i
    );

    fireEvent.change(
      screen.getByLabelText(
        /^Project$/i
      ),
      {
        target: {
          value: "project-1",
        },
      }
    );

    await waitFor(() => {
      expect(
        AdminAPI.get
      ).toHaveBeenCalledWith(
        "/teams/project/project-1"
      );
    });

    fireEvent.change(
      screen.getByLabelText(
        /^Team$/i
      ),
      {
        target: {
          value: "team-1",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name:
          /frontend developer/i,
      })
    );

    fireEvent.click(
      screen.getByRole("button", {
        name:
          /Assign participant/i,
      })
    );

    await waitFor(() => {
      expect(
        AdminAPI.post
      ).toHaveBeenCalledWith(
        "/project-members/assign",
        expect.objectContaining({
          userId: "user-1",
          projectId:
            "project-1",
          teamId: "team-1",
          roles: [
            "frontend-developer",
          ],
        })
      );
    });
  }
);
