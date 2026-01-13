import { useState, useEffect, useRef } from "react";
import { profile } from "../data/profile";
import EvidencePanel from "./Operations/EvidencePanel";
import MissionFile from "./Operations/MissionFile";
import MissionIndex from "./Operations/MissionIndex";
import Slider from "react-slick";

type LayoutMode = "side-by-side" | "full-screen" | "bottom-evidence";

export default function OperationsPage({ onBack }: { onBack?: () => void }) {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>("side-by-side");
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 1024);
  const [mobileSlideIndex, setMobileSlideIndex] = useState(0);
  const sliderRef = useRef<Slider>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const missions = profile.experience.map((exp) => ({
    id: exp.company.toLowerCase().replace(/\s+/g, "-"),
    company: exp.company,
    role: exp.role,
    dates: exp.dates,
    mission: exp.mission,
    system: exp.system,
    impact: exp.impact,
    evidence: exp.evidence,
    tools: exp.tools,
    takeaways: exp.takeaways,
  }));

  const currentMission = missions.find((m) => m.id === selectedMission);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMinimize = () => {
    setLayoutMode((prev) => {
      if (prev === "side-by-side") return "bottom-evidence";
      if (prev === "bottom-evidence") return "side-by-side";
      return prev;
    });
  };

  const handleMaximize = () => {
    setLayoutMode((prev) => {
      if (prev === "side-by-side") return "full-screen";
      if (prev === "full-screen") return "side-by-side";
      if (prev === "bottom-evidence") return "full-screen";
      return prev;
    });
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only handle horizontal scrolling (two-finger swipe on trackpad)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      e.preventDefault();

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Debounce to avoid multiple rapid triggers
      wheelTimeoutRef.current = setTimeout(() => {
        if (e.deltaX > 0 && mobileSlideIndex < 1) {
          // Swipe left (move to next slide)
          setMobileSlideIndex(1);
          sliderRef.current?.slickGoTo(1);
        } else if (e.deltaX < 0 && mobileSlideIndex > 0) {
          // Swipe right (move to previous slide)
          setMobileSlideIndex(0);
          sliderRef.current?.slickGoTo(0);
        }
      }, 50);
    }
  };

  return (
    <div className="size-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <style>{`
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideOutToBottom {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(20px);
          }
        }
        .mission-expanding {
          animation: slideInFromBottom 0.4s ease-out;
        }
        .mission-collapsing {
          animation: slideOutToBottom 0.4s ease-out;
        }
      `}</style>

      <div className="relative h-full flex flex-col p-4">
        {/* Header */}
        <div className="flex-shrink-0 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="group flex items-center gap-1.5 px-2 py-1 bg-slate-800/50 border border-cyan-400/30 rounded text-cyan-300 hover:bg-cyan-400/20 transition-all font-mono text-xs uppercase tracking-wider"
                  title="Back to Character"
                >
                  <span className="text-sm">←</span>
                  <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap">
                    Character
                  </span>
                </button>
              )}
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-cyan-400/10 blur-sm"></div>
                <h1
                  className="relative text-sm lg:text-base text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-wider font-mono select-none px-3 py-1.5 border border-cyan-400/40 bg-slate-900/50"
                  style={{
                    fontWeight: "bold",
                    textShadow:
                      "0 0 20px rgba(16, 185, 129, 0.8), 0 0 30px rgba(16, 185, 129, 0.4)",
                    filter: "drop-shadow(0 0 15px rgba(16, 185, 129, 0.6))",
                  }}
                >
                  &gt; OPERATIONS.LOG
                </h1>
              </div>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-cyan-400/70">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Tab navigation for mobile when mission selected */}
          {isMobile && selectedMission && layoutMode === "side-by-side" && (
            <div className="flex-shrink-0 pb-3">
              <div className="flex gap-2 items-center">
                {/* Exit button */}
                <button
                  onClick={() => setSelectedMission(null)}
                  className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-red-500/20 border border-red-400/50 rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
                  title="Close Mission"
                >
                  ✕
                </button>

                {/* Tab switcher */}
                <div className="flex-1 flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-lg p-1 border border-cyan-400/30">
                  <button
                    onClick={() => {
                      setMobileSlideIndex(0);
                      sliderRef.current?.slickGoTo(0);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
                      mobileSlideIndex === 0
                        ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                        : "text-cyan-300/50 hover:text-cyan-300/80"
                    }`}
                  >
                    <span className="text-sm">📄</span>
                    <span>Mission</span>
                  </button>
                  <button
                    onClick={() => {
                      setMobileSlideIndex(1);
                      sliderRef.current?.slickGoTo(1);
                    }}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
                      mobileSlideIndex === 1
                        ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                        : "text-cyan-300/50 hover:text-cyan-300/80"
                    }`}
                  >
                    <span className="text-sm">🔍</span>
                    <span>Evidence</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Content section (top) */}
          <div className="flex-1 flex min-h-0">
            {!selectedMission ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-cyan-300/50 font-mono text-sm text-center">
                  {missions.length === 0
                    ? "No mission files available"
                    : "SELECT A MISSION FILE"}
                </div>
              </div>
            ) : layoutMode === "side-by-side" ? (
              isMobile ? (
                // Mobile: Swipeable 2-panel layout
                <div
                  className="flex-1 flex flex-col min-h-0 relative w-full"
                  onWheel={handleWheel}
                >
                  <div className="flex-1 min-h-0">
                    <Slider
                      ref={sliderRef}
                      dots={false}
                      infinite={false}
                      speed={300}
                      slidesToShow={1}
                      slidesToScroll={1}
                      arrows={false}
                      swipe={true}
                      touchThreshold={10}
                      beforeChange={(_current: number, next: number) => {
                        setMobileSlideIndex(next);
                      }}
                    >
                      {/* Panel 1: Mission File */}
                      <div>
                        <div className="h-[calc(100vh-12rem)] px-2 flex justify-center items-center">
                          {currentMission && (
                            <MissionFile
                              mission={currentMission}
                              onClose={() => setSelectedMission(null)}
                              onMinimize={handleMinimize}
                              onMaximize={handleMaximize}
                              isMobile={true}
                            />
                          )}
                        </div>
                      </div>

                      {/* Panel 2: Evidence */}
                      <div>
                        <div className="h-[calc(100vh-12rem)] px-2">
                          <div className="h-full bg-slate-800/30 border border-cyan-400/20 rounded-lg overflow-y-auto">
                            {currentMission && (
                              <EvidencePanel
                                evidence={currentMission.evidence}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Slider>
                  </div>

                  {/* Panel indicator dots */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    <button
                      onClick={() => {
                        setMobileSlideIndex(0);
                        sliderRef.current?.slickGoTo(0);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        mobileSlideIndex === 0
                          ? "bg-emerald-400 w-4"
                          : "bg-cyan-400/30"
                      }`}
                      aria-label="Mission panel"
                    />
                    <button
                      onClick={() => {
                        setMobileSlideIndex(1);
                        sliderRef.current?.slickGoTo(1);
                      }}
                      className={`w-2 h-2 rounded-full transition-all ${
                        mobileSlideIndex === 1
                          ? "bg-emerald-400 w-4"
                          : "bg-cyan-400/30"
                      }`}
                      aria-label="Evidence panel"
                    />
                  </div>
                </div>
              ) : (
                // Desktop: Side-by-side layout
                <div className="flex gap-4 min-h-0 flex-1">
                  {/* Center: Mission details */}
                  <div className="flex-1 flex justify-center items-center min-h-0">
                    {currentMission && (
                      <MissionFile
                        mission={currentMission}
                        onClose={() => setSelectedMission(null)}
                        onMinimize={handleMinimize}
                        onMaximize={handleMaximize}
                        isMobile={false}
                      />
                    )}
                  </div>

                  {/* Right: Evidence panel (equal width) */}
                  <div className="flex-1 bg-slate-800/30 border-l border-cyan-400/20 overflow-y-auto">
                    {currentMission && (
                      <EvidencePanel evidence={currentMission.evidence} />
                    )}
                  </div>
                </div>
              )
            ) : layoutMode === "full-screen" ? (
              <div className="flex-1 flex flex-col items-center justify-center">
                {currentMission && (
                  <MissionFile
                    mission={currentMission}
                    onClose={() => setSelectedMission(null)}
                    onMinimize={handleMinimize}
                    onMaximize={handleMaximize}
                    isFullScreen
                  />
                )}
              </div>
            ) : (
              /* bottom-evidence - evidence full screen with mission file floating at bottom right */
              <div className="flex-1 flex flex-col min-h-0 relative">
                {/* Full screen evidence */}
                <div className="flex-1 bg-slate-800/30 border border-cyan-400/20 overflow-y-auto">
                  {currentMission && (
                    <EvidencePanel evidence={currentMission.evidence} />
                  )}
                </div>

                {/* Mission file floating at bottom right - minimized to tiny button */}
                {currentMission && (
                  <button
                    onClick={handleMinimize}
                    className="absolute bottom-4 right-4 px-3 py-1 bg-slate-800/80 border border-cyan-400/40 rounded text-xs font-mono text-cyan-300 hover:bg-slate-700 transition-colors"
                  >
                    MISSION FILE
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Mission cards (bottom) - only show when no mission selected */}
          {!selectedMission && (
            <div className="flex-shrink-0 pt-4 border-t border-cyan-400/20">
              <div className="w-64">
                <MissionIndex
                  missions={missions}
                  onSelectMission={setSelectedMission}
                  selectedMission={selectedMission}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
