export type SkillBadge = { label: string; emoji?: string };
export type Stat = { label: string; value: number; note?: string };

export type Project = {
  title: string;
  description: string;
  tags: string[];
};

export const profile = {
  name: "Kayli Requenez",
  role: "Computer Science & Engineering @ MIT",
  tagline: "ML · Systems · Creative Technology",
  about:
    "I build intelligent systems and creative software at the intersection of machine learning, engineering, and music.",
  links: {
    github: "https://github.com/kaylirequenez",
    linkedin: "https://linkedin.com/in/kaylirequenez",
    email: "kayli195@mit.edu",
  },

  hero: {
    headline: "Creative Technologist",
    subheadline: "ML · Systems · Music Tech",
    classLine: "Class: Creative Technologist • Specialty: Music + ML",

    orbitBadges: [
      { emoji: "🧠", label: "Machine Learning" },
      { emoji: "🎵", label: "Music Tech" },
      { emoji: "🗣️", label: "NLP / LLMs" },
      { emoji: "🖥️", label: "Systems" },
      { emoji: "✨", label: "Creative Coding" },
      { emoji: "🔊", label: "Audio" },
    ],

    stats: [
      { label: "Machine Learning", value: 4 },
      { label: "Music Technology", value: 5 },
      { label: "Systems Engineering", value: 4 },
      { label: "Creative Coding", value: 5 },
    ],
  },

  avatar: {
    type: "placeholder" as "placeholder" | "image" | "three",
    imageSrc: "/avatar.png",
  },

  projects: [
    {
      title: "Synthetic Languages for Low-Resource LLM Transfer",
      description:
        "Designed a pipeline for generating synthetic natural languages and improving cross-lingual transfer in low-resource settings.",
      tags: ["ML", "NLP", "LLMs"],
    },
    {
      title: "Squawk-Farm: Generative Music Game",
      description:
        "Built an interactive audio game where voice samples generate musical creatures that perform in synchronized harmony.",
      tags: ["Audio", "Algorithms", "Creative Tech"],
    },
  ],

  experience: [
    {
      company: "Amazon",
      role: "Software Development Engineer Intern",
      description:
        "Built and shipped features for the Elastic Container Service Console team, improving observability and developer experience.",
    },
    {
      company: "MIT",
      role: "Music Coding Website Researcher & Developer",
      description:
        "Developed a modular React-based IDE to teach students to code with music, used by MIT's Music Technology course.",
    },
  ],
};
