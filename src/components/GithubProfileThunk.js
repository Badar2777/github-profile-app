import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUser,
  fetchRepos,
  clearAll,
} from "../features/github/githubSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function GithubProfileThunk() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [page, setPage] = useState(1);

  const {
    user,
    repos,
    loadingUser,
    loadingRepos,
    error,
  } = useSelector((s) => s.github);

  useEffect(() => {
    if (!username) return;
    const t = setTimeout(() => {
      dispatch(clearAll());
      dispatch(fetchUser(username));
      dispatch(fetchRepos({ username, page: 1 }));
      setPage(1);
    }, 500);
    return () => clearTimeout(t);
  }, [username, dispatch]);

  const loadMore = () => {
    dispatch(fetchRepos({ username, page: page + 1 }));
    setPage((p) => p + 1);
  };

  return (
    <div className="space-y-4">
      <input
        className="w-full p-3 rounded bg-gray-700"
        placeholder="Type GitHub username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {loadingUser && (
        <p className="text-sm text-gray-400">Searching...</p>
      )}
      {error && <p className="text-red-400">{error}</p>}

      <AnimatePresence>
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-700 p-4 rounded-xl"
          >
            <h2 className="font-bold">{user.login}</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {loadingRepos && (
        <p className="text-sm text-gray-400">
          Loading repositories...
        </p>
      )}

    {repos.map((repo) => (
  <motion.div
    key={repo.id}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="bg-gray-800 p-4 rounded flex justify-between items-center"
  >
    <div>
      <p className="font-semibold">{repo.name}</p>
      <p className="text-xs text-gray-400">
        ⭐ {repo.stargazers_count}
      </p>
    </div>

    <span className="text-xs bg-indigo-600/20 text-indigo-400 px-2 py-0.5 rounded">
      {repo.language || "N/A"}
    </span>
  </motion.div>
))}


    </div>
  );
}
