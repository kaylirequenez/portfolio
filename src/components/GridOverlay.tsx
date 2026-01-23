interface GridOverlayProps {
  /** Opacity of the grid overlay (default: 0.2) */
  opacity?: number;
  /** Whether to animate the grid (default: false) */
  animated?: boolean;
  /** Grid cell size in pixels (default: 50) */
  cellSize?: number;
  /** Grid line color opacity (default: 0.3) */
  lineOpacity?: number;
}

export default function GridOverlay({
  opacity = 0.2,
  animated = false,
  cellSize = 50,
  lineOpacity = 0.3,
}: GridOverlayProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, ${lineOpacity}) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, ${lineOpacity}) 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          ...(animated && {
            animation: "gridPulse 2s ease-in-out infinite",
          }),
        }}
      />
    </div>
  );
}
