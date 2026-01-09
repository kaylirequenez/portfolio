import AvatarFrame from "./AvatarFrame";
import StatusBadge from "../../ui/StatusBadge";

export default function CenterPanel() {
  return (
    <div className="flex flex-col items-center gap-3 pt-8">
      <AvatarFrame />
      {/* Status Badges */}
      <div className="flex gap-2 pointer-events-none">
        <StatusBadge label="ACTIVE" color="green" />
        <StatusBadge label="ONLINE" color="cyan" />
      </div>
    </div>
  );
}
