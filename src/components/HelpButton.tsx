import { useState } from "react";
import { createPortal } from "react-dom";

interface HelpButtonProps {
  tips: string[];
}

export default function HelpButton({ tips }: HelpButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Question mark button - top right */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-[100] w-10 h-10 flex items-center justify-center bg-slate-800/80 border border-cyan-400/40 rounded-full text-cyan-300 font-mono text-lg hover:bg-cyan-400/20 transition-all hover:scale-110"
        title="Help"
        aria-label="Show help"
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
                {tips.map((tip, index) => (
                  <p
                    key={index}
                    className="text-cyan-100/80 text-sm leading-relaxed font-mono"
                  >
                    {tip}
                  </p>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
