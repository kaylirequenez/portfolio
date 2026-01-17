import type { ExperienceData, ProjectData } from "../../../types/profile.types";

interface DataFileProps {
  header: string;
  data: ExperienceData | ProjectData;
  onClose: () => void;
  isFullScreen?: boolean;
  isCompactLayout?: boolean;
}

export default function DataFile({
  header,
  data,
  onClose,
  isCompactLayout = false,
}: DataFileProps) {
  return (
    <div
      className={`w-full max-w-2xl h-full bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80 border-2 border-cyan-400/40 rounded-lg overflow-hidden flex flex-col backdrop-blur-sm`}
    >
      {/* Mac-style window controls */}
      <div className="flex-shrink-0 bg-slate-800/50 border-b border-cyan-400/20 px-4 py-3 flex items-center justify-between">
        <div className="flex gap-2">
          {!isCompactLayout && (
            <button
              onClick={onClose}
              className="w-3 h-3 rounded-full bg-red-500/70 hover:bg-red-500 transition-colors"
              title="Close"
            />
          )}
        </div>
        <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
          {header}
        </div>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider">
            {header}
          </div>
          <h2 className="text-xl font-mono text-emerald-300 uppercase">
            {data.role}
          </h2>
          {data.dates && (
            <div className="text-sm font-mono text-cyan-400/60">
              {data.dates}
            </div>
          )}
        </div>

        {/* Mission Description */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            Mission
          </h3>
          <p className="text-sm text-cyan-100/80 leading-relaxed">
            {data.description}
          </p>
        </div>

        {/* System */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            System
          </h3>
          <p className="text-sm text-cyan-100/80 leading-relaxed">
            {data.system}
          </p>
        </div>

        {/* Impact */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            Impact
          </h3>
          <ul className="text-sm text-cyan-100/80 space-y-1">
            {data.impact.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400 flex-shrink-0">▸</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.tools.map((tool, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs text-cyan-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>

        {/* Takeaways */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
            Key Learnings
          </h3>
          <ul className="text-sm text-cyan-100/80 space-y-1">
            {data.takeaways.map((takeaway, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-emerald-400 flex-shrink-0">✦</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Collaborators */}
        {"collaborators" in data && data.collaborators && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Collaborators
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.collaborators.map((person, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs text-cyan-300"
                >
                  {person}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Links */}
        {data.links && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Resources
            </h3>
            <div className="flex flex-col gap-2">
              {data.links.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 bg-cyan-500/10 border border-cyan-400/30 rounded text-xs text-cyan-300 hover:bg-cyan-500/20 transition-colors w-fit"
                >
                  <span>🔗</span>
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
