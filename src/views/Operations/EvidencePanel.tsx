import { useState } from "react";
import { createPortal } from "react-dom";

interface EvidenceItem {
  title: string;
  summary: string;
  details: string;
  image?: string;
}

interface EvidencePanelProps {
  evidence: {
    mode: string;
    items: EvidenceItem[];
  };
  horizontal?: boolean;
}

export default function EvidencePanel({
  evidence,
  horizontal = false,
}: EvidencePanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isImageRotated, setIsImageRotated] = useState(false);

  const currentItem = evidence.items[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? evidence.items.length - 1 : prev - 1
    );
    setExpandedIndex(null);
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === evidence.items.length - 1 ? 0 : prev + 1
    );
    setExpandedIndex(null);
  };

  return (
    <div
      className={`h-full flex flex-col p-4 space-y-4 ${
        horizontal ? "flex-row gap-4" : ""
      }`}
    >
      {/* Image/evidence display */}
      <div className="bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden">
        {currentItem.image ? (
          <img
            src={currentItem.image}
            alt={currentItem.title}
            className="max-w-full max-h-[60vh] w-auto h-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setIsImageModalOpen(true)}
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

      {/* Summary (Always visible) */}
      <div className="space-y-2">
        <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
          {currentItem.title}
        </h4>
        <p className="text-xs text-cyan-100/80 leading-relaxed">
          {currentItem.summary}
        </p>
      </div>

      {/* Expandable Details */}
      <div className="space-y-2">
        <button
          onClick={() =>
            setExpandedIndex(
              expandedIndex === currentIndex ? null : currentIndex
            )
          }
          className="w-full text-left px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 uppercase tracking-wider hover:bg-cyan-500/20 transition-colors flex items-center justify-between"
        >
          <span>Technical Details</span>
          <span className="text-xs">
            {expandedIndex === currentIndex ? "▾" : "▸"}
          </span>
        </button>
        {expandedIndex === currentIndex && (
          <p className="text-xs text-cyan-100/70 leading-relaxed px-2 py-2 bg-slate-700/30 rounded">
            {currentItem.details}
          </p>
        )}
      </div>

      {/* Navigation */}
      {evidence.items.length > 1 && (
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={goToPrevious}
            className="flex-1 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 uppercase hover:bg-cyan-500/20 transition-colors"
          >
            ← Prev
          </button>
          <div className="text-xs text-cyan-400/50 font-mono whitespace-nowrap">
            {currentIndex + 1} / {evidence.items.length}
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
      {evidence.items.length > 1 && (
        <div className="flex justify-center gap-1">
          {evidence.items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrentIndex(i);
                setExpandedIndex(null);
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

      {/* Image Modal */}
      {isImageModalOpen &&
        currentItem.image &&
        createPortal(
          <div
            className="fixed inset-0 bg-black/90 z-[9999]"
            onClick={() => setIsImageModalOpen(false)}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              margin: 0,
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
                {/* Close button */}
                <button
                  onClick={() => {
                    setIsImageModalOpen(false);
                    setIsImageRotated(false);
                  }}
                  className="absolute -top-12 right-0 w-8 h-8 flex items-center justify-center bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 hover:bg-slate-700 transition-colors z-10"
                  title="Close"
                >
                  ✕
                </button>

                {/* Rotate button for mobile portrait mode */}
                <button
                  onClick={() => setIsImageRotated(!isImageRotated)}
                  className="absolute -top-12 left-0 lg:hidden portrait:flex hidden items-center gap-2 bg-slate-800/80 border border-cyan-400/40 rounded px-3 py-2 text-xs font-mono text-cyan-300 hover:bg-cyan-400/20 transition-all cursor-pointer"
                  title="Rotate image"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  <span>{isImageRotated ? "Rotate back" : "Rotate"}</span>
                </button>

                {/* Full image */}
                <img
                  src={currentItem.image}
                  alt={currentItem.title}
                  className="max-w-[90vw] max-h-[85vh] object-contain"
                  style={{
                    maxWidth: isImageRotated ? "90vh" : "90vw",
                    maxHeight: isImageRotated ? "90vw" : "85vh",
                  }}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Title below image */}
                <div className="mt-4 text-sm font-mono text-cyan-300 uppercase tracking-wider text-center">
                  {currentItem.title}
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
