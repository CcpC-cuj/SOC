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

import { renderWithProviders } from "../../test/test-utils";
import Login from "../Login";
import API from "../../services/api";
import {
  loginUser,
} from "../../services/authService";

const mockNavigate = vi.fn();

vi.mock("../../services/api", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock(
  "../../services/authService",
  () => ({
    loginUser: vi.fn(),
  })
);

vi.mock(
  "react-router-dom",
  async () => {
    const actual =
      await vi.importActual(
        "react-router-dom"
      );

    return {
      ...actual,
      useNavigate: () =>
        mockNavigate,
      useLocation: () => ({
        state: {
          from: "/dashboard",
        },
      }),
    };
  }
);

test(
  "login page loads settings and routes a participant after sign-in",
  async () => {
    API.get.mockResolvedValue({
      data: {
        registrationNotice:
          "Bring your skills and we will place you later.",
      },
    });
    loginUser.mockResolvedValue({
      user: {
        authority: "user",
      },
    });

    renderWithProviders(<Login />);

    await screen.findByText(
      /Bring your skills/i
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        /you@example.com/i
      ),
      {
        target: {
          value: "member@soc.dev",
        },
      }
    );
    fireEvent.change(
      screen.getByPlaceholderText(
        /Enter your password/i
      ),
      {
        target: {
          value: "secret123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login to soc/i,
      })
    );

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(
        {
          email:
            "member@soc.dev",
          password:
            "secret123",
        }
      );
    });

    expect(
      mockNavigate
    ).toHaveBeenCalledWith(
      "/dashboard"
    );
  }
);
