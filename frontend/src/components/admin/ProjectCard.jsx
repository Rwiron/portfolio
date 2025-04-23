import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProject,
  setEditProject,
} from "../../features/project/projectSlice";
import { formatDate } from "../../utils/dateUtils";
import { truncateText } from "../../utils/textUtils";
import { successToast, errorToast } from "../../utils/toast";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.projects);

  // Watch for state changes to handle toast notifications
  useEffect(() => {
    if (isDeleting && !loading) {
      if (success) {
        successToast(`Project "${project.title}" deleted successfully`);
        setIsDeleting(false);
      }
      if (error) {
        errorToast(error);
        setIsDeleting(false);
      }
    }
  }, [loading, error, success, isDeleting, project.title]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      setIsDeleting(true);
      dispatch(deleteProject(project.id));
    }
  };

  const handleEdit = () => {
    // Dispatch the setEditProject action with the current project data
    dispatch(setEditProject(project));
    // Scroll to the top of the page to show the form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const statusColors = {
    "In Progress": "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
    Completed: "bg-green-500/20 text-green-400 border-green-500/40",
    "On Hold": "bg-orange-500/20 text-orange-400 border-orange-500/40",
    Cancelled: "bg-red-500/20 text-red-400 border-red-500/40",
  };

  return (
    <div
      className="bg-[#0a2540]/50 border border-blue-900/30 rounded-lg shadow-lg overflow-hidden hover:bg-[#0a2540]/70 transition-all duration-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-4 flex gap-4">
        {/* Project Image */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800 border border-gray-700">
            {project.coverImage ? (
              <img
                src={project.coverImage}
                alt={project.title}
                className={`w-full h-full object-cover transform transition-transform duration-300 ${
                  isHovered ? "scale-110" : ""
                }`}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900/40 to-purple-900/40">
                <span className="text-3xl text-gray-600">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
          {/* Status Badge */}
          <div
            className={`absolute -top-1 -left-1 px-2 py-0.5 text-xs rounded-md border ${
              statusColors[project.status] ||
              "bg-gray-500/20 text-gray-400 border-gray-500/40"
            }`}
          >
            {project.status}
          </div>
        </div>

        {/* Project Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-semibold text-white truncate pr-2">
              {project.title}
            </h3>
            {project.featured && (
              <span className="bg-purple-500/20 text-purple-400 border border-purple-500/40 px-1.5 py-0.5 text-[10px] rounded-md">
                Featured
              </span>
            )}
          </div>

          <p className="text-gray-400 text-sm mt-1">
            {truncateText(project.description, 80)}
          </p>

          <div className="mt-2 flex flex-wrap gap-1">
            {project.skills.slice(0, 3).map((skill) => (
              <span
                key={skill.id}
                className="bg-blue-900/30 border border-blue-800/30 text-blue-400 text-xs px-2 py-0.5 rounded-md"
              >
                {skill.name}
              </span>
            ))}
            {project.skills.length > 3 && (
              <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-md">
                +{project.skills.length - 3} more
              </span>
            )}
          </div>

          <div className="mt-2 text-xs text-gray-500">
            Updated: {formatDate(project.updatedAt)}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div
        className={`px-4 py-2 border-t border-blue-900/30 bg-[#071f33]/80 flex items-center justify-between ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-200`}
      >
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="text-xs px-2.5 py-1 bg-blue-600/30 hover:bg-blue-600/50 text-blue-400 rounded-md transition"
          >
            Edit
          </button>
          <Link
            to={`/projects/${project.slug}`}
            target="_blank"
            className="text-xs px-2.5 py-1 bg-green-600/30 hover:bg-green-600/50 text-green-400 rounded-md transition"
          >
            View
          </Link>
        </div>
        <button
          onClick={handleDelete}
          className="text-xs px-2.5 py-1 bg-red-600/30 hover:bg-red-600/50 text-red-400 rounded-md transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
