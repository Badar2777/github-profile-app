import { useSelector } from "react-redux";

export default function RTKCacheInspector() {
  const cache = useSelector(
    (state) => state.githubApi?.queries
  );

  return (
    <details className="bg-gray-900 p-3 rounded text-xs">
      <summary className="cursor-pointer text-gray-400">
        RTK Query Cache
      </summary>

      <pre className="mt-2 overflow-auto max-h-64">
        {JSON.stringify(cache, null, 2)}
      </pre>
    </details>
  );
}
