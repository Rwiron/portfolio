import { useState } from "react";

const TaskCard = ({
  task = {
    id: 1,
    title: "Implement User Authentication",
    description: "Add login, registration and password reset functionality",
    dueDate: "2023-12-15",
    priority: "high",
    status: "in-progress",
    progress: 65,
    assignee: {
      name: "John Doe",
      avatar:
        "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
    },
    tags: ["frontend", "security", "auth"],
    comments: 5,
    attachments: 2,
  },
}) => {
  const [expanded, setExpanded] = useState(false);

  // Priority badge style based on priority level
  const getPriorityBadgeStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  // Status badge style based on status
  const getStatusBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "in progress":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "to do":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      case "in review":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "blocked":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  // Format date in a readable format
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Calculate days remaining until due date
  const getDaysRemaining = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "Overdue";
    if (diffDays === 0) return "Due today";
    return `${diffDays} days left`;
  };

  // Calculate due date status and style
  const getDueDateStyle = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-400";
    if (diffDays <= 2) return "text-yellow-400";
    return "text-blue-400";
  };

  return (
    <div
      className={`bg-blue-900/20 backdrop-blur-md border border-blue-800/30 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-blue-800/10 ${
        expanded ? "shadow-xl" : ""
      }`}
    >
      {/* Card Header */}
      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white truncate">
            {task.title}
          </h3>
          <div
            className={`px-2 py-1 text-xs rounded-full border ${getPriorityBadgeStyle(
              task.priority
            )}`}
          >
            {task.priority}
          </div>
        </div>

        <p className="text-blue-300/70 text-sm line-clamp-2 mb-3">
          {task.description}
        </p>

        <div className="flex justify-between items-center">
          <div className={`text-sm ${getDueDateStyle(task.dueDate)}`}>
            {formatDate(task.dueDate)} · {getDaysRemaining(task.dueDate)}
          </div>
          <div
            className={`px-2 py-1 text-xs rounded-full border ${getStatusBadgeStyle(
              task.status
            )}`}
          >
            {task.status}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-3">
        <div className="w-full bg-blue-900/30 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full"
            style={{ width: `${task.progress || 0}%` }}
          ></div>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2 py-0.5 rounded-full bg-indigo-900/30 text-indigo-400 border border-indigo-800/30"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Expand Button */}
      <div className="border-t border-blue-800/30 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center text-sm text-blue-400 hover:text-blue-300"
        >
          <span>{expanded ? "Show less" : "Show more"}</span>
          <svg
            className={`w-4 h-4 ml-1 transform transition-transform duration-200 ${
              expanded ? "rotate-180" : ""
            }`}
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
        </button>
      </div>

      {/* Expanded Content */}
      {expanded && (
        <div className="bg-blue-950/60 border-t border-blue-800/30 p-5 space-y-4">
          {/* Assignee */}
          {task.assignee && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium">
                {task.assignee
                  .split(" ")
                  .map((name) => name[0])
                  .join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {task.assignee}
                </div>
                <div className="text-xs text-blue-400">Assignee</div>
              </div>
            </div>
          )}

          {/* Comments */}
          {task.comments && task.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2">
                Comments ({task.comments.length})
              </h4>
              <div className="space-y-3 max-h-40 overflow-y-auto">
                {task.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="text-sm bg-blue-900/30 rounded-lg p-3"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium">
                        {comment.author
                          .split(" ")
                          .map((name) => name[0])
                          .join("")}
                      </div>
                      <span className="font-medium text-white">
                        {comment.author}
                      </span>
                      <span className="text-xs text-blue-400/60">
                        {comment.date}
                      </span>
                    </div>
                    <p className="text-blue-300/90">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-blue-400 mb-2">
                Attachments ({task.attachments.length})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {task.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-900/30 rounded-lg p-2 text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-blue-400 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                    <span className="truncate text-blue-300">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-600/30 text-blue-400 py-2 rounded-lg text-sm transition-colors">
              Edit
            </button>
            <button className="flex-1 bg-green-600/20 hover:bg-green-600/30 border border-green-600/30 text-green-400 py-2 rounded-lg text-sm transition-colors">
              Complete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
