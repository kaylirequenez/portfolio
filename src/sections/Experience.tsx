import { profile } from "../data/profile";

export default function Experience() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Experience
      </h2>

      <div className="max-w-3xl mx-auto space-y-8">
        {profile.experience.map((item) => (
          <div
            key={item.company}
            className="bg-zinc-900 p-6 rounded-xl border border-zinc-800"
          >
            <h3 className="text-xl font-semibold text-white">{item.role}</h3>
            <p className="text-zinc-400">{item.company}</p>
            <p className="text-zinc-500 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
