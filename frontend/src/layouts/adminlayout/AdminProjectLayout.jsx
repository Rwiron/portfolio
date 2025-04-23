import { useState } from "react";
import AdminLayout from "../AdminLayout";

const AdminProjectLayout = ({ children }) => {
  const [viewMode, setViewMode] = useState("grid");
  const [projectStatus, setProjectStatus] = useState("all");

  return (
    <AdminLayout>
      {/* Project management header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          Project Management
        </h1>
        <p className="text-gray-400 mt-1">
          Manage your portfolio projects, showcase items, and client work
        </p>
      </div>

      {/* Control Panel */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* View Toggle */}
          <div className="flex items-center bg-blue-900/30 rounded-lg p-1">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-blue-600/50 to-emerald-600/50 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              <span>Grid</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
                viewMode === "list"
                  ? "bg-gradient-to-r from-blue-600/50 to-emerald-600/50 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("kanban")}
              className={`px-3 py-1.5 rounded-lg flex items-center space-x-2 ${
                viewMode === "kanban"
                  ? "bg-gradient-to-r from-blue-600/50 to-emerald-600/50 text-white"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
                />
              </svg>
              <span>Kanban</span>
            </button>
          </div>

          {/* Status Filter */}
          <div className="flex flex-wrap gap-2">
            <StatusButton
              label="All"
              active={projectStatus === "all"}
              onClick={() => setProjectStatus("all")}
            />
            <StatusButton
              label="Active"
              color="emerald"
              active={projectStatus === "active"}
              onClick={() => setProjectStatus("active")}
            />
            <StatusButton
              label="Completed"
              color="blue"
              active={projectStatus === "completed"}
              onClick={() => setProjectStatus("completed")}
            />
            <StatusButton
              label="On Hold"
              color="amber"
              active={projectStatus === "onhold"}
              onClick={() => setProjectStatus("onhold")}
            />
            <StatusButton
              label="Archived"
              color="gray"
              active={projectStatus === "archived"}
              onClick={() => setProjectStatus("archived")}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 mt-4">
          <ActionButton
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
                  d="M12 4v16m8-8H4"
                />
              </svg>
            }
            primary
          />
          <ActionButton
            label="Import Projects"
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            }
          />
          <ActionButton
            label="Project Analytics"
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
          />
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <ProjectStatCard
          title="Total Projects"
          value="36"
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          }
          trend={"+2"}
          trendUp={true}
        />
        <ProjectStatCard
          title="Active Projects"
          value="12"
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
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={"+1"}
          trendUp={true}
        />
        <ProjectStatCard
          title="Completed"
          value="18"
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={"+3"}
          trendUp={true}
        />
        <ProjectStatCard
          title="On Hold"
          value="6"
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
                d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          trend={"-1"}
          trendUp={false}
        />
      </div>

      {/* Content Area */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </AdminLayout>
  );
};

// Status Button Component
const StatusButton = ({ label, color, active, onClick }) => {
  const baseClasses = "px-3 py-1.5 rounded-lg text-sm transition-all";

  const colorMap = {
    blue: active
      ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
      : "bg-blue-500/10 text-blue-400/70 hover:bg-blue-500/20",
    emerald: active
      ? "bg-emerald-500/30 text-emerald-300 border border-emerald-500/50"
      : "bg-emerald-500/10 text-emerald-400/70 hover:bg-emerald-500/20",
    amber: active
      ? "bg-amber-500/30 text-amber-300 border border-amber-500/50"
      : "bg-amber-500/10 text-amber-400/70 hover:bg-amber-500/20",
    gray: active
      ? "bg-gray-500/30 text-gray-300 border border-gray-500/50"
      : "bg-gray-500/10 text-gray-400/70 hover:bg-gray-500/20",
  };

  const activeStyle =
    active && !color
      ? "bg-gradient-to-r from-blue-600/50 to-emerald-600/50 text-white border border-blue-500/50"
      : color
      ? colorMap[color]
      : "text-gray-400 hover:text-gray-300 hover:bg-blue-500/10";

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeStyle}`}>
      {label}
    </button>
  );
};

// Action Button Component
const ActionButton = ({ label, icon, primary }) => {
  const buttonStyle = primary
    ? "bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white"
    : "bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30";

  return (
    <button
      className={`${buttonStyle} px-4 py-2 rounded-lg flex items-center space-x-2 transition-all`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  );
};

// Project Stat Card Component
const ProjectStatCard = ({ title, value, icon, trend, trendUp }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500/20 to-emerald-600/20 border border-blue-500/30 rounded-xl p-4 shadow-lg relative overflow-hidden">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-blue-300">{value}</p>
          {trend && (
            <p
              className={`text-xs ${
                trendUp ? "text-emerald-400" : "text-red-400"
              } mt-1 flex items-center`}
            >
              {trendUp ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              )}
              {trend} since last month
            </p>
          )}
        </div>
        <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
          {icon}
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-blue-400/5 rounded-full"></div>
      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-emerald-400/5 rounded-full"></div>
    </div>
  );
};

export default AdminProjectLayout;
