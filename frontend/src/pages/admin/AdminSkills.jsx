import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getSkills,
  createSkill,
  deleteSkill,
  reset,
} from "../../features/skill/skillSlice";

const AdminSkills = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "frontend",
    icon: "",
    level: "beginner",
  });
  const [authError, setAuthError] = useState(false);
  const [deletingSkillId, setDeletingSkillId] = useState(null);

  const { name, category, icon, level } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { skills, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.skills
  );
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is authenticated
    if (!token) {
      setAuthError(true);
      // Give time for error message to display before redirecting
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      return () => clearTimeout(timer);
    }

    dispatch(getSkills())
      .unwrap()
      .then((skillsData) => {
        setAuthError(false);
        console.log("Fetched skills:", skillsData);
      })
      .catch((error) => {
        if (
          error.includes("token") ||
          error.includes("auth") ||
          error.includes("unauth")
        ) {
          setAuthError(true);
          // Give time for error message to display before redirecting
          const timer = setTimeout(() => {
            navigate("/login");
          }, 2000);
          return () => clearTimeout(timer);
        }
      });

    return () => {
      dispatch(reset());
    };
  }, [dispatch, token, navigate]);

  useEffect(() => {
    if (isSuccess && message === "Skill created") {
      setFormData({
        name: "",
        category: "frontend",
        icon: "",
        level: "beginner",
      });
    }
  }, [isSuccess, message]);

  // Add effect to console log skills when they change
  useEffect(() => {
    if (skills.length > 0) {
      console.log("Current skills in state:", skills);
    }
  }, [skills]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Add a function to check if we get a "No query results" error
  const isModelNotFoundError = (error) => {
    if (typeof error === "string") {
      return error.includes("No query results") || error.includes("not found");
    }
    return false;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSkill(formData))
      .unwrap()
      .catch((error) => {
        console.error("Failed to create skill:", error);
      });
  };

  const handleDelete = (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      setDeletingSkillId(skillId);
      console.log(`Starting deletion of skill with ID: ${skillId}`);

      // Find the full skill object
      const skillToDelete = skills.find((skill) => {
        const id = skill.id || skill._id;
        return id === skillId;
      });

      console.log("Full skill object being deleted:", skillToDelete);

      // Try different ID formats if available
      const tryDeleteWithId = (idToTry) => {
        console.log(`Attempting to delete with ID: ${idToTry}`);

        dispatch(deleteSkill(idToTry))
          .unwrap()
          .then((response) => {
            console.log(`Successfully deleted skill:`, response);

            // Filter out the deleted skill locally in case the Redux state update fails
            const updatedSkills = skills.filter((skill) => {
              const id = skill.id || skill._id;
              return id !== skillId;
            });

            // Log the updated skills
            console.log("Updated skills after deletion:", updatedSkills);

            // Force a refresh of skills from the server
            setTimeout(() => {
              dispatch(getSkills());
            }, 500);
          })
          .catch((error) => {
            console.error(`Failed to delete skill with ID ${idToTry}:`, error);

            // If we get "No query results" error, the skill might be already deleted
            if (isModelNotFoundError(error)) {
              console.log(
                "The skill doesn't exist in the database anymore. Updating local state."
              );
              alert(
                "The skill was not found in the database. It may have been already deleted. The list will be refreshed."
              );

              // Refresh skills list to get current data
              dispatch(getSkills());
              return;
            }

            // If we tried with the ID but failed, try with _id if it exists and is different
            if (
              idToTry === skillToDelete?.id &&
              skillToDelete?._id &&
              skillToDelete?._id !== skillToDelete?.id
            ) {
              console.log("First attempt failed, trying with _id instead");
              tryDeleteWithId(skillToDelete._id);
            } else if (idToTry === skillId && !isNaN(Number(skillId))) {
              // Try with a numeric conversion (string "3" to number 3)
              console.log("String ID failed, trying with numeric ID");
              tryDeleteWithId(Number(skillId));
            } else if (
              idToTry !== skillId &&
              idToTry !== skillToDelete?.id &&
              idToTry !== skillToDelete?._id
            ) {
              // If we tried with a numeric ID conversion but failed, try with the original string ID
              console.log(
                "Numeric ID attempt failed, trying with original string ID"
              );
              tryDeleteWithId(skillId);
            } else {
              // All attempts failed, show error
              alert(
                `Failed to delete skill: ${error}. Please try again or refresh the page.`
              );
              // Refresh skills list anyway
              dispatch(getSkills());
            }
          })
          .finally(() => {
            setTimeout(() => {
              setDeletingSkillId(null);
            }, 500);
          });
      };

      // Start with the original ID first
      tryDeleteWithId(skillId);
    }
  };

  return (
    <div className="flex flex-col space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Skills Management</h1>
            <p className="text-gray-400 text-sm">
              Add or manage skills for your projects
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Create Skill Form */}
        <div className="bg-[#071f33]/40 backdrop-blur-md rounded-xl shadow-lg border border-blue-900/30 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">
            Add New Skill
          </h2>

          {isError && !authError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {message}
            </div>
          )}

          {authError && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
              Authentication failed. Please log in again. Redirecting to
              login...
            </div>
          )}

          {isSuccess && message === "Skill created" && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              Skill created successfully!
            </div>
          )}

          {isSuccess && message === "Skill deleted" && (
            <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 text-sm">
              Skill deleted successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Skill Name
              </label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                placeholder="React"
                required
              />
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Category
              </label>
              <select
                name="category"
                value={category}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white appearance-none"
                required
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="database">Database</option>
                <option value="devops">DevOps</option>
                <option value="design">Design</option>
                <option value="mobile">Mobile</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Level
              </label>
              <select
                name="level"
                value={level}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white appearance-none"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div className="form-group">
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Icon URL (optional)
              </label>
              <input
                type="text"
                name="icon"
                value={icon}
                onChange={handleChange}
                className="w-full bg-[#0c2b44] border border-blue-900/50 px-4 py-2.5 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-white placeholder-gray-500"
                placeholder="https://example.com/react-icon.svg"
              />
              <p className="mt-1 text-xs text-gray-500">
                URL to an icon representing this skill
              </p>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full flex justify-center items-center space-x-2 px-4 py-2.5 rounded-lg text-white font-medium transition-all ${
                  isLoading
                    ? "bg-blue-700/50 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white mr-2"
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
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <span>Add Skill</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Skills List */}
        <div className="md:col-span-2 bg-[#071f33]/40 backdrop-blur-md rounded-xl shadow-lg border border-blue-900/30 p-6">
          <h2 className="text-xl font-semibold text-white mb-6">All Skills</h2>

          {isLoading && !deletingSkillId && skills.length === 0 && (
            <div className="flex justify-center py-12">
              <svg
                className="animate-spin h-8 w-8 text-blue-500"
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
          )}

          {!isLoading && skills.length === 0 && !deletingSkillId && (
            <div className="text-center py-12 text-gray-400">
              No skills found. Add your first skill with the form.
            </div>
          )}

          {!isLoading && skills.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => {
                // Ensure we have a valid ID to work with
                const skillId = skill.id || skill._id;

                return (
                  <div
                    key={skillId}
                    className="bg-[#0c2b44]/80 rounded-lg p-4 border border-blue-900/20 hover:border-blue-500/30 transition-all"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-3 mb-3">
                        {skill.icon ? (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                            <span className="text-xs font-bold">
                              {skill.name.substring(0, 2).toUpperCase()}
                            </span>
                          </div>
                        )}
                        <div>
                          <h3 className="text-white font-medium">
                            {skill.name}
                          </h3>
                          <div className="flex flex-wrap gap-1 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700 text-gray-300">
                              {skill.category}
                            </span>
                            {skill.level && (
                              <span
                                className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1
                                ${
                                  skill.level === "beginner"
                                    ? "bg-green-800/60 text-green-300"
                                    : skill.level === "intermediate"
                                    ? "bg-blue-800/60 text-blue-300"
                                    : "bg-purple-800/60 text-purple-300"
                                }`}
                              >
                                <span
                                  className={`w-2 h-2 rounded-full 
                                  ${
                                    skill.level === "beginner"
                                      ? "bg-green-400"
                                      : skill.level === "intermediate"
                                      ? "bg-blue-400"
                                      : "bg-purple-400"
                                  }`}
                                ></span>
                                {skill.level.charAt(0).toUpperCase() +
                                  skill.level.slice(1)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="mt-auto pt-2 flex justify-end">
                        <button
                          onClick={() => handleDelete(skillId)}
                          disabled={deletingSkillId === skillId}
                          className={`text-sm flex items-center transition-colors ${
                            deletingSkillId === skillId
                              ? "text-gray-400 cursor-not-allowed"
                              : "text-red-400 hover:text-red-300"
                          }`}
                        >
                          {deletingSkillId === skillId ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4 mr-1"
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
                              Deleting...
                            </>
                          ) : (
                            <>
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
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Delete
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!isLoading && skills.length > 0 && (
            <div className="mt-6 text-sm text-gray-400 text-center">
              Showing {skills.length} skill{skills.length !== 1 ? "s" : ""}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSkills;
