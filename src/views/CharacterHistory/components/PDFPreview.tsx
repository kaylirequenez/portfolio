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
      {/* PDF Preview iframe - scrollable and interactive */}
      <iframe
        src={previewUrl}
        title={`Preview: ${title}`}
        className="w-full h-[60vh] border-0 rounded"
        style={{ minHeight: "400px" }}
        allow="fullscreen"
      />
    </div>
  );
}
