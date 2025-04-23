import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import skillService from "./skillService";

// Get public skills (no auth required)
export const getPublicSkills = createAsyncThunk(
  "skills/getPublic",
  async (_, thunkAPI) => {
    try {
      return await skillService.getPublicSkills();
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get all skills
export const getSkills = createAsyncThunk(
  "skills/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await skillService.getSkills(token);
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new skill (admin only)
export const createSkill = createAsyncThunk(
  "skills/create",
  async (skillData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await skillService.createSkill(skillData, token);
    } catch (error) {
      const message = 
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete a skill
export const deleteSkill = createAsyncThunk(
  "skills/delete",
  async (skillId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await skillService.deleteSkill(skillId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const initialState = {
  skills: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPublicSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPublicSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.skills = action.payload;
      })
      .addCase(getPublicSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getSkills.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSkills.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.skills = action.payload;
      })
      .addCase(getSkills.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createSkill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSkill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.skills.push(action.payload.data);
      })
      .addCase(createSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteSkill.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSkill.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = "Skill deleted";
        
        // Get the deleted skill ID from the response
        const deletedId = action.payload.data.id || action.payload.data._id;
        
        // Filter out the deleted skill, checking both id and _id properties
        state.skills = state.skills.filter((skill) => {
          // Compare with both potential properties
          const skillId = skill.id || skill._id;
          return skillId !== deletedId;
        });
      })
      .addCase(deleteSkill.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        
        // If this is a "Model not found" error, it means the skill is already deleted
        // Set a more user-friendly message
        if (typeof action.payload === 'string' && 
            (action.payload.includes('No query results') || 
             action.payload.includes('Model not found'))) {
          state.message = "The skill may have been already deleted. The list will be refreshed.";
          // We still want to indicate success since the end result is the same (skill is gone)
          state.isError = false;
          state.isSuccess = true;
        }
      });
  },
});

export const { reset } = skillSlice.actions;
export default skillSlice.reducer; 