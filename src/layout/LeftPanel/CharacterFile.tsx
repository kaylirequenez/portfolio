import { useEffect, useState } from "react";
import { profile } from "../../data/profile";
import {
  FileText,
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Brain,
} from "lucide-react";
import { FileRow } from "./FileRow";

export function CharacterFile() {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < profile.bio.length) {
      const timeout = setTimeout(() => {
        setTypedText(profile.bio.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  return (
    <div className="relative flex-shrink-0">
      <div className="flex items-start mb-[-2px] z-10 relative">
        <div className="bg-gradient-to-b from-cyan-500/30 to-cyan-500/20 border-2 border-cyan-400/50 border-b-0 rounded-t-lg px-6 py-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-300" />
          <span className="text-cyan-300 uppercase tracking-wider text-sm">
            Character_File.dat
          </span>
        </div>
      </div>

      <div className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg rounded-tl-none shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 border-b border-cyan-400/30">
          <div className="flex items-center justify-end">
            <div className="text-cyan-300/60 text-xs font-mono">
              ACCESS: GRANTED
            </div>
          </div>
        </div>

        <div className="p-6 space-y-5 font-mono text-sm">
          <div className="space-y-3">
            <FileRow
              label="HOMELAND"
              value={profile.homeland}
              icon={<MapPin className="w-4 h-4" />}
            />
            <FileRow
              label="INSTITUTION"
              value={profile.institution}
              icon={<GraduationCap className="w-4 h-4" />}
            />
            <FileRow
              label="DEGREE"
              value={profile.degree}
              icon={<BookOpen className="w-4 h-4" />}
            />
            <FileRow
              label="MINOR"
              value={profile.minor}
              icon={<BookOpen className="w-4 h-4" />}
            />
            <FileRow
              label="CLASS"
              value={profile.class}
              icon={<Calendar className="w-4 h-4" />}
            />
            <FileRow
              label="INTEL"
              value={profile.intel}
              icon={<Brain className="w-4 h-4" />}
              highlight
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <span className="text-cyan-400/50 text-xs">PROFILE</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>

          <div className="bg-slate-950/50 rounded p-4 border border-cyan-400/20">
            <div className="text-gray-300 text-xs leading-relaxed">
              {typedText}
              {currentIndex < profile.bio.length && (
                <span
                  className="inline-block w-2 h-3 bg-cyan-400 ml-0.5"
                  style={{
                    animation: "blink 1s step-end infinite",
                  }}
                />
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-cyan-400/20 flex justify-between text-[0.65rem] text-cyan-400/40">
            <span>CLASSIFIED: LEVEL 5</span>
            <span>ID: KAY-2026-MIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
