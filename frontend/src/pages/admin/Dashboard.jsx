import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalPosts: 24,
    totalProjects: 16,
    totalComments: 128,
    recentVisits: 1243,
  });

  // Check if user is authenticated
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!token) {
    return null; // Prevent rendering dashboard if not authenticated
  }

  return (
    <div className="min-h-screen bg-[#052d43] text-white">
      {/* Header */}
      <header className="bg-[#071f33]/80 backdrop-blur-lg border-b border-blue-900/30 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center text-white font-bold">
                A
              </div>
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              {user && (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 font-semibold border border-blue-500/30">
                    {user.name?.charAt(0) || "U"}
                  </div>
                </div>
              )}

              <button
                onClick={handleLogout}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-all"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="bg-[#071f33]/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-blue-900/30 mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back, {user?.name || "Admin"}!
          </h2>
          <p className="text-gray-400">
            Here's what's happening with your portfolio today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Blog Posts",
              count: stats.totalPosts,
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              ),
              color: "from-blue-500/20 to-blue-600/20",
              iconColor: "text-blue-400",
            },
            {
              title: "Projects",
              count: stats.totalProjects,
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              ),
              color: "from-purple-500/20 to-purple-600/20",
              iconColor: "text-purple-400",
            },
            {
              title: "Comments",
              count: stats.totalComments,
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              ),
              color: "from-green-500/20 to-green-600/20",
              iconColor: "text-green-400",
            },
            {
              title: "Visits",
              count: stats.recentVisits,
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              ),
              color: "from-amber-500/20 to-amber-600/20",
              iconColor: "text-amber-400",
            },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-[#071f33]/60 backdrop-blur-sm rounded-xl p-6 border border-blue-900/30 hover:border-blue-700/30 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 text-sm font-medium mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-3xl font-bold text-white">
                    {stat.count}
                  </h3>
                </div>
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} ${stat.iconColor}`}
                >
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-[#071f33]/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-blue-900/30">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Recent Activity</h3>
              <button className="text-blue-400 text-sm hover:text-blue-300 transition-colors">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: "New comment on project",
                  desc: "Someone commented on your React Native project",
                  time: "2 hours ago",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                      />
                    </svg>
                  ),
                  color: "bg-blue-500/20 text-blue-400",
                },
                {
                  title: "New blog post published",
                  desc: "Your blog post about CSS was published",
                  time: "5 hours ago",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  ),
                  color: "bg-green-500/20 text-green-400",
                },
                {
                  title: "Visitor spike detected",
                  desc: "You have 2x more visitors than usual today",
                  time: "1 day ago",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  ),
                  color: "bg-amber-500/20 text-amber-400",
                },
                {
                  title: "New contact message",
                  desc: "You received a message from a potential client",
                  time: "2 days ago",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  ),
                  color: "bg-purple-500/20 text-purple-400",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start p-3 rounded-lg hover:bg-blue-900/20 transition-colors"
                >
                  <div
                    className={`p-2 rounded-lg mr-4 ${activity.color} flex-shrink-0`}
                  >
                    {activity.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">
                      {activity.title}
                    </h4>
                    <p className="text-gray-400 text-sm">{activity.desc}</p>
                    <p className="text-gray-500 text-xs mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#071f33]/60 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-blue-900/30">
            <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-3">
              {[
                {
                  title: "Create New Post",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  ),
                  color: "bg-blue-500 hover:bg-blue-600",
                },
                {
                  title: "Add New Project",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  ),
                  color: "bg-purple-500 hover:bg-purple-600",
                },
                {
                  title: "Update Profile",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  ),
                  color: "bg-green-500 hover:bg-green-600",
                },
                {
                  title: "Manage Comments",
                  icon: (
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
                        strokeWidth={1.5}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                  ),
                  color: "bg-amber-500 hover:bg-amber-600",
                },
              ].map((action, index) => (
                <button
                  key={index}
                  className={`w-full flex items-center text-white font-medium rounded-lg p-3 transition-all ${action.color}`}
                >
                  <span className="mr-3">{action.icon}</span>
                  {action.title}
                </button>
              ))}
            </div>

            {/* System Status */}
            <div className="mt-8 pt-6 border-t border-blue-900/30">
              <h4 className="text-lg font-medium text-white mb-4">
                System Status
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Server Uptime", value: "99.9%" },
                  { label: "API Status", value: "Operational" },
                  { label: "Database", value: "Healthy" },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-green-400 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
