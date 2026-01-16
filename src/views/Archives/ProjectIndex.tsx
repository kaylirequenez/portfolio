import ProjectCard from "./ProjectCard";

interface Project {
  id: string;
  title: string;
  subtitle?: string;
  role?: string;
  dates?: string;
}

interface ProjectIndexProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
  selectedProject?: string | null;
}

export default function ProjectIndex({
  projects,
  onSelectProject,
  selectedProject,
}: ProjectIndexProps) {
  return (
    <div className="space-y-3 px-2">
      <div className="text-xs uppercase font-mono text-cyan-400/50 tracking-wider">
        PROJECT FILES
      </div>
      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            {...project}
            onClick={() => onSelectProject(project.id)}
            isSelected={selectedProject === project.id}
          />
        ))}
      </div>
    </div>
  );
}
