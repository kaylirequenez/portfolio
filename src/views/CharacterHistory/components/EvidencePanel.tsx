import { useState, useRef } from "react";
import type { EvidenceItem } from "../../../types/profile.types";
import MediaModal from "./MediaModal";
import PDFPreview from "./PDFPreview";
import PDFModal from "./PDFModal";
import VimeoEmbed from "./VimeoEmbed";

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoCurrentTime, setVideoCurrentTime] = useState<number>(0);

  const currentItem = items[currentIndex];
  const hasMultiple = items.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((i) => (i === 0 ? items.length - 1 : i - 1));
    setShowDetails(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const goToNext = () => {
    setCurrentIndex((i) => (i === items.length - 1 ? 0 : i + 1));
    setShowDetails(false);
    setVideoCurrentTime(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div className="h-full flex-1 min-h-0 border-2 border-cyan-400/40 rounded-lg overflow-hidden">
      <div
        className={`h-full flex flex-col p-4 space-y-4 ${
          horizontal ? "flex-row gap-4" : ""
        }`}
      >
        {/* Image / evidence display */}
        <div className={`relative group bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden ${
          currentItem.type === "vimeo" ? "aspect-video w-full" : ""
        }`}>
          {currentItem.type === "image" ? (
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full max-h-[50vh] object-contain"
            />
          ) : currentItem.type === "video" ? (
            <video
              ref={videoRef}
              src={currentItem.video}
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              className="max-w-full max-h-[50vh] object-contain"
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
          ) : currentItem.type === "vimeo" ? (
            <VimeoEmbed
              vimeoUrl={currentItem.vimeoUrl}
              title={currentItem.title}
              startTime={currentItem.startTime}
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
                // Capture current video time and pause if it's a video
                if (currentItem.type === "video" && videoRef.current) {
                  setVideoCurrentTime(videoRef.current.currentTime);
                  videoRef.current.pause();
                }
                setIsContentModalOpen(true);
              }}
              className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/20 transition-colors z-10"
              title="View in full screen"
            >
              <span className="text-lg">⤢</span>
              <span>Expand</span>
            </button>
          )}

          {/* Open button for Vimeo videos - opens original page with MIT branding */}
          {currentItem.type === "vimeo" && (
            <a
              href={currentItem.vimeoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="absolute top-2 right-2 flex items-center gap-1 px-3 py-1.5 bg-slate-800/80 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/20 transition-colors z-20"
              title="Open on Vimeo (includes MIT course link)"
            >
              <span className="text-lg">🔗</span>
              <span>Open</span>
            </a>
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
                  setVideoCurrentTime(0);
                  if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                  }
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
            videoCurrentTime={currentItem.type === "video" ? videoCurrentTime : undefined}
            onClose={() => {
              setIsContentModalOpen(false);
              // Resume video from where it left off when closing modal
              if (currentItem.type === "video" && videoRef.current && videoCurrentTime > 0) {
                videoRef.current.currentTime = videoCurrentTime;
              }
            }}
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
