interface VideoEmbedProps {
  url: string;
}

function getYouTubeId(url: string): string | null {
  // Match youtube.com/watch?v=ID or youtu.be/ID
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getLoomId(url: string): string | null {
  // Match loom.com/share/ID or loom.com/embed/ID
  const match = url.match(/loom\.com\/(?:share|embed)\/([a-f0-9]+)/);
  return match ? match[1] : null;
}

const VideoEmbed = ({ url }: VideoEmbedProps) => {
  const youtubeId = getYouTubeId(url);
  const loomId = getLoomId(url);

  if (youtubeId) {
    return (
      <div className="my-8 overflow-hidden rounded-lg border border-border">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  if (loomId) {
    return (
      <div className="my-8 overflow-hidden rounded-lg border border-border">
        <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.loom.com/embed/${loomId}`}
            title="Loom video"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Fallback: render as a link
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[hsl(var(--brand-blue))] underline underline-offset-4 hover:text-[hsl(var(--brand-blue))/0.8]"
    >
      {url}
    </a>
  );
};

export default VideoEmbed;
