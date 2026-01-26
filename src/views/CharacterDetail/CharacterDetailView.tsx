import LeftPanel from "./panels/LeftPanel";
import CenterPanel from "./panels/CenterPanel";
import RightPanel from "./panels/RightPanel";
import useIsCompactLayout from "../../hooks/useIsCompactLayout";
import { useInputCapabilities } from "../../hooks/useInputCapabilities";
import ContentBrowserFrame from "../../components/ContentBrowserFrame";
import { useSwipeTabs } from "../../hooks/useSwipeTabs";
import ContentTabs from "../../components/ContentTabs";
import GridOverlay from "../../components/GridOverlay";
import HelpButton from "../../components/HelpButton";

type CharacterDetailProps = {
  setBioTypedIndex: (i: number) => void;
  onBack?: () => void;
  onOpenOperations?: () => void;
  onOpenArchives?: () => void;
  bioTypedIndex: number | null;
  initialTab: number;
};

const TABS = [
  { label: "CHARACTER", icon: "📋" },
  { label: "AVATAR", icon: "👤" },
  { label: "SKILLS", icon: "⚡" },
];

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

  const { sliderRef, sliderSettings, activeTab, goToTab, onWheel } =
    useSwipeTabs({
      initialTab,
      tabCount: 3,
      enableTouch: hasTouch,
    });

  /**
   * Policy:
   * - Desktop: respect initialTab
   * - Compact: default to AVATAR (index 1)
   */

  return (
    <div className="h-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      <GridOverlay />
      <HelpButton
        tips={[
          "Click on Avatar to return to home",
          "Click on Archives to view previous projects",
          "Click on Operations to view previous job experience",
          "Click on Initiate Contact for LinkedIn, GitHub, or Email",
        ]}
      />

      <div className="relative h-full flex flex-col">
        {/* TAB BAR (compact layout only) */}
        {isCompact && (
          <ContentTabs tabs={TABS} activeTab={activeTab} onSelect={goToTab} />
        )}

        {/* CONTENT */}
        <div className="flex-1 min-h-0">
          <ContentBrowserFrame
            layout="three-panel"
            panels={[
              <LeftPanel
                key="left"
                onOpenArchives={onOpenArchives}
                onOpenOperations={onOpenOperations}
                bioTypedIndex={bioTypedIndex}
                setBioTypedIndex={setBioTypedIndex}
              />,
              <CenterPanel key="center" onBack={onBack} />,
              <RightPanel key="right" />,
            ]}
            onWheel={onWheel}
            sliderRef={sliderRef}
            sliderSettings={sliderSettings}
            isCompact={isCompact}
          />
        </div>
      </div>
    </div>
  );
}
