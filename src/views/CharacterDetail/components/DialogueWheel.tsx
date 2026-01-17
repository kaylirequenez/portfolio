import { useState } from "react";
import type { Comm } from "../../../types/profile.types";
import { useInputCapabilities } from "../../../hooks/useInputCapabilities";

type DialogueWheelProps = {
  comms: Comm[];
};

export default function DialogueWheel({ comms }: DialogueWheelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { hasTouch, hasFinePointer } = useInputCapabilities();

  const hasHover = hasFinePointer;
  const isTouchOnly = hasTouch && !hasFinePointer;

  const actionConfig: Record<
    string,
    { icon: string; label: string; color: string }
  > = {
    email: { icon: "📧", label: "EMAIL", color: "#10b981" },
    github: { icon: "🔗", label: "GITHUB", color: "#10b981" },
    linkedin: { icon: "🌐", label: "LINKEDIN", color: "#10b981" },
  };

  const angleByIndex = [-90, 150, 30];

  const wheelOptions = comms.map((comm, index) => {
    const base = actionConfig[comm.action] ?? {
      icon: "💬",
      label: comm.value,
      color: "#10b981",
    };
    return {
      ...base,
      angle: angleByIndex[index] ?? -90 + index * 120,
    };
  });

  const handleOptionClick = (e: React.MouseEvent, index: number) => {
    if (!isTouchOnly) {
      // Desktop / hover-capable: navigate immediately
      return;
    }

    // Touch-only: two-tap behavior
    if (selectedIndex === index) {
      return;
    }

    e.preventDefault();
    setSelectedIndex(index);
  };

  const showLabel = (index: number) => {
    if (hasHover) {
      return hoveredIndex === index;
    }
    return selectedIndex === index;
  };

  return (
    <div className="relative w-full flex flex-col items-center gap-3">
      {/* Toggle button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setHoveredIndex(null);
          setSelectedIndex(null);
        }}
        className="relative group"
      >
        <div
          className="absolute -inset-3 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full blur-xl"
          style={{ opacity: isOpen ? 1 : 0.5 }}
        />
        <div
          className={`relative bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border-2 rounded-full px-6 py-3 transition-all ${
            isOpen ? "border-cyan-400" : "border-cyan-400/50"
          }`}
        >
          <div className="flex items-center gap-2">
            <div
              className={`w-2 h-2 rounded-full bg-cyan-400 ${
                isOpen ? "animate-pulse" : ""
              }`}
            />
            <span className="text-cyan-300 font-mono text-xs uppercase tracking-wider">
              {isOpen ? "SELECT OPTION" : "INITIATE CONTACT"}
            </span>
            <div
              className={`text-cyan-300 text-xs ${
                isOpen ? "rotate-180" : ""
              } transition-transform`}
            >
              ▼
            </div>
          </div>
        </div>
      </button>

      {/* Wheel */}
      {isOpen && (
        <div className="relative w-72 h-72">
          {/* Center hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border-2 border-green-400/30 bg-black/60 flex items-center justify-center z-10">
            <div className="text-2xl">💬</div>
          </div>

          {wheelOptions.map((option, i) => {
            const angleRad = (option.angle * Math.PI) / 180;
            const radius = 110;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            return (
              <a
                key={i}
                href={comms[i].value}
                target={comms[i].action !== "email" ? "_blank" : undefined}
                rel={
                  comms[i].action !== "email"
                    ? "noopener noreferrer"
                    : undefined
                }
                className="absolute top-1/2 left-1/2"
                style={{
                  transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                }}
                onClick={(e) => handleOptionClick(e, i)}
                onMouseEnter={() => {
                  if (hasHover) setHoveredIndex(i);
                }}
                onMouseLeave={() => {
                  if (hasHover) setHoveredIndex(null);
                }}
              >
                {/* Glow */}
                {showLabel(i) && (
                  <div
                    className="absolute -inset-4 rounded-full blur-xl opacity-60"
                    style={{
                      background: `radial-gradient(circle, ${option.color}60 0%, transparent 70%)`,
                      animation: "pulse-glow 1s ease-in-out infinite",
                    }}
                  />
                )}

                {/* Icon */}
                <div
                  className="relative bg-black/80 backdrop-blur-sm border-2 rounded-full p-4 transition-all"
                  style={{
                    borderColor: showLabel(i)
                      ? option.color
                      : "rgba(74, 222, 128, 0.4)",
                    transform: showLabel(i) ? "scale(1.15)" : "scale(1)",
                    boxShadow: showLabel(i)
                      ? `0 0 25px ${option.color}80`
                      : "0 0 10px rgba(34, 197, 94, 0.2)",
                  }}
                >
                  <div
                    className="text-3xl transition-all"
                    style={{
                      filter: showLabel(i)
                        ? `drop-shadow(0 0 8px ${option.color})`
                        : "none",
                      transform: showLabel(i)
                        ? "rotate(10deg)"
                        : "rotate(0deg)",
                    }}
                  >
                    {option.icon}
                  </div>
                </div>

                {/* Label */}
                <div
                  className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300"
                  style={{
                    opacity: showLabel(i) ? 1 : 0,
                    transform: showLabel(i)
                      ? "translateY(0)"
                      : "translateY(-5px)",
                    pointerEvents: "none",
                  }}
                >
                  <div
                    className="bg-black/90 border-2 rounded px-3 py-1.5"
                    style={{
                      borderColor: option.color,
                      boxShadow: `0 0 15px ${option.color}60`,
                    }}
                  >
                    <span
                      className="font-mono text-xs uppercase tracking-wider"
                      style={{ color: option.color }}
                    >
                      {option.label}
                    </span>

                    {/* Mobile hint */}
                    {isTouchOnly && selectedIndex === i && (
                      <div className="text-[0.55rem] text-center mt-0.5 opacity-75">
                        Tap again to open
                      </div>
                    )}
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
