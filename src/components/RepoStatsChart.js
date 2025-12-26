import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#6366f1", "#22c55e", "#f97316", "#ef4444"];

export default function RepoStatsChart({ repos }) {
  const data = Object.values(
    repos.reduce((acc, repo) => {
      const lang = repo.language || "Other";
      acc[lang] = acc[lang]
        ? { name: lang, value: acc[lang].value + 1 }
        : { name: lang, value: 1 };
      return acc;
    }, {})
  );

  if (data.length === 0) return null;

  return (
    <div className="h-64 bg-gray-800 p-4 rounded">
      <h3 className="text-sm font-semibold mb-2">
        Repo Language Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" label>
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
