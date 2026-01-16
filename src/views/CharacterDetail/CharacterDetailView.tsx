import Slider from "react-slick";
import SwipeablePanelContainer from "../../components/SwipeablePanelContainer";

import LeftPanel from "./panels/LeftPanel";
import CenterPanel from "./panels/CenterPanel";
import RightPanel from "./panels/RightPanel";
import useIsCompactLayout from "../../hooks/useIsCompactLayout";
import { useInputCapabilities } from "../../hooks/useInputCapabilities";
import { useSwipeTabs } from "../../hooks/useSwipeTabs";

type CharacterDetailProps = {
  setBioTypedIndex: (i: number) => void;
  onBack?: () => void;
  onOpenOperations?: () => void;
  onOpenArchives?: () => void;
  initialTab: number;
  bioTypedIndex: number | null;
};

const TABS = [
  { label: "CHARACTER", icon: "📋" },
  { label: "AVATAR", icon: "👤" },
  { label: "SKILLS", icon: "⚡" },
];

/**
 * Inner view is keyed by layout mode so that when we switch
 * desktop <-> compact we remount the swipe state cleanly.
 * This prevents "old tab highlighted" and other slick glitches.
 */
function CharacterDetailViewInner({
  isCompact,
  hasTouch,
  effectiveInitialTab,
  onBack,
  onOpenOperations,
  onOpenArchives,
  bioTypedIndex,
  setBioTypedIndex,
}: {
  isCompact: boolean;
  hasTouch: boolean;
  effectiveInitialTab: number;
  onBack?: () => void;
  onOpenOperations?: () => void;
  onOpenArchives?: () => void;
  bioTypedIndex: number | null;
  setBioTypedIndex: (i: number) => void;
}) {
  const { sliderRef, sliderSettings, activeTab, goToTab, onWheel } =
    useSwipeTabs({
      initialTab: effectiveInitialTab,
      tabCount: 3,
      enableTouch: hasTouch,
    });

  return (
    <div className="relative h-full flex flex-col">
      {/* TAB BAR (compact layout only) */}
      {isCompact && (
        <div className="flex-shrink-0 pt-6 px-4 pb-3">
          <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-lg p-1 border border-cyan-400/30">
            {TABS.map((tab, index) => (
              <button
                key={tab.label}
                onClick={() => goToTab(index)}
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
      )}

      {/* CONTENT */}
      <div className="flex-1 min-h-0">
        <SwipeablePanelContainer onWheel={onWheel}>
          {isCompact ? (
            /* COMPACT: Slider */
            <div className="relative character-slider">
              <Slider
                // Remount slider when toggling layout to avoid misalignment
                key="compact-slider"
                ref={sliderRef}
                {...sliderSettings}
              >
                <div className="px-2">
                  <LeftPanel
                    onOpenArchives={onOpenArchives}
                    onOpenOperations={onOpenOperations}
                    bioTypedIndex={bioTypedIndex}
                    setBioTypedIndex={setBioTypedIndex}
                  />
                </div>
                <div className="px-2">
                  <CenterPanel onBack={onBack} />
                </div>
                <div className="px-2">
                  <RightPanel />
                </div>
              </Slider>
            </div>
          ) : (
            /* DESKTOP: Grid */
            <div className="grid grid-cols-12 gap-4 p-4">
              <div className="col-span-4">
                <LeftPanel
                  onOpenArchives={onOpenArchives}
                  onOpenOperations={onOpenOperations}
                  bioTypedIndex={bioTypedIndex}
                  setBioTypedIndex={setBioTypedIndex}
                />
              </div>

              <div className="col-span-4">
                <CenterPanel onBack={onBack} />
              </div>

              <div className="col-span-4">
                <RightPanel />
              </div>
            </div>
          )}
        </SwipeablePanelContainer>
      </div>
    </div>
  );
}

export default function CharacterDetailView({
  initialTab,
  onBack,
  onOpenOperations,
  onOpenArchives,
  bioTypedIndex,
  setBioTypedIndex,
}: CharacterDetailProps) {
  const isCompact = useIsCompactLayout();
  const { hasTouch } = useInputCapabilities();

  /**
   * Policy:
   * - Desktop: respect initialTab
   * - Compact: default to AVATAR (index 1)
   */
  const effectiveInitialTab = isCompact ? 1 : initialTab;

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Keyed remount fixes: stale activeTab highlight + slick glitch on resize */}
      <CharacterDetailViewInner
        key={isCompact ? "mode-compact" : "mode-desktop"}
        isCompact={isCompact}
        hasTouch={hasTouch}
        effectiveInitialTab={effectiveInitialTab}
        onBack={onBack}
        onOpenOperations={onOpenOperations}
        onOpenArchives={onOpenArchives}
        bioTypedIndex={bioTypedIndex}
        setBioTypedIndex={setBioTypedIndex}
      />
    </div>
  );
}
