import TerminalHeader from "../../ui/TerminalHeader";
import LanguageChip from "../../ui/LanguageChip";
import { profile } from "../../data/profile";

export default function LanguagesPanel() {
  return (
    <div className="flex-shrink-0">
      <TerminalHeader title="LANGUAGES_PROFICIENCY.log" />
      <div className="bg-black/60 backdrop-blur-sm border-2 border-cyan-400/50 rounded-lg p-4 mt-2 shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        <div className="grid grid-cols-2 gap-2">
          {profile.languages.map(
            (lang: { name: string; level: number }, index: number) => (
              <LanguageChip key={index} name={lang.name} level={lang.level} />
            )
          )}
        </div>
      </div>
    </div>
  );
}
