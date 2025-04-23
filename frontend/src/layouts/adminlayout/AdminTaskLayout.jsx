import { useState } from "react";
import AdminLayout from "../AdminLayout";

const AdminTaskLayout = ({ children }) => {
  const [taskFilter, setTaskFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("dueDate");

  return (
    <AdminLayout>
      {/* Task Management Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
          Task Management
        </h1>
        <p className="text-gray-400 mt-1">
          Track, organize, and complete your tasks and deadlines
        </p>
      </div>

      {/* Task Control Panel */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
          {/* Task Filter */}
          <div className="flex flex-wrap gap-2">
            <TaskFilterButton
              label="All Tasks"
              count={42}
              active={taskFilter === "all"}
              onClick={() => setTaskFilter("all")}
            />
            <TaskFilterButton
              label="Due Today"
              count={5}
              color="red"
              active={taskFilter === "today"}
              onClick={() => setTaskFilter("today")}
            />
            <TaskFilterButton
              label="Upcoming"
              count={12}
              color="yellow"
              active={taskFilter === "upcoming"}
              onClick={() => setTaskFilter("upcoming")}
            />
            <TaskFilterButton
              label="Completed"
              count={25}
              color="green"
              active={taskFilter === "completed"}
              onClick={() => setTaskFilter("completed")}
            />
          </div>

          {/* Sort Options */}
          <div className="flex items-center">
            <span className="text-gray-400 mr-2 text-sm">Sort by:</span>
            <select
              value={sortMethod}
              onChange={(e) => setSortMethod(e.target.value)}
              className="bg-blue-900/30 text-blue-200 rounded-lg px-3 py-2 border border-blue-900/30 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="dueDate">Due Date</option>
              <option value="priority">Priority</option>
              <option value="name">Task Name</option>
              <option value="project">Project</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          <ActionButton
            label="Add Task"
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
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            }
            primary
          />
          <ActionButton
            label="Create Board"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />
          <ActionButton
            label="Task Timeline"
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            }
          />
          <ActionButton
            label="Settings"
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
        </div>
      </div>

      {/* Task Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <TaskStatCard
          title="Total Tasks"
          value="42"
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          }
          bgColor="from-blue-500/20 to-purple-600/20"
          borderColor="border-blue-500/30"
          textColor="text-blue-300"
        />
        <TaskStatCard
          title="In Progress"
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
          bgColor="from-yellow-500/20 to-orange-600/20"
          borderColor="border-yellow-500/30"
          textColor="text-yellow-300"
        />
        <TaskStatCard
          title="Completed"
          value="25"
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
          bgColor="from-green-500/20 to-emerald-600/20"
          borderColor="border-green-500/30"
          textColor="text-green-300"
        />
        <TaskStatCard
          title="Overdue"
          value="5"
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
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          }
          bgColor="from-red-500/20 to-pink-600/20"
          borderColor="border-red-500/30"
          textColor="text-red-300"
        />
      </div>

      {/* Task Priority Distribution */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-4 mb-6">
        <h3 className="text-blue-300 font-medium mb-3">
          Priority Distribution
        </h3>
        <div className="flex items-end gap-2 h-36">
          <PriorityBar
            label="Critical"
            count={4}
            percentage={15}
            color="bg-red-500"
          />
          <PriorityBar
            label="High"
            count={8}
            percentage={30}
            color="bg-orange-500"
          />
          <PriorityBar
            label="Medium"
            count={15}
            percentage={55}
            color="bg-yellow-500"
          />
          <PriorityBar
            label="Low"
            count={10}
            percentage={40}
            color="bg-green-500"
          />
          <PriorityBar
            label="No Priority"
            count={5}
            percentage={20}
            color="bg-gray-500"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-[#071f33]/60 backdrop-blur-sm border border-blue-900/30 rounded-xl p-6 shadow-lg">
        {children}
      </div>
    </AdminLayout>
  );
};

// Task Filter Button Component
const TaskFilterButton = ({ label, count, color, active, onClick }) => {
  const baseClasses =
    "px-3 py-1.5 rounded-lg text-sm flex items-center transition-all";

  const colorMap = {
    blue: active
      ? "bg-blue-500/30 text-blue-300 border border-blue-500/50"
      : "bg-blue-500/10 text-blue-400/70 hover:bg-blue-500/20",
    red: active
      ? "bg-red-500/30 text-red-300 border border-red-500/50"
      : "bg-red-500/10 text-red-400/70 hover:bg-red-500/20",
    yellow: active
      ? "bg-yellow-500/30 text-yellow-300 border border-yellow-500/50"
      : "bg-yellow-500/10 text-yellow-400/70 hover:bg-yellow-500/20",
    green: active
      ? "bg-green-500/30 text-green-300 border border-green-500/50"
      : "bg-green-500/10 text-green-400/70 hover:bg-green-500/20",
  };

  const activeStyle =
    active && !color
      ? "bg-gradient-to-r from-purple-600/50 to-blue-600/50 text-white border border-purple-500/50"
      : color
      ? colorMap[color]
      : "text-gray-400 hover:text-gray-300 hover:bg-purple-500/10";

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeStyle}`}>
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-2 bg-black/20 px-1.5 py-0.5 rounded-full text-xs">
          {count}
        </span>
      )}
    </button>
  );
};

// Action Button Component
const ActionButton = ({ label, icon, primary }) => {
  const buttonStyle = primary
    ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
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

// Task Stat Card Component
const TaskStatCard = ({
  title,
  value,
  icon,
  bgColor,
  borderColor,
  textColor,
}) => {
  return (
    <div
      className={`bg-gradient-to-br ${bgColor} ${borderColor} rounded-xl p-4 shadow-lg relative overflow-hidden`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-400 text-sm mb-1">{title}</p>
          <p className={`text-2xl font-bold ${textColor}`}>{value}</p>
        </div>
        <div className="p-2 bg-black/10 rounded-lg text-blue-400">{icon}</div>
      </div>

      {/* Decorative Element */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-white/5 rounded-full"></div>
      <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white/5 rounded-full"></div>
    </div>
  );
};

// Priority Bar Component
const PriorityBar = ({ label, count, percentage, color }) => {
  return (
    <div className="flex flex-col items-center flex-1">
      <div className="w-full flex justify-center mb-2">
        <div
          className={`w-full max-w-[40px] ${color} rounded-t-md`}
          style={{ height: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-gray-400">{label}</div>
      <div className="text-sm font-medium text-blue-300">{count}</div>
    </div>
  );
};

export default AdminTaskLayout;
