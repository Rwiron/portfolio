import { useState } from "react";
import TaskList from "./TaskList";

const TaskLayout = () => {
  const [activeSection, setActiveSection] = useState("all");

  // Sample data for stats
  const stats = {
    totalTasks: 24,
    completed: 8,
    inProgress: 12,
    todo: 4,
    overdue: 2,
  };

  // Navigation items
  const navItems = [
    {
      id: "all",
      label: "All Tasks",
      icon: "clipboard-list",
      count: stats.totalTasks,
    },
    { id: "todo", label: "To Do", icon: "clipboard-check", count: stats.todo },
    {
      id: "in-progress",
      label: "In Progress",
      icon: "refresh",
      count: stats.inProgress,
    },
    { id: "review", label: "In Review", icon: "eye", count: 4 },
    {
      id: "completed",
      label: "Completed",
      icon: "check-circle",
      count: stats.completed,
    },
    { id: "archived", label: "Archived", icon: "archive", count: 6 },
  ];

  // Render SVG icon based on name
  const renderIcon = (iconName) => {
    switch (iconName) {
      case "clipboard-list":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            />
          </svg>
        );
      case "clipboard-check":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      case "refresh":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        );
      case "eye":
        return (
          <svg
            className="w-5 h-5"
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
        );
      case "check-circle":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "archive":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-blue-950 text-white">
      {/* Sidebar Navigation */}
      <aside className="md:w-64 bg-blue-900/20 backdrop-blur-sm border-r border-blue-800/30 md:min-h-screen">
        {/* Heading */}
        <div className="p-5 border-b border-blue-800/40">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <svg
              className="w-6 h-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Task Manager
          </h2>
        </div>

        {/* Nav Links */}
        <nav className="p-3">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "bg-blue-600/80 text-white"
                      : "text-blue-300 hover:bg-blue-800/30"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {renderIcon(item.icon)}
                    <span>{item.label}</span>
                  </div>
                  <span className="bg-blue-800/60 text-xs px-2 py-1 rounded-full">
                    {item.count}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Quick Stats */}
        <div className="mt-6 p-5 border-t border-blue-800/40">
          <h3 className="text-sm font-medium text-blue-400 mb-3">Overview</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-900/30 rounded-lg p-3">
              <div className="text-3xl font-semibold text-blue-200">
                {stats.totalTasks}
              </div>
              <div className="text-xs text-blue-400">Total Tasks</div>
            </div>
            <div className="bg-green-900/30 rounded-lg p-3">
              <div className="text-3xl font-semibold text-green-200">
                {stats.completed}
              </div>
              <div className="text-xs text-green-400">Completed</div>
            </div>
            <div className="bg-yellow-900/30 rounded-lg p-3">
              <div className="text-3xl font-semibold text-yellow-200">
                {stats.inProgress}
              </div>
              <div className="text-xs text-yellow-400">In Progress</div>
            </div>
            <div className="bg-red-900/30 rounded-lg p-3">
              <div className="text-3xl font-semibold text-red-200">
                {stats.overdue}
              </div>
              <div className="text-xs text-red-400">Overdue</div>
            </div>
          </div>
        </div>

        {/* Create New Task Button */}
        <div className="p-5">
          <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl">
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Create New Task
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-8 overflow-auto">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">
            {navItems.find((item) => item.id === activeSection)?.label ||
              "Tasks"}
          </h1>
          <p className="text-blue-300/70 mt-1">
            Manage and track your project tasks efficiently
          </p>
        </header>

        {/* Background decorative elements */}
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-600/20 rounded-full filter blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-indigo-600/20 rounded-full filter blur-3xl"></div>
        </div>

        {/* Task List */}
        <TaskList />
      </main>
    </div>
  );
};

export default TaskLayout;
