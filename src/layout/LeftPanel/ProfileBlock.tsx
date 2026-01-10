import { MapPin, GraduationCap, BookOpen, Calendar, Brain } from "lucide-react";
import { profile } from "../../data/profile";

function FileRow({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-2">
        <div className={`${highlight ? "text-purple-400" : "text-cyan-400"}`}>
          {icon}
        </div>
        <span className="text-gray-500 text-xs">{label}:</span>
      </div>
      <span
        className={`${highlight ? "text-purple-300" : "text-cyan-100"} text-xs`}
      >
        {value}
      </span>
    </div>
  );
}

export default function ProfileBlock({ bio }: { bio: string }) {
  return (
    <>
      {/* Basic Info */}
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

      {/* Separator */}
      <div className="flex items-center gap-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <span className="text-cyan-400/50 text-xs">PROFILE</span>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      </div>

      {/* Bio with Typewriter Effect */}
      <div className="bg-slate-950/50 rounded p-4 border border-cyan-400/20">
        <div className="text-gray-300 text-xs leading-relaxed">{bio}</div>
      </div>

      {/* File Footer */}
      <div className="pt-3 border-t border-cyan-400/20 flex justify-between text-[0.65rem] text-cyan-400/40">
        <span>CLASSIFIED: LEVEL 5</span>
        <span>ID: KAY-2026-MIT</span>
      </div>
    </>
  );
}
