import { createPortal } from "react-dom";

interface PDFModalProps {
  onClose: () => void;
  title: string;
  pdfUrl: string;
}

export default function PDFModal({
  onClose,
  title,
  pdfUrl,
}: PDFModalProps) {
  // Normalize PDF URL - remove /src prefix if present
  const normalizedUrl = pdfUrl.startsWith("/src")
    ? pdfUrl.replace(/^\/src/, "")
    : pdfUrl;

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
            href={normalizedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-4 left-4 flex items-center gap-2
              bg-slate-800/80 border border-cyan-400/40 rounded
              px-3 py-2 text-xs font-mono text-cyan-300
              hover:bg-cyan-400/20 transition-all z-10"
            title="Open PDF in new tab"
            onClick={(e) => e.stopPropagation()}
          >
            <span>🔗</span>
            <span>Open in Tab</span>
          </a>

          {/* PDF - use object tag for better browser compatibility */}
          <object
            data={normalizedUrl}
            type="application/pdf"
            className="w-full h-full border-0 rounded"
            aria-label={`PDF: ${title}`}
          >
            {/* Fallback if object fails */}
            <div className="flex flex-col items-center justify-center gap-4 p-8 text-cyan-300/70">
              <p className="font-mono text-sm uppercase tracking-wider">
                PDF cannot be displayed
              </p>
              <a
                href={normalizedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-cyan-400/20 border border-cyan-400/40 rounded text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-colors"
              >
                Open PDF in new tab
              </a>
            </div>
          </object>

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
