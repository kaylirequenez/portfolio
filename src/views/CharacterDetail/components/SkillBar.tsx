import { useEffect, useState } from "react";
import type { Skill } from "../../../types/profile.types";

function SkillBar({ name, mastery }: Skill) {
  const [width, setWidth] = useState(0);
  const safeMastery = Math.max(0, Math.min(100, mastery));

  useEffect(() => {
    setWidth(safeMastery);
  }, [safeMastery]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-300 text-xs font-mono">{name}</span>
        <span className="text-cyan-300 text-xs font-mono">{safeMastery}%</span>
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
