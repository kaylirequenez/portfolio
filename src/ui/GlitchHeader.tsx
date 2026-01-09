export default function GlitchHeader({ title }: { title: string }) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border-2 border-emerald-400/50 rounded-lg p-2">
      <div className="flex items-center gap-2">
        <div className="text-emerald-300">❯</div>
        <h2 className="text-sm text-white uppercase tracking-wider">{title}</h2>
      </div>
      <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-blue-400 to-transparent rounded-full mt-1" />
    </div>
  );
}
