import { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { profile } from "../../data/profile";
import ProfileBlock from "./ProfileBlock";

export default function LeftPanel() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const bio = profile.identity.blurb;

  useEffect(() => {
    if (currentIndex < bio.length) {
      const timeout = setTimeout(() => {
        setTypedText(bio.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, bio]);

  return (
    <div className="relative">
      {/* File Tab */}
      <div className="flex items-start mb-[-2px] z-10 relative">
        <div className="bg-gradient-to-b from-cyan-500/30 to-cyan-500/20 border-2 border-cyan-400/50 border-b-0 rounded-t-lg px-6 py-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-300" />
          <span className="text-cyan-300 uppercase tracking-wider text-sm">
            Character_File.dat
          </span>
        </div>
      </div>

      {/* File Content */}
      <div className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg rounded-tl-none shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden">
        {/* File Header */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 border-b border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-cyan-300/60 text-xs font-mono">
              ACCESS: GRANTED
            </div>
          </div>
        </div>

        {/* File Body */}
        <div className="p-6 space-y-5 font-mono text-sm">
          <ProfileBlock bio={typedText} />
        </div>
      </div>
    </div>
  );
}
