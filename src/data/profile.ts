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
// Profile (Single Source of Truth)
// =====================

export const profile = {
  // ─ Character Identification ─
  name: "Kayli Requenez",
  fullName: "KAYLI REQUENEZ",
  title: "Creative Technologist",
  subtitle: "Machine Learning Systems Engineer",
  bio: "Kayli is a computer scientist who designs creative applications—with a special love for interactive music systems—and engineers efficient, real-world solutions. She researches meaningful problems and builds practical, impactful systems driven by the user experience.",

  // ─ Origin & Education ─
  homeland: "Miami, FL",
  institution: "MIT",
  degree: "Computer Science",
  minor: "Finance",
  class: "2026",
  intel: "96%",

  // ─ Skills & Languages ─
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

  // ─ Inventory & Communication ─
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

  // ─ Role Facets (Hero Section) ─
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

  // ─ Projects ─
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

  // ─ Experience ─
  experience: [
    {
      company: "Amazon",
      role: "Software Development Engineer Intern — ECS Console",
      dates: "Jun. – Aug. 2025",
      mission:
        "Improve production observability in the ECS Console by integrating CloudWatch metrics directly into customer workflows.",
      system:
        "AWS ECS Console frontend integrated with CloudWatch dashboards, metric math, query-based metrics, and test infrastructure across cluster, service, task, and container levels.",
      impact: [
        "Eliminated the need for customers to switch between ECS and CloudWatch during troubleshooting.",
        "Designed extensible metric abstractions that scaled across observability modes without increasing component complexity.",
        "Improved time-sensitive debugging by memoizing dashboards to prevent reloads during navigation.",
        "Established foundational unit and integration test patterns adopted for future dashboard features.",
        "Refactored legacy observability-related code and resolved pre-existing integration test failures.",
      ],
      evidence: {
        mode: "carousel",
        items: [
          {
            title: "Metric Source Configuration",
            summary:
              "Constructed the above source code using metric math and query-based definitions to control which metrics appear in the ECS Console and how they are computed and displayed.",
            details:
              "Kayli implemented the source configuration code responsible for defining which CloudWatch metrics appear in ECS dashboards and how they are rendered. This involved explicitly specifying metric namespaces, metric names, dimensions, and chart properties for each dashboard. She handled differences across disabled, enabled, and enhanced Container Insights configurations by using CloudWatch metric math to recreate metrics that are not directly available at lower observability tiers. At the task level, she used query-based metrics to aggregate data across all containers under a single task, enabling multiple containers to be visualized together within a single chart.",
            image: "/src/assets/amazon/cloudwatch.png",
          },
          {
            title: "Embedded ECS Dashboards",
            summary:
              "Above are some of the CloudWatch metric configurations that now exist within the ECS Console.",
            details:
              "Kayli designed and embedded CloudWatch dashboards directly into the ECS Console at multiple resource levels, tailoring metric visibility and behavior based on the underlying ECS dimension. She ensured that metric periods differed appropriately depending on whether Container Insights was enabled or enhanced, allowing for increased granularity where higher-resolution data was available. Deployment annotations were added across all service-level metrics, enabling engineers to correlate metric changes with deployment events and more easily diagnose regressions or rollout-related issues.",
            image: "/src/assets/amazon/metrics.png",
          },
        ],
      },
      tools: [
        "React",
        "TypeScript",
        "AWS ECS",
        "CloudWatch",
        "Metric Math",
        "Query Metrics",
        "Jest",
        "Integration Testing",
      ],
      takeaways: [
        "Designing frontend systems with backend-scale constraints",
        "Building testable architectures in large codebases",
        "Owning features beyond initial scope",
        "Customer-driven engineering under ambiguity",
      ],
    },
    {
      company: "MIT",
      role: "Music Coding Website Researcher & Developer (UROP)",
      dates: "Jul. – Dec. 2023",
      mission:
        "Build an open, browser-based platform that teaches music technology through code, replacing proprietary tools with an interactive, visual programming environment.",
      system:
        "A React-based web IDE integrating the Web Audio API, Tone.js, CodeMirror, Acorn AST parsing, and a custom p5.js visualization layer for real-time audio and visual programming.",
      impact: [
        "Developed a browser-based IDE used as the primary coding environment for MIT’s Intro to Music Technology course.",
        "Enabled students to build digital instruments through code with real-time audio and visual feedback.",
        "Designed a declarative mapping layer that connects audio parameters (e.g., frequency, amplitude) to interactive visual elements and controls.",
        "Implemented AST-based code preprocessing to support both live coding and structured programming workflows.",
        "Iterated on the platform based on classroom feedback and GitHub issues to improve usability and pedagogy.",
      ],
      evidence: {
        mode: "carousel",
        items: [
          {
            title: "Interactive Sequencer Example",
            summary:
              "Demonstrates a live coding example where audio and visuals are generated and synchronized in real time within the student environment.",
            details:
              "Kayli designed and implemented interactive example programs used by students to explore music technology through code. This sequencer example combines real-time audio synthesis with responsive visual output, allowing students to immediately see and hear the effects of their code changes. The example serves as both a learning scaffold and a reference implementation, helping students understand timing, sequencing, and audiovisual relationships in a concrete, interactive way.",
          },
          {
            title: "Audio-to-Visual Mapping Library",
            summary:
              "Introduced a reusable abstraction for declaratively mapping audio parameters to interactive visual elements and controls.",
            details:
              "Kayli created a custom p5.js-based library that abstracts the process of mapping audio parameters—such as frequency or amplitude—to visual representations and UI controls. The library exposes configurable functions where users specify the audio parameter to map, the visual placement, and optional behavior, while the underlying system handles rendering and updates. This design allows students to build expressive audiovisual instruments without needing to manage low-level rendering or audio state, significantly lowering the barrier to experimentation.",
          },
          {
            title: "IDE Persistence and Starter Templates",
            summary:
              "Ensured student code persists across refreshes while maintaining access to stable starter code for each example.",
            details:
              "Kayli implemented IDE behaviors that preserve a student’s code state across page refreshes, allowing experimentation without accidental data loss. At the same time, each example includes an always-available starter template, enabling students to reset or reference a known-good baseline at any point. This design supports safe exploration while reducing friction for beginners learning to code with real-time audio systems.",
          },
          {
            title: "Instructor-Configurable Content System",
            summary:
              "Designed a modular structure for examples and assignments that instructors can easily update and extend.",
            details:
              "Kayli structured the platform so that examples, assignments, and instructional content could be modified or extended without changing core application logic. This modular design allows instructors to update course materials, introduce new exercises, and iterate on curriculum content over time. The approach supports long-term maintainability and was a key step in preparing the project for open-source use.",
          },
          {
            title: "Explorable Multi-Canvas Workspace",
            summary:
              "Built a flexible workspace where students can independently explore code, audio, and visuals using multiple interactive canvases.",
            details:
              "Kayli designed the main student workspace to include multiple canvases for audio and visual output alongside a code editor. Students can expand individual canvases or the editor to focus on specific aspects of their program, encouraging exploration and self-directed learning. This layout supports different learning styles and reinforces the connection between code, sound, and visual behavior in a single integrated environment.",
          },
        ],
      },
      tools: [
        "React",
        "Web Audio API",
        "Tone.js",
        "CodeMirror",
        "Acorn AST",
        "p5.js",
      ],
      takeaways: [
        "Designing developer tools for non-traditional programmers",
        "Abstracting real-time audio systems into approachable APIs",
        "Bridging sound, visuals, and code in an educational context",
        "Building maintainable, open-source educational software",
      ],
    },
  ],
};
