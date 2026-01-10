import { useState } from "react";
import MainLandingView from "../views/MainLandingView";
import { CharacterDetailView } from "../views/CharacterDetailView";

export default function Home() {
  const [mainView, setMainView] = useState(true);

  if (mainView) {
    return <MainLandingView onEnter={() => setMainView(false)} />;
  } else {
    return <CharacterDetailView />;
  }
}
