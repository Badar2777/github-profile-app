import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchUser, fetchRepos } from "../features/github/githubSlice";
import RepoStatsChart from "./RepoStatsChart";

export default function GithubProfileThunk() {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();
  const { user, repos, loading, error } = useSelector(
    (state) => state.github
  );

  // Trigger API fetch when username changes
  useEffect(() => {
    if (username) {
      dispatch(fetchUser(username));
      dispatch(fetchRepos(username));
    }
  }, [username, dispatch]);

  // Live typing effect with debounce
  useEffect(() => {
    const t = setTimeout(() => {
      if (input.trim()) {
        setUsername(input.trim());
      }
    }, 500);
    return () => clearTimeout(t);
  }, [input]);

  const errorMessage =
    error === 404
      ? "User not found"
      : error === 403
      ? "GitHub API rate limit exceeded"
      : error
      ? "Something went wrong"
      : null;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Redux Thunk (Live Typing)</h2>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type GitHub username..."
        className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {loading && (
        <p className="text-sm text-gray-400 animate-pulse">
          Fetching profile…
        </p>
      )}

      {errorMessage && <p className="text-sm text-red-400">{errorMessage}</p>}

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
              <h3 className="font-bold text-lg">{user.name || user.login}</h3>
              <p className="text-gray-400">@{user.login}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {repos.length > 0 && <RepoStatsChart repos={repos} />}
    </div>
  );
}
