interface VimeoEmbedProps {
  vimeoUrl: string;
  title: string;
  startTime?: number;
}

export default function VimeoEmbed({
  vimeoUrl,
  title,
  startTime = 0,
}: VimeoEmbedProps) {
  // Extract video ID from Vimeo URL
  // Supports formats like:
  // - https://player.vimeo.com/video/1153773353
  // - https://player.vimeo.com/video/1153773353?dnt=1&app_id=122963
  // - https://vimeo.com/1153773353
  const videoIdMatch = vimeoUrl.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  const videoId = videoIdMatch ? videoIdMatch[1] : null;

  if (!videoId) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-cyan-400/50 font-mono text-xs uppercase tracking-wider text-center">
          Invalid Vimeo URL
        </div>
      </div>
    );
  }

  // Create embed URL with responsive parameters and start time
  const timeParam = startTime > 0 ? `#t=${startTime}` : "";
  const embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0&responsive=1${timeParam}`;

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full border-0 rounded"
        style={{ maxWidth: "100%" }}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
