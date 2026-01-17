import { profile } from "../../data/profile";
import ContentBrowserPage from "./components/DataPage";

export default function ArchivesView({ onBack }: { onBack: () => void }) {
  return (
    <ContentBrowserPage
      header="> ARCHIVES.DAT"
      indexHeader="ARCHIVES"
      data={profile.projects}
      onBack={onBack}
    />
  );
}
