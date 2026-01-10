import { useEffect, useState } from "react";

function SkillBar({ name, mastery }: { name: string; mastery: number }) {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const timer = setTimeout(() => setWidth(mastery), 100);
    return () => clearTimeout(timer);
  }, [mastery]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-300 text-xs font-mono">{name}</span>
        <span className="text-cyan-300 text-xs font-mono">{mastery}%</span>
      </div>
      <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/30">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-600 transition-all duration-1000"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
export default SkillBar;
