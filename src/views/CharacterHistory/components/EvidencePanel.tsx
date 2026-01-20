import { useState } from "react";
import type { EvidenceItem } from "../../../types/profile.types";
import MediaModal from "./MediaModal";

interface EvidencePanelProps {
  evidence: {
    items: EvidenceItem[];
  };
  horizontal?: boolean;
}

export default function EvidencePanel({
  evidence,
  horizontal = false,
}: EvidencePanelProps) {
  const items = evidence.items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);

  const currentItem = items[currentIndex];
  const hasMultiple = items.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    setShowDetails(false);
  };

  const goToNext = () => {
    setCurrentIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    setShowDetails(false);
  };

  return (
    <div className="h-full flex-1 min-h-0 border-2 border-cyan-400/40 rounded-lg overflow-hidden">
      <div
        className={`h-full flex flex-col p-4 space-y-4 ${
          horizontal ? "flex-row gap-4" : ""
        }`}
      >
        {/* Image / evidence display */}
        <div className="relative group bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden ">
          {currentItem.image ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[60vh] object-contain"
            />
          ) : currentItem.video ? (
            <video
              src={currentItem.video}
              controls
              className="max-w-full max-h-[60vh] object-contain"
            />
          ) : null}

          {/* Hover expand overlay */}
          {(currentItem.image || currentItem.video) && (
            <div
              className="
      absolute inset-0
      opacity-0 group-hover:opacity-100
      transition-opacity
      bg-black/40
      pointer-events-none
    "
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsContentModalOpen(true);
                }}
                className="
        pointer-events-auto
        absolute top-2 left-2
        px-3 py-1.5
        bg-slate-800/80 border border-cyan-400/40 rounded
        text-cyan-300 font-mono text-xs uppercase tracking-wider
        hover:bg-cyan-400/20 transition-colors
      "
              >
                ⤢ Expand
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="space-y-2">
          <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            {currentItem.title}
          </h4>
          <p className="text-xs text-cyan-100/80 leading-relaxed">
            {currentItem.summary}
          </p>
        </div>

        {/* Expandable details */}
        <div className="space-y-2">
          <button
            onClick={() => setShowDetails((v) => !v)}
            className="w-full text-left px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 uppercase tracking-wider hover:bg-cyan-500/20 transition-colors flex items-center justify-between"
          >
            <span>Technical Details</span>
            <span className="text-xs">{showDetails ? "▾" : "▸"}</span>
          </button>

          {showDetails && (
            <p className="text-xs text-cyan-100/70 leading-relaxed px-2 py-2 bg-slate-700/30 rounded">
              {currentItem.details}
            </p>
          )}
        </div>

        {/* Navigation */}
        {hasMultiple && (
          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              onClick={goToPrevious}
              className="flex-1 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 uppercase hover:bg-cyan-500/20 transition-colors"
            >
              ← Prev
            </button>

            <div className="text-xs text-cyan-400/50 font-mono whitespace-nowrap">
              {currentIndex + 1} / {items.length}
            </div>

            <button
              onClick={goToNext}
              className="flex-1 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 uppercase hover:bg-cyan-500/20 transition-colors"
            >
              Next →
            </button>
          </div>
        )}

        {/* Indicator dots */}
        {hasMultiple && (
          <div className="flex justify-center gap-1">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setCurrentIndex(i);
                  setShowDetails(false);
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === currentIndex
                    ? "bg-emerald-400 w-4"
                    : "bg-cyan-400/30 hover:bg-cyan-400/60"
                }`}
                aria-label={`Go to evidence ${i + 1}`}
              />
            ))}
          </div>
        )}
        {isContentModalOpen && currentItem && (
          <MediaModal
            title={currentItem.title}
            imageSrc={currentItem.image}
            videoSrc={currentItem.video}
            onClose={() => setIsContentModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
