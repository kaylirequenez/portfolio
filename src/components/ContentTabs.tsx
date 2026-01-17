type Tab = {
  label: string;
  icon: string;
};

interface ContentTabsProps {
  tabs: Tab[];
  activeTab: number;
  onSelect: (index: number) => void;
  className?: string;
}

export default function ContentTabs({
  tabs,
  activeTab,
  onSelect,
  className = "flex-shrink-0 pt-6 px-4 pb-3",
}: ContentTabsProps) {
  return (
    <div className={className}>
      <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-lg p-1 border border-cyan-400/30">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => onSelect(index)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
              activeTab === index
                ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                : "text-cyan-300/50 hover:text-cyan-300/80"
            }`}
          >
            <span className="text-sm">{tab.icon}</span>
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
