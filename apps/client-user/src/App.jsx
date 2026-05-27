import { useEffect } from "react";
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
} from "./services/authStorage";

import MainLayout from "./layouts/MainLayout";
import AdminLayout from "./layouts/AdminLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
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
          await AdminAPI.get(
            "/auth/verify"
          );
        } else {
          await API.get(
            "/auth/verify"
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
