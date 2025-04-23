import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/projects";

// Get all projects
export const getAllProjects = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const createProject = async (data, token) => {
  const res = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Delete a project
export const deleteProjectService = async (projectId, token) => {
  const res = await axios.delete(`${API_URL}/${projectId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// Update a project
export const updateProjectService = async (projectId, data, token) => {
  const res = await axios.put(`${API_URL}/${projectId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
