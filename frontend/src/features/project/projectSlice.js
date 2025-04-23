import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createProject, getAllProjects, deleteProjectService, updateProjectService } from "./projectService";

// Fetch all projects
export const fetchProjects = createAsyncThunk(
  "projects/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await getAllProjects(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to fetch projects");
    }
  }
);

// 🔁 Async thunk for creating project
export const createProjectThunk = createAsyncThunk(
  "projects/create",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await createProject(formData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to create project");
    }
  }
);

// Delete project
export const deleteProject = createAsyncThunk(
  "projects/delete",
  async (projectId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await deleteProjectService(projectId, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to delete project");
    }
  }
);

// Update project
export const updateProject = createAsyncThunk(
  "projects/update",
  async ({ projectId, formData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await updateProjectService(projectId, formData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Failed to update project");
    }
  }
);

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    success: false,
    isEditing: false,
    currentProject: null
  },
  reducers: {
    resetProjectState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.isEditing = false;
      state.currentProject = null;
    },
    setEditProject: (state, action) => {
      state.isEditing = true;
      state.currentProject = action.payload;
    },
    cancelEdit: (state) => {
      state.isEditing = false;
      state.currentProject = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.data || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createProjectThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProjectThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Add the new project to the projects array
        if (action.payload.data) {
          state.projects.unshift(action.payload.data);
        }
      })
      .addCase(createProjectThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })
      .addCase(deleteProject.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Remove the deleted project from the projects array
        state.projects = state.projects.filter(
          project => project.id !== action.meta.arg
        );
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.isEditing = false;
        state.currentProject = null;
        
        // Update the project in the projects array
        const updatedProject = action.payload.data;
        const index = state.projects.findIndex(project => project.id === updatedProject.id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetProjectState, setEditProject, cancelEdit } = projectSlice.actions;
export default projectSlice.reducer;
