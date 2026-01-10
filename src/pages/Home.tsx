import { useState } from "react";
import MainLandingView from "../views/MainLandingView";
import CharacterDetailView from "../views/CharacterDetailView";

export default function Home() {
  const [mainView, setMainView] = useState(true);

  return (
    <div className="flex-1 w-full relative">
      {mainView ? (
        <MainLandingView onEnter={() => setMainView(false)} />
      ) : (
        <CharacterDetailView onBack={() => setMainView(true)} />
      )}
    </div>
  );
}
