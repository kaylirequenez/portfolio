interface ProjectCardProps {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  dates?: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default function ProjectCard({
  title,
  subtitle,
  role,
  dates,
  isSelected,
  onClick,
}: ProjectCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
        isSelected
          ? "bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20"
          : "bg-slate-900/50 border-cyan-400/30 hover:border-cyan-400/60 hover:bg-slate-900/70"
      }`}
    >
      <div className="font-mono text-xs uppercase tracking-wider text-cyan-300/70">
        {title}
      </div>
      {subtitle && (
        <div className="mt-1 text-xs font-mono text-cyan-400/60 line-clamp-1">
          {subtitle}
        </div>
      )}
      {role && (
        <div className="mt-2 text-sm font-mono text-emerald-300 line-clamp-2">
          {role}
        </div>
      )}
      {dates && (
        <div className="mt-2 text-xs font-mono text-cyan-400/60">{dates}</div>
      )}
    </button>
  );
}
