export type DebateSection = {
  id: string; // unique identifier for each section
  duration: number; // duration in seconds
  team: "opposition" | "proposition" | "other";
  name: string; // name of the section
  status: "completed" | "started" | "not started";
};

export type DebateState = {
  sections: DebateSection[];
  currentSectionId: string | null;
  isRunning: boolean;
};

export const initialDebateState: DebateState = {
  sections: [],
  currentSectionId: null,
  isRunning: false,
};
