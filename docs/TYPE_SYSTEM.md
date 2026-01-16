# Profile Type System

## Overview

All profile data types are centrally defined in `/src/types/profile.types.ts` to ensure consistency across components and prevent duplication.

## Type Hierarchy

### Core Data Types

- **ProfileData**: Root type for the entire profile object
- **ExperienceData**: Work experience entries (used in Operations page)
- **ProjectData**: Project entries (used in Archives page)
- **Mission**: Processed experience with ID (extends ExperienceData)
- **Project**: Processed project with ID (extends ProjectData)
- **DataItem**: Generic type for reusable DataGridPage component

### Supporting Types

- **Evidence**: Evidence panel data with mode and items
- **EvidenceItem**: Individual evidence entry (title, summary, details, media)
- **Link**: URL link with label
- **Skill**: Skill with mastery percentage
- **Language**: Programming language with proficiency level
- **InventoryItem**: Character inventory item
- **RoleFacet**: Role description for hero section
- **Comm**: Communication/contact method

## Usage

### In profile.ts

```typescript
import type { ProfileData } from "../types/profile.types";
export const profile: ProfileData = {
  /* ... */
};
```

### In OperationsPage

```typescript
import type { Mission } from '../types/profile.types';
const missions: Mission[] = profile.experience.map(exp => ({ id: ..., ...exp }));
```

### In ArchivesPage

```typescript
import type { Project } from '../types/profile.types';
const projects: Project[] = profile.projects.map(proj => ({ id: ..., role: proj.role || "Project", ...}));
```

### In DataGridPage

```typescript
import type { DataItem } from "../types/profile.types";
// Generic component accepts any data implementing DataItem interface
```

## Benefits

✅ **Single source of truth** - All types defined in one place  
✅ **Type safety** - Compile-time checks for all profile data  
✅ **Consistency** - Same structure used across all components  
✅ **Maintainability** - Update types once, apply everywhere  
✅ **Documentation** - Types serve as inline documentation  
✅ **Refactoring** - TypeScript catches breaking changes
