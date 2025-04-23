import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import {
  createProjectThunk,
  updateProject,
  resetProjectState,
  fetchProjects,
  cancelEdit,
} from "../../features/project/projectSlice";
import { getSkills } from "../../features/skill/skillSlice";
import ProjectList from "../../components/admin/ProjectList";
import { successToast, errorToast } from "../../utils/toast";

const initialFormState = {
  title: "",
  slug: "",
  description: "",
  live_url: "",
  github_url: "",
  cover_image: "",
  featured: false,
  status: "published",
  skills: [],
};

const AdminCreateProject = () => {
  const [formData, setFormData] = useState(initialFormState);

  const dispatch = useDispatch();
  const { loading, success, error, isEditing, currentProject } = useSelector(
    (state) => state.projects
  );

  const { skills, isLoading: skillsLoading } = useSelector(
    (state) => state.skills
  );

  // Handle populating form when editing
  useEffect(() => {
    if (isEditing && currentProject) {
      // Transform the project data to match form structure
      const projectData = {
        ...currentProject,
        // If the API returns skills as objects, extract just the IDs
        skills: currentProject.skills.map((skill) =>
          typeof skill === "object" ? skill.id : skill
        ),
      };
      setFormData(projectData);
    }
  }, [isEditing, currentProject]);

  // Fetch skills when component mounts
  useEffect(() => {
    dispatch(getSkills());
    dispatch(fetchProjects());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle skills selection with checkboxes
  const handleSkillChange = (skillId) => {
    setFormData((prev) => {
      // Check if the skill is already selected
      const isSelected = prev.skills.includes(skillId);

      // If selected, remove it, otherwise add it
      const updatedSkills = isSelected
        ? prev.skills.filter((id) => id !== skillId)
        : [...prev.skills, skillId];

      return { ...prev, skills: updatedSkills };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      dispatch(updateProject({ projectId: currentProject.id, formData }));
    } else {
      dispatch(createProjectThunk(formData));
    }
  };

  const handleCancel = () => {
    dispatch(cancelEdit());
    setFormData(initialFormState);
  };

  // Reset state after success or error
  useEffect(() => {
    if (success) {
      const message = isEditing
        ? "Project updated successfully!"
        : "Project created successfully!";

      successToast(message);
      setFormData(initialFormState);
      setTimeout(() => {
        dispatch(resetProjectState());
      }, 2000);
    }

    if (error) {
      errorToast(error);
    }
  }, [success, error, dispatch, isEditing]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Add Toaster component */}
      <Toaster />

      {/* Project Creation/Edit Form */}
      <div className="bg-[#071f33]/40 backdrop-blur-md rounded-xl shadow-lg border border-blue-900/30 p-8">
        {/* Header with icon */}
        <div className="flex items-center mb-8">
          <div
            className={`p-3 ${
              isEditing ? "bg-blue-500/20" : "bg-green-500/20"
            } rounded-lg mr-4`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-8 w-8 ${
                isEditing ? "text-blue-400" : "text-green-400"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isEditing ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              )}
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isEditing ? "Edit Project" : "Create New Project"}
            </h1>
            <p className="text-gray-400 text-sm">
              {isEditing
                ? "Update project information"
                : "Add a new project to your portfolio"}
            </p>
          </div>
        </div>

        {/* Remove old status messages as we're using toast now */}
        {/* Form starts here */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title Field */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Project Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12h18M3 6h18M3 18h12"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="E-Commerce App"
                  required
                />
              </div>
            </div>

            {/* Slug Field */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                URL Slug
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleChange}
                  className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="e-commerce-app"
                  required
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">
                This will be used in the project URL
              </p>
            </div>
          </div>

          {/* Description Field */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Description
            </label>
            <div className="relative">
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 p-4 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500 min-h-[120px]"
                placeholder="A full stack ecommerce solution"
                required
              ></textarea>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Live URL Field */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Live URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
                <input
                  type="url"
                  name="live_url"
                  value={formData.live_url}
                  onChange={handleChange}
                  className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="https://myecommerce.com"
                />
              </div>
            </div>

            {/* GitHub URL Field */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                GitHub URL
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </div>
                <input
                  type="url"
                  name="github_url"
                  value={formData.github_url}
                  onChange={handleChange}
                  className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                  placeholder="https://github.com/username/repo"
                />
              </div>
            </div>
          </div>

          {/* Cover Image Field */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-2 text-gray-300">
              Cover Image URL
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="url"
                name="cover_image"
                value={formData.cover_image}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                placeholder="https://via.placeholder.com/400x300"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Recommended size: 1200x630 pixels
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured Toggle */}
            <div className="form-group">
              <label className="flex items-center space-x-3 mb-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                />
                <span className="text-sm font-medium text-gray-300">
                  Featured Project
                </span>
              </label>
              <p className="text-xs text-gray-500 pl-8">
                Featured projects appear on the homepage
              </p>
            </div>

            {/* Status Field */}
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Status
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                </div>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-[#0c2b44] border border-blue-900/50 pl-10 pr-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white appearance-none"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>
          </div>

          {/* Skills Selection */}
          <div className="form-group">
            <label className="block text-sm font-medium mb-3 text-gray-300">
              Skills Used
            </label>

            {skillsLoading ? (
              <div className="flex justify-center py-4">
                <svg
                  className="animate-spin h-6 w-6 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {skills.map((skill) => (
                  <label
                    key={skill.id}
                    className="flex items-center space-x-3 p-3 rounded-lg border border-blue-900/30 bg-[#0c2b44]/50 cursor-pointer hover:bg-[#0c2b44]"
                  >
                    <input
                      type="checkbox"
                      checked={formData.skills.includes(skill.id)}
                      onChange={() => handleSkillChange(skill.id)}
                      className="h-5 w-5 rounded border-gray-400 text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                    <span className="text-sm font-medium text-white">
                      {skill.name}
                      <span className="ml-1 text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                        {skill.category}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-blue-900/30 flex justify-between">
            {/* Cancel button - only show when editing */}
            {isEditing && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg text-gray-300 font-medium transition-all bg-gray-700/50 hover:bg-gray-700"
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span>Cancel</span>
              </button>
            )}

            {/* Submit button - changes text based on editing mode */}
            <button
              type="submit"
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white font-medium transition-all ${
                loading
                  ? "bg-blue-700/50 cursor-not-allowed"
                  : isEditing
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>{isEditing ? "Updating..." : "Creating..."}</span>
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isEditing ? (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    ) : (
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    )}
                  </svg>
                  <span>{isEditing ? "Update Project" : "Create Project"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Project List */}
      <div>
        <ProjectList />
      </div>
    </div>
  );
};

export default AdminCreateProject;
