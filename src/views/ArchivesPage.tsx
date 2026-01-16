import { useState } from "react";
import { profile } from "../data/profile";
import DataGridPage from "./DataGridPage";
import ProjectFile from "./Archives/ProjectFile";
import ProjectIndex from "./Archives/ProjectIndex";
import type { ProjectData } from "../types/profile.types";

export default function ArchivesPage({ onBack }: { onBack?: () => void }) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  const projects: ProjectData[] = profile.projects.map((proj) => ({
    ...proj,
    role: proj.role || "Project",
    mission: proj.description,
    system: proj.system || proj.description,
    collaborators: proj.collaborators,
  }));

  return (
    <DataGridPage
      data={projects}
      headerText="> ARCHIVES.DAT"
      onBack={onBack}
      selectedItemId={selectedProject}
      onSelectItem={setSelectedProject}
      FileComponent={(props) => (
        <ProjectFile
          project={props.item as ProjectData}
          onClose={props.onClose}
          onMinimize={props.onMinimize}
          onMaximize={props.onMaximize}
          isFullScreen={props.isFullScreen}
          isCompactLayout={props.isCompactLayout}
        />
      )}
      IndexComponent={(props) => (
        <ProjectIndex
          projects={props.items as ProjectData[]}
          onSelectProject={props.onSelectItem}
          selectedProject={props.selectedItem}
        />
      )}
      animationPrefix="project"
    />
  );
}
