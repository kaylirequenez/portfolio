interface InventorySlotProps {
  icon: string;
  name: string;
  description: string;
  equipped: boolean;
  index: number;
}

export default function InventorySlot({
  icon,
  name,
  description,
  equipped,
  index,
}: InventorySlotProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`relative w-20 h-20 bg-black/80 border-2 ${
          equipped ? "border-amber-400" : "border-gray-600"
        } rounded-lg flex items-center justify-center cursor-pointer hover:border-amber-300 transition-all group`}
        style={{
          animation: equipped ? "float 3s ease-in-out infinite" : "none",
          animationDelay: `${index * 0.2}s`,
        }}
      >
        {equipped && (
          <div
            className="absolute inset-0 bg-amber-400/20 rounded-lg"
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          />
        )}
        <div
          className="text-4xl relative z-10"
          style={{
            filter: equipped
              ? "drop-shadow(0 0 8px rgba(251, 191, 36, 0.8))"
              : "none",
          }}
        >
          {icon}
        </div>
        {equipped && (
          <div
            className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 border-2 border-green-300 rounded-full"
            style={{ animation: "pulse-glow 1s ease-in-out infinite" }}
          />
        )}
      </div>
      <div className="text-amber-300 text-[0.65rem] uppercase tracking-wider font-mono text-center">
        {name}
      </div>
    </div>
  );
}
