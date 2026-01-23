import { useState } from "react";
import type { EvidenceItem } from "../../../types/profile.types";
import MediaModal from "./MediaModal";
import PDFPreview from "./PDFPreview";
import PDFModal from "./PDFModal";

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
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);

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
        <div className="relative group bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden min-h-[400px]">
          {currentItem.type === "image" ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[60vh] object-contain"
            />
          ) : currentItem.type === "video" ? (
            <video
              src={currentItem.video}
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              className="max-w-full max-h-[60vh] object-contain"
              playsInline
              disablePictureInPicture
            />
          ) : currentItem.type === "pdf" ? (
            <PDFPreview
              pdfUrl={currentItem.pdf}
              title={currentItem.title}
              onOpenFull={() => {
                const normalizedUrl = currentItem.pdf.startsWith("/src")
                  ? currentItem.pdf.replace(/^\/src/, "")
                  : currentItem.pdf;
                window.open(normalizedUrl, "_blank", "noopener,noreferrer");
              }}
            />
          ) : null}

          {/* Action buttons - always visible for all media types */}
          {currentItem.type === "pdf" && (
            <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsPDFModalOpen(true);
                }}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/20 transition-colors"
                title="View PDF in full screen"
              >
                <span className="text-lg">⤢</span>
                <span>Expand</span>
              </button>
              <a
                href={
                  currentItem.pdf.startsWith("/src")
                    ? currentItem.pdf.replace(/^\/src/, "")
                    : currentItem.pdf
                }
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/20 transition-colors"
                title="Open PDF in new tab"
              >
                <span className="text-lg">🔗</span>
                <span>Open</span>
              </a>
            </div>
          )}

          {/* Expand button for images and videos - always visible */}
          {(currentItem.type === "image" || currentItem.type === "video") &&
            !isContentModalOpen && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsContentModalOpen(true);
              }}
              className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/20 transition-colors z-10"
              title="View in full screen"
            >
              <span className="text-lg">⤢</span>
              <span>Expand</span>
            </button>
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
            imageSrc={currentItem.type === "image" ? currentItem.image : undefined}
            videoSrc={currentItem.type === "video" ? currentItem.video : undefined}
            onClose={() => setIsContentModalOpen(false)}
          />
        )}
        {isPDFModalOpen && currentItem.type === "pdf" && (
          <PDFModal
            title={currentItem.title}
            pdfUrl={currentItem.pdf}
            onClose={() => setIsPDFModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
