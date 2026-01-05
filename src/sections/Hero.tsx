import { profile } from "../data/profile";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-zinc-950">
      <div className="text-center space-y-4 px-6">
        <h1 className="text-6xl font-bold text-white">{profile.name}</h1>
        <p className="text-xl text-zinc-400">{profile.role}</p>
        <p className="text-zinc-500">{profile.tagline}</p>
      </div>
    </section>
  );
}
