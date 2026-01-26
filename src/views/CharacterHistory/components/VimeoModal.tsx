import { createPortal } from "react-dom";

interface VimeoModalProps {
  onClose: () => void;
  title: string;
  vimeoUrl: string;
  startTime?: number;
}

export default function VimeoModal({
  onClose,
  title,
  vimeoUrl,
  startTime = 0,
}: VimeoModalProps) {
  // Extract video ID from Vimeo URL
  const videoIdMatch = vimeoUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return null;
  }

  // Create embed URL with responsive parameters and start time
  const timeParam = startTime > 0 ? `#t=${startTime}` : "";
  const embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&responsive=1${timeParam}`;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/90" onClick={onClose} />

      {/* Modal content */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div
          className="relative flex flex-col items-center w-full h-full"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center
              bg-slate-800/80 border border-cyan-400/40 rounded
              text-cyan-300 hover:bg-slate-700 transition-colors z-10"
            title="Close"
          >
            ✕
          </button>

          {/* Open in new tab button */}
          <a
            href={vimeoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 flex items-center gap-2
              bg-slate-800/80 border border-cyan-400/40 rounded
              px-3 py-2 text-xs font-mono text-cyan-300
              hover:bg-cyan-400/20 transition-all z-10"
            title="Open on Vimeo (includes MIT course link)"
            onClick={(e) => e.stopPropagation()}
          >
            <span>🔗</span>
            <span>Open in Tab</span>
          </a>

          {/* Vimeo iframe */}
          <iframe
            src={embedUrl}
            title={title}
            className="w-full h-full border-0 rounded"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          />

          {/* Title */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2
            px-4 py-2 bg-slate-800/80 border border-cyan-400/40 rounded
            text-sm font-mono text-cyan-300 uppercase tracking-wider text-center">
            {title}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
