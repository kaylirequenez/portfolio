// views/CharacterDetail/panels/LeftPanel.tsx
import CharacterSheet from "../components/CharacterSheet";

type LeftPanelProps = {
  onOpenArchives?: () => void;
  onOpenOperations?: () => void;
  bioTypedIndex: number | null;
  setBioTypedIndex: (i: number) => void;
};

export default function LeftPanel({
  onOpenArchives,
  onOpenOperations,
  bioTypedIndex,
  setBioTypedIndex,
}: LeftPanelProps) {
  return (
    <div className="flex flex-col h-full overflow-auto px-2 pb-4">
      <CharacterSheet
        bioTypedIndex={bioTypedIndex}
        setBioTypedIndex={setBioTypedIndex}
      />
      <div className="mt-3 space-y-2">
        <button
          onClick={onOpenArchives}
          className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>📁</span>
            <span>Archives</span>
          </span>
          <span className="opacity-50">›</span>
        </button>

        <button
          onClick={onOpenOperations}
          className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span>
            <span>Operations</span>
          </span>
          <span className="opacity-50">›</span>
        </button>
      </div>
    </div>
  );
}
