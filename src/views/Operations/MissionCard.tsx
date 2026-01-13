interface MissionCardProps {
  id: string;
  company: string;
  role: string;
  dates?: string;
  isSelected?: boolean;
  onClick: () => void;
}

export default function MissionCard({
  company,
  role,
  dates,
  isSelected,
  onClick,
}: MissionCardProps) {
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
        {company}
      </div>
      <div className="mt-2 text-sm font-mono text-emerald-300 line-clamp-2">
        {role}
      </div>
      {dates && (
        <div className="mt-2 text-xs font-mono text-cyan-400/60">{dates}</div>
      )}
    </button>
  );
}
