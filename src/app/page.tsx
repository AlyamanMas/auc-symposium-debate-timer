"use client";
import { useState, useRef, useEffect } from "react";
import TopAppBar from "@/ui/TopAppBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme, cacheRtl } from "@/ui/theme";
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
  tickTimer,
  resetSectionDuration,
} from "@/lib/store/debate-slice";
import {
  PlayArrow,
  Pause,
  Edit,
  SkipPrevious,
  SkipNext,
  History,
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
import { CacheProvider } from "@emotion/react";

function TimerPage() {
  const dispatch = useDispatch();
  const { sections, currentSectionId, isRunning } = useSelector(
    (state: RootState) => state.debate
  );
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeOverDinIntervalgRef = useRef<NodeJS.Timeout | null>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [timeModifyDialogOpen, setTimeModifyDialogOpen] = useState(false);
  const [newTime, setNewTime] = useState("");
  const [showButtons, setShowButtons] = useState(true);
  const [showStartingAnimation, setShowStartingAnimation] = useState(false);
  const [showMainContent, setShowMainContent] = useState(false);
  const [hasPlayedAnimation, setHasPlayedAnimation] = useState(false);

  const currentSection = sections.find((s) => s.id === currentSectionId);
  const currentIndex = sections.findIndex((s) => s.id === currentSectionId);

  // Check if this is initial load or navigation
  useEffect(() => {
    const skipCounter = sessionStorage.getItem("skipAnimationCounter") || "0";

    if (skipCounter === "0") {
      // Play animation
      setShowStartingAnimation(true);
    } else {
      // Skip animation and reset counter
      setShowMainContent(true);
      sessionStorage.setItem("skipAnimationCounter", "0");
    }
  }, []);

  // Auto-select first section if none is selected and sections exist
  useEffect(() => {
    if (!currentSectionId && sections.length > 0) {
      dispatch(setCurrentSection(sections[0].id));
    }
  }, [currentSectionId, sections, dispatch]);

  // Timer effect
  useEffect(() => {
    if (isRunning && currentSection) {
      timerIntervalRef.current = setInterval(() => {
        dispatch(tickTimer());
      }, 1000);
    } else {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    }

    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isRunning, currentSection, dispatch]);

  // Check if timer completed
  // TODO: check if type of section is not 5itab radd
  useEffect(() => {
    if (
      currentSection &&
      (currentSection.duration === 60 || currentSection.duration === 4 * 60) &&
      isRunning
    ) {
      const audio = new Audio("/ding.mp3");
      audio.play().catch(console.error);
    }
    if (currentSection && currentSection.duration === 0 && isRunning) {
      // Play ding sound twice
      const audio = new Audio("/ding.mp3");
      audio.play().catch(console.error);
      window.setTimeout(() => {
        const audio2 = new Audio("/ding.mp3");
        audio2.play().catch(console.error);
      }, 1.5 * 1000);
    }
    if (
      currentSection &&
      currentSection.duration <= -15 &&
      currentSection.status !== "completed"
    ) {
      // Play ding sound
      timeOverDinIntervalgRef.current = setInterval(() => {
        const audio = new Audio("/ding.mp3");
        audio.play().catch(console.error);
      }, 1000);

      // dispatch(completeSection(currentSection.id));
      // if (currentIndex < sections.length - 1) {
      //   dispatch(setCurrentSection(sections[currentIndex + 1].id));
      // }
    } else if (
      currentSection &&
      currentSection.duration <= -15 &&
      currentSection.status === "completed"
    ) {
      if (timeOverDinIntervalgRef.current) {
        clearInterval(timeOverDinIntervalgRef.current);
      }
    }

    return () => {
      if (timeOverDinIntervalgRef.current) {
        clearInterval(timeOverDinIntervalgRef.current);
      }
    };
  }, [currentSection?.duration, isRunning, currentSection?.status]);

  // Cursor activity tracking
  useEffect(() => {
    const handleMouseMove = () => {
      setShowButtons(true);
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
      cursorTimeoutRef.current = setTimeout(() => {
        setShowButtons(false);
      }, 2000);
    };

    const handleMouseLeave = () => {
      setShowButtons(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    // Initial timeout
    cursorTimeoutRef.current = setTimeout(() => {
      setShowButtons(false);
    }, 2000);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (currentSection && currentSection.id && currentSection.duration <= -15) {
      dispatch(completeSection(currentSection.id));
    }
    if (isRunning) {
      dispatch(pauseTimer());
    } else {
      dispatch(startTimer());
    }
  };

  const handlePrevious = () => {
    if (currentSection && currentSection.id && currentSection.duration <= -15) {
      dispatch(completeSection(currentSection.id));
    }
    if (isRunning) {
      dispatch(pauseTimer());
    }
    if (currentIndex > 0) {
      dispatch(setCurrentSection(sections[currentIndex - 1].id));
    }
  };

  const handleNext = () => {
    if (currentSection && currentSection.id && currentSection.duration <= -15) {
      dispatch(completeSection(currentSection.id));
    }
    if (isRunning) {
      dispatch(pauseTimer());
    }
    if (currentIndex < sections.length - 1) {
      dispatch(setCurrentSection(sections[currentIndex + 1].id));
    }
  };

  const handleResetSectionDuration = () => {
    if (currentSection && currentSection.id) {
      dispatch(resetSectionDuration(currentSection.id));
    }
  };

  const formatTime = (totalSeconds: number) => {
    if (totalSeconds >= 0) {
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}`;
    } else {
      const minutes = Math.floor(Math.abs(totalSeconds) / 60);
      const seconds = Math.abs(totalSeconds) % 60;
      return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
        2,
        "0"
      )}-`;
    }
  };

  const handleAnimationEnd = () => {
    setShowMainContent(true);
    setTimeout(() => {
      setShowStartingAnimation(false);
    }, 500); // Allow overlap for smooth transition
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

  return (
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-radial from-sym-grad-inner to-sym-grad-outer relative overflow-hidden">
        {/* Starting Animation Video */}
        {showStartingAnimation && (
          <div
            className={`fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-500 ${
              showStartingAnimation && !showMainContent
                ? "opacity-100"
                : "hidden"
            }`}
          >
            <video
              autoPlay
              muted
              onEnded={handleAnimationEnd}
              className="w-full h-full object-contain"
            >
              <source src="/starting-animation.mp4" type="video/mp4" />
            </video>
          </div>
        )}

        {/* Main Content - Always rendered for performance */}
        <div
          className={`transition-opacity duration-500 ${
            showMainContent ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Rotating Globe Background */}
          <div className="absolute w-screen h-screen flex items-center justify-center opacity-20">
            <img
              src="/globe-bg.png"
              alt="Globe Background"
              className="h-3/2 object-cover animate-spin"
              style={{ animationDuration: "90s" }}
            />
          </div>

          <TopAppBar showButtons={showButtons} />

          {/* Elapsed Time Display */}
          <div className="absolute bottom-0 w-screen mb-4">
            <div
              className="bg-radial from-sym-grad-inner to-sym-grad-outer
                rounded-3xl px-4 py-2 w-fit mx-auto 
                border border-white border-opacity-20"
            >
              <p className="text-white font-[GE_SS_Two]">
                الوقت المستغرق{" "}
                <span className="font-sans tabular-nums">
                  {currentSection
                    ? formatTime(
                        currentSection.originalDuration -
                          currentSection.duration
                      )
                    : "00:00"}
                </span>
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-8 mt-6">
            {/* Header Text */}
            <div className="text-center mb-8">
              <h1 className="text-white text-3xl xl:text-4xl font-[GE_SS_Two]">
                {currentSection
                  ? teamsMapping.find((x) => x.value === currentSection.team)
                      ?.label
                  : "اسم الفريق"}
              </h1>
              <h1 className="text-white text-5xl xl:text-6xl font-bold font-[GE_SS_Two]">
                {currentSection ? currentSection.name : "عنوان جولة المناظرة"}
              </h1>
            </div>

            {/* Timer Display */}
            <div
              className="bg-radial from-sym-grad-inner to-sym-grad-outer
           rounded-3xl px-3
           border border-white border-opacity-20"
            >
              <span className="leading-none text-white text-9xl xl:text-[12rem] font-bold tabular-nums">
                {currentSection ? formatTime(currentSection.duration) : "00:00"}
              </span>
            </div>

            {/* Control Buttons */}
            <div
              className={`flex gap-6 mt-6 transition-opacity duration-300 ${
                showButtons ? "opacity-100" : "opacity-0"
              }`}
            >
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
                onClick={handleResetSectionDuration}
                disabled={!currentSection}
                className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
              >
                <History className="text-white text-3xl" />
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
                <SkipNext className="text-white text-3xl" />
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= sections.length - 1}
                className="bg-opacity-20 hover:bg-opacity-30 disabled:bg-opacity-10 backdrop-blur-lg rounded-full p-4 border border-white border-opacity-20 transition-all duration-200"
              >
                <SkipPrevious className="text-white text-3xl" />
              </button>
            </div>
          </div>

          {/* Time Modification Dialog */}

          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <Dialog
                open={timeModifyDialogOpen}
                onClose={handleTimeCancel}
                slotProps={{
                  paper: {
                    style: {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                    },
                  },
                }}
              >
                <DialogTitle>تعديل مدة المؤقت</DialogTitle>
                <DialogContent>
                  <TextField
                    autoFocus
                    margin="dense"
                    label="المدة (بالدقائق)"
                    type="number"
                    fullWidth
                    variant="outlined"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleTimeCancel}>إلغاء </Button>
                  <Button onClick={handleTimeUpdate} variant="contained">
                    تحديث
                  </Button>
                </DialogActions>
              </Dialog>
            </ThemeProvider>
          </CacheProvider>

          <BottomBar />
        </div>
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
