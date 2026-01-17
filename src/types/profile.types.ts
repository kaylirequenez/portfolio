// =====================
// Profile Data Type Definitions
// =====================
// Central type definitions for all profile data structures
// Used across components for type safety and consistency

// ─────────────────────────────────────────────────────
// Evidence & Media Types
// ─────────────────────────────────────────────────────

export interface EvidenceItem {
  title: string;
  summary: string;
  details: string;
  image?: string;
  video?: string;
}

export interface Evidence {
  items: EvidenceItem[];
}

export interface Link {
  label: string;
  url: string;
}

// ─────────────────────────────────────────────────────
// Skills & Proficiency Types
// ─────────────────────────────────────────────────────

export interface Skill {
  name: string;
  mastery: number; // 0-100
}

export interface Language {
  name: string;
  level: number; // 0-100
}

export interface InventoryItem {
  icon: string;
  name: string;
  equipped: boolean;
}

interface Data {
  id: string;
  role: string;
  dates: string;
  description: string;
  system: string;
  impact: string[];
  evidence: Evidence;
  tools: string[];
  takeaways: string[];
  links?: Link[];
}

// ─────────────────────────────────────────────────────
// Experience (Operations) Types
// ─────────────────────────────────────────────────────

export interface ExperienceData extends Data {
  company: string;
  location: string;
  team?: string;
}

// ─────────────────────────────────────────────────────
// Projects (Archives) Types
// ─────────────────────────────────────────────────────

export interface ProjectData extends Data {
  title: string;
  subtitle?: string;
  collaborators?: string[];
}

// ─────────────────────────────────────────────────────
// Generic Data Grid Types (for reusable components)
// ─────────────────────────────────────────────────────

export type DataItem = ExperienceData | ProjectData;

export interface MainDataInfo {
  id: string;
  header: string; // company - role or title
  role: string;
  dates: string;
}

// ─────────────────────────────────────────────────────
// Character/Profile Types
// ─────────────────────────────────────────────────────

export interface Comm {
  action: string;
  value: string;
}

export interface ProfileData {
  // Character Identification
  name: string;
  title: string;
  subtitle: string;
  bio: string;

  // Origin & Education
  homeland: string;
  institution: string;
  degree: string;
  minor: string;
  class: string;
  intel: string;

  // Skills & Languages
  skills: Skill[];
  languages: Language[];

  // Inventory & Communication
  inventory: InventoryItem[];
  tools: string[];
  weaponry: string[];
  comms: Comm[];

  // Hero Section
  roles: string[];

  // Projects & Experience
  projects: ProjectData[];
  experience: ExperienceData[];
}
