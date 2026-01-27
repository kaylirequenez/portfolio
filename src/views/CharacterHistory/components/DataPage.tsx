import { useState, useEffect } from "react";
import type { DataItem } from "../../../types/profile.types";
import {
  getLastSelectedItem,
  saveLastSelectedItem,
} from "../../../utils/mediaStorage";

import EvidencePanel from "./EvidencePanel";
import DataFile from "./DataFile";
import DataIndex from "./DataIndex";
import ContentBrowserFrame from "../../../components/ContentBrowserFrame";
import ContentTabs from "../../../components/ContentTabs";
import { ContentBrowserHeader } from "./DataHeader";
import GridOverlay from "../../../components/GridOverlay";
import HelpButton from "../../../components/HelpButton";

import useIsCompactLayout from "../../../hooks/useIsCompactLayout";
import { useSwipeTabs } from "../../../hooks/useSwipeTabs";
import { useInputCapabilities } from "../../../hooks/useInputCapabilities";

interface ContentBrowserPageProps {
  header: string;
  indexHeader: string;
  data: DataItem[];
  onBack: () => void;
  emptyStateMessage?: string;
  viewId: string; // "archives" or "operations" - used for selectedItemId persistence
}

export default function ContentBrowserPage({
  indexHeader,
  data,
  header,
  onBack,
  emptyStateMessage,
  viewId,
}: ContentBrowserPageProps) {
  const [selectedItemId, setSelectedItemId] = useState<string | null>(
    getLastSelectedItem(viewId),
  );

  useEffect(() => {
    saveLastSelectedItem(viewId, selectedItemId);
    console.log("saved selectedItemId", selectedItemId);
  }, [selectedItemId, viewId]);

  const hasSelection = selectedItemId !== null;
  const currentItem = data.find((item) => item.id === selectedItemId);
  const getItemHeader = (item: DataItem) =>
    "title" in item ? item.title : `${item.company} — ${item.role}`;

  const isCompactLayout = useIsCompactLayout();
  const { hasTouch } = useInputCapabilities();

  const { sliderRef, sliderSettings, activeTab, goToTab, onWheel } =
    useSwipeTabs({
      initialTab: 0,
      tabCount: 2,
      enableTouch: hasTouch,
    });

  /* ─────────────────────── Render helpers ─────────────────────── */

  const renderFile = () => {
    if (!currentItem) return null;
    return (
      <DataFile
        header={getItemHeader(currentItem)}
        data={currentItem}
        onClose={() => setSelectedItemId(null)}
        isCompactLayout={isCompactLayout}
      />
    );
  };

  const renderEvidence = () => {
    if (!currentItem) return null;
    return (
      <EvidencePanel
        evidence={currentItem.evidence}
        isVisible={isCompactLayout ? activeTab === 1 : true}
        fileId={currentItem.id}
      />
    );
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      <GridOverlay />
      <HelpButton
        tips={
          hasSelection
            ? [
                {
                  text: "Click the red button to close this file",
                  icon: "🔴",
                },
              ]
            : [
                {
                  text: "Click the back arrow to return to Character",
                  icon: "←",
                },
              ]
        }
      />
      <div className="relative h-full flex flex-col p-4">
        <ContentBrowserHeader header={header} onBack={onBack} />

        {isCompactLayout && hasSelection && (
          <div className="flex-shrink-0 pb-3 flex gap-2 items-center">
            <button
              onClick={() => setSelectedItemId(null)}
              className="w-10 h-10 bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-colors"
              title="Close"
            >
              ✕
            </button>

            <ContentTabs
              tabs={[
                { label: "Details", icon: "📄" },
                { label: "Evidence", icon: "🔍" },
              ]}
              activeTab={activeTab}
              onSelect={goToTab}
              className="flex-1"
            />
          </div>
        )}

        <div className="flex-1 flex min-h-0">
          {!hasSelection ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-cyan-400/50 font-mono text-sm uppercase tracking-wider">
                {emptyStateMessage || "Select an item"}
              </div>
            </div>
          ) : (
            <ContentBrowserFrame
              layout="two-panel"
              panels={[renderFile(), renderEvidence()]}
              onWheel={onWheel}
              sliderRef={sliderRef}
              sliderSettings={sliderSettings}
              isCompact={isCompactLayout}
            />
          )}
        </div>

        {!hasSelection && (
          <div className="flex-shrink-0 pt-4 border-t border-cyan-400/20 w-64">
            <DataIndex
              header={indexHeader}
              cards={data.map((item) => ({
                id: item.id,
                header: getItemHeader(item),
                role: item.role,
                dates: item.dates,
              }))}
              onSelectData={setSelectedItemId}
              selectedData={selectedItemId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
