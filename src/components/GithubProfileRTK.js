import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetUserQuery,
  useGetReposQuery,
} from "../services/githubApi";
import RepoStatsChart from "./RepoStatsChart";

export default function GithubProfileRTK() {
  const [username, setUsername] = useState("");
  const [debounced, setDebounced] = useState("");

  /* ---------------- Debounce typing ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(username.trim());
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  /* ---------------- RTK Queries ---------------- */
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetUserQuery(debounced, {
    skip: !debounced,
  });

  const {
    data: repos = [],
    isLoading: repoLoading,
  } = useGetReposQuery(debounced, {
    skip: !debounced,
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-200">
        RTK Query
      </h2>

      {/* Input */}
      <input
        type="text"
        placeholder="Type GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Status */}
      {userLoading && (
        <p className="text-sm text-gray-400 animate-pulse">
          Fetching profile…
        </p>
      )}

      {userError && (
        <p className="text-sm text-red-400">
          User not found
        </p>
      )}

      {/* Profile Card */}
      <AnimatePresence mode="wait">
        {user && (
          <motion.div
            key={user.login}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-800 rounded-xl p-5 flex items-center gap-4"
          >
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-20 h-20 rounded-full border border-gray-600"
            />

            <div className="flex-1">
              <h3 className="text-lg font-bold">
                {user.name || user.login}
              </h3>
              <p className="text-sm text-gray-400">
                @{user.login}
              </p>

              <div className="flex gap-4 mt-2 text-sm text-gray-300">
                <span>👥 {user.followers}</span>
                <span>📦 {user.public_repos}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Repo Section */}
      {repoLoading && (
        <p className="text-sm text-gray-400 animate-pulse">
          Loading repositories…
        </p>
      )}

      {repos.length > 0 && (
        <>
          <div className="space-y-3">
            {repos.slice(0, 6).map((repo) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gray-800 p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-semibold hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-xs text-gray-400">
                    ⭐ {repo.stargazers_count}
                  </p>
                </div>

                <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded">
                  {repo.language || "N/A"}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Repo Analytics */}
          <RepoStatsChart repos={repos} />
        </>
      )}
    </div>
  );
}
