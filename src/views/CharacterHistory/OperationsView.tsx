import { profile } from "../../data/profile";
import ContentBrowserPage from "./components/DataPage";

export default function OperationsView({ onBack }: { onBack: () => void }) {
  return (
    <ContentBrowserPage
      header="> OPERATIONS.DAT"
      indexHeader="MISSION FILES"
      data={profile.experience}
      onBack={onBack}
    />
  );
}
