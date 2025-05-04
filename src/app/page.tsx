'use client';
import Image from "next/image";
import styles from "./page.module.css";
import TopAppBar from "@/ui/TopAppBar";

export default function Home() {
  return (
    <div className={styles.page}>
      <TopAppBar />
    </div>
  );
}
