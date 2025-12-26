import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUser = createAsyncThunk(
  "github/fetchUser",
  async (username, { signal }) => {
    const res = await fetch(
      `https://api.github.com/users/${username}`,
      { signal }
    );
    if (!res.ok) throw new Error("User not found");
    return res.json();
  }
);

export const fetchRepos = createAsyncThunk(
  "github/fetchRepos",
  async ({ username, page }) => {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=10&page=${page}&sort=updated`
    );
    if (!res.ok) throw new Error("Failed to fetch repos");
    return res.json();
  }
);

const githubSlice = createSlice({
  name: "github",
  initialState: {
    user: null,
    repos: [],
    loadingUser: false,
    loadingRepos: false,
    error: null,
  },
  reducers: {
    clearAll: (state) => {
      state.user = null;
      state.repos = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (s) => {
        s.loadingUser = true;
        s.error = null;
      })
      .addCase(fetchUser.fulfilled, (s, a) => {
        s.loadingUser = false;
        s.user = a.payload;
      })
      .addCase(fetchUser.rejected, (s, a) => {
        s.loadingUser = false;
        s.error = a.error.message;
      })
      .addCase(fetchRepos.pending, (s) => {
        s.loadingRepos = true;
      })
      .addCase(fetchRepos.fulfilled, (s, a) => {
        s.loadingRepos = false;
        s.repos.push(...a.payload);
      })
      .addCase(fetchRepos.rejected, (s) => {
        s.loadingRepos = false;
      });
  },
});

export const { clearAll } = githubSlice.actions;
export default githubSlice.reducer;
