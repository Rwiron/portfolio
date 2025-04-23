import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, activeSection }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [sortOption, setSortOption] = useState("dueDate-asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    priority: [],
    status: [],
    tags: [],
  });

  // Extract unique values for filters
  const uniquePriorities = [...new Set(tasks.map((task) => task.priority))];
  const uniqueStatuses = [...new Set(tasks.map((task) => task.status))];
  const uniqueTags = [...new Set(tasks.flatMap((task) => task.tags || []))];

  // Filter and sort tasks when dependencies change
  useEffect(() => {
    let result = [...tasks];

    // For date comparisons in overdue case
    const today = new Date();

    // Filter by section (navigation item ID)
    if (activeSection !== "all") {
      switch (activeSection) {
        case "todo":
          result = result.filter(
            (task) => task.status.toLowerCase() === "to do"
          );
          break;
        case "in-progress":
          result = result.filter(
            (task) => task.status.toLowerCase() === "in progress"
          );
          break;
        case "review":
          result = result.filter(
            (task) => task.status.toLowerCase() === "in review"
          );
          break;
        case "completed":
          result = result.filter(
            (task) => task.status.toLowerCase() === "completed"
          );
          break;
        case "blocked":
          result = result.filter(
            (task) => task.status.toLowerCase() === "blocked"
          );
          break;
        case "overdue":
          result = result.filter((task) => {
            const dueDate = new Date(task.dueDate);
            return dueDate < today && task.status.toLowerCase() !== "completed";
          });
          break;
        // Add more cases as needed
      }
    }

    // Apply search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          (task.assignee && task.assignee.toLowerCase().includes(query)) ||
          (task.tags &&
            task.tags.some((tag) => tag.toLowerCase().includes(query)))
      );
    }

    // Apply priority filters
    if (filterOptions.priority.length > 0) {
      result = result.filter((task) =>
        filterOptions.priority.some(
          (p) => p.toLowerCase() === task.priority.toLowerCase()
        )
      );
    }

    // Apply status filters
    if (filterOptions.status.length > 0) {
      result = result.filter((task) =>
        filterOptions.status.some(
          (s) => s.toLowerCase() === task.status.toLowerCase()
        )
      );
    }

    // Apply tag filters
    if (filterOptions.tags.length > 0) {
      result = result.filter(
        (task) =>
          task.tags &&
          task.tags.some((tag) =>
            filterOptions.tags.some(
              (t) => t.toLowerCase() === tag.toLowerCase()
            )
          )
      );
    }

    // For priority sort comparisons
    const priorityValues = { low: 1, medium: 2, high: 3, critical: 4 };

    // Sort tasks
    const [sortField, sortDirection] = sortOption.split("-");
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "dueDate":
          comparison = new Date(a.dueDate) - new Date(b.dueDate);
          break;
        case "priority":
          // Convert priority to numeric value for comparison
          comparison =
            (priorityValues[a.priority.toLowerCase()] || 0) -
            (priorityValues[b.priority.toLowerCase()] || 0);
          break;
        case "progress":
          comparison = a.progress - b.progress;
          break;
        default:
          comparison = 0;
      }

      return sortDirection === "asc" ? comparison : -comparison;
    });

    setFilteredTasks(result);
  }, [tasks, activeSection, sortOption, searchQuery, filterOptions]);

  // Toggle a filter option
  const toggleFilter = (type, value) => {
    setFilterOptions((prev) => {
      const current = [...prev[type]];
      const index = current.indexOf(value);

      if (index > -1) {
        current.splice(index, 1);
      } else {
        current.push(value);
      }

      return { ...prev, [type]: current };
    });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilterOptions({
      priority: [],
      status: [],
      tags: [],
    });
    setSearchQuery("");
  };

  // Get color for filter badges
  const getFilterBadgeStyle = (type, value) => {
    const isActive = filterOptions[type].includes(value);

    switch (type) {
      case "priority":
        switch (value.toLowerCase()) {
          case "high":
            return isActive
              ? "bg-red-500 text-white"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30";
          case "medium":
            return isActive
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
          case "low":
            return isActive
              ? "bg-green-500 text-white"
              : "bg-green-500/20 text-green-400 hover:bg-green-500/30";
          default:
            return isActive
              ? "bg-blue-500 text-white"
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
        }

      case "status":
        switch (value.toLowerCase()) {
          case "completed":
            return isActive
              ? "bg-green-500 text-white"
              : "bg-green-500/20 text-green-400 hover:bg-green-500/30";
          case "in progress":
            return isActive
              ? "bg-blue-500 text-white"
              : "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
          case "to do":
            return isActive
              ? "bg-purple-500 text-white"
              : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30";
          case "in review":
            return isActive
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
          case "blocked":
            return isActive
              ? "bg-red-500 text-white"
              : "bg-red-500/20 text-red-400 hover:bg-red-500/30";
          default:
            return isActive
              ? "bg-gray-500 text-white"
              : "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
        }

      case "tags":
        return isActive
          ? "bg-indigo-500 text-white"
          : "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/40";

      default:
        return isActive
          ? "bg-blue-500 text-white"
          : "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
    }
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="bg-blue-900/20 backdrop-blur-md border border-blue-800/30 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Input */}
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-blue-950/60 border border-blue-800/30 rounded-lg text-blue-300 px-4 py-2 pl-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-blue-500"
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

          {/* Sort Dropdown */}
          <div className="flex-shrink-0">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="bg-blue-950/60 border border-blue-800/30 rounded-lg text-blue-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="dueDate-asc">Due Date (Earliest)</option>
              <option value="dueDate-desc">Due Date (Latest)</option>
              <option value="title-asc">Title (A-Z)</option>
              <option value="title-desc">Title (Z-A)</option>
              <option value="priority-desc">Priority (High-Low)</option>
              <option value="priority-asc">Priority (Low-High)</option>
              <option value="progress-desc">Progress (High-Low)</option>
              <option value="progress-asc">Progress (Low-High)</option>
            </select>
          </div>
        </div>

        {/* Filter Options */}
        <div className="mt-4 space-y-3">
          {/* Filter Groups */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-blue-500 mr-1">Priorities:</span>
            {uniquePriorities.map((priority) => (
              <button
                key={priority}
                onClick={() => toggleFilter("priority", priority)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${getFilterBadgeStyle(
                  "priority",
                  priority
                )}`}
              >
                {priority}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs text-blue-500 mr-1">Status:</span>
            {uniqueStatuses.map((status) => (
              <button
                key={status}
                onClick={() => toggleFilter("status", status)}
                className={`text-xs px-2 py-1 rounded-full border transition-colors ${getFilterBadgeStyle(
                  "status",
                  status
                )}`}
              >
                {status}
              </button>
            ))}
          </div>

          {uniqueTags.length > 0 && (
            <div className="flex flex-wrap gap-2 items-center">
              <span className="text-xs text-blue-500 mr-1">Tags:</span>
              {uniqueTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleFilter("tags", tag)}
                  className={`text-xs px-2 py-1 rounded-full border transition-colors ${getFilterBadgeStyle(
                    "tags",
                    tag
                  )}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          )}

          {/* Filter Reset Button */}
          {(filterOptions.priority.length > 0 ||
            filterOptions.status.length > 0 ||
            filterOptions.tags.length > 0 ||
            searchQuery) && (
            <div className="flex justify-end">
              <button
                onClick={clearFilters}
                className="text-xs px-3 py-1 text-blue-400 hover:text-blue-300 flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Task Count and Results */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-blue-300">
          {filteredTasks.length === 0
            ? "No tasks found"
            : filteredTasks.length === 1
            ? "1 task found"
            : `${filteredTasks.length} tasks found`}
        </h2>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      {/* Empty State */}
      {filteredTasks.length === 0 && (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <svg
            className="w-16 h-16 text-blue-900/60 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          <h3 className="text-lg font-medium text-blue-400 mb-2">
            No tasks found
          </h3>
          <p className="text-sm text-blue-300/70 max-w-md">
            {searchQuery ||
            Object.values(filterOptions).some((arr) => arr.length > 0)
              ? "Try adjusting your search or filter criteria to find what you're looking for."
              : "There are no tasks in this section. Create a new task to get started."}
          </p>
          <button className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg transition-colors flex items-center gap-2">
            <svg
              className="w-4 h-4"
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
            Create new task
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
