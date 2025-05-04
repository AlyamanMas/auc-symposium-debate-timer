"use client";
import Image from "next/image";
import styles from "./page.module.css";
import TopAppBar from "@/ui/TopAppBar";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/ui/theme";

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.page}>
        <TopAppBar />
      </div>
    </ThemeProvider>
  );
}
