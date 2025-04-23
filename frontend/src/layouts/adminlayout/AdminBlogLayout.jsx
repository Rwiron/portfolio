import { useState } from "react";
import AdminLayout from "../AdminLayout";

const AdminBlogLayout = ({ children }) => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  return (
    <AdminLayout>
      {/* Blog management specific header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Blog Management
        </h1>
        <p className="text-gray-400 mt-1">
          Manage your blog posts, categories, and comments
        </p>
      </div>

      {/* Search and filter bar */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
        {/* Search input */}
        <div className="relative w-full md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-blue-900/20 border border-blue-800/30 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            placeholder="Search posts..."
          />
        </div>

        {/* Filter tabs */}
        <div className="flex space-x-1 bg-blue-900/30 rounded-lg p-1 w-full md:w-auto">
          <FilterButton
            label="All Posts"
            active={filter === "all"}
            onClick={() => handleFilterChange("all")}
          />
          <FilterButton
            label="Published"
            active={filter === "published"}
            onClick={() => handleFilterChange("published")}
          />
          <FilterButton
            label="Drafts"
            active={filter === "draft"}
            onClick={() => handleFilterChange("draft")}
          />
          <FilterButton
            label="Archived"
            active={filter === "archived"}
            onClick={() => handleFilterChange("archived")}
          />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 mb-6">
        <BlogAction
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
          primary={true}
        />
        <BlogAction
          label="Manage Categories"
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
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
          }
          color="blue"
        />
        <BlogAction
          label="Comments"
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
          }
          color="green"
          badge="5"
        />
        <BlogAction
          label="Analytics"
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

      {/* Blog Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <BlogStatCard
          title="Total Posts"
          value="124"
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
        />
        <BlogStatCard
          title="Published"
          value="98"
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
        />
        <BlogStatCard
          title="Drafts"
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
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          }
        />
        <BlogStatCard
          title="Archived"
          value="8"
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
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              />
            </svg>
          }
        />
      </div>

      {/* Content Area */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </AdminLayout>
  );
};

// Blog Action Button Component
const BlogAction = ({ label, icon, color, primary, badge }) => {
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

  const primaryStyle = primary
    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-purple-500/50"
    : colorMap[color];

  return (
    <button
      className={`${primaryStyle} px-4 py-2 rounded-lg border flex items-center space-x-2 transition-all relative`}
    >
      <span>{icon}</span>
      <span>{label}</span>
      {badge && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
};

// Filter Button Component
const FilterButton = ({ label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
        active
          ? "bg-gradient-to-r from-blue-600/50 to-purple-600/50 text-white shadow-lg"
          : "text-gray-400 hover:text-gray-300"
      }`}
    >
      {label}
    </button>
  );
};

// Blog Stat Card Component
const BlogStatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl p-4 shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-2xl font-bold text-purple-300">{value}</p>
        </div>
        <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
          {icon}
        </div>
      </div>
    </div>
  );
};

export default AdminBlogLayout;
