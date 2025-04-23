import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/client/Home";
import Projects from "../pages/client/Projects"; // ✅ make sure this exists
import Blog from "../pages/client/Blog";
import Contact from "../pages/client/Contact";
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

      <Route
        path="*"
        element={
          <MainLayout>
            <div className="max-w-4xl mx-auto px-4 py-20 text-center">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                404 - Page Not Found
              </h1>
              <p className="text-gray-600 mb-8">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <a
                href="/"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition"
              >
                Return to Home
              </a>
            </div>
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
