import LeftPanel from "./LeftPanel/LeftPanel";
import RightPanel from "./RightPanel/RightPanel";
import InventoryPanel from "./InventoryPanel/InventoryPanel";

export default function CharacterHUDLayout() {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16,185,129,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16,185,129,0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "gridScroll 20s linear infinite",
          }}
        />
      </div>

      {/* HUD stage (mirrors reference grid) */}
      <div className="relative w-full h-full px-4 lg:px-8 py-6">
        <div className="max-w-7xl mx-auto h-full flex flex-col pointer-events-none">
          {/* Top row centered vertically */}
          <div className="flex-1 flex items-center">
            <div className="grid grid-cols-12 gap-4 items-center w-full">
              <div className="col-span-4 flex justify-start pointer-events-auto">
                <div className="w-full max-w-[420px]">
                  <LeftPanel />
                </div>
              </div>

              {/* Empty center spacer to leave avatar unobstructed */}
              <div className="col-span-4" />

              <div className="col-span-4 flex justify-end pointer-events-auto">
                <div className="w-full max-w-[420px] space-y-4">
                  <RightPanel />
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: inventory close to bottom */}
          <div className="flex justify-center pointer-events-auto pb-6">
            <div className="w-full max-w-[600px]">
              <InventoryPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
