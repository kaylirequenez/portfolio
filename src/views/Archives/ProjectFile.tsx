interface ProjectFileProps {
  project: {
    id: string;
    title: string;
    subtitle?: string;
    role?: string;
    dates?: string;
    mission?: string;
    system?: string;
    impact?: string[];
    evidence?: {
      items: Array<{
        title: string;
        summary: string;
        details: string;
      }>;
    };
    tools?: string[];
    takeaways?: string[];
    links?: Array<{
      label: string;
      url: string;
    }>;
    collaborators?: string[];
  };
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  isFullScreen?: boolean;
  isCompactLayout?: boolean;
}

export default function ProjectFile({
  project,
  onClose,
  onMinimize,
  onMaximize,
  isFullScreen = false,
  isCompactLayout = false,
}: ProjectFileProps) {
  const windowClasses = isFullScreen
    ? "w-11/12 max-w-4xl h-5/6"
    : "w-full max-w-2xl h-full";

  return (
    <div
      className={`${windowClasses} bg-gradient-to-br from-slate-900/80 via-slate-900/70 to-slate-900/80 border-2 border-cyan-400/40 rounded-lg overflow-hidden flex flex-col backdrop-blur-sm`}
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
          {!isCompactLayout && (
            <>
              <button
                onClick={onMinimize}
                className="w-3 h-3 rounded-full bg-yellow-500/70 hover:bg-yellow-500 transition-colors"
                title="Minimize"
              />
              <button
                onClick={onMaximize}
                className="w-3 h-3 rounded-full bg-green-500/70 hover:bg-green-500 transition-colors"
                title="Maximize"
              />
            </>
          )}
        </div>
        <div className="text-xs font-mono text-cyan-300 uppercase tracking-wider">
          {project.title}
        </div>
        <div className="w-12" /> {/* Spacer for centering */}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <div className="text-xs font-mono text-cyan-400/70 uppercase tracking-wider">
            {project.title}
          </div>
          {project.subtitle && (
            <div className="text-sm font-mono text-cyan-400/80">
              {project.subtitle}
            </div>
          )}
          {project.role && (
            <h2 className="text-xl font-mono text-emerald-300 uppercase">
              {project.role}
            </h2>
          )}
          {project.dates && (
            <div className="text-sm font-mono text-cyan-400/60">
              {project.dates}
            </div>
          )}
        </div>

        {/* Mission/Description */}
        {project.mission && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Mission
            </h3>
            <p className="text-sm text-cyan-100/80 leading-relaxed">
              {project.mission}
            </p>
          </div>
        )}

        {/* System */}
        {project.system && project.system !== project.mission && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              System
            </h3>
            <p className="text-sm text-cyan-100/80 leading-relaxed">
              {project.system}
            </p>
          </div>
        )}

        {/* Impact/Highlights */}
        {project.impact && project.impact.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              {Array.isArray(project.impact) ? "Impact" : "Highlights"}
            </h3>
            <ul className="text-sm text-cyan-100/80 space-y-1">
              {project.impact.map((bullet, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">▸</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tools */}
        {project.tools && project.tools.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Tools & Technologies
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool, i) => (
                <span
                  key={i}
                  className="px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs text-cyan-300"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Takeaways */}
        {project.takeaways && project.takeaways.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Key Learnings
            </h3>
            <ul className="text-sm text-cyan-100/80 space-y-1">
              {project.takeaways.map((takeaway, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-400 flex-shrink-0">✦</span>
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Collaborators */}
        {project.collaborators && project.collaborators.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Collaborators
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.collaborators.map((person, i) => (
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
        {project.links && project.links.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase tracking-wider text-cyan-300/70">
              Resources
            </h3>
            <div className="flex flex-col gap-2">
              {project.links.map((link, i) => (
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
