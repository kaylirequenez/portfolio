import { profile } from "../data/profile";

export default function Contact() {
  return (
    <section className="bg-zinc-950 py-24 px-6">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold text-white">Get In Touch</h2>

        <div className="flex justify-center gap-6 text-zinc-400">
          <a href={profile.links.github} className="hover:text-white">
            GitHub
          </a>
          <a href={profile.links.linkedin} className="hover:text-white">
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="hover:text-white"
          >
            Email
          </a>
        </div>
      </div>
    </section>
  );
}
