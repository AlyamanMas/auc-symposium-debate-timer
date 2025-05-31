# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev    # Start development server (usually localhost:3000)
npm run build  # Build for production
npm run start  # Start production server
npm run lint   # Run ESLint
```

## Architecture Overview

This is a **Next.js 15 App Router** debate timer application with **Arabic RTL support** for the AUC Symposium. It combines **Material-UI v7** components with **Tailwind CSS v4** styling and uses **Redux Toolkit** with **Redux Persist** for state management.

### Core State Management

The application revolves around a single Redux slice (`debate-slice.ts`) with this structure:

```typescript
type DebateState = {
  sections: DebateSection[];      // All debate sections
  currentSectionId: string | null; // Currently active section
  isRunning: boolean;             // Timer running state
}

type DebateSection = {
  id: string;                     // UUID
  duration: number;               // Duration in seconds
  team: "opposition" | "proposition" | "other";
  name: string;                   // Section display name
  status: "completed" | "started" | "not started";
}
```

**Key Redux Actions:**
- `addSection` - Creates new section with auto-generated UUID
- `updateSection` - Partial updates (e.g., changing duration mid-timer)
- `setCurrentSection` - Switch active section
- `startTimer/pauseTimer` - Control timer state
- `completeSection` - Mark section done and auto-advance to next

### Application Flow

1. **Settings Page** (`/settings`) - Users create and manage debate sections using `SettingsTable` and `DebateSectionAdder`
2. **Timer Page** (`/`) - Full-screen countdown display with glassmorphism design
3. **State Persistence** - Redux Persist automatically saves to localStorage

### UI Component Patterns

**Page Structure:**
- Both pages wrap content with `Provider` + `PersistGate` + `ThemeProvider` inline (not in layout)
- `TopAppBar` provides navigation between timer and settings
- Timer page auto-selects first section if none is active

**Styling Approach:**
- **Material-UI** for interactive components (buttons, dialogs, tables, forms)
- **Tailwind CSS** for layout, spacing, visual effects, and glassmorphism
- **RTL support** via `stylis-plugin-rtl` and Emotion cache in theme.ts
- **Arabic fonts** (GE SS Two family) loaded via CSS font-face

### Timer Implementation

Uses `react-countdown` library with:
- **Controlled countdown** via ref for pause/resume functionality
- **Live duration modification** through modal dialog that updates Redux store
- **Auto-advance** to next section when countdown completes
- **Section status tracking** that syncs with timer state

### Arabic/RTL Considerations

- Root layout sets `lang="ara" dir="rtl"`
- Team names have Arabic mappings in `ar-mapping.ts`
- Material-UI theme configured for RTL direction
- Font loading supports Arabic text rendering

### Development Notes

- Redux state is automatically persisted - changes survive page refresh
- Timer controls immediately sync with Redux state
- Section reordering uses array of IDs passed to `reorderSections` action
- Time modification dialog accepts minutes and converts to seconds for storage
- Current section auto-advances on completion unless it's the last section