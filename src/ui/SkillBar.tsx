import { useState, useEffect } from "react";

export default function SkillBar({
  name,
  mastery,
}: {
  name: string;
  mastery: number;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(mastery), 100);
    return () => clearTimeout(timer);
  }, [mastery]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-gray-300 text-xs font-mono">{name}</span>
        <span className="text-emerald-300 text-xs font-mono">{mastery}%</span>
      </div>
      <div className="h-2 bg-black/50 rounded-full overflow-hidden border border-emerald-500/30">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}
