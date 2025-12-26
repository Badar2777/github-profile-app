import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = "https://api.github.com";

/* ================================
   Async Thunks
================================ */

export const fetchUser = createAsyncThunk(
  "github/fetchUser",
  async (username, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/users/${username}`);

      if (!res.ok) return rejectWithValue(res.status);

      return await res.json();
    } catch {
      return rejectWithValue("NETWORK_ERROR");
    }
  }
);

export const fetchRepos = createAsyncThunk(
  "github/fetchRepos",
  async (username, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/users/${username}/repos?sort=updated`
      );

      if (!res.ok) return rejectWithValue(res.status);

      return await res.json();
    } catch {
      return rejectWithValue("NETWORK_ERROR");
    }
  }
);

/* ================================
   Slice
================================ */

const githubSlice = createSlice({
  name: "github",
  initialState: {
    user: null,
    repos: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAll: (state) => {
      state.user = null;
      state.repos = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* USER */
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      /* REPOS */
      .addCase(fetchRepos.fulfilled, (state, action) => {
        state.repos = action.payload;
      });
  },
});

export const { clearAll } = githubSlice.actions;
export default githubSlice.reducer;
