import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Async thunk: handles login logic
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("http://localhost:8000/api/login", credentials);
     
      // Filter out sensitive data before returning
      const { user } = res.data;
      
      
      const safeUser = user ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      
      } : null;
      
      return {
        token: res.data.token,
        user: safeUser
      };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

// Initialization function to retrieve user from localStorage
const getUserFromStorage = () => {
  try {
    const storedUser = localStorage.getItem("authUser");
    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse stored user:", error);
    return null;
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: getUserFromStorage(),
    token: localStorage.getItem("authToken") || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    },
    // Add a restore session action
    restoreSession: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user; 
        localStorage.setItem("authToken", action.payload.token);
        if (action.payload.user) {
          localStorage.setItem("authUser", JSON.stringify(action.payload.user));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed.";
      });
  },
});

export const { logout, restoreSession } = authSlice.actions;
export default authSlice.reducer;
