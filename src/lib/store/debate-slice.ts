import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DebateState,
  DebateSection,
  initialDebateState,
} from "./debate-sections";
import { v4 as uuidv4 } from "uuid";

const debateSlice = createSlice({
  name: "debate",
  initialState: initialDebateState,
  reducers: {
    addSection: (
      state,
      action: PayloadAction<
        Omit<DebateSection, "id" | "status" | "originalDuration">
      >
    ) => {
      const newSection: DebateSection = {
        ...action.payload,
        id: uuidv4(),
        status: "not started",
        originalDuration: action.payload.duration,
      };
      state.sections.push(newSection);
    },

    updateSection: (
      state,
      action: PayloadAction<{
        id: string;
        updates: Partial<Omit<DebateSection, "id">>;
      }>
    ) => {
      const { id, updates } = action.payload;
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === id
      );

      if (sectionIndex !== -1) {
        state.sections[sectionIndex] = {
          ...state.sections[sectionIndex],
          ...updates,
        };
      }
    },

    deleteSection: (state, action: PayloadAction<string>) => {
      state.sections = state.sections.filter(
        (section) => section.id !== action.payload
      );

      // If the current section is deleted, reset currentSectionId
      if (state.currentSectionId === action.payload) {
        state.currentSectionId = null;
        state.isRunning = false;
      }
    },

    setCurrentSection: (state, action: PayloadAction<string>) => {
      state.currentSectionId = action.payload;
    },

    startTimer: (state) => {
      state.isRunning = true;

      if (state.currentSectionId) {
        const currentSectionIndex = state.sections.findIndex(
          (section) => section.id === state.currentSectionId
        );

        if (currentSectionIndex !== -1) {
          state.sections[currentSectionIndex].status = "started";
        }
      }
    },

    resetSectionDuration: (
      state,
      action: PayloadAction<DebateSection["id"]>
    ) => {
      state.isRunning = false;
      let currentSection = state.sections.find((s) => s.id === action.payload);
      if (currentSection) {
        currentSection.duration = currentSection.originalDuration;
      }
    },

    pauseTimer: (state) => {
      state.isRunning = false;
    },

    completeSection: (state, action: PayloadAction<string>) => {
      const sectionIndex = state.sections.findIndex(
        (section) => section.id === action.payload
      );

      if (sectionIndex !== -1) {
        state.sections[sectionIndex].status = "completed";
      }

      if (state.currentSectionId === action.payload) {
        state.isRunning = false;
        state.currentSectionId = null;
      }
    },

    resetAllSections: (state) => {
      state.sections.forEach((section) => {
        section.status = "not started";
      });
      state.currentSectionId = null;
      state.isRunning = false;
    },

    resetState: (state) => {
      state.sections = [];
      state.currentSectionId = null;
      state.isRunning = false;
    },

    reorderSections: (state, action: PayloadAction<string[]>) => {
      const orderedSections: DebateSection[] = [];

      action.payload.forEach((id) => {
        const section = state.sections.find((s) => s.id === id);
        if (section) {
          orderedSections.push(section);
        }
      });

      state.sections = orderedSections;
    },

    tickTimer: (state) => {
      if (state.currentSectionId && state.isRunning) {
        const currentSectionIndex = state.sections.findIndex(
          (section) => section.id === state.currentSectionId
        );

        if (
          currentSectionIndex !== -1 &&
          state.sections[currentSectionIndex].duration > -15
        ) {
          state.sections[currentSectionIndex].duration -= 1;
        }
      }
    },
  },
});

export const {
  addSection,
  updateSection,
  deleteSection,
  setCurrentSection,
  startTimer,
  pauseTimer,
  completeSection,
  resetAllSections,
  resetState,
  reorderSections,
  tickTimer,
  resetSectionDuration,
} = debateSlice.actions;

export default debateSlice.reducer;
