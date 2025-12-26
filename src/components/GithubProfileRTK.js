import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetUserQuery,
  useGetReposQuery,
} from "../services/githubApi";
import RepoStatsChart from "./RepoStatsChart";

export default function GithubProfileRTK() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  /* Debounce typing */
  useEffect(() => {
    const t = setTimeout(() => {
      setUsername(input.trim());
    }, 500);
    return () => clearTimeout(t);
  }, [input]);

  const {
    data: user,
    isLoading,
    error,
  } = useGetUserQuery(username, {
    skip: !username,
  });

  const { data: repos = [] } = useGetReposQuery(username, {
    skip: !username,
  });

  const errorMessage =
    error?.status === 404
      ? "User not found"
      : error?.status === 403
      ? "GitHub API rate limit exceeded"
      : error
      ? "Something went wrong"
      : null;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">
        RTK Query (Live Typing)
      </h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type GitHub username..."
        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {isLoading && (
        <p className="text-sm text-gray-400 animate-pulse">
          Fetching profile…
        </p>
      )}

      {errorMessage && (
        <p className="text-sm text-red-400">
          {errorMessage}
        </p>
      )}

      <AnimatePresence mode="wait">
        {user && (
          <motion.div
            key={user.login}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="bg-gray-800 rounded-xl p-5 flex gap-4"
          >
            <img
              src={user.avatar_url}
              alt="avatar"
              className="w-20 h-20 rounded-full"
            />

            <div>
              <h3 className="font-bold text-lg">
                {user.name || user.login}
              </h3>
              <p className="text-gray-400">
                @{user.login}
              </p>
              <p className="text-sm mt-2">
                👥 {user.followers} | 📦{" "}
                {user.public_repos}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {repos.length > 0 && (
        <>
          <div className="space-y-2">
            {repos.slice(0, 6).map((repo) => (
              <div
                key={repo.id}
                className="bg-gray-800 p-4 rounded flex justify-between"
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
              </div>
            ))}
          </div>

          <RepoStatsChart repos={repos} />
        </>
      )}
    </div>
  );
}
