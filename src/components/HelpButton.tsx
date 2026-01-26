import { useState } from "react";
import { createPortal } from "react-dom";

interface HelpButtonProps {
  tips: (string | { text: string; icon?: string })[];
  className?: string;
  fixed?: boolean;
}

export default function HelpButton({ 
  tips,
  className = "",
  fixed = true
}: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const baseClasses = fixed
    ? "fixed top-4 right-4 z-[100] w-12 h-12"
    : "w-8 h-8";

  return (
    <>
      {/* Question mark button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`${baseClasses} flex items-center justify-center bg-cyan-500/20 border-2 border-cyan-400/60 rounded-full text-cyan-300 font-mono ${fixed ? "text-xl" : "text-sm"} font-bold hover:bg-cyan-400/30 hover:border-cyan-400 transition-all hover:scale-110 shadow-lg shadow-cyan-400/20 ${className}`}
        title="Help"
        aria-label="Show help"
        style={{
          textShadow: "0 0 10px rgba(34, 211, 238, 0.8)",
        }}
      >
        ?
      </button>

      {/* Expanded help modal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <div
              className="bg-slate-900/95 border-2 border-cyan-400/40 rounded-lg p-6 max-w-md mx-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-cyan-300 font-mono text-lg uppercase tracking-wider">
                  Help
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-cyan-300/70 hover:text-cyan-300 font-mono text-xl transition-colors"
                  aria-label="Close help"
                >
                  ×
                </button>
              </div>
              <div className="space-y-3">
                {tips.map((tip, index) => {
                  const tipText = typeof tip === "string" ? tip : tip.text;
                  const tipIcon = typeof tip === "object" ? tip.icon : undefined;
                  
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-2 text-cyan-100/80 text-sm leading-relaxed font-mono"
                    >
                      {tipIcon && (
                        <span className="text-lg flex-shrink-0">{tipIcon}</span>
                      )}
                      <p>{tipText}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
