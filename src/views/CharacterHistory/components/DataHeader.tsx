interface ContentBrowserHeaderProps {
  header: string;
  onBack?: () => void;
}

export function ContentBrowserHeader({
  header,
  onBack,
}: ContentBrowserHeaderProps) {
  return (
    <div className="flex-shrink-0 pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="group flex items-center gap-1.5 px-2 py-1 bg-slate-800/50 border border-cyan-400/30 rounded text-cyan-300 hover:bg-cyan-400/20 transition-all font-mono text-xs uppercase tracking-wider"
              title="Back to Character"
            >
              <span className="text-sm">←</span>
              <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                Character
              </span>
            </button>
          )}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-cyan-400/10 blur-sm"></div>
            <h1
              className="relative text-sm lg:text-base text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-wider font-mono select-none px-3 py-1.5 border border-cyan-400/40 bg-slate-900/50"
              style={{
                fontWeight: "bold",
                textShadow:
                  "0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.4)",
                filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))",
              }}
            >
              {header}
            </h1>
          </div>
        </div>
        <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/70">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span>ACTIVE</span>
        </div>
      </div>
    </div>
  );
}
