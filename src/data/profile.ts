// =====================
// Profile (Single Source of Truth)
// =====================

import type { ProfileData } from "../types/profile.types";
import sequencerVideo from "../assets/urop/sequencer.mp4";
import starterCodeVideo from "../assets/urop/starter_code_and_save.mp4";
import expandableSectionsVideo from "../assets/urop/expandable_sections.mp4";

export const profile: ProfileData = {
  // ─ Character Identification ─
  name: "Kayli Requenez",
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
      equipped: true,
    },
    {
      icon: "💻",
      name: "Computer",
      equipped: true,
    },
    {
      icon: "🐞",
      name: "Debugger",
      equipped: true,
    },
    {
      icon: "💼",
      name: "Job",
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
      action: "email",
      value: "mailto:kayli195@mit.edu",
    },
    {
      action: "github",
      value: "https://github.com/kaylirequenez",
    },
    {
      action: "linkedin",
      value: "https://linkedin.com/in/kaylirequenez",
    },
  ],

  // ─ Roles (Hero Section) ─
  roles: [
    "Audio Systems Engineer",
    "Machine Learning Systems Engineer",
    "Distributed Systems Engineer",
    "Visual & Interactive Systems Designer",
    "User-Centered Software Engineer",
  ],

  // ─ Projects ─
  projects: [
    {
      id: "squawk-farm",
      title: "Squawk Farm",
      role: "System Architect & Audio Engine Developer",
      dates: "Nov. – Dec. 2025",
      description:
        "Squawk Farm is a constraint-guided interactive music system that transforms user-recorded sounds into animated musical creatures performing together within a shared rhythmic and harmonic structure. The system emphasizes playful exploration while enforcing timing and pitch constraints that preserve musical coherence for novice users.",
      system:
        "A Python-based interactive music system built with Kivy, featuring a pulse-based global timing grid, symbolic audio loop sequencing, beat template generation and scoring, harmonic role assignment, and an event-driven audio scheduler fully decoupled from visual rendering.",
      impact: [
        "Enabled novice users to create rhythmically and harmonically coherent compositions without formal music training",
        "Designed a scalable loop engine supporting quantized recording, symbolic sequencing, role-aware rhythm generation, and harmonic transposition at playback time",
        "Integrated recorded audio with symbolic sequencing to combine the expressiveness of samples with MIDI-style editability",
        "Maintained musical stability through constrained pitch selection, beat template scoring, and global timing guarantees",
        "Architected the system to support future extensions including alternative meters, dynamic tempo changes, additional scales, and persistent project saving",
      ],
      evidence: {
        items: [
          {
            title: "Quantized Audio Recording Pipeline",
            summary:
              "Streamed recording interface converting raw audio into rhythmically aligned loops.",
            details:
              "Implemented a rolling-buffer recording system with live waveform visualization and draggable loop selection. Recordings are mapped to musically valid loop lengths and processed with pitch correction, normalization, and fade smoothing to ensure clean looping.",
            image: "/src/assets/squawkfarm/recording.png",
          },
          {
            title: "Symbolic Loop Sequencer",
            summary:
              "Grid-based editor for rhythmic and melodic control of each creature.",
            details:
              "Each animal owns a symbolic AudioLoop mapping quantized time slots to pitch values. Users can add, delete, and reposition notes, shift octaves, and explore auto-generated beat templates while remaining synchronized to global transport.",
            image: "/src/assets/squawkfarm/sequencer.png",
          },
          {
            title: "Beat Templates & Harmonic Roles",
            summary: "Context-aware rhythm and harmony generation.",
            details:
              "Designed a beat template system that generates and scores rhythmic patterns based on role, loop length, and ensemble density. Animals are assigned harmonic roles, with pitch constrained to a pentatonic scale and applied via transposition at playback time.",
            image: "/src/assets/squawkfarm/harmony.png",
          },
        ],
      },
      tools: [
        "Python",
        "Kivy",
        "Digital Signal Processing",
        "Audio Scheduling",
        "Symbolic Sequencing",
        "Music Theory",
      ],
      takeaways: [
        "Designing constraint-guided creative systems",
        "Separating symbolic musical structure from raw audio data",
        "Building scalable timing architectures for interactive audio",
      ],
      collaborators: ["Maxine Perroni-Scharf", "Raymond Brookman"],
      links: [
        {
          label: "System Design Paper",
          url: "/assets/docs/Squawk_Farm.pdf",
        },
      ],
    },
    {
      id: "spice",
      title: "SPICE",
      subtitle: "Synthetic Polyglot Injection for Cross-lingual Evaluation",
      role: "Research Contributor — Synthetic Language Generation",
      dates: "Nov. – Dec. 2025",
      description:
        "SPICE is a research pipeline for evaluating whether synthetic languages can substitute for or augment low-resource training data in multilingual NLP. The project introduces a stabilized synthetic language generation and translation system that enables controlled experiments on typological similarity and cross-lingual transfer.",
      system:
        "A Python-based research pipeline combining deterministic synthetic language generation, corpus-scale translation with lexicon validation, and multilingual fine-tuning with HuggingFace Transformers, PEFT, and bitsandbytes quantization for controlled cross-lingual transfer experiments.",
      impact: [
        "Designed a deterministic synthetic language generation pipeline with fixed orthography, typological feature vectors, and affix inventories",
        "Implemented corpus-scale English-to-synthetic translation with strict lexicon control and conflict detection",
        "Prevented grammatical drift through validation and controlled lexicon growth across translation batches",
        "Enabled experiments isolating typological similarity as a factor in multilingual transfer performance",
      ],
      evidence: {
        items: [
          {
            title: "Synthetic Language Pipeline",
            summary: "Typology-controlled synthetic language generation.",
            details:
              "Designed the pipeline for generating stable constructed languages under strict orthographic and morphological constraints, ensuring consistency across hundreds of translated examples.",
            image: "/src/assets/spice/typology_pipeline.png",
          },
          {
            title: "Controlled Translation Workflow",
            summary:
              "Deterministic dataset translation with lexicon validation.",
            details:
              "Implemented translation batching, vocabulary reuse enforcement, and conflict detection to maintain corpus-scale consistency for multilingual fine-tuning.",
            image: "/src/assets/spice/translation_prompt.png",
          },
        ],
      },
      tools: [
        "Python",
        "HuggingFace Transformers",
        "Datasets (HuggingFace)",
        "PyTorch",
        "PEFT / LoRA / QLoRA",
        "Accelerate",
        "bitsandbytes",
        "OmegaConf",
        "Weights & Biases",
      ],
      takeaways: [
        "Building deterministic synthetic data pipelines for multilingual NLP",
        "Isolating typological similarity as a transfer mechanism",
        "Balancing data quality, scalability, and compute constraints",
      ],
      collaborators: ["Angela Chen", "Kat Dou", "Joel Manu"],
      links: [
        {
          label: "Research Paper (PDF)",
          url: "/assets/docs/SPICE.pdf",
        },
      ],
    },

    {
      id: "snort",
      title: "SNORT",
      subtitle: "SolarNet Optimized Routing Transmission",
      role: "Research Contributor",
      dates: "Mar. – May 2025",
      description:
        "SNORT is a design-only distributed routing and storage protocol for NASA’s SolarNet, an interplanetary delay-tolerant communication network. The system extends the Bundle Protocol with storage-aware forwarding, reservation-based transmission, redundancy, and confirmation-driven cleanup to improve reliability under extreme delays and intermittent connectivity.",
      system:
        "A distributed routing and storage protocol extending the Bundle Protocol with reservation-based storage mechanisms, storage-aware forwarding logic, redundancy strategies, and confirmation-driven reliability for delay-tolerant interplanetary networks.",
      impact: [
        "Designed a reservation-based distributed storage mechanism to prevent bundle loss",
        "Extended the Bundle Protocol with storage-aware forwarding and confirmation-driven reliability",
        "Analyzed tradeoffs between latency, redundancy, storage pressure, and network overhead",
        "Evaluated failure scenarios including deep-space delays and concurrent high-priority traffic",
      ],
      evidence: {
        items: [
          {
            title: "System Architecture",
            summary: "High-level protocol architecture for SNORT.",
            details:
              "Illustrates how storage reservation, forwarding logic, and confirmation signals interact within the SolarNet environment.",
            image: "/assets/snort/architecture.png",
          },
        ],
      },
      tools: [
        "Distributed Systems Design",
        "Delay-Tolerant Networking (DTN)",
        "Bundle Protocol",
        "Protocol Architecture",
      ],
      takeaways: [
        "Designing reliable systems for extreme network conditions",
        "Reasoning about correctness without implementation",
      ],
      collaborators: ["Cameron Holt", "Jennifer Kim"],
      links: [
        {
          label: "Design Paper (PDF)",
          url: "/assets/docs/SNORT.pdf",
        },
      ],
    },

    {
      id: "pop-culture-activism",
      title: "Pop Culture and Activism",
      subtitle: "Behavioral Study + Interactive Game System",
      role: "Research Lead & Interactive Systems Developer",
      dates: "Apr. – May 2021",
      description:
        "This project studies how pop culture, social pressure, and personal reasoning influence engagement in social and environmental activism. A behavioral survey and an educational arcade-style game were used to collect data, analyze motivation patterns, and visualize their real-world impact through gameplay.",
      system:
        "An interactive system combining a behavioral survey instrument, weighted scoring model for influence classification, and a p5.js-based arcade game that translates environmental actions into gameplay mechanics for educational reinforcement.",
      impact: [
        "Designed a behavioral survey measuring celebrity influence, peer pressure, and self-driven logic",
        "Developed a weighted scoring model to classify influence patterns and outcomes",
        "Built an interactive arcade game translating environmental actions into gameplay mechanics",
        "Integrated data visualization and game systems to reinforce educational outcomes",
      ],
      evidence: {
        items: [
          {
            title: "Survey & Data Analysis",
            summary: "Behavioral data collection and visualization.",
            details:
              "Survey responses were categorized and visualized to compare individual behavior against aggregate trends across influence types.",
            image: "/assets/pop-culture/data.png",
          },
          {
            title: "Educational Arcade Game",
            summary:
              "Gameplay mechanics representing environmental decision-making.",
            details:
              "A Space-Invaders-style game where environmental actions function as upgrades, directly influencing difficulty and progression.",
            image: "/assets/pop-culture/gameplay.png",
          },
        ],
      },
      tools: ["JavaScript (ES6+)", "p5.js", "HTML5", "CSS3"],
      takeaways: [
        "Connecting behavioral research with interactive design",
        "Using games as tools for data collection and education",
        "Visualizing complex social dynamics through interactive feedback",
      ],
    },
  ],

  // ─ Experience ─
  experience: [
    {
      id: "amazon",
      company: "Amazon",
      location: "Jersey City, NJ",
      role: "Software Development Engineer Intern — ECS Console",
      team: "Elastic Container Service (ECS) Console",
      dates: "Jun. – Aug. 2025",
      description:
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
      id: "mit-urop",
      company: "MIT",
      location: "Cambridge, MA",
      role: "Music Coding Website Researcher & Developer (UROP)",
      dates: "Jul. – Dec. 2023",
      description:
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
        items: [
          {
            title: "Interactive Sequencer Example",
            summary:
              "Demonstrates a live coding example where audio and visuals are generated and synchronized in real time within the student environment.",
            details:
              "Kayli designed and implemented interactive example programs used by students to explore music technology through code. This sequencer example combines real-time audio synthesis with responsive visual output, allowing students to immediately see and hear the effects of their code changes. The example serves as both a learning scaffold and a reference implementation, helping students understand timing, sequencing, and audiovisual relationships in a concrete, interactive way.",
            video: sequencerVideo,
          },
          {
            title: "Audio-to-Visual Mapping Library",
            summary:
              "Introduced a reusable abstraction for declaratively mapping audio parameters to interactive visual elements and controls.",
            details:
              "Kayli created a custom p5.js-based library that abstracts the process of mapping audio parameters—such as frequency or amplitude—to visual representations and UI controls. The library exposes configurable functions where users specify the audio parameter to map, the visual placement, and optional behavior, while the underlying system handles rendering and updates. This design allows students to build expressive audiovisual instruments without needing to manage low-level rendering or audio state, significantly lowering the barrier to experimentation.",
            image: "/src/assets/urop/gui.jpg",
          },
          {
            title: "IDE Persistence and Starter Templates",
            summary:
              "Ensured student code persists across refreshes while maintaining access to stable starter code for each example.",
            details:
              "Kayli implemented IDE behaviors that preserve a student’s code state across page refreshes, allowing experimentation without accidental data loss. At the same time, each example includes an always-available starter template, enabling students to reset or reference a known-good baseline at any point. This design supports safe exploration while reducing friction for beginners learning to code with real-time audio systems.",
            video: starterCodeVideo,
          },
          {
            title: "Instructor-Configurable Content System",
            summary:
              "Designed a modular structure for examples and assignments that instructors can easily update and extend.",
            details:
              "Kayli structured the platform so that examples, assignments, and instructional content could be modified or extended without changing core application logic. This modular design allows instructors to update course materials, introduce new exercises, and iterate on curriculum content over time. The approach supports long-term maintainability and was a key step in preparing the project for open-source use.",
            image: "/src/assets/urop/table_of_contents.png",
          },
          {
            title: "Explorable Multi-Canvas Workspace",
            summary:
              "Built a flexible workspace where students can independently explore code, audio, and visuals using multiple interactive canvases.",
            details:
              "Kayli designed the main student workspace to include multiple canvases for audio and visual output alongside a code editor. Students can expand individual canvases or the editor to focus on specific aspects of their program, encouraging exploration and self-directed learning. This layout supports different learning styles and reinforces the connection between code, sound, and visual behavior in a single integrated environment.",
            video: expandableSectionsVideo,
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
      links: [
        {
          label: "Deployed Website",
          url: "https://ianhattwick.com/m080/",
        },
      ],
    },
  ],
};
