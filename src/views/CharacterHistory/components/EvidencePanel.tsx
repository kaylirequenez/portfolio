import { useState, useRef, useEffect, useCallback } from "react";
import type { EvidenceItem } from "../../../types/profile.types";
import MediaModal from "./MediaModal";
import PDFPreview from "./PDFPreview";
import PDFModal from "./PDFModal";
import {
  saveMediaTime,
  getMediaTime,
  clearMediaTime,
  getLastIndex,
  saveLastIndex,
} from "../../../utils/mediaStorage";

interface EvidencePanelProps {
  evidence: {
    items: EvidenceItem[];
  };
  isVisible?: boolean;
  fileId: string;
}

export default function EvidencePanel({
  evidence,
  isVisible = true,
  fileId,
}: EvidencePanelProps) {
  const items = evidence.items;
  // Restore last viewed index if available, otherwise start at 0
  const lastIndex = getLastIndex(fileId);
  const initialIndex = lastIndex !== null ? lastIndex : 0;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [showDetails, setShowDetails] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  // Get initial media time for the restored index
  const savedMediaTime = getMediaTime(fileId, initialIndex);
  const currentItemAtInit = items[initialIndex];

  // Initialize video storage with 42s for Squawk Farm presentation video if no saved time exists
  // This ensures the video starts at 42 seconds on first load
  if (
    fileId === "squawk-farm" &&
    initialIndex === 1 && // Presentation video is the second item (index 1)
    currentItemAtInit?.type === "video" &&
    savedMediaTime === 0
  ) {
    saveMediaTime(fileId, initialIndex, 42);
  }

  // Use saved time, or 42 for Squawk Farm presentation, or 0 for other videos
  const initialMediaTime =
    savedMediaTime > 0
      ? savedMediaTime
      : fileId === "squawk-farm" && initialIndex === 1
        ? 42
        : 0;
  const [mediaCurrentTime, setMediaCurrentTime] =
    useState<number>(initialMediaTime);
  // Use refs to capture current values for cleanup
  const currentItemRef = useRef<EvidenceItem | null>(null);
  const mediaCurrentTimeRef = useRef<number>(initialMediaTime);
  const currentIndexRef = useRef<number>(initialIndex);

  const currentItem = items[currentIndex];
  const hasMultiple = items.length > 1;

  // Keep refs in sync
  useEffect(() => {
    currentItemRef.current = currentItem;
  }, [currentItem]);

  useEffect(() => {
    mediaCurrentTimeRef.current = mediaCurrentTime;
  }, [mediaCurrentTime]);

  // Helper: Save current media time
  const saveCurrentMediaTime = useCallback(() => {
    const item = currentItemRef.current;
    const index = currentIndexRef.current;
    if (!item || !fileId) return;

    // Use tracked media time ref
    const time = mediaCurrentTimeRef.current;
    if (time > 0 && item.type === "video") {
      saveMediaTime(fileId, index, time);
    }
  }, [fileId]);

  // Helper: Get saved media time
  const getSavedMediaTime = useCallback((): number => {
    return getMediaTime(fileId, currentIndex);
  }, [fileId, currentIndex]);

  // Helper: Pause current media
  const pauseCurrentMedia = useCallback(() => {
    if (currentItem.type === "video" && videoRef.current) {
      videoRef.current.pause();
    }
  }, [currentItem.type]);

  // Preload next and previous items
  useEffect(() => {
    const preloadItems = [
      items[(currentIndex + 1) % items.length],
      items[(currentIndex - 1 + items.length) % items.length],
    ];

    preloadItems.forEach((item) => {
      if (item.type === "image") {
        const img = new Image();
        img.src = item.image;
      } else if (item.type === "video") {
        const video = document.createElement("video");
        video.src = item.video;
        video.preload = "metadata";
      }
    });
  }, [currentIndex, items]);

  // Update currentIndexRef when index changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Helper: Wait for video metadata to be ready
  const waitForVideoReady = (video: HTMLVideoElement): Promise<void> => {
    if (video.readyState >= 1) {
      // HAVE_METADATA or higher - already ready
      return Promise.resolve();
    }
    // Wait for metadata to load
    return new Promise((resolve) => {
      const handleLoadedMetadata = () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        resolve();
      };
      video.addEventListener("loadedmetadata", handleLoadedMetadata);
    });
  };

  // Restore media time when switching to a media item
  useEffect(() => {
    const savedTime = getSavedMediaTime();

    if (currentItem.type === "video" && videoRef.current) {
      const video = videoRef.current;

      (async () => {
        await waitForVideoReady(video);
        if (videoRef.current) {
          videoRef.current.currentTime = savedTime;
          mediaCurrentTimeRef.current = savedTime;
          setMediaCurrentTime(savedTime);
          if (savedTime > 0) {
            videoRef.current.pause();
          }
        }
      })();
    }
  }, [currentIndex, currentItem, getSavedMediaTime]);

  // Pause media when panel becomes invisible (e.g., switching tabs in compact layout)
  useEffect(() => {
    if (!isVisible) {
      saveCurrentMediaTime();
      pauseCurrentMedia();
    }
  }, [isVisible, saveCurrentMediaTime, pauseCurrentMedia]);

  // Save media time and last index when component unmounts (e.g., closing file or switching tabs)
  useEffect(() => {
    return () => {
      // Save on unmount using refs to get current values
      const item = currentItemRef.current;
      const index = currentIndexRef.current;
      if (!fileId) return;

      // Save last viewed index
      saveLastIndex(fileId, index);

      // Save media time if current item is video
      if (item && item.type === "video") {
        // Use tracked media time ref (updated on pause and time changes)
        saveMediaTime(fileId, index, mediaCurrentTimeRef.current);
      }
    };
  }, [fileId]);

  // Helper: Navigate to a specific index
  const navigateToIndex = useCallback(
    (newIndex: number) => {
      saveCurrentMediaTime();
      pauseCurrentMedia();
      setCurrentIndex(newIndex);
      setShowDetails(false);
      setMediaCurrentTime(0);
    },
    [saveCurrentMediaTime, pauseCurrentMedia],
  );

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    navigateToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    navigateToIndex(newIndex);
  };

  return (
    <div className="h-full flex-1 min-h-0 border-2 border-cyan-400/40 rounded-lg overflow-hidden">
      <div className="h-full flex flex-col p-4 space-y-4">
        {/* Image / evidence display */}
        <div className="relative group bg-slate-700/50 border-2 border-cyan-400/20 rounded-lg flex items-center justify-center overflow-hidden">
          {currentItem.type === "image" ? (
            <img
              key={`image-${currentIndex}`}
              src={currentItem.image}
              alt={currentItem.title}
              className="max-w-full object-contain"
            />
          ) : currentItem.type === "video" ? (
            <video
              key={`video-${currentIndex}-${currentItem.video}`}
              ref={videoRef}
              src={currentItem.video}
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              className="max-w-full object-contain"
              playsInline
              disablePictureInPicture
              preload="auto"
              onTimeUpdate={() => {
                // Keep media time ref in sync
                if (videoRef.current) {
                  const time = videoRef.current.currentTime;
                  mediaCurrentTimeRef.current = time;
                  setMediaCurrentTime(time);
                }
              }}
              onPause={() => {
                // Update time ref when user pauses (will be saved on unmount)
                if (videoRef.current) {
                  const time = videoRef.current.currentTime;
                  mediaCurrentTimeRef.current = time;
                  setMediaCurrentTime(time);
                }
              }}
              onEnded={() => {
                // Reset to beginning when video ends
                if (videoRef.current) {
                  videoRef.current.currentTime = 0;
                  clearMediaTime(fileId, currentIndex);
                }
              }}
            />
          ) : currentItem.type === "pdf" ? (
            <PDFPreview pdfUrl={currentItem.pdf} title={currentItem.title} />
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
                  // Capture current video time and pause
                  if (currentItem.type === "video" && videoRef.current) {
                    const time = videoRef.current.currentTime;
                    setMediaCurrentTime(time);
                    mediaCurrentTimeRef.current = time;
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
                onClick={() => navigateToIndex(i)}
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
            imageSrc={
              currentItem.type === "image" ? currentItem.image : undefined
            }
            videoSrc={
              currentItem.type === "video" ? currentItem.video : undefined
            }
            videoCurrentTime={
              currentItem.type === "video" ? mediaCurrentTime : undefined
            }
            onClose={(finalVideoTime) => {
              setIsContentModalOpen(false);
              // Sync panel video to modal's final time
              if (
                currentItem.type === "video" &&
                videoRef.current &&
                finalVideoTime !== undefined
              ) {
                const time = finalVideoTime;
                videoRef.current.currentTime = time;
                setMediaCurrentTime(time);
                // Save to localStorage
                saveMediaTime(fileId, currentIndex, time);
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
