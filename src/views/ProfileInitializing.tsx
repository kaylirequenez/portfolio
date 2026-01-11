import { useEffect, useState } from "react";
import { profile } from "../data/profile";

interface ProfileInitializingProps {
  onComplete: () => void;
}

export default function ProfileInitializing({
  onComplete,
}: ProfileInitializingProps) {
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState("INITIALIZING");

  useEffect(() => {
    // Skip on any key press
    const handleKeyPress = () => {
      onComplete();
    };
    window.addEventListener("keydown", handleKeyPress);

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    // Glitch text effect
    const glitchTexts = [
      "INITIALIZING",
      "ACCESSING DATABASE",
      "LOADING PROFILE",
      "DECRYPTING DATA",
      "SYNCING RECORDS",
    ];
    let glitchIndex = 0;
    const glitchInterval = setInterval(() => {
      glitchIndex = (glitchIndex + 1) % glitchTexts.length;
      setGlitchText(glitchTexts[glitchIndex]);
    }, 500);

    // Auto-complete after 2.5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(progressInterval);
      clearInterval(glitchInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="size-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden flex items-center justify-center">
      {/* Grid overlay */}
      <div className="fixed inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(16, 185, 129, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.3) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
            animation: "gridPulse 2s ease-in-out infinite",
          }}
        />
      </div>

      <style>{`
        @keyframes gridPulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes textFlicker {
          0%, 100% { opacity: 1; }
          95% { opacity: 0.95; }
        }
      `}</style>

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Profile name with glitch */}
        <div className="text-center space-y-2">
          <div className="relative inline-block">
            <h1
              className="absolute text-3xl lg:text-5xl uppercase tracking-widest font-mono select-none"
              style={{
                fontWeight: "bold",
                left: "0px",
                top: "6px",
                letterSpacing: "0.2em",
                color: "#0a3a2a",
                opacity: 0.7,
                zIndex: 0,
              }}
            >
              {profile.name}
            </h1>
            <h1
              className="relative text-3xl lg:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-widest font-mono select-none"
              style={{
                fontWeight: "bold",
                letterSpacing: "0.2em",
                textShadow:
                  "0 0 40px rgba(16, 185, 129, 1), 0 0 60px rgba(16, 185, 129, 0.6)",
                filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.8))",
                zIndex: 1,
                animation: "textFlicker 3s infinite",
              }}
            >
              {profile.name}
            </h1>
          </div>
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-cyan-300 font-mono text-sm uppercase tracking-widest">
            {glitchText}
            <span className="animate-pulse">...</span>
          </div>

          {/* Progress bar */}
          <div className="w-80 max-w-full h-2 bg-slate-900/50 border border-cyan-400/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-100 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
            </div>
          </div>

          {/* Progress percentage */}
          <div className="text-emerald-300/70 font-mono text-xs tabular-nums">
            {progress}%
          </div>
        </div>

        {/* System info */}
        <div className="font-mono text-[0.65rem] text-cyan-400/50 uppercase tracking-wider space-y-1 text-center">
          <div>
            [ SYSTEM ID: {profile.name.replace(/\s/g, "_").toUpperCase()} ]
          </div>
          <div>[ ACCESS LEVEL: AUTHORIZED ]</div>
          <div className="text-emerald-400/50">[ STATUS: ACTIVE ]</div>
        </div>
      </div>
    </div>
  );
}
