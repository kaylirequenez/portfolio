import SkillsPanel from "./SkillsPanel";
import LanguagesPanel from "./LanguagesPanel";

export default function RightPanel() {
  return (
    <div className="flex flex-col gap-4">
      <SkillsPanel />
      <LanguagesPanel />
    </div>
  );
}
