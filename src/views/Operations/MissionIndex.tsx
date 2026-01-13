import MissionCard from "./MissionCard";

interface Mission {
  id: string;
  company: string;
  role: string;
  dates?: string;
}

interface MissionIndexProps {
  missions: Mission[];
  onSelectMission: (id: string) => void;
  selectedMission?: string | null;
}

export default function MissionIndex({
  missions,
  onSelectMission,
  selectedMission,
}: MissionIndexProps) {
  return (
    <div className="space-y-3 px-2">
      <div className="text-xs uppercase font-mono text-cyan-400/50 tracking-wider">
        MISSION FILES
      </div>
      <div className="flex flex-col gap-3">
        {missions.map((mission) => (
          <MissionCard
            key={mission.id}
            {...mission}
            onClick={() => onSelectMission(mission.id)}
            isSelected={selectedMission === mission.id}
          />
        ))}
      </div>
    </div>
  );
}
