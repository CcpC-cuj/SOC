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
import AdminDashboard from "../AdminDashboard";
import AdminAPI from "../../../services/adminApi";

vi.mock(
  "../../../services/adminApi",
  () => ({
    default: {
      get: vi.fn(),
      put: vi.fn(),
    },
  })
);

test(
  "admin dashboard loads live settings and saves a registration update",
  async () => {
    AdminAPI.get.mockImplementation(
      async (url) => {
        if (
          url === "/dashboard/admin"
        ) {
          return {
            data: {
              pendingReview: 4,
              tasksPendingReview: 2,
              submissionsPendingReview: 1,
              teamsWithoutLeaders: 1,
              taskStatusCounts: {
                todo: 1,
                in_progress: 1,
                blocked: 0,
                submitted: 2,
                approved: 0,
                rejected: 0,
              },
            },
          };
        }

        if (
          url === "/settings/admin"
        ) {
          return {
            data: {
              registrationOpen:
                true,
              registrationDeadline:
                "2026-06-01T10:30:00.000Z",
              registrationHeadline:
                "Join SOC",
              registrationSubheadline:
                "Show us your skills",
              registrationNotice:
                "We assign later.",
              contactEmail:
                "old@soc.dev",
              eligibility:
                "Open to club members.",
              codeOfConductUrl:
                "https://soc.dev/conduct",
            },
          };
        }

        throw new Error(
          `Unhandled GET ${url}`
        );
      }
    );

    AdminAPI.put.mockResolvedValue({
      data: {
        registrationOpen: true,
        registrationDeadline:
          "2026-06-01T10:30:00.000Z",
        registrationHeadline:
          "Join SOC",
        registrationSubheadline:
          "Show us your skills",
        registrationNotice:
          "We assign later.",
        contactEmail:
          "new@soc.dev",
        eligibility:
          "Open to club members.",
        codeOfConductUrl:
          "https://soc.dev/conduct",
      },
    });

    renderWithProviders(
      <AdminDashboard />
    );

    await screen.findByText(
      /What needs attention right now/i
    );

    fireEvent.change(
      screen.getByLabelText(
        /Contact email/i
      ),
      {
        target: {
          value: "new@soc.dev",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Save settings/i,
      })
    );

    await waitFor(() => {
      expect(
        AdminAPI.put
      ).toHaveBeenCalledWith(
        "/settings/admin",
        expect.objectContaining({
          contactEmail:
            "new@soc.dev",
        })
      );
    });

    expect(
      await screen.findByText(
        /saved successfully/i
      )
    ).toBeInTheDocument();
  }
);
