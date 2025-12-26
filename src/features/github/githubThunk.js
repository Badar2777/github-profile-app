import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchGithubUser = createAsyncThunk(
  "github/fetchUser",
  async (username, { rejectWithValue }) => {
    const res = await fetch(`https://api.github.com/users/${username}`);
    if (!res.ok) return rejectWithValue("User not found");
    return res.json();
  }
);
