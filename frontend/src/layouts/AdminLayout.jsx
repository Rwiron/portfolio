import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import Sidebar from "../components/admin/Sidebar";

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    if (!token && !localStorage.getItem("authToken")) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    dispatch(logout());
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // Don't render anything if not authenticated
  if (!token && !localStorage.getItem("authToken")) {
    return null;
  }

  // Get user from localStorage if not in Redux state
  const displayUser = user ||
    JSON.parse(localStorage.getItem("authUser")) || {
      name: "Admin",
      email: "admin@example.com",
    };

  return (
    <div className="min-h-screen bg-[#052d43] text-white flex flex-col">
      {/* Header */}
      <header className="bg-[#071f33]/80 backdrop-blur-lg border-b border-blue-900/30 shadow-lg sticky top-0 z-10">
        <div className="px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <button
                onClick={toggleMobileMenu}
                className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold"
              >
                A
              </button>
              <h1 className="text-xl font-bold">Admin Panel</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-medium">{displayUser.name}</p>
                  <p className="text-xs text-gray-400">{displayUser.email}</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold border border-blue-500/30">
                  {displayUser.name?.charAt(0) || "U"}
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
                title="Logout"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Use the Sidebar component */}
        <Sidebar mobileOpen={mobileMenuOpen} onClose={closeMobileMenu} />

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
