import { useEffect, useState } from "react";
import { CharacterFile } from "../layout/LeftPanel/CharacterFile";
import { profile } from "../data/profile";
import StatusBadge from "./StatusBadge";
import DialogueWheel from "./DialogueWheel";
import CollapsibleSection from "./CollapsibleSection";
import SkillBar from "./SkillBar";
import LanguageChip from "./LanguageChip";
import InventorySlot from "../layout/InventoryPanel/InventorySlot";
import Slider from "react-slick";

interface Skill {
  name: string;
  mastery: number;
}

interface Language {
  name: string;
  level: number;
}

interface InventoryItem {
  equipped: boolean;
  [key: string]: unknown;
}

export function CharacterDetailView() {
  const [openSections, setOpenSections] = useState<string[]>([
    "skills",
    "languages",
    "inventory",
  ]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    touchThreshold: 10,
    adaptiveHeight: true,
  };

  const leftPanel = (
    <div className="flex flex-col min-h-full overflow-auto px-2 pb-4">
      <CharacterFile />
      <div className="space-y-2 flex-shrink-0 mt-3">
        <button className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📁</span>
            <span>Archives</span>
          </div>
          <span className="text-cyan-400/50">›</span>
        </button>
        <button className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">⚙️</span>
            <span>Operations</span>
          </div>
          <span className="text-cyan-400/50">›</span>
        </button>
      </div>
    </div>
  );

  const centerPanel = (
    <div className="flex flex-col gap-3 min-h-full justify-start items-center overflow-auto px-2 pb-4">
      <div className="text-center space-y-1 flex-shrink-0">
        <div className="relative inline-block">
          <h1
            className="absolute text-2xl lg:text-4xl uppercase tracking-widest font-mono select-none"
            style={{
              fontWeight: "bold",
              left: "3px",
              top: "3px",
              letterSpacing: "0.2em",
              color: "#064e3b",
              WebkitTextStroke: "1px #064e3b",
              zIndex: 0,
            }}
          >
            {profile.name}
          </h1>
          <h1
            className="relative text-2xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-widest font-mono select-none"
            style={{
              fontWeight: "bold",
              letterSpacing: "0.2em",
              filter: "drop-shadow(0 0 20px rgba(16, 185, 129, 0.6))",
              zIndex: 1,
            }}
          >
            {profile.name}
          </h1>
        </div>
        <div className="text-emerald-300 uppercase tracking-wider font-mono text-xs">
          {profile.title}
        </div>
      </div>

      <div className="relative flex items-end justify-center h-56 flex-shrink-0 cursor-pointer group">
        <div className="absolute bottom-0 w-64 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full blur-sm" />
        <div className="relative h-full flex items-end justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-transparent to-transparent rounded-lg blur-3xl" />
          <img
            src="../assets/avatar_img.png"
            alt="Character"
            className="relative h-full w-auto object-contain z-10 group-hover:scale-105 transition-transform"
            style={{
              filter: "drop-shadow(0 0 30px rgba(16, 185, 129, 0.6))",
              maxHeight: "220px",
            }}
          />
          <div className="absolute top-0 left-0 w-12 h-12 border-l-2 border-t-2 border-emerald-400/50 -translate-x-6 -translate-y-2" />
          <div className="absolute top-0 right-0 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50 translate-x-6 -translate-y-2" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-l-2 border-b-2 border-emerald-400/50 -translate-x-6 translate-y-2" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50 translate-x-6 translate-y-2" />
        </div>
      </div>

      <div className="flex gap-2 justify-center flex-shrink-0">
        <StatusBadge label="ACTIVE" color="cyan" />
        <StatusBadge label="RECRUITING" color="cyan" />
      </div>

      <div className="relative flex-shrink-0 mt-2">
        <DialogueWheel comms={profile.comms} />
      </div>
    </div>
  );

  const rightPanel = (
    <div className="flex flex-col gap-2 min-h-full overflow-auto px-2 pb-4">
      <CollapsibleSection
        title="SKILLS_MASTERY.exe"
        isOpen={openSections.includes("skills")}
        onToggle={() => toggleSection("skills")}
        color="cyan"
      >
        <div className="space-y-3 p-4">
          {profile.skills.map((skill: Skill, i: number) => (
            <SkillBar key={i} name={skill.name} mastery={skill.mastery} />
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="languages.json"
        isOpen={openSections.includes("languages")}
        onToggle={() => toggleSection("languages")}
        color="cyan"
      >
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3">
            {profile.languages.map((lang: Language, i: number) => (
              <LanguageChip key={i} name={lang.name} level={lang.level} />
            ))}
          </div>
        </div>
      </CollapsibleSection>

      <CollapsibleSection
        title="inventory.inv"
        isOpen={openSections.includes("inventory")}
        onToggle={() => toggleSection("inventory")}
        color="cyan"
      >
        <div className="p-3">
          <div className="grid grid-cols-4 gap-2 lg:gap-3">
            {profile.inventory.map((item: InventoryItem, i: number) => (
              <InventorySlot
                key={i}
                icon={item.icon as string}
                name={item.name as string}
                description={item.description as string}
                equipped={item.equipped}
                index={i}
              />
            ))}
          </div>
          <div className="mt-2 pt-2 border-t border-cyan-400/30">
            <div className="text-cyan-300 text-[0.6rem] uppercase tracking-wider text-center font-mono">
              {
                profile.inventory.filter((i: InventoryItem) => i.equipped)
                  .length
              }{" "}
              / {profile.inventory.length} EQUIPPED
            </div>
          </div>
        </div>
      </CollapsibleSection>
    </div>
  );

  return (
    <div className="size-full bg-gradient-to-br from-slate-950 via-emerald-950 to-slate-950 overflow-hidden">
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
        @keyframes pulse-glow { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        @keyframes rotateAvatar { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
      `}</style>

      <div className="relative h-full p-4 flex items-center pt-8 pb-16">
        {isMobile ? (
          <div className="w-full h-full character-slider">
            <Slider {...sliderSettings}>
              <div>
                <div className="h-[calc(100vh-10rem)]">{leftPanel}</div>
              </div>
              <div>
                <div className="h-[calc(100vh-10rem)]">{centerPanel}</div>
              </div>
              <div>
                <div className="h-[calc(100vh-10rem)]">{rightPanel}</div>
              </div>
            </Slider>
          </div>
        ) : (
          <div className="w-full grid grid-cols-12 gap-4 h-full items-start">
            <div className="col-span-4 h-full">{leftPanel}</div>
            <div className="col-span-4 h-full">{centerPanel}</div>
            <div className="col-span-4 h-full">{rightPanel}</div>
          </div>
        )}
      </div>
    </div>
  );
}
