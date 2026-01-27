interface PDFPreviewProps {
  pdfUrl: string;
  title: string;
}

export default function PDFPreview({
  pdfUrl,
  title,
}: PDFPreviewProps) {
  // Normalize PDF URL - remove /src prefix if present
  const normalizedUrl = pdfUrl.startsWith("/src")
    ? pdfUrl.replace(/^\/src/, "")
    : pdfUrl;

  // Add #page=1 to show first page, with zoom to fit
  const previewUrl = `${normalizedUrl}#page=1&zoom=page-fit`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Use object tag for better PDF compatibility across browsers */}
      <object
        data={previewUrl}
        type="application/pdf"
        className="w-full h-[60vh] border-0 rounded"
        style={{ minHeight: "400px" }}
        aria-label={`PDF Preview: ${title}`}
      >
        {/* Fallback content if object fails */}
        <div className="flex flex-col items-center justify-center gap-4 p-8 text-cyan-300/70">
          <p className="font-mono text-sm uppercase tracking-wider">
            PDF preview unavailable
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
    </div>
  );
}
