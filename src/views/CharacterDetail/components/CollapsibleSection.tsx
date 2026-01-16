interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg shadow-[0_0_20px_rgba(34,211,238,0.3)] overflow-hidden">
      <button
        className="w-full flex items-center justify-between px-4 py-3 text-cyan-300 hover:bg-white/5 transition-colors"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <div>❯</div>
          <h2 className="text-sm font-mono uppercase tracking-wider">
            {title}
          </h2>
        </div>
        <div
          className={`text-xs ${
            isOpen ? "rotate-180" : ""
          } transition-transform`}
        >
          ▼
        </div>
      </button>
      {isOpen && <div className="border-t border-white/10">{children}</div>}
    </div>
  );
}
export default CollapsibleSection;
