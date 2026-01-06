// =====================
// Types
// =====================

export type RoleFacet = {
  id: string;
  title: string;
  description: string;
  highlights: string[];
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
};

export type Experience = {
  company: string;
  role: string;
  description: string;
};

// =====================
// Profile
// =====================

export const profile = {
  name: "Kayli Requenez",

  identity: {
    title: "Creative Technologist",
    description:
      "I design intelligent, expressive systems at the intersection of music, machine learning, and software engineering.",
  },

  hero: {
    roleFacets: [
      {
        id: "audio-systems",
        title: "Audio Systems Engineer",
        description:
          "I design musical systems that translate theory, composition, and human intuition into expressive software.",
        highlights: [
          "Music Theory & Composition",
          "Audio System Design",
          "Creative Tooling & IDEs",
          "Audio–Visual Systems",
        ],
      },
      {
        id: "ml-systems",
        title: "Machine Learning Systems Engineer",
        description:
          "I build and reason about machine learning systems, with a research focus on language and structured learning problems.",
        highlights: [
          "Machine Learning",
          "Language & NLP Systems",
          "Model Reasoning",
          "Applied Research",
        ],
      },
      {
        id: "distributed-systems",
        title: "Distributed Systems Engineer",
        description:
          "I design resilient systems under real-world constraints like limited bandwidth, latency, and partial failure.",
        highlights: [
          "Distributed Systems",
          "Fault Tolerance",
          "Systems Engineering",
          "Resource-Constrained Design",
        ],
      },
      {
        id: "user-centered",
        title: "User-Centered Software Engineer",
        description:
          "I make engineering decisions grounded in real user behavior, product goals, and long-term system usability.",
        highlights: [
          "Customer-Driven Design",
          "Observability & Metrics",
          "Product Thinking",
          "Technical Communication",
        ],
      },
      {
        id: "visual-interactive",
        title: "Visual & Interactive Systems Designer",
        description:
          "I create generative visuals and interactive interfaces that make complex systems intuitive and engaging.",
        highlights: [
          "Three.js",
          "p5.js",
          "Interactive Visualization",
          "Creative Coding",
        ],
      },
    ],
  },

  projects: [
    {
      title: "Synthetic Languages for Low-Resource LLM Transfer",
      description:
        "Designed a deterministic pipeline for generating synthetic natural languages to improve cross-lingual transfer in low-resource settings.",
      tags: ["Machine Learning", "NLP", "Research"],
    },
    {
      title: "Squawk-Farm: Generative Music Game",
      description:
        "Built an interactive audio-visual game where voice samples generate musical creatures that perform in synchronized harmony.",
      tags: ["Audio Systems", "Creative Coding", "Interactive Design"],
    },
  ],

  experience: [
    {
      company: "Amazon",
      role: "Software Development Engineer Intern",
      description:
        "Built user-facing features for the ECS Console, focusing on observability, metrics, and customer-driven design decisions.",
    },
    {
      company: "MIT",
      role: "Music Coding Website Researcher & Developer",
      description:
        "Developed a custom IDE for teaching students to code with music, combining audio systems, visuals, and pedagogy.",
    },
  ],
};
