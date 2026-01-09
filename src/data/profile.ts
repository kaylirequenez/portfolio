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
  id: string;
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
    blurb:
      "Kayli is a computer scientist who designs creative applications—with a special love for interactive music systems—and engineers efficient, real-world solutions. She researches meaningful problems and builds practical, impactful systems driven by the user experience.",
  },

  origin: {
    homeland: "Miami, FL",
    institution: "MIT",
    degree: "Computer Science",
    minor: "Finance",
    class: "2026",
    intel: "98.0%", // derived from GPA 4.8 / 5.0
  },

  skills: [
    { name: "Machine Learning & AI", mastery: 95 },
    { name: "Systems Engineering", mastery: 90 },
    { name: "Audio Systems & DSP", mastery: 88 },
    { name: "Algorithms & Data Structures", mastery: 92 },
    { name: "Interactive / Creative Coding", mastery: 94 },
    { name: "Software Construction", mastery: 91 },
  ],

  languages: [
    { name: "Python", level: 98 },
    { name: "C++", level: 85 },
    { name: "TypeScript", level: 92 },
    { name: "SQL", level: 88 },
  ],

  inventory: [
    {
      icon: "🧠",
      name: "AI",
      description: "Neural Networks & Machine Learning",
      equipped: true,
    },
    {
      icon: "💻",
      name: "Computer",
      description: "Full-Stack Development",
      equipped: true,
    },
    {
      icon: "🐞",
      name: "Debugger",
      description: "Problem Solving & Optimization",
      equipped: true,
    },
    {
      icon: "💼",
      name: "Job",
      description: "Seeking New Opportunities",
      equipped: false,
    },
  ],

  tools: [
    "Python, C++, TypeScript, SQL",
    "PyTorch, TensorFlow, Transformers, LLMs",
    "React, Node.js, Three.js, Web Audio API",
    "AWS, Distributed Systems",
    "Git, REST APIs, MongoDB, Figma",
  ],

  weaponry: ["🧠 AI", "💻 Computer", "🐞 Debugger"],

  comms: [
    {
      label: "SEND TRANSMISSION",
      action: "email",
      value: "mailto:kayli195@mit.edu",
    },
    {
      label: "ACCESS REPOSITORY",
      action: "github",
      value: "https://github.com/kaylirequenez",
    },
    {
      label: "OPEN NETWORK PROFILE",
      action: "linkedin",
      value: "https://linkedin.com/in/kaylirequenez",
    },
  ],

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
          "Generative & Interactive Music",
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
          "I design resilient systems under real-world constraints such as limited bandwidth, latency, and partial failure.",
        highlights: [
          "Distributed Systems",
          "Fault Tolerance",
          "Networked & Storage Systems",
          "Resource-Constrained Design",
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
      {
        id: "user-centered",
        title: "User-Centered Software Engineer",
        description:
          "I make engineering decisions grounded in real user behavior, product goals, and long-term system usability.",
        highlights: [
          "Product Thinking",
          "Customer-Driven Design",
          "Observability & Metrics",
          "Technical Communication",
        ],
      },
    ],
  },

  // =====================
  // Projects (canonical list)
  // =====================

  projects: [
    {
      id: "synthetic-languages",
      title: "Synthetic Languages for Low-Resource LLM Transfer",
      description:
        "Designed and implemented a deterministic pipeline for generating synthetic natural languages under strict typological and morphological constraints to improve cross-lingual transfer in low-resource settings.",
      tags: ["Machine Learning", "NLP", "Research"],
    },
    {
      id: "squawk-farm",
      title: "Squawk-Farm: Generative Music Garden Game",
      description:
        "Built an interactive audio-visual game where recorded voice samples generate musical creatures that perform in synchronized harmony, combining generative music systems with playful interaction.",
      tags: ["Audio Systems", "Generative Music", "Creative Coding"],
    },
    {
      id: "SNORT",
      title: "SNORT: SolarNet Optimized Routing Transmission",
      description:
        "Designed an enhanced bundle transport system for delay-tolerant satellite networks, focusing on reliability, priority-based forwarding, and distributed storage under extreme bandwidth and connectivity constraints.",
      tags: ["Distributed Systems", "Networking", "Systems Engineering"],
    },
    {
      id: "activism-game",
      title: "Visual Programming & Activism",
      description:
        "Developed a two-part project analyzing the relationship between pop culture and activism, combining survey-based statistical analysis with a Space Invaders–inspired game illustrating how media influence can drive collective action.",
      tags: ["Creative Coding", "Data Visualization", "Interactive Design"],
    },
  ],

  // =====================
  // Experience (concise, narrative-driven)
  // =====================

  experience: [
    {
      company: "Amazon",
      role: "Software Development Engineer Intern — ECS Console",
      description:
        "Built user-facing features for the Elastic Container Service Console, focusing on observability, metrics, and customer-driven engineering decisions.",
    },
    {
      company: "MIT",
      role: "Music Coding Website Researcher & Developer",
      description:
        "Developed a custom web-based IDE for teaching students to code with music, combining audio systems, interactive visuals, and pedagogical tooling.",
    },
    {
      company: "Palmer Trinity School",
      role: "Independent Researcher — Visual Programming & Activism",
      description:
        "Designed and implemented an interactive study and game exploring how pop culture and social media influence activism, collaborating with designers to create custom visuals.",
    },
  ],
};
