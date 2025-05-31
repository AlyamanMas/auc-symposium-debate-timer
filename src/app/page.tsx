"use client";
import { useState, useRef, useEffect } from "react";
import TopAppBar from "@/ui/TopAppBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/ui/theme";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {
  startTimer,
  pauseTimer,
  setCurrentSection,
  completeSection,
  updateSection,
} from "@/lib/store/debate-slice";
import Countdown, { CountdownApi } from "react-countdown";
import {
  PlayArrow,
  Pause,
  Edit,
  SkipPrevious,
  SkipNext,
} from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import BottomBar from "@/ui/BottomBar";
import { teamsMapping } from "@/lib/ar-mapping";

function TimerPage() {
  const dispatch = useDispatch();
  const { sections, currentSectionId, isRunning } = useSelector(
    (state: RootState) => state.debate
  );
  const countdownRef = useRef<CountdownApi | null>(null);
  const [timeModifyDialogOpen, setTimeModifyDialogOpen] = useState(false);
  const [newTime, setNewTime] = useState("");

  const currentSection = sections.find((s) => s.id === currentSectionId);
  const currentIndex = sections.findIndex((s) => s.id === currentSectionId);

  // Auto-select first section if none is selected and sections exist
  useEffect(() => {
    if (!currentSectionId && sections.length > 0) {
      dispatch(setCurrentSection(sections[0].id));
    }
  }, [currentSectionId, sections, dispatch]);

  const handlePlayPause = () => {
    if (isRunning) {
      dispatch(pauseTimer());
      if (countdownRef.current) {
        countdownRef.current.pause();
      }
    } else {
      dispatch(startTimer());
      if (countdownRef.current) {
        countdownRef.current.start();
      }
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      dispatch(setCurrentSection(sections[currentIndex - 1].id));
    }
  };

  const handleNext = () => {
    if (currentIndex < sections.length - 1) {
      dispatch(setCurrentSection(sections[currentIndex + 1].id));
    }
  };

  const handleCountdownComplete = () => {
    if (currentSectionId) {
      dispatch(completeSection(currentSectionId));
      if (currentIndex < sections.length - 1) {
        dispatch(setCurrentSection(sections[currentIndex + 1].id));
      }
    }
  };

  const handleTimeModify = () => {
    setNewTime(
      currentSection ? Math.floor(currentSection.duration / 60).toString() : ""
    );
    setTimeModifyDialogOpen(true);
  };

  const handleTimeUpdate = () => {
    if (currentSectionId && newTime) {
      const minutes = parseInt(newTime);
      if (!isNaN(minutes) && minutes > 0) {
        dispatch(
          updateSection({
            id: currentSectionId,
            updates: { duration: minutes * 60 },
          })
        );
        setTimeModifyDialogOpen(false);
        setNewTime("");
      }
    }
  };

  const handleTimeCancel = () => {
    setTimeModifyDialogOpen(false);
    setNewTime("");
  };

  const renderer = ({
    minutes,
    seconds,
    completed,
  }: {
    minutes: number;
    seconds: number;
    completed: boolean;
  }) => {
    if (completed) {
      return (
        <span className="text-white text-9xl font-bold tabular-nums">
          00:00
        </span>
      );
    } else {
      return (
        <span className="leading-none text-white text-9xl xl:text-[12rem] font-bold tabular-nums">
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </span>
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-radial from-sym-grad-inner to-sym-grad-outer relative overflow-hidden">
        {/* Rotating Globe Background */}
        <div className="absolute w-screen h-screen flex items-center justify-center opacity-20">
          <img
            src="/globe-bg.png"
            alt="Globe Background"
            className="h-3/2 object-cover animate-spin"
            style={{ animationDuration: "90s" }}
          />
        </div>

        <TopAppBar />

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-8 mt-6">
          {/* Header Text */}
          <div className="text-center mb-8">
            <p className="text-white xl:mb-10 font-[GE_SS_Two] text-3xl xl:text-4xl">
              شراكات إقليمية من أجل السلام
            </p>
            <h1 className="text-white text-3xl xl:text-4xl font-[GE_SS_Two]">
              {currentSection
                ? teamsMapping.find((x) => x.value === currentSection.team)
                    ?.label
                : "Team Name"}
            </h1>
            <h1 className="text-white text-5xl xl:text-9xl font-bold">
              {currentSection ? currentSection.name : "Title of Debate Round"}
            </h1>
          </div>

          {/* Timer Display */}
          <div
            className="bg-radial from-sym-grad-inner to-sym-grad-outer
           rounded-3xl px-3
           border border-white border-opacity-20"
          >
            {currentSection ? (
              <Countdown
                date={Date.now() + currentSection.duration * 1000}
                autoStart={false}
                controlled={false}
                renderer={renderer}
                onComplete={handleCountdownComplete}
              />
            ) : (
              <span className="text-white text-9xl font-bold font-mono">
                00:00
              </span>
            )}
          </div>

          {/* Control Buttons */}
          <div className="flex gap-6 mt-6">
            <button
              onClick={handlePlayPause}
              disabled={!currentSection}
              className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
            >
              {isRunning ? (
                <Pause className="text-white text-3xl" />
              ) : (
                <PlayArrow className="text-white text-3xl" />
              )}
            </button>

            <button
              onClick={handleTimeModify}
              disabled={!currentSection}
              className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
            >
              <Edit className="text-white text-3xl" />
            </button>

            <button
              onClick={handlePrevious}
              disabled={currentIndex <= 0}
              className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
            >
              <SkipPrevious className="text-white text-3xl" />
            </button>

            <button
              onClick={handleNext}
              disabled={currentIndex >= sections.length - 1}
              className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
            >
              <SkipNext className="text-white text-3xl" />
            </button>
          </div>
        </div>

        {/* Time Modification Dialog */}
        <Dialog
          open={timeModifyDialogOpen}
          onClose={handleTimeCancel}
          PaperProps={{
            style: {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            },
          }}
        >
          <DialogTitle>Modify Timer Duration</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Duration (minutes)"
              type="number"
              fullWidth
              variant="outlined"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              InputProps={{ inputProps: { min: 1 } }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleTimeCancel}>Cancel</Button>
            <Button onClick={handleTimeUpdate} variant="contained">
              Update
            </Button>
          </DialogActions>
        </Dialog>

        <BottomBar />
      </div>
    </ThemeProvider>
  );
}

export default function Home() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <TimerPage />
      </PersistGate>
    </Provider>
  );
}
