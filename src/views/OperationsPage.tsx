import { useState } from "react";
import { profile } from "../data/profile";
import DataGridPage from "./DataGridPage";
import MissionFile from "./Operations/MissionFile";
import MissionIndex from "./Operations/MissionIndex";
import type { ExperienceData } from "../types/profile.types";

export default function OperationsPage({ onBack }: { onBack?: () => void }) {
  const [selectedMission, setSelectedMission] = useState<string | null>(null);

  const missions: ExperienceData[] = profile.experience;

  return (
    <DataGridPage
      data={missions}
      headerText="> OPERATIONS.LOG"
      onBack={onBack}
      selectedItemId={selectedMission}
      onSelectItem={setSelectedMission}
      FileComponent={(props) => (
        <MissionFile
          mission={props.item as ExperienceData}
          onClose={props.onClose}
          onMinimize={props.onMinimize}
          onMaximize={props.onMaximize}
          isFullScreen={props.isFullScreen}
          isCompactLayout={props.isCompactLayout}
        />
      )}
      IndexComponent={(props) => (
        <MissionIndex
          missions={props.items as ExperienceData[]}
          onSelectMission={props.onSelectItem}
          selectedMission={props.selectedItem}
        />
      )}
      animationPrefix="mission"
    />
  );
}
