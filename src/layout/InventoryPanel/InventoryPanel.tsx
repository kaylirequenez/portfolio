import InventorySlot from "./InventorySlot";
import { profile } from "../../data/profile";

export default function InventoryPanel() {
  const equippedCount = profile.inventory.filter(
    (item: { equipped: boolean }) => item.equipped
  ).length;

  return (
    <div className="flex-shrink-0">
      <div className="bg-black/60 backdrop-blur-sm border-2 border-amber-400/50 rounded-md px-3 py-2 leading-none">
        <div className="flex items-center gap-2">
          <div className="text-amber-300">❯</div>
          <h2 className="text-xs text-white uppercase tracking-[0.2em]">
            inventory.inv
          </h2>
        </div>
        <div className="h-0.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-transparent rounded-full mt-1" />
      </div>
      <div className="bg-black/60 backdrop-blur-sm border-2 border-amber-400/50 rounded-lg px-6 py-6 mt-2 shadow-[0_0_20px_rgba(251,191,36,0.3)] relative overflow-hidden min-h-[180px]">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent pointer-events-none" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(251,191,36,0.14) 1px, transparent 1px)",
            backgroundSize: "100% 6px",
            animation: "scanline 3s linear infinite",
          }}
        />
        <div className="flex justify-center gap-6">
          {profile.inventory.map(
            (
              item: {
                icon: string;
                name: string;
                description: string;
                equipped: boolean;
              },
              index: number
            ) => (
              <InventorySlot
                key={index}
                icon={item.icon}
                name={item.name}
                description={item.description}
                equipped={item.equipped}
                index={index}
              />
            )
          )}
        </div>
        <div className="mt-4 pt-3 border-t border-amber-400/30">
          <div className="text-amber-300 text-[0.7rem] uppercase tracking-[0.18em] text-center font-mono">
            {equippedCount} / {profile.inventory.length} EQUIPPED
          </div>
        </div>
      </div>
    </div>
  );
}
