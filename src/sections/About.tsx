import { profile } from "../data/profile";

export default function About() {
  return (
    <section className="bg-zinc-900 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">About Me</h2>
        <p className="text-zinc-400 leading-relaxed">{profile.about}</p>
      </div>
    </section>
  );
}
