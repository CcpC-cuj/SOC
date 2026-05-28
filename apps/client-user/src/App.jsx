import {
  Suspense,
  lazy,
  useEffect,
} from "react";
import {
  Route,
  Routes,
} from "react-router-dom";

import AdminAPI from "./services/adminApi";
import API from "./services/api";
import {
  clearAllSessions,
  clearAdminSession,
  getAdminToken,
  getUserToken,
  setAdminSession,
  setUserSession,
} from "./services/authStorage";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Workspace from "./pages/Workspace";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/Projects";
import Users from "./pages/admin/Users";
import Tasks from "./pages/admin/Tasks";
import Leaders from "./pages/admin/Leaders";
import AdminProjectDetails from "./pages/admin/AdminProjectDetails";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";

const ThemeBrief = lazy(() =>
  import("./pages/ThemeBrief")
);
const ThemeTokens = lazy(() =>
  import("./pages/ThemeTokens")
);
const ThemeTypography = lazy(() =>
  import("./pages/ThemeTypography")
);
const ThemeStyleTile = lazy(() =>
  import("./pages/ThemeStyleTile")
);
const ThemeLayoutRules = lazy(() =>
  import("./pages/ThemeLayoutRules")
);
const ThemeAssets = lazy(() =>
  import("./pages/ThemeAssets")
);
const ThemeBackgrounds = lazy(() =>
  import("./pages/ThemeBackgrounds")
);
const ThemeMotion = lazy(() =>
  import("./pages/ThemeMotion")
);

const App = () => {
  useEffect(() => {
    const verifyAuth = async () => {
      const userToken =
        getUserToken();
      const adminToken =
        getAdminToken();

      if (!userToken && !adminToken) {
        return;
      }

      try {
        if (adminToken) {
          const response =
            await AdminAPI.get(
              "/auth/verify"
            );
          setAdminSession(
            adminToken,
            response.data.user
          );
        } else {
          const response =
            await API.get(
              "/auth/verify"
            );
          setUserSession(
            userToken,
            response.data.user
          );
        }
      } catch {
        if (adminToken) {
          clearAdminSession();
        } else {
          clearAllSessions();
        }
      }
    };

    verifyAuth();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      <Route
        path="/forgot-password"
        element={
          <MainLayout>
            <ForgotPassword />
          </MainLayout>
        }
      />

      <Route
        path="/reset-password"
        element={
          <MainLayout>
            <ResetPassword />
          </MainLayout>
        }
      />

      <Route
        path="/verify-email"
        element={
          <MainLayout>
            <VerifyEmail />
          </MainLayout>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Profile />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/workspace/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Workspace />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/projects"
        element={
          <MainLayout>
            <Projects />
          </MainLayout>
        }
      />

      <Route
        path="/projects/:id"
        element={
          <MainLayout>
            <ProjectDetails />
          </MainLayout>
        }
      />

      <Route
        path="/theme-brief"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading theme brief...
                </div>
              }
            >
              <ThemeBrief />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-tokens"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading theme tokens...
                </div>
              }
            >
              <ThemeTokens />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-typography"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading typography spec...
                </div>
              }
            >
              <ThemeTypography />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-style-tile"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading style tile...
                </div>
              }
            >
              <ThemeStyleTile />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-layout-rules"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading layout rules...
                </div>
              }
            >
              <ThemeLayoutRules />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-assets"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading asset library...
                </div>
              }
            >
              <ThemeAssets />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-backgrounds"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading background system...
                </div>
              }
            >
              <ThemeBackgrounds />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/theme-motion"
        element={
          <MainLayout>
            <Suspense
              fallback={
                <div className="mx-auto max-w-5xl px-6 py-20 text-center text-sm text-[var(--soc-text-muted)]">
                  Loading motion spec...
                </div>
              }
            >
              <ThemeMotion />
            </Suspense>
          </MainLayout>
        }
      />

      <Route
        path="/admin-dashboard"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin-projects"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminProjects />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin-users"
        element={
          <AdminRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin-tasks"
        element={
          <AdminRoute>
            <AdminLayout>
              <Tasks />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin-leaders"
        element={
          <AdminRoute>
            <AdminLayout>
              <Leaders />
            </AdminLayout>
          </AdminRoute>
        }
      />

      <Route
        path="/admin/projects/:id"
        element={
          <AdminRoute>
            <AdminLayout>
              <AdminProjectDetails />
            </AdminLayout>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default App;
