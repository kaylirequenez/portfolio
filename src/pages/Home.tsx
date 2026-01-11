import { useState } from "react";
import MainLandingView from "../views/MainLandingView";
import { CharacterDetailView } from "../views/CharacterDetailView";
import ProfileInitializing from "../views/ProfileInitializing";

export default function Home() {
  const [view, setView] = useState<"landing" | "loading" | "detail">("landing");

  if (view === "landing") {
    return <MainLandingView onEnter={() => setView("loading")} />;
  } else if (view === "loading") {
    return <ProfileInitializing onComplete={() => setView("detail")} />;
  } else {
    return <CharacterDetailView onBack={() => setView("landing")} />;
  }
}
