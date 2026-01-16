import { useEffect, useState } from "react";
import {
  MapPin,
  GraduationCap,
  BookOpen,
  Calendar,
  Brain,
  FileText,
} from "lucide-react";
import { profile } from "../../../data/profile";

function FileRow({
  label,
  value,
  icon,
  highlight = false,
  tooltip,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
  tooltip?: string;
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="flex items-center justify-between relative group">
      <div className="flex items-center gap-2">
        <div className={highlight ? "text-purple-400" : "text-cyan-400"}>
          {icon}
        </div>
        <span className="text-gray-500 text-xs font-mono">{label}:</span>
      </div>

      <span
        className={`${
          highlight ? "text-purple-300" : "text-cyan-100"
        } text-xs cursor-help font-mono`}
        onMouseEnter={() => tooltip && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={() => tooltip && setShowTooltip((v) => !v)} // mobile support
      >
        {value}
      </span>

      {tooltip && showTooltip && (
        <div className="absolute top-full right-0 mt-2 z-10 bg-purple-950/95 border-2 border-purple-400/60 rounded px-3 py-2 text-purple-200 text-xs whitespace-nowrap shadow-lg">
          {tooltip}
        </div>
      )}
    </div>
  );
}

interface CharacterFileProps {
  bioTypedIndex: number | null;
  setBioTypedIndex: (i: number) => void;
}

export default function CharacterFile({
  bioTypedIndex,
  setBioTypedIndex,
}: CharacterFileProps) {
  const bio = profile.bio;
  const [currentIndex, setCurrentIndex] = useState(bioTypedIndex ?? 0);
  const [typedText, setTypedText] = useState(bio.slice(0, bioTypedIndex ?? 0));

  useEffect(() => {
    if (currentIndex < bio.length) {
      const timeout = setTimeout(() => {
        setTypedText(bio.slice(0, currentIndex + 1));
        setCurrentIndex((i) => {
          const next = i + 1;
          setBioTypedIndex(next); // 👈 persist progress
          return next;
        });
      }, 30);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, bio, setBioTypedIndex]);

  return (
    <div className="relative">
      {/* File Tab */}
      <div className="flex items-start mb-[-2px] z-10 relative">
        <div className="bg-gradient-to-b from-cyan-500/30 to-cyan-500/20 border-2 border-cyan-400/50 border-b-0 rounded-t-lg px-6 py-2 flex items-center gap-2">
          <FileText className="w-4 h-4 text-cyan-300" />
          <span className="text-cyan-300 uppercase tracking-wider text-sm font-mono">
            Character_File.dat
          </span>
        </div>
      </div>

      {/* File Body */}
      <div className="bg-black/70 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg rounded-tl-none shadow-[0_0_30px_rgba(34,211,238,0.3)] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 p-4 border-b border-cyan-400/30">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-cyan-300/60 text-xs font-mono">
              ACCESS: GRANTED
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 font-mono text-sm">
          {/* Metadata */}
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
              tooltip="GPA 4.8 / 5 normalized"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <span className="text-cyan-400/50 text-xs font-mono">PROFILE</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
          </div>

          {/* Bio */}
          <div className="bg-slate-950/50 rounded p-4 border border-cyan-400/20">
            <div className="text-gray-300 text-xs leading-relaxed">
              {typedText}
              {currentIndex < bio.length && (
                <span
                  className="inline-block w-2 h-3 bg-cyan-400 ml-0.5"
                  style={{ animation: "blink 1s step-end infinite" }}
                />
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-cyan-400/20 flex justify-between text-[0.65rem] text-cyan-400/40 font-mono">
            <span>CLASSIFIED: LEVEL 5</span>
            <span>ID: KAY-2026-MIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
