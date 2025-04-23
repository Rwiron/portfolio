import { useState, useEffect, useRef } from "react";

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
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Priority badge style based on priority level
  const getPriorityBadgeStyle = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500/30 text-red-300 border-red-500/40 backdrop-blur-sm";
      case "medium":
        return "bg-yellow-500/30 text-yellow-300 border-yellow-500/40 backdrop-blur-sm";
      case "low":
        return "bg-green-500/30 text-green-300 border-green-500/40 backdrop-blur-sm";
      default:
        return "bg-blue-500/30 text-blue-300 border-blue-500/40 backdrop-blur-sm";
    }
  };

  // Status badge style based on status
  const getStatusBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border-green-500/40 backdrop-blur-sm";
      case "in progress":
      case "in-progress":
        return "bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border-blue-500/40 backdrop-blur-sm";
      case "to do":
        return "bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border-purple-500/40 backdrop-blur-sm";
      case "in review":
        return "bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-500/40 backdrop-blur-sm";
      case "blocked":
        return "bg-gradient-to-r from-red-500/20 to-rose-500/20 text-red-300 border-red-500/40 backdrop-blur-sm";
      default:
        return "bg-gradient-to-r from-gray-500/20 to-slate-500/20 text-gray-300 border-gray-500/40 backdrop-blur-sm";
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

    if (diffDays < 0) return "text-red-300 font-medium";
    if (diffDays <= 2) return "text-yellow-300 font-medium";
    return "text-blue-300 font-medium";
  };

  // Calculate the color gradient for progress bar
  const getProgressGradient = (progress) => {
    if (progress < 30) return "from-red-500 to-orange-500";
    if (progress < 70) return "from-yellow-500 to-green-500";
    return "from-emerald-500 to-cyan-500";
  };

  // 3D tilt effect
  useEffect(() => {
    if (!cardRef.current) return;

    const card = cardRef.current;

    const handleMouseMove = (e) => {
      if (!isHovered) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 15;
      const rotateY = (centerX - x) / 15;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isHovered]);

  return (
    <div
      ref={cardRef}
      className={`relative bg-blue-950/50 backdrop-blur-xl border border-blue-700/40 rounded-xl overflow-hidden shadow-lg transition-all duration-300 ${
        isHovered ? "shadow-xl shadow-blue-700/20" : "shadow-blue-900/10"
      }`}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
    >
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-20 h-20 bg-blue-500/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl"></div>

      {/* Priority indicator line */}
      <div
        className={`absolute left-0 top-0 h-full w-1 ${
          task.priority === "high"
            ? "bg-gradient-to-b from-red-500 to-red-600/50"
            : task.priority === "medium"
            ? "bg-gradient-to-b from-yellow-500 to-yellow-600/50"
            : "bg-gradient-to-b from-green-500 to-green-600/50"
        }`}
      ></div>

      {/* Card Header */}
      <div className="p-5 flex flex-col relative">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white truncate">
            {task.title}
          </h3>
          <div
            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getPriorityBadgeStyle(
              task.priority
            )}`}
          >
            {task.priority}
          </div>
        </div>

        <p className="text-blue-200/80 text-sm line-clamp-2 mb-3">
          {task.description}
        </p>

        <div className="flex justify-between items-center">
          <div
            className={`text-sm ${getDueDateStyle(
              task.dueDate
            )} flex items-center gap-1.5`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {formatDate(task.dueDate)} · {getDaysRemaining(task.dueDate)}
          </div>
          <div
            className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getStatusBadgeStyle(
              task.status
            )}`}
          >
            {task.status}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pb-3">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-blue-300/80">Progress</span>
          <span className="text-blue-200">{task.progress || 0}%</span>
        </div>
        <div className="w-full bg-blue-900/40 rounded-full h-2 backdrop-blur-sm overflow-hidden p-0.5">
          <div
            className={`bg-gradient-to-r ${getProgressGradient(
              task.progress
            )} h-full rounded-full`}
          ></div>
        </div>
      </div>

      {/* Tags */}
      {task.tags && task.tags.length > 0 && (
        <div className="px-5 pb-3 flex flex-wrap gap-1.5">
          {task.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-900/30 text-indigo-300 border border-indigo-700/40 backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Expand Button */}
      <div className="border-t border-blue-700/30 p-3">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center text-sm text-blue-300 hover:text-blue-200 transition-colors"
        >
          <span>{expanded ? "Show less" : "Show more"}</span>
          <svg
            className="w-4 h-4 ml-1"
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
      <div className={`overflow-hidden ${expanded ? "" : "hidden"}`}>
        <div className="bg-blue-950/80 border-t border-blue-700/30 p-5 space-y-4 backdrop-blur-sm">
          {/* Assignee */}
          {task.assignee && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-medium shadow-lg shadow-indigo-500/20">
                {task.assignee.name
                  ? task.assignee.name
                      .split(" ")
                      .map((name) => name[0])
                      .join("")
                  : task.assignee
                      .split(" ")
                      .map((name) => name[0])
                      .join("")}
              </div>
              <div>
                <div className="text-sm font-medium text-white">
                  {task.assignee.name || task.assignee}
                </div>
                <div className="text-xs text-blue-300">Assignee</div>
              </div>
            </div>
          )}

          {/* Comments */}
          {task.comments && task.comments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
                Comments ({task.comments.length})
              </h4>
              <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                {task.comments.map((comment, index) => (
                  <div
                    key={index}
                    className="text-sm bg-blue-900/40 backdrop-blur-sm rounded-lg p-3 border border-blue-800/30"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white text-xs font-medium shadow-sm">
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
                    <p className="text-blue-200/90">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {task.attachments && task.attachments.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-blue-300 mb-2 flex items-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                Attachments ({task.attachments.length})
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {task.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-blue-900/40 backdrop-blur-sm rounded-lg p-2.5 text-sm border border-blue-800/30 cursor-pointer"
                  >
                    <svg
                      className="w-4 h-4 text-blue-300 flex-shrink-0"
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
                    <span className="truncate text-blue-200">{attachment}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            <button className="flex-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 hover:from-blue-600/30 hover:to-indigo-600/30 border border-blue-600/40 text-blue-300 py-2 rounded-lg text-sm transition-all">
              <span className="flex items-center justify-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
                Edit
              </span>
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-600/20 to-emerald-600/20 hover:from-green-600/30 hover:to-emerald-600/30 border border-green-600/40 text-green-300 py-2 rounded-lg text-sm transition-all">
              <span className="flex items-center justify-center gap-1.5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Complete
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* CSS for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(30, 58, 138, 0.1);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(79, 70, 229, 0.5);
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(79, 70, 229, 0.7);
        }
      `}</style>
    </div>
  );
};

export default TaskCard;
