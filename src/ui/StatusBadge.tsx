export default function StatusBadge({
  label,
  color,
}: {
  label: string;
  color: "green" | "cyan" | "purple";
}) {
  const colors = {
    green:
      "from-green-500/20 to-emerald-500/20 border-green-400/50 text-green-300",
    cyan: "from-cyan-500/20 to-blue-500/20 border-cyan-400/50 text-cyan-300",
    purple:
      "from-purple-500/20 to-pink-500/20 border-purple-400/50 text-purple-300",
  };

  return (
    <div
      className={`bg-gradient-to-r ${colors[color]} border-2 px-4 py-1.5 rounded-full uppercase text-xs tracking-wider`}
    >
      {label}
    </div>
  );
}
