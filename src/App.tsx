import { useState } from "react";
import ProfileInitializing from "./views/ProfileInitializing";
import CharacterDetailView from "./views/CharacterDetail/CharacterDetailView";
import MainLandingView from "./views/MainLanding/MainLandingView";
import ArchivesView from "./views/CharacterHistory/ArchivesView";
import OperationsView from "./views/CharacterHistory/OperationsView";

export default function App() {
  const [view, setView] = useState<
    "landing" | "loading" | "detail" | "operations" | "archives"
  >("landing");
  const [detailTab, setDetailTab] = useState(1);
  const [bioTypedIndex, setBioTypedIndex] = useState<number | null>(null);

  if (view === "landing") {
    return (
      <MainLandingView
        onEnter={() => {
          setBioTypedIndex(null); // 👈 reset here only
          setView("loading");
        }}
      />
    );
  }

  if (view === "loading") {
    return <ProfileInitializing onComplete={() => setView("detail")} />;
  }
  if (view === "operations") {
    return <OperationsView onBack={() => setView("detail")} />;
  }
  if (view === "archives") {
    return <ArchivesView onBack={() => setView("detail")} />;
  }
  return (
    <CharacterDetailView
      initialTab={detailTab}
      bioTypedIndex={bioTypedIndex}
      setBioTypedIndex={setBioTypedIndex}
      onBack={() => setView("landing")}
      onOpenOperations={() => {
        setDetailTab(0);
        setView("operations");
      }}
      onOpenArchives={() => {
        setDetailTab(0);
        setView("archives");
      }}
    />
  );
}
