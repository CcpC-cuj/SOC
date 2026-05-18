// App.jsx

import {
  Routes,
  Route,
} from "react-router-dom";

import {
  useEffect,
} from "react";

import API from "./services/api";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Projects from "./pages/Projects";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import ProjectDetails from "./pages/ProjectDetails";
import Workspace from "./pages/Workspace";
// ADMIN PAGES
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProjects from "./pages/admin/Projects";
import Users from "./pages/admin/Users";
import Tasks from "./pages/admin/Tasks";
import Leaders from "./pages/admin/Leaders";
import AdminProjectDetails from "./pages/admin/AdminProjectDetails";

const App = () => {

    useEffect(() => {

      const verifyAuth =
        async () => {

          const token =
            localStorage.getItem(
              "token"
            );

          if (!token) return;

          try {

            await API.get(
              "/auth/verify"
            );

          } catch {

            localStorage.removeItem(
              "token"
            );

            localStorage.removeItem(
              "user"
            );

            window.location.href =
              "/";
          }
        };

      verifyAuth();

    }, []);

  return (
    <Routes>

      {/* HOME */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* LOGIN */}
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      {/* REGISTER */}
      <Route
        path="/register"
        element={
          <MainLayout>
            <Register />
          </MainLayout>
        }
      />

      {/* USER DASHBOARD */}
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

      {/* USER PROFILE */}
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

    {/* workspace */}
      <Route
      path="/workspace/:id"
      element={
        <MainLayout>

          <Workspace />

        </MainLayout>
      }
    />

      {/* USER PROJECTS */}
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

      {/* ================= ADMIN ================= */}

      {/* ADMIN DASHBOARD */}
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

      {/* ADMIN PROJECTS */}
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

      {/* ADMIN USERS */}
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

      {/* ADMIN TASKS */}
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

      {/* ADMIN LEADERS */}
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

{/* admin projects */}

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