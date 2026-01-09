export default function LanguageChip({
  name,
  level,
}: {
  name: string;
  level: number;
}) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg p-2 text-xs text-cyan-300 font-mono">
      {name} Lv.{level}
    </div>
  );
}
