"use client";
import TopAppBar from "@/ui/TopAppBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/ui/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <TopAppBar />
    </ThemeProvider>
  );
}
