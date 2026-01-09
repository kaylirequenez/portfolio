export default function AvatarFrame() {
  return (
    <div className="relative w-56 h-72">
      {/* Avatar renders behind, this provides HUD corners */}
      <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-emerald-400 -translate-x-2 -translate-y-2 pointer-events-none" />
      <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-cyan-400 translate-x-2 -translate-y-2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-emerald-400 -translate-x-2 translate-y-2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-cyan-400 translate-x-2 translate-y-2 pointer-events-none" />
    </div>
  );
}
