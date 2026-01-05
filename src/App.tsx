import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProjectsPage from "./pages/Projects";
import ExperiencePage from "./pages/Experience";

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen min-w-0">
        <Navbar />
        <main className="flex-1 flex min-w-0">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/experience" element={<ExperiencePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
