import { useState } from "react";
import ArchivesPage from "./views/ArchivesPage";
import MainLandingView from "./views/MainLandingView";
import OperationsPage from "./views/OperationsPage";
import ProfileInitializing from "./views/ProfileInitializing";
import CharacterDetailView from "./views/CharacterDetail/CharacterDetailView";

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
    return (
      <OperationsPage
        onBack={() => {
          setDetailTab(0);
          setView("detail");
        }}
      />
    );
  }
  if (view === "archives") {
    return (
      <ArchivesPage
        onBack={() => {
          setDetailTab(0);
          setView("detail");
        }}
      />
    );
  }
  return (
    <CharacterDetailView
      initialTab={detailTab}
      bioTypedIndex={bioTypedIndex}
      setBioTypedIndex={setBioTypedIndex}
      onBack={() => setView("landing")}
      onOpenOperations={() => {
        setView("operations");
      }}
      onOpenArchives={() => {
        setView("archives");
      }}
    />
  );
}
