// views/CharacterDetail/panels/RightPanel.tsx
import { useState } from "react";
import { profile } from "../../../data/profile";

import CollapsibleSection from "../components/CollapsibleSection";
import SkillBar from "../components/SkillBar";
import LanguageChip from "../components/LanguageChip";
import InventorySlot from "../components/InventorySlot";

export default function RightPanel() {
  const [openSections, setOpenSections] = useState<string[]>([
    "skills",
    "languages",
    "inventory",
  ]);

  const toggle = (key: string) => {
    setOpenSections((prev) =>
      prev.includes(key) ? prev.filter((s) => s !== key) : [...prev, key]
    );
  };

  return (
    <div className="flex flex-col gap-2 h-full overflow-auto px-2 pb-4">
      <CollapsibleSection
        title="SKILLS_MASTERY.exe"
        isOpen={openSections.includes("skills")}
        onToggle={() => toggle("skills")}
      >
        <div className="space-y-3 p-4">
          {profile.skills.map((skill, i) => (
            <SkillBar
              key={`${skill.name}-${i}`}
              name={skill.name}
              mastery={skill.mastery}
            />
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="languages.json"
        isOpen={openSections.includes("languages")}
        onToggle={() => toggle("languages")}
      >
        <div className="p-4 grid grid-cols-2 gap-3">
          {profile.languages.map((lang, i) => (
            <LanguageChip
              key={`${lang.name}-${i}`}
              name={lang.name}
              level={lang.level}
            />
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="inventory.inv"
        isOpen={openSections.includes("inventory")}
        onToggle={() => toggle("inventory")}
      >
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2">
            {profile.inventory.map((item, i) => (
              <InventorySlot
                key={`${item.name}-${i}`}
                icon={item.icon}
                name={item.name}
                equipped={item.equipped}
                index={i}
              />
            ))}
          </div>

          <div className="mt-2 pt-2 border-t border-cyan-400/30 text-center text-[0.6rem] font-mono uppercase text-cyan-300">
            {profile.inventory.filter((i) => i.equipped).length} /{" "}
            {profile.inventory.length} EQUIPPED
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );
}
