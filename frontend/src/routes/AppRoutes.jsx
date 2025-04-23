import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/client/Home";
import Projects from "../pages/client/Projects"; // ✅ make sure this exists
import Blog from "../pages/client/Blog";
import Contact from "../pages/client/Contact";
import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AdminCreateProject from "../pages/admin/AdminCreateProject";
import AdminLayout from "../layouts/AdminLayout";
import NotFound from "../pages/NotFound";
import AdminSkills from "../pages/admin/AdminSkills";

const AppRoutes = () => {
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
        path="/projects"
        element={
          <MainLayout>
            <Projects />
          </MainLayout>
        }
      />
      <Route
        path="/blog"
        element={
          <MainLayout>
            <Blog />
          </MainLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <MainLayout>
            <Contact />
          </MainLayout>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin/dashboard"
        element={
          <PrivateRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/create-project"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminCreateProject />
            </AdminLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/admin/skills"
        element={
          <PrivateRoute>
            <AdminLayout>
              <AdminSkills />
            </AdminLayout>
          </PrivateRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
