import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import { ToastProvider } from "../components/ui/ToastProvider";

export function renderWithProviders(
  ui,
  {
    route = "/",
  } = {}
) {
  return render(ui, {
    wrapper: ({
      children,
    }) => (
      <ToastProvider>
        <MemoryRouter
          initialEntries={[route]}
        >
          {children}
        </MemoryRouter>
      </ToastProvider>
    ),
  });
}
