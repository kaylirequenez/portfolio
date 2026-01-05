type ClickHintProps = {
  visible: boolean;
};

export default function ClickHint({ visible }: ClickHintProps) {
  return (
    <div
      className={`absolute bottom-12 left-1/2 -translate-x-1/2
      transition-all duration-700
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-center gap-2 text-sm text-neutral-300 animate-pulse pointer-events-none">
        <span>Click the avatar to explore</span>
        <span>👆</span>
      </div>
    </div>
  );
}
