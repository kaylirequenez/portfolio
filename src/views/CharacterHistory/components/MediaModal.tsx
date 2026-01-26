import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface MediaModalProps {
  onClose: () => void;
  title: string;
  imageSrc?: string;
  videoSrc?: string;
  videoCurrentTime?: number;
}

export default function MediaModal({
  onClose,
  title,
  imageSrc,
  videoSrc,
  videoCurrentTime,
}: MediaModalProps) {
  const [isRotated, setIsRotated] = useState(false);
  const isImage = Boolean(imageSrc);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set video time when modal opens if we have a current time
  useEffect(() => {
    if (videoRef.current && videoCurrentTime !== undefined && videoCurrentTime > 0) {
      videoRef.current.currentTime = videoCurrentTime;
    }
  }, [videoCurrentTime]);

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop ONLY */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative flex flex-col items-center transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
          style={{
            transform: isRotated ? "rotate(90deg)" : "none",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 w-8 h-8 flex items-center justify-center
              bg-slate-800/80 border border-cyan-400/40 rounded
              text-cyan-300 hover:bg-slate-700 transition-colors"
            title="Close"
          >
            ✕
          </button>

          {/* Rotate */}
          {isImage && (
            <button
              onClick={() => setIsRotated((v) => !v)}
              className="absolute -top-12 left-0 flex items-center gap-2
                bg-slate-800/80 border border-cyan-400/40 rounded
                px-3 py-2 text-xs font-mono text-cyan-300
                hover:bg-cyan-400/20 transition-all"
              title="Rotate content"
            >
              {isRotated ? "Rotate back" : "Rotate"}
            </button>
          )}

          {/* Media */}
          {isImage ? (
            <img
              src={imageSrc}
              alt={title}
              className="object-contain"
              style={{
                maxWidth: isRotated ? "90vh" : "90vw",
                maxHeight: isRotated ? "90vw" : "85vh",
              }}
            />
          ) : (
            <video
              ref={videoRef}
              src={videoSrc}
              controls
              controlsList="nodownload nofullscreen noremoteplayback"
              autoPlay={videoCurrentTime === undefined || videoCurrentTime === 0}
              className="object-contain"
              style={{
                maxWidth: "90vw",
                maxHeight: "85vh",
              }}
              disablePictureInPicture
              playsInline
            />
          )}

          {/* Title */}
          <div className="mt-4 text-sm font-mono text-cyan-300 uppercase tracking-wider text-center">
            {title}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
