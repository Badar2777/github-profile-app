import { configureStore } from "@reduxjs/toolkit";
import githubReducer from "../features/github/githubSlice";
import { githubApi } from "../services/githubApi";

export const store = configureStore({
  reducer: {
    github: githubReducer,
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault().concat(githubApi.middleware),
});
