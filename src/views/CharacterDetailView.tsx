import { useEffect, useState, useRef } from "react";
import { profile } from "../data/profile";
import StatusBadge from "./CharacterDetail/StatusBadge";
import DialogueWheel from "./CharacterDetail/DialogueWheel";
import CollapsibleSection from "./CharacterDetail/CollapsibleSection";
import SkillBar from "./CharacterDetail/SkillBar";
import LanguageChip from "./CharacterDetail/LanguageChip";
import Slider from "react-slick";
import InventorySlot from "./CharacterDetail/InventorySlot";
import CharacterSheet from "./CharacterDetail/CharacterSheet";
import { Canvas } from "@react-three/fiber";
import Avatar from "../avatar/Avatar";
import AvatarCamera from "../avatar/AvatarCamera";

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

export function CharacterDetailView({
  onBack,
  onOpenOperations,
}: {
  onBack?: () => void;
  onOpenOperations?: () => void;
}) {
  const [openSections, setOpenSections] = useState<string[]>([
    "skills",
    "languages",
    "inventory",
  ]);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState(1); // Start at avatar tab
  const sliderRef = useRef<Slider>(null);
  const wheelTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile((prev) => {
        if (prev !== mobile) {
          // entering mobile → snap to avatar
          if (mobile) {
            setActiveTab((tab) => {
              if (tab !== 1) {
                sliderRef.current?.slickGoTo(1);
                return 1;
              }
              return tab;
            });
          }
          return mobile;
        }
        return prev;
      });
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

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    sliderRef.current?.slickGoTo(index);
  };

  const handleWheel = (e: React.WheelEvent) => {
    // Only handle horizontal scrolling (two-finger swipe on trackpad)
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
      e.preventDefault();

      // Clear existing timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Debounce to avoid multiple rapid triggers
      wheelTimeoutRef.current = setTimeout(() => {
        if (e.deltaX > 0 && activeTab < 2) {
          // Swipe left (move to next tab)
          const nextTab = activeTab + 1;
          setActiveTab(nextTab);
          sliderRef.current?.slickGoTo(nextTab);
        } else if (e.deltaX < 0 && activeTab > 0) {
          // Swipe right (move to previous tab)
          const prevTab = activeTab - 1;
          setActiveTab(prevTab);
          sliderRef.current?.slickGoTo(prevTab);
        }
      }, 50);
    }
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    swipe: true,
    touchThreshold: 10,
    adaptiveHeight: false,
    initialSlide: activeTab,
    beforeChange: (_current: number, next: number) => {
      setActiveTab(next);
    },
  };

  const tabs = [
    { label: "CHARACTER", icon: "📋" },
    { label: "AVATAR", icon: "👤" },
    { label: "SKILLS", icon: "⚡" },
  ];

  const leftPanel = (
    <div className="flex flex-col min-h-full overflow-auto px-2 pb-4">
      <CharacterSheet />
      <div className="space-y-2 flex-shrink-0 mt-3">
        <button className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-base">📁</span>
            <span>Archives</span>
          </div>
          <span className="text-cyan-400/50">›</span>
        </button>
        <button
          onClick={onOpenOperations}
          className="w-full bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 border-2 border-cyan-400/50 rounded-lg px-4 py-2.5 text-cyan-300 font-mono text-xs uppercase tracking-wider hover:bg-cyan-400/30 transition-all flex items-center justify-between"
        >
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
            className="relative text-2xl lg:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-300 to-cyan-300 uppercase tracking-widest font-mono select-none"
            style={{
              fontWeight: "bold",
              letterSpacing: "0.2em",
              textShadow:
                "0 0 30px rgba(16, 185, 129, 1), 0 0 60px rgba(16, 185, 129, 0.6)",
              filter: "drop-shadow(0 0 25px rgba(16, 185, 129, 0.8))",
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

      <div
        className="relative flex items-end justify-center h-[28rem] flex-shrink-0 cursor-pointer group mt-4 lg:mt-8"
        onClick={onBack}
      >
        <div className="absolute bottom-0 w-64 h-2 bg-gradient-to-r from-transparent via-emerald-400 to-transparent rounded-full blur-sm" />
        <div className="relative h-full flex items-end justify-center">
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-transparent to-transparent rounded-lg blur-3xl" />
          <div className="relative z-10 w-80 h-full">
            <Canvas camera={{ fov: 35 }}>
              <AvatarCamera preset="detail" />
              <ambientLight intensity={0.6} />
              <directionalLight position={[2, 2, 2]} intensity={0.8} />
              <Avatar mainView={false} />
            </Canvas>
          </div>
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
        
        .character-slider .slick-slider,
        .character-slider .slick-list,
        .character-slider .slick-track {
          height: 100% !important;
        }
        
        .character-slider .slick-slide > div {
          height: 100%;
        }
        
        .character-slider .slick-slide > div > div {
          height: calc(100vh - 120px);
          overflow-y: auto;
        }
      `}</style>

      <div className="relative h-full flex flex-col">
        {isMobile && (
          <div className="flex-shrink-0 pt-6 px-4 pb-3">
            <div className="flex gap-2 bg-slate-900/50 backdrop-blur-sm rounded-lg p-1 border border-cyan-400/30">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => handleTabChange(index)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-md font-mono text-xs uppercase tracking-wider transition-all ${
                    activeTab === index
                      ? "bg-cyan-500/30 text-cyan-300 border border-cyan-400/50 shadow-lg shadow-cyan-500/20"
                      : "text-cyan-300/50 hover:text-cyan-300/80"
                  }`}
                >
                  <span className="text-sm">{tab.icon}</span>
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        <div
          className={
            isMobile ? "flex-1 overflow-hidden" : "flex-1 overflow-y-auto"
          }
          onWheel={isMobile ? handleWheel : undefined}
        >
          {isMobile ? (
            <div key="mobile-slider" className="h-full character-slider">
              <Slider ref={sliderRef} {...sliderSettings}>
                <div>
                  <div className="px-2">{leftPanel}</div>
                </div>
                <div>
                  <div className="px-2">{centerPanel}</div>
                </div>
                <div>
                  <div className="px-2">{rightPanel}</div>
                </div>
              </Slider>
            </div>
          ) : (
            <div
              key="desktop-grid"
              className="w-full grid grid-cols-12 gap-4 h-full items-start p-4"
            >
              <div className="col-span-4 h-full">{leftPanel}</div>
              <div className="col-span-4 h-full">{centerPanel}</div>
              <div className="col-span-4 h-full">{rightPanel}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
