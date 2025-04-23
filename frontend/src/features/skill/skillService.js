import axios from "axios";

// API base URL
const API_URL = "http://127.0.0.1:8000/api";

// Get all skills (public version - no auth required)
const getPublicSkills = async () => {
  const response = await axios.get(`${API_URL}/skills/public`);
  return response.data.data;
};

// Get all skills
const getSkills = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/skills`, config);
  return response.data.data;
};

// Create a new skill (for admin use)
const createSkill = async (skillData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/skills`, skillData, config);
  return response.data;
};

// Delete a skill (for admin use)
const deleteSkill = async (skillId, token) => {
  console.log("Deleting skill with ID:", skillId);
  
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    // Make sure skillId is a string (not an object) before sending to API
    const id = typeof skillId === 'object' ? skillId.id || skillId._id : skillId;
    console.log(`Sending delete request to: ${API_URL}/skills/${id}`);
    
    const response = await axios.delete(`${API_URL}/skills/${id}`, config);
    console.log("Delete skill response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting skill:", error);
    
    // Better error reporting
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      
      // Handle "No query results" Laravel error
      if (error.response.status === 404) {
        if (error.response.data && 
            (error.response.data.message?.includes('No query results') || 
             error.response.data.error?.includes('No query results'))) {
          console.log("Laravel 'No query results' error detected");
          throw `Model not found: The skill with ID ${skillId} doesn't exist anymore.`;
        }
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
    }
    
    throw error.response?.data?.message || error.message || "Failed to delete skill";
  }
};

const skillService = {
  getSkills,
  getPublicSkills,
  createSkill,
  deleteSkill,
};

export default skillService; 