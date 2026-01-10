export function FileRow({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className={highlight ? "text-purple-400" : "text-cyan-400"}>
          {icon}
        </div>
        <span className="text-gray-500 text-xs">{label}:</span>
      </div>
      <span
        className={`${highlight ? "text-purple-300" : "text-cyan-100"} text-xs`}
      >
        {value}
      </span>
    </div>
  );
}
