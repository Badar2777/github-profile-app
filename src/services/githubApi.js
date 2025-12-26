import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const githubApi = createApi({
  reducerPath: "githubApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.github.com/",
    prepareHeaders: (headers) => {
      const token =
        import.meta.env.VITE_GITHUB_TOKEN ||
        process.env.REACT_APP_GITHUB_TOKEN;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => `users/${username}`,
    }),
    getRepos: builder.query({
      query: (username) => `users/${username}/repos`,
    }),
  }),
});

export const { useGetUserQuery, useGetReposQuery } = githubApi;
