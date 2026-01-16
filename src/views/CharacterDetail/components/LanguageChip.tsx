import type { Language } from "../../../types/profile.types";

export default function LanguageChip({ name, level }: Language) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg p-2 text-xs font-mono text-cyan-300">
      <span className="font-semibold">{name}</span>
      <span className="ml-1 opacity-70">Lv.{level}</span>
    </div>
  );
}
