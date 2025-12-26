import { useState } from "react";
import { useGetUserReposQuery } from "../services/githubApi";

const GithubRepos = ({ username }) => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetUserReposQuery(
    { username, page },
    { skip: !username }
  );

  return (
    <div className="mt-6">
      <h4 className="font-semibold mb-3">Repositories</h4>

      {isLoading && (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      )}

      {data && (
        <>
          {data.map((repo) => (
            <div
              key={repo.id}
              className="p-3 border rounded-lg mb-2"
            >
              <p className="font-medium">{repo.name}</p>
              <p className="text-sm text-gray-500">
                ⭐ {repo.stargazers_count}
              </p>
            </div>
          ))}

          <div className="flex gap-3 mt-3">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 border rounded disabled:opacity-40"
            >
              Prev
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default GithubRepos;
