import { profile } from "../data/profile";

export default function Projects() {
  return (
    <section className="bg-zinc-900 py-24 px-6">
      <h2 className="text-4xl font-bold text-white text-center mb-12">
        Projects
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {profile.projects.map((project) => (
          <div
            key={project.title}
            className="bg-zinc-800 p-6 rounded-xl border border-zinc-700 hover:border-zinc-500 transition"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-zinc-400 mb-4">{project.description}</p>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-sm bg-zinc-700 text-zinc-200 px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
