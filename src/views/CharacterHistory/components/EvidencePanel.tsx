import { useState } from "react";
import { createPortal } from "react-dom";
import type { EvidenceItem } from "../../../types/profile.types";

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
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isImageRotated, setIsImageRotated] = useState(false);

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
        <div className="bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden">
          {currentItem.image ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[60vh] w-auto h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsImageModalOpen(true)}
            />
          ) : currentItem.video ? (
            <video
              src={currentItem.video}
              controls
              className="max-w-full max-h-[60vh] w-auto h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setIsVideoModalOpen(true)}
            />
          ) : (
            <div className="text-center space-y-2 p-8">
              <div className="text-4xl">📸</div>
              <div className="text-xs text-cyan-400/50 font-mono uppercase tracking-wider">
                {currentItem.title}
              </div>
              <div className="text-xs text-cyan-300/40">
                [Placeholder for evidence image/video]
              </div>
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

        {/* Image modal */}
        {isImageModalOpen &&
          currentItem.image &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/90 z-[9999]"
              onClick={() => {
                setIsImageModalOpen(false);
                setIsImageRotated(false);
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className="relative flex flex-col items-center justify-center transition-transform duration-300"
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    transform: isImageRotated ? "rotate(90deg)" : "none",
                  }}
                >
                  <button
                    onClick={() => {
                      setIsImageModalOpen(false);
                      setIsImageRotated(false);
                    }}
                    className="absolute -top-12 right-0 w-8 h-8 flex items-center justify-center bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 hover:bg-slate-700 transition-colors"
                    title="Close"
                  >
                    ✕
                  </button>

                  <button
                    onClick={() => setIsImageRotated((r) => !r)}
                    className="absolute -top-12 left-0 flex items-center gap-2 bg-slate-800/80 border border-cyan-400/40 rounded px-3 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-400/20 transition-all cursor-pointer"
                    title="Rotate image"
                  >
                    <span>{isImageRotated ? "Rotate back" : "Rotate"}</span>
                  </button>

                  <img
                    src={currentItem.image}
                    alt={currentItem.title}
                    className="max-w-[90vw] max-h-[85vh] object-contain"
                    style={{
                      maxWidth: isImageRotated ? "90vh" : "90vw",
                      maxHeight: isImageRotated ? "90vw" : "85vh",
                    }}
                  />

                  <div className="mt-4 text-sm font-mono text-cyan-300 uppercase tracking-wider text-center">
                    {currentItem.title}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )}

        {/* Video modal */}
        {isVideoModalOpen &&
          currentItem.video &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/90 z-[9999]"
              onClick={() => setIsVideoModalOpen(false)}
            >
              <div className="absolute inset-0 flex items-center justify-center p-4">
                <div
                  className="relative flex flex-col items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setIsVideoModalOpen(false)}
                    className="absolute -top-12 right-0 w-8 h-8 flex items-center justify-center bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 hover:bg-slate-700 transition-colors"
                    title="Close"
                  >
                    ✕
                  </button>

                  <video
                    src={currentItem.video}
                    controls
                    autoPlay
                    className="max-w-[90vw] max-h-[85vh] object-contain"
                  />

                  <div className="mt-4 text-sm font-mono text-cyan-300 uppercase tracking-wider text-center">
                    {currentItem.title}
                  </div>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
}
