import GlitchHeader from "../../ui/GlitchHeader";
import SkillBar from "../../ui/SkillBar";
import { profile } from "../../data/profile";

export default function SkillsPanel() {
  return (
    <div className="flex-shrink-0">
      <GlitchHeader title="SKILLS_MASTERY.exe" />
      <div className="bg-black/60 backdrop-blur-sm border-2 border-emerald-400/50 rounded-lg p-4 mt-2 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] relative overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent pointer-events-none"
          style={{ animation: "scanline 4s linear infinite" }}
        />
        {profile.skills.map(
          (skill: { name: string; mastery: number }, index: number) => (
            <SkillBar key={index} name={skill.name} mastery={skill.mastery} />
          )
        )}
      </div>
    </div>
  );
}
