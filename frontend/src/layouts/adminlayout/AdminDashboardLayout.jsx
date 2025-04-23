import { useState } from "react";
import AdminLayout from "../AdminLayout";

const AdminDashboardLayout = ({ children }) => {
  const [showStats, setShowStats] = useState(true);

  return (
    <AdminLayout>
      {/* Dashboard-specific header with stats visibility toggle */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          Admin Dashboard
        </h1>
        <button
          onClick={() => setShowStats(!showStats)}
          className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-blue-400 transition-all"
        >
          {showStats ? "Hide Stats" : "Show Stats"}
        </button>
      </div>

      {/* Stats Cards */}
      {showStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatsCard
            title="Total Visitors"
            value="5,248"
            trend="+12%"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            }
            color="blue"
          />
          <StatsCard
            title="New Messages"
            value="28"
            trend="+3"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            }
            color="amber"
          />
          <StatsCard
            title="Projects"
            value="14"
            trend="+2"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                />
              </svg>
            }
            color="green"
          />
          <StatsCard
            title="Blog Posts"
            value="32"
            trend="+5"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
            }
            color="purple"
          />
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <QuickAction
          label="New Post"
          icon={
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          }
          color="purple"
        />
        <QuickAction
          label="New Project"
          icon={
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
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          color="green"
        />
        <QuickAction
          label="Upload Media"
          icon={
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
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
              />
            </svg>
          }
          color="blue"
        />
        <QuickAction
          label="View Analytics"
          icon={
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
          }
          color="indigo"
        />
      </div>

      {/* Content Area */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </AdminLayout>
  );
};

// Statistics Card Component
const StatsCard = ({ title, value, trend, icon, color }) => {
  const colorMap = {
    blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400",
    green:
      "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400",
    amber:
      "from-amber-500/20 to-amber-600/20 border-amber-500/30 text-amber-400",
    purple:
      "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400",
    indigo:
      "from-indigo-500/20 to-indigo-600/20 border-indigo-500/30 text-indigo-400",
  };

  const trendColor = trend.startsWith("+") ? "text-green-400" : "text-red-400";

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} border rounded-xl p-4 shadow-lg`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className={`text-xs mt-1 ${trendColor}`}>{trend} from last week</p>
        </div>
        <div className={`p-2 bg-${color}-500/10 rounded-lg text-${color}-500`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

// Quick Action Button Component
const QuickAction = ({ label, icon, color }) => {
  const colorMap = {
    blue: "bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/30 text-blue-400",
    green:
      "bg-green-500/20 hover:bg-green-500/30 border-green-500/30 text-green-400",
    amber:
      "bg-amber-500/20 hover:bg-amber-500/30 border-amber-500/30 text-amber-400",
    purple:
      "bg-purple-500/20 hover:bg-purple-500/30 border-purple-500/30 text-purple-400",
    indigo:
      "bg-indigo-500/20 hover:bg-indigo-500/30 border-indigo-500/30 text-indigo-400",
  };

  return (
    <button
      className={`${colorMap[color]} px-4 py-2 rounded-lg border flex items-center space-x-2 transition-all`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default AdminDashboardLayout;
